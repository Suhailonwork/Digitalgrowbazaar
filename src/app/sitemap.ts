import type { MetadataRoute } from "next";
import { getPages, getPosts, getServices } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

/**
 * Slugs the CMS must never claim in the sitemap: each is either a real route
 * that already appears below, or a section search engines are told to skip.
 */
const RESERVED_SLUGS = new Set(["", "about", "work", "blog", "contact", "services", "admin", "api"]);

/** Falls back to `now` for missing or unparseable timestamps — an Invalid Date
 * throws when Next serialises <lastmod>, which would take the whole sitemap down. */
function lastModified(value: string | null | undefined, now: Date): Date {
  if (!value) return now;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? now : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, pages] = await Promise.all([getServices(), getPosts(), getPages()]);
  const now = new Date();
  const url = (path: string) => `${siteConfig.url}${path}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/services"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/work"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...services.map((s) => ({
      url: url(`/services/${s.slug}`),
      lastModified: lastModified(s.updated_at, now),
      changeFrequency: "monthly" as const,
      priority: s.is_featured ? 0.9 : 0.8,
    })),
    ...posts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: lastModified(p.published_at, now),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...pages
      .filter((p) => p.slug && !RESERVED_SLUGS.has(p.slug.toLowerCase()))
      .map((p) => ({
        url: url(`/${p.slug}`),
        lastModified: lastModified(p.updated_at, now),
        changeFrequency: "yearly" as const,
        priority: 0.3,
      })),
  ];

  // A CMS slug can still collide with another CMS slug; duplicate <loc> entries
  // are invalid, so keep the first (highest-priority) occurrence of each URL.
  const seen = new Set<string>();
  return entries.filter((entry) => !seen.has(entry.url) && seen.add(entry.url));
}
