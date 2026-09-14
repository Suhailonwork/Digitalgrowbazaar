import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createPublicSupabase } from "@/lib/supabase/server";
import { fallbackBlocks } from "@/lib/content/blocks";
import {
  fallbackCaseStudies,
  fallbackCategories,
  fallbackMenuItems,
  fallbackPages,
  fallbackPosts,
  fallbackServices,
  fallbackTestimonials,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";
import type { CaseStudy, MenuItem, Page, Post, SeoMeta, Service, ServiceCategory, SiteSettings, Testimonial } from "@/lib/types";

/**
 * Cache tags. Admin writes call `revalidateTag` with these, so an edit is live
 * within a second while every other request is served from cache.
 */
export const TAGS = {
  services: "dgb:services",
  categories: "dgb:categories",
  menu: "dgb:menu",
  posts: "dgb:posts",
  pages: "dgb:pages",
  testimonials: "dgb:testimonials",
  caseStudies: "dgb:case-studies",
  seo: "dgb:seo",
  blocks: "dgb:blocks",
  settings: "dgb:settings",
} as const;

/** A day — content only goes stale if a write happens, and writes bust the tag. */
const TTL = 86_400;

/**
 * Every reader follows the same rule: ask Supabase, fall back to the built-in
 * catalogue if Supabase is absent, errors, or has no rows yet. The public site
 * therefore stays up during a migration, a key rotation, or an outage.
 *
 * `unstable_cache` de-duplicates across requests; `cache` de-duplicates within
 * a single request. Together the database is touched about once per tag per day.
 */
function cachedList<T>(
  key: string,
  tag: string,
  fetcher: (sb: NonNullable<ReturnType<typeof createPublicSupabase>>) => Promise<T[] | null>,
  fallback: T[],
) {
  const load = unstable_cache(
    async (): Promise<T[]> => {
      try {
        const sb = createPublicSupabase();
        if (!sb) return fallback;
        const rows = await fetcher(sb);
        return rows && rows.length > 0 ? rows : fallback;
      } catch {
        return fallback;
      }
    },
    [key],
    { tags: [tag], revalidate: TTL },
  );
  return cache(load);
}

export const getCategories = cachedList<ServiceCategory>(
  "categories",
  TAGS.categories,
  async (sb) => {
    const { data } = await sb.from("service_categories").select("*").eq("is_published", true).order("order_index");
    return data as ServiceCategory[] | null;
  },
  fallbackCategories,
);

export const getServices = cachedList<Service>(
  "services",
  TAGS.services,
  async (sb) => {
    const { data } = await sb.from("services").select("*").eq("is_published", true).order("order_index");
    return data as Service[] | null;
  },
  fallbackServices,
);

export const getMenuItems = cachedList<MenuItem>(
  "menu",
  TAGS.menu,
  async (sb) => {
    const { data } = await sb.from("menu_items").select("*").eq("is_published", true).order("order_index");
    return data as MenuItem[] | null;
  },
  fallbackMenuItems,
);

export const getTestimonials = cachedList<Testimonial>(
  "testimonials",
  TAGS.testimonials,
  async (sb) => {
    const { data } = await sb.from("testimonials").select("*").eq("is_published", true).order("order_index");
    return data as Testimonial[] | null;
  },
  fallbackTestimonials,
);

export const getCaseStudies = cachedList<CaseStudy>(
  "case-studies",
  TAGS.caseStudies,
  async (sb) => {
    const { data } = await sb.from("case_studies").select("*").eq("is_published", true).order("order_index");
    return data as CaseStudy[] | null;
  },
  fallbackCaseStudies,
);

export const getPosts = cachedList<Post>(
  "posts",
  TAGS.posts,
  async (sb) => {
    const { data } = await sb.from("posts").select("*").eq("is_published", true).order("published_at", { ascending: false });
    return data as Post[] | null;
  },
  fallbackPosts,
);

export const getPages = cachedList<Page>(
  "pages",
  TAGS.pages,
  async (sb) => {
    const { data } = await sb.from("pages").select("*").eq("is_published", true).order("slug");
    return data as Page[] | null;
  },
  fallbackPages,
);

/* -------------------------------- lookups -------------------------------- */

export const getService = cache(async (slug: string): Promise<Service | null> => {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
});

export const getFeaturedServices = cache(async (): Promise<Service[]> => {
  const all = await getServices();
  const featured = all.filter((s) => s.is_featured);
  return featured.length ? featured : all.slice(0, 6);
});

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const all = await getPosts();
  return all.find((p) => p.slug === slug) ?? null;
});

export const getPage = cache(async (slug: string): Promise<Page | null> => {
  const all = await getPages();
  return all.find((p) => p.slug === slug) ?? null;
});

/** Category → services, in menu order. Drives the mega menu and services index. */
export const getMegaMenu = cache(async (): Promise<{ category: ServiceCategory; services: Service[] }[]> => {
  const [categories, services] = await Promise.all([getCategories(), getServices()]);
  return categories
    .slice()
    .sort((a, b) => a.order_index - b.order_index)
    .map((category) => ({
      category,
      services: services.filter((s) => s.category_slug === category.slug).sort((a, b) => a.order_index - b.order_index),
    }))
    .filter((group) => group.services.length > 0);
});

/* --------------------------- editable sections --------------------------- */

const loadBlocks = unstable_cache(
  async (): Promise<Record<string, unknown>> => {
    try {
      const sb = createPublicSupabase();
      if (!sb) return {};
      const { data } = await sb.from("content_blocks").select("key, data");
      const map: Record<string, unknown> = {};
      for (const row of (data ?? []) as { key: string; data: unknown }[]) map[row.key] = row.data;
      return map;
    } catch {
      return {};
    }
  },
  ["content-blocks"],
  { tags: [TAGS.blocks], revalidate: TTL },
);

/**
 * One editable page section. The whole table is tiny, so it is fetched once per
 * request and read from memory. Falls back to the built-in copy in
 * `lib/content/blocks.ts` when the row is missing.
 */
export const getBlock = cache(async <T,>(key: string): Promise<T> => {
  const map = await loadBlocks();
  const value = map[key];
  if (value === undefined || value === null) return fallbackBlocks[key] as T;
  // A row that was emptied in the admin should not blank the section out.
  if (Array.isArray(value) && value.length === 0) return fallbackBlocks[key] as T;
  return value as T;
});

/* ------------------------------ singletons ------------------------------- */

const loadSeoMap = unstable_cache(
  async (): Promise<Record<string, SeoMeta>> => {
    try {
      const sb = createPublicSupabase();
      if (!sb) return {};
      const { data } = await sb.from("seo_meta").select("*");
      const map: Record<string, SeoMeta> = {};
      for (const row of (data ?? []) as SeoMeta[]) map[row.path] = row;
      return map;
    } catch {
      return {};
    }
  },
  ["seo-map"],
  { tags: [TAGS.seo], revalidate: TTL },
);

/**
 * Admin-editable per-route SEO. The whole table is small, so it is fetched once
 * and read from memory rather than issuing a query per page.
 */
export const getSeoMeta = cache(async (path: string): Promise<SeoMeta | null> => {
  const map = await loadSeoMap();
  return map[path] ?? null;
});

export const defaultSettings: SiteSettings = {
  brand_name: siteConfig.name,
  tagline: siteConfig.tagline,
  phone: siteConfig.phone,
  email: siteConfig.email,
  whatsapp: siteConfig.whatsapp,
  address: siteConfig.address.full,
  instagram: siteConfig.socials.instagram,
  facebook: siteConfig.socials.facebook,
  linkedin: siteConfig.socials.linkedin,
  youtube: siteConfig.socials.youtube,
  ga_id: process.env.NEXT_PUBLIC_GA_ID || null,
  default_seo_title: null,
  default_seo_description: null,
  default_og_image: null,
  header_notice: "Now onboarding for the Q4 festive season — limited marketplace slots.",
  header_cta_label: "Free growth audit",
  header_cta_href: "/contact",
  menu_promo_title: "Not sure which service you need?",
  menu_promo_text: "Send us your website or seller panel — you get a written audit with priorities in 48 hours, free.",
  menu_promo_cta_label: "Book a free audit",
  menu_promo_cta_href: "/contact",
  favicon_url: null,
  twitter_handle: null,
  google_verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || null,
  bing_verification: null,
  gtm_id: null,
  fb_pixel_id: null,
};

const loadSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    try {
      const sb = createPublicSupabase();
      if (!sb) return defaultSettings;
      const { data } = await sb.from("site_settings").select("*").limit(1).maybeSingle();
      if (!data) return defaultSettings;
      // Blank columns fall back rather than blanking out the site.
      const row = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== null && v !== ""));
      return { ...defaultSettings, ...(row as Partial<SiteSettings>) };
    } catch {
      return defaultSettings;
    }
  },
  ["site-settings"],
  { tags: [TAGS.settings], revalidate: TTL },
);

export const getSiteSettings = cache(loadSettings);
