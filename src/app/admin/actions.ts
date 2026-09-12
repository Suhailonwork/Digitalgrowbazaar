"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { isSupabaseConfigured, missingSupabaseEnvVar } from "@/lib/supabase/config";
import { TAGS } from "@/lib/data";
import type { InquiryStatus } from "@/lib/types";
import type { ActionState } from "@/lib/form-state";

async function client() {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured. Add your project keys to .env.local.");
  const sb = await createServerSupabase();
  if (!sb) throw new Error("Supabase client unavailable.");
  const { data } = await sb.auth.getUser();
  if (!data.user) redirect("/admin/login");
  return sb;
}

const str = (fd: FormData, key: string) => ((fd.get(key) as string) ?? "").trim();
const bool = (fd: FormData, key: string) => fd.get(key) === "on" || fd.get(key) === "true";
const num = (fd: FormData, key: string, fallback = 0) => {
  const n = Number(str(fd, key));
  return Number.isFinite(n) ? n : fallback;
};
/** Textarea → array, one entry per line. */
const lines = (fd: FormData, key: string) =>
  str(fd, key)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

/**
 * Next 16 requires a lifetime profile on revalidateTag; `expire: 0` marks the
 * tag stale immediately, so an admin save is visible on the next request.
 */
function bust(...tags: string[]) {
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
}

/**
 * For content that appears in the header, footer or mega menu — i.e. on every
 * page — the rendered HTML has to be purged too, not just the data cache.
 */
function bustSiteWide(...tags: string[]) {
  bust(...tags);
  revalidatePath("/", "layout");
}

function fail(err: unknown): ActionState {
  const message = err instanceof Error ? err.message : "Something went wrong.";
  console.error("[admin action]", message);
  return { status: "error", message };
}

/* ------------------------------------------------------------------ auth -- */

export async function signIn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  const next = str(formData, "next") || "/admin";

  if (!email || !password) return { status: "error", message: "Enter both email and password." };
  if (!isSupabaseConfigured) {
    return {
      status: "error",
      message: `Cannot sign in: ${missingSupabaseEnvVar()} is missing from your .env file. Add it and restart the dev server.`,
    };
  }

  const sb = await createServerSupabase();
  if (!sb) return { status: "error", message: "Supabase client unavailable." };

  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin", "layout");
  redirect(next);
}

export async function signOut() {
  const sb = await createServerSupabase();
  await sb?.auth.signOut();
  revalidatePath("/admin", "layout");
  redirect("/admin/login");
}

/* -------------------------------------------------------------- inquiries -- */

export async function updateInquiry(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const sb = await client();
    const id = str(formData, "id");
    const status = str(formData, "status") as InquiryStatus;
    const notes = str(formData, "notes");

    const { error } = await sb.from("inquiries").update({ status, notes: notes || null }).eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/inquiries");
    revalidatePath(`/admin/inquiries/${id}`);
    revalidatePath("/admin");
    return { status: "success", message: "Enquiry updated." };
  } catch (err) {
    return fail(err);
  }
}

export async function setInquiryStatus(formData: FormData) {
  try {
    const sb = await client();
    const id = str(formData, "id");
    const status = str(formData, "status") as InquiryStatus;
    await sb.from("inquiries").update({ status }).eq("id", id);
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
  } catch (err) {
    fail(err);
  }
}

export async function deleteInquiry(formData: FormData) {
  try {
    const sb = await client();
    await sb.from("inquiries").delete().eq("id", str(formData, "id"));
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
  } catch (err) {
    fail(err);
  }
  redirect("/admin/inquiries");
}

/* ---------------------------------------------------------------- services -- */

export async function saveService(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const sb = await client();
    const originalSlug = str(formData, "original_slug");
    const slug = str(formData, "slug");
    if (!slug) return { status: "error", message: "Slug is required." };

    const payload = {
      slug,
      category_slug: str(formData, "category_slug"),
      title: str(formData, "title"),
      menu_label: str(formData, "menu_label") || str(formData, "title"),
      excerpt: str(formData, "excerpt"),
      icon: str(formData, "icon") || "Sparkles",
      body: str(formData, "body"),
      features: lines(formData, "features"),
      outcomes: lines(formData, "outcomes").map((line) => {
        const [value, ...rest] = line.split("|");
        return { value: (value ?? "").trim(), label: rest.join("|").trim() };
      }),
      process: lines(formData, "process").map((line) => {
        const [title, ...rest] = line.split("|");
        return { title: (title ?? "").trim(), detail: rest.join("|").trim() };
      }),
      faqs: lines(formData, "faqs").map((line) => {
        const [q, ...rest] = line.split("|");
        return { q: (q ?? "").trim(), a: rest.join("|").trim() };
      }),
      price_from: str(formData, "price_from") || null,
      is_featured: bool(formData, "is_featured"),
      is_published: bool(formData, "is_published"),
      order_index: num(formData, "order_index", 99),
      seo_title: str(formData, "seo_title") || null,
      seo_description: str(formData, "seo_description") || null,
      seo_keywords: str(formData, "seo_keywords") || null,
      og_image: str(formData, "og_image") || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = originalSlug
      ? await sb.from("services").update(payload).eq("slug", originalSlug)
      : await sb.from("services").insert(payload);
    if (error) throw error;

    bustSiteWide(TAGS.services);
    revalidatePath("/admin/services");
    return { status: "success", message: "Service saved. The public site updates immediately." };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteService(formData: FormData) {
  try {
    const sb = await client();
    await sb.from("services").delete().eq("slug", str(formData, "slug"));
    bustSiteWide(TAGS.services);
    revalidatePath("/admin/services");
  } catch (err) {
    fail(err);
  }
  redirect("/admin/services");
}

/* ------------------------------------------------------------------- pages -- */

export async function savePage(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const sb = await client();
    const originalSlug = str(formData, "original_slug");
    const slug = str(formData, "slug");
    if (!slug) return { status: "error", message: "Slug is required." };

    const payload = {
      slug,
      title: str(formData, "title"),
      subtitle: str(formData, "subtitle") || null,
      body: str(formData, "body"),
      is_published: bool(formData, "is_published"),
      seo_title: str(formData, "seo_title") || null,
      seo_description: str(formData, "seo_description") || null,
      seo_keywords: str(formData, "seo_keywords") || null,
      og_image: str(formData, "og_image") || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = originalSlug ? await sb.from("pages").update(payload).eq("slug", originalSlug) : await sb.from("pages").insert(payload);
    if (error) throw error;

    bust(TAGS.pages);
    revalidatePath(`/${slug}`);
    revalidatePath("/admin/pages");
    return { status: "success", message: "Page saved." };
  } catch (err) {
    return fail(err);
  }
}

export async function deletePage(formData: FormData) {
  try {
    const sb = await client();
    await sb.from("pages").delete().eq("slug", str(formData, "slug"));
    bust(TAGS.pages);
    revalidatePath("/admin/pages");
  } catch (err) {
    fail(err);
  }
  redirect("/admin/pages");
}

/* ------------------------------------------------------------------- posts -- */

export async function savePost(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const sb = await client();
    const originalSlug = str(formData, "original_slug");
    const slug = str(formData, "slug");
    if (!slug) return { status: "error", message: "Slug is required." };

    const payload = {
      slug,
      title: str(formData, "title"),
      excerpt: str(formData, "excerpt"),
      body: str(formData, "body"),
      cover_image: str(formData, "cover_image") || null,
      author: str(formData, "author") || "Digital Grow Bazaar",
      tags: str(formData, "tags")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      published_at: str(formData, "published_at") || new Date().toISOString().slice(0, 10),
      is_published: bool(formData, "is_published"),
      seo_title: str(formData, "seo_title") || null,
      seo_description: str(formData, "seo_description") || null,
      seo_keywords: str(formData, "seo_keywords") || null,
    };

    const { error } = originalSlug ? await sb.from("posts").update(payload).eq("slug", originalSlug) : await sb.from("posts").insert(payload);
    if (error) throw error;

    bust(TAGS.posts);
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/posts");
    return { status: "success", message: "Article saved." };
  } catch (err) {
    return fail(err);
  }
}

export async function deletePost(formData: FormData) {
  try {
    const sb = await client();
    await sb.from("posts").delete().eq("slug", str(formData, "slug"));
    bust(TAGS.posts);
    revalidatePath("/admin/posts");
  } catch (err) {
    fail(err);
  }
  redirect("/admin/posts");
}

/* --------------------------------------------------------------------- seo -- */

export async function saveSeo(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const sb = await client();
    const path = str(formData, "path");
    if (!path.startsWith("/")) return { status: "error", message: "Path must start with a forward slash." };

    const jsonLd = str(formData, "json_ld");
    if (jsonLd) {
      try {
        JSON.parse(jsonLd);
      } catch {
        return { status: "error", message: "Custom JSON-LD is not valid JSON." };
      }
    }

    const payload = {
      path,
      title: str(formData, "title") || null,
      description: str(formData, "description") || null,
      keywords: str(formData, "keywords") || null,
      og_image: str(formData, "og_image") || null,
      og_title: str(formData, "og_title") || null,
      og_description: str(formData, "og_description") || null,
      twitter_card: str(formData, "twitter_card") || null,
      canonical: str(formData, "canonical") || null,
      noindex: bool(formData, "noindex"),
      nofollow: bool(formData, "nofollow"),
      json_ld: jsonLd || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await sb.from("seo_meta").upsert(payload, { onConflict: "path" });
    if (error) throw error;

    bust(TAGS.seo);
    revalidatePath(path);
    revalidatePath("/admin/seo");
    return { status: "success", message: `SEO saved for ${path}. Live on the page now.` };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteSeo(formData: FormData) {
  try {
    const sb = await client();
    const path = str(formData, "path");
    await sb.from("seo_meta").delete().eq("path", path);
    bust(TAGS.seo);
    revalidatePath(path);
    revalidatePath("/admin/seo");
  } catch (err) {
    fail(err);
  }
  redirect("/admin/seo");
}

/* ---------------------------------------------------------------- settings -- */

export async function saveSettings(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const sb = await client();
    const id = str(formData, "id");

    const payload = {
      brand_name: str(formData, "brand_name"),
      tagline: str(formData, "tagline"),
      phone: str(formData, "phone"),
      email: str(formData, "email"),
      whatsapp: str(formData, "whatsapp"),
      address: str(formData, "address"),
      instagram: str(formData, "instagram") || null,
      facebook: str(formData, "facebook") || null,
      linkedin: str(formData, "linkedin") || null,
      youtube: str(formData, "youtube") || null,
      ga_id: str(formData, "ga_id") || null,
      default_seo_title: str(formData, "default_seo_title") || null,
      default_seo_description: str(formData, "default_seo_description") || null,
      default_og_image: str(formData, "default_og_image") || null,
      header_notice: str(formData, "header_notice") || null,
      header_cta_label: str(formData, "header_cta_label") || null,
      header_cta_href: str(formData, "header_cta_href") || null,
      menu_promo_title: str(formData, "menu_promo_title") || null,
      menu_promo_text: str(formData, "menu_promo_text") || null,
      menu_promo_cta_label: str(formData, "menu_promo_cta_label") || null,
      menu_promo_cta_href: str(formData, "menu_promo_cta_href") || null,
      favicon_url: str(formData, "favicon_url") || null,
      twitter_handle: str(formData, "twitter_handle") || null,
      google_verification: str(formData, "google_verification") || null,
      bing_verification: str(formData, "bing_verification") || null,
      gtm_id: str(formData, "gtm_id") || null,
      fb_pixel_id: str(formData, "fb_pixel_id") || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = id ? await sb.from("site_settings").update(payload).eq("id", id) : await sb.from("site_settings").insert(payload);
    if (error) throw error;

    bustSiteWide(TAGS.settings);
    return { status: "success", message: "Settings saved across the site." };
  } catch (err) {
    return fail(err);
  }
}

/* --------------------------------------------------------- content import -- */

/**
 * Copies the built-in catalogue (categories, services, testimonials, case
 * studies, articles, policy pages and default settings) into Supabase.
 * Safe to run more than once — everything is upserted on its slug.
 */
export async function importSeedContent(_prev: ActionState): Promise<ActionState> {
  try {
    const sb = await client();
    const { fallbackCaseStudies, fallbackCategories, fallbackPages, fallbackPosts, fallbackServices, fallbackTestimonials } = await import(
      "@/lib/content"
    );
    const { CONTENT_BLOCKS } = await import("@/lib/content/blocks");
    const { staticSeoDefaults } = await import("@/lib/content/seo-defaults");
    const { fallbackMenuItems } = await import("@/lib/content");
    const { siteConfig } = await import("@/lib/site");

    // Everything with a slug is upserted, so re-running only refreshes rows.
    const steps: { table: string; rows: Record<string, unknown>[] }[] = [
      { table: "service_categories", rows: fallbackCategories.map((c) => ({ ...c, is_published: true })) },
      { table: "services", rows: fallbackServices.map((s) => ({ ...s })) },
      { table: "case_studies", rows: fallbackCaseStudies.map((c) => ({ ...c, is_published: true })) },
      { table: "posts", rows: fallbackPosts.map((p) => ({ ...p })) },
      { table: "pages", rows: fallbackPages.map((p) => ({ ...p })) },
    ];

    for (const step of steps) {
      const { error } = await sb.from(step.table).upsert(step.rows, { onConflict: "slug" });
      if (error) throw new Error(`${step.table}: ${error.message}`);
    }

    // Tables keyed on something other than `slug`.
    const keyed: { table: string; rows: Record<string, unknown>[]; conflict: string }[] = [
      { table: "menu_items", rows: fallbackMenuItems.map((m) => ({ ...m })), conflict: "href" },
      {
        table: "content_blocks",
        rows: CONTENT_BLOCKS.map((b) => ({ key: b.key, label: b.label, description: b.description, data: b.data })),
        conflict: "key",
      },
      { table: "seo_meta", rows: staticSeoDefaults.map((r) => ({ ...r })), conflict: "path" },
    ];

    for (const step of keyed) {
      const { error } = await sb.from(step.table).upsert(step.rows, { onConflict: step.conflict });
      // content_blocks only exists after migration 002, so treat it as optional.
      if (error && step.table !== "content_blocks") throw new Error(`${step.table}: ${error.message}`);
    }

    // Testimonials have no natural key, so only seed them into an empty table.
    const { count: testimonialCount } = await sb.from("testimonials").select("id", { count: "exact", head: true });
    if (!testimonialCount) {
      const { error } = await sb.from("testimonials").insert(fallbackTestimonials.map((t) => ({ ...t, is_published: true })));
      if (error) throw new Error(`testimonials: ${error.message}`);
    }

    const { data: existingSettings } = await sb.from("site_settings").select("id").limit(1).maybeSingle();
    if (!existingSettings) {
      const { error } = await sb.from("site_settings").insert({
        brand_name: siteConfig.name,
        tagline: siteConfig.tagline,
        phone: siteConfig.phone,
        email: siteConfig.email,
        whatsapp: siteConfig.whatsapp,
        address: `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
        instagram: siteConfig.socials.instagram,
        facebook: siteConfig.socials.facebook,
        linkedin: siteConfig.socials.linkedin,
        youtube: siteConfig.socials.youtube,
      });
      if (error) throw new Error(`site_settings: ${error.message}`);
    }

    bustSiteWide(...Object.values(TAGS));
    revalidatePath("/admin", "layout");
    return {
      status: "success",
      message: `Imported ${fallbackCategories.length} categories, ${fallbackServices.length} services, ${fallbackPosts.length} articles, ${fallbackPages.length} pages, ${CONTENT_BLOCKS.length} page sections and ${staticSeoDefaults.length} SEO records.`,
    };
  } catch (err) {
    return fail(err);
  }
}

/* ------------------------------------------------------------ navigation -- */

export async function saveMenuItem(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const sb = await client();
    const id = str(formData, "id");
    const href = str(formData, "href");
    const label = str(formData, "label");

    if (!label) return { status: "error", message: "Label is required." };
    if (!href.startsWith("/") && !href.startsWith("http")) {
      return { status: "error", message: "Link must start with / for an internal page, or http for an external one." };
    }

    const payload = {
      label,
      href,
      order_index: num(formData, "order_index", 99),
      is_published: bool(formData, "is_published"),
      open_in_new_tab: bool(formData, "open_in_new_tab"),
      badge: str(formData, "badge") || null,
      has_mega: bool(formData, "has_mega"),
      updated_at: new Date().toISOString(),
    };

    const { error } = id ? await sb.from("menu_items").update(payload).eq("id", id) : await sb.from("menu_items").insert(payload);
    if (error) throw error;

    bustSiteWide(TAGS.menu);
    revalidatePath("/admin/menu");
    return { status: "success", message: `Menu link "${label}" saved.` };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteMenuItem(formData: FormData) {
  try {
    const sb = await client();
    await sb.from("menu_items").delete().eq("id", str(formData, "id"));
    bustSiteWide(TAGS.menu);
    revalidatePath("/admin/menu");
  } catch (err) {
    fail(err);
  }
  redirect("/admin/menu");
}

/** Nudges an item one place up or down and swaps the neighbour's position. */
export async function moveMenuItem(formData: FormData) {
  try {
    const sb = await client();
    const id = str(formData, "id");
    const direction = str(formData, "direction");

    const { data: items } = await sb.from("menu_items").select("id, order_index").order("order_index");
    const list = (items ?? []) as { id: string; order_index: number }[];
    const index = list.findIndex((i) => i.id === id);
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || swapWith < 0 || swapWith >= list.length) return;

    await sb.from("menu_items").update({ order_index: list[swapWith].order_index }).eq("id", list[index].id);
    await sb.from("menu_items").update({ order_index: list[index].order_index }).eq("id", list[swapWith].id);

    bustSiteWide(TAGS.menu);
    revalidatePath("/admin/menu");
  } catch (err) {
    fail(err);
  }
}

/* ------------------------------------------------- mega menu categories -- */

export async function saveCategory(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const sb = await client();
    const originalSlug = str(formData, "original_slug");
    const slug = str(formData, "slug");
    const name = str(formData, "name");

    if (!slug || !name) return { status: "error", message: "Name and slug are both required." };
    if (!/^[a-z0-9-]+$/.test(slug)) return { status: "error", message: "Slug may only contain lowercase letters, numbers and hyphens." };

    const payload = {
      slug,
      name,
      blurb: str(formData, "blurb"),
      icon: str(formData, "icon") || "Sparkles",
      order_index: num(formData, "order_index", 99),
      is_published: bool(formData, "is_published"),
      updated_at: new Date().toISOString(),
    };

    const { error } = originalSlug
      ? await sb.from("service_categories").update(payload).eq("slug", originalSlug)
      : await sb.from("service_categories").insert(payload);
    if (error) throw error;

    bustSiteWide(TAGS.categories, TAGS.services);
    revalidatePath("/admin/menu");
    return { status: "success", message: `Mega menu column "${name}" saved.` };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteCategory(formData: FormData) {
  let blocked = false;
  try {
    const sb = await client();
    const slug = str(formData, "slug");

    // A category with services attached would break the foreign key, so move
    // those services first rather than failing with a database error.
    const { count } = await sb.from("services").select("slug", { count: "exact", head: true }).eq("category_slug", slug);
    if (count && count > 0) {
      blocked = true;
    } else {
      await sb.from("service_categories").delete().eq("slug", slug);
      bustSiteWide(TAGS.categories);
      revalidatePath("/admin/menu");
    }
  } catch (err) {
    fail(err);
  }
  redirect(blocked ? "/admin/menu?error=category-in-use" : "/admin/menu");
}

export async function moveCategory(formData: FormData) {
  try {
    const sb = await client();
    const slug = str(formData, "slug");
    const direction = str(formData, "direction");

    const { data } = await sb.from("service_categories").select("slug, order_index").order("order_index");
    const list = (data ?? []) as { slug: string; order_index: number }[];
    const index = list.findIndex((c) => c.slug === slug);
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || swapWith < 0 || swapWith >= list.length) return;

    await sb.from("service_categories").update({ order_index: list[swapWith].order_index }).eq("slug", list[index].slug);
    await sb.from("service_categories").update({ order_index: list[index].order_index }).eq("slug", list[swapWith].slug);

    bustSiteWide(TAGS.categories);
    revalidatePath("/admin/menu");
  } catch (err) {
    fail(err);
  }
}

/** Reorders a service inside its mega-menu column. */
export async function moveService(formData: FormData) {
  try {
    const sb = await client();
    const slug = str(formData, "slug");
    const categorySlug = str(formData, "category_slug");
    const direction = str(formData, "direction");

    const { data } = await sb
      .from("services")
      .select("slug, order_index")
      .eq("category_slug", categorySlug)
      .order("order_index");
    const list = (data ?? []) as { slug: string; order_index: number }[];
    const index = list.findIndex((s) => s.slug === slug);
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || swapWith < 0 || swapWith >= list.length) return;

    await sb.from("services").update({ order_index: list[swapWith].order_index }).eq("slug", list[index].slug);
    await sb.from("services").update({ order_index: list[index].order_index }).eq("slug", list[swapWith].slug);

    bust(TAGS.services);
    revalidatePath("/admin/menu");
  } catch (err) {
    fail(err);
  }
}

/* ---------------------------------------------------------- page sections -- */

export async function saveBlock(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const sb = await client();
    const key = str(formData, "key");
    if (!key) return { status: "error", message: "Missing block key." };

    const { CONTENT_BLOCKS, fallbackBlocks } = await import("@/lib/content/blocks");
    const { parseBlock, shapeOf } = await import("@/lib/blocks-format");

    const meta = CONTENT_BLOCKS.find((b) => b.key === key);
    if (!meta) return { status: "error", message: `Unknown section "${key}".` };

    // The shape comes from the built-in copy, so a malformed row cannot change
    // the structure the components expect.
    const sample = fallbackBlocks[key];
    const shape = shapeOf(sample);

    const form: Record<string, string> = {};
    for (const [k, v] of formData.entries()) {
      if (k !== "key" && typeof v === "string") form[k] = v;
    }

    let data: unknown;
    try {
      data = parseBlock(shape, form, sample);
    } catch {
      return { status: "error", message: "That content could not be parsed. Check the line and | separators." };
    }

    const { error } = await sb.from("content_blocks").upsert(
      { key, label: meta.label, description: meta.description, data, updated_at: new Date().toISOString() },
      { onConflict: "key" },
    );
    if (error) throw error;

    bustSiteWide(TAGS.blocks);
    revalidatePath("/admin/content");
    return { status: "success", message: `"${meta.label}" saved and live on the site.` };
  } catch (err) {
    return fail(err);
  }
}

export async function resetBlock(formData: FormData) {
  try {
    const sb = await client();
    await sb.from("content_blocks").delete().eq("key", str(formData, "key"));
    bustSiteWide(TAGS.blocks);
  } catch (err) {
    fail(err);
  }
  redirect("/admin/content");
}
