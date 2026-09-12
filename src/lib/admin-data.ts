import { createServerSupabase } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Inquiry, InquiryStatus, MenuItem, Page, Post, SeoMeta, Service, ServiceCategory, SiteSettings } from "@/lib/types";

/**
 * Admin readers see everything, including unpublished rows — unlike the public
 * readers in data.ts, which filter to published content and fall back to seeds.
 */
export type AdminResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function sb() {
  if (!isSupabaseConfigured) return null;
  return createServerSupabase();
}

export async function adminListInquiries(opts: { status?: string; q?: string; limit?: number } = {}) {
  const client = await sb();
  if (!client) return [] as Inquiry[];

  let query = client.from("inquiries").select("*").order("created_at", { ascending: false }).limit(opts.limit ?? 200);
  if (opts.status && opts.status !== "all") query = query.eq("status", opts.status);
  if (opts.q) query = query.or(`name.ilike.%${opts.q}%,email.ilike.%${opts.q}%,phone.ilike.%${opts.q}%,company.ilike.%${opts.q}%`);

  const { data, error } = await query;
  if (error) {
    console.error("[admin] inquiries", error.message);
    return [] as Inquiry[];
  }
  return (data ?? []) as Inquiry[];
}

export async function adminGetInquiry(id: string) {
  const client = await sb();
  if (!client) return null;
  const { data } = await client.from("inquiries").select("*").eq("id", id).maybeSingle();
  return (data as Inquiry | null) ?? null;
}

export async function adminInquiryCounts() {
  const client = await sb();
  const empty: Record<InquiryStatus | "total", number> = { total: 0, new: 0, contacted: 0, qualified: 0, won: 0, lost: 0 };
  if (!client) return empty;

  const { data, error } = await client.from("inquiries").select("status");
  if (error || !data) return empty;

  const counts = { ...empty, total: data.length };
  for (const row of data as { status: InquiryStatus }[]) {
    if (row.status in counts) counts[row.status] += 1;
  }
  return counts;
}

export async function adminListServices() {
  const client = await sb();
  if (!client) return [] as Service[];
  const { data } = await client.from("services").select("*").order("category_slug").order("order_index");
  return (data ?? []) as Service[];
}

export async function adminGetService(slug: string) {
  const client = await sb();
  if (!client) return null;
  const { data } = await client.from("services").select("*").eq("slug", slug).maybeSingle();
  return (data as Service | null) ?? null;
}

export async function adminListCategories() {
  const client = await sb();
  if (!client) return [] as ServiceCategory[];
  const { data } = await client.from("service_categories").select("*").order("order_index");
  return (data ?? []) as ServiceCategory[];
}

export async function adminListMenuItems() {
  const client = await sb();
  if (!client) return [] as MenuItem[];
  const { data } = await client.from("menu_items").select("*").order("order_index");
  return (data ?? []) as MenuItem[];
}

export async function adminServiceCountsByCategory() {
  const client = await sb();
  const counts: Record<string, number> = {};
  if (!client) return counts;
  const { data } = await client.from("services").select("category_slug");
  for (const row of (data ?? []) as { category_slug: string }[]) {
    counts[row.category_slug] = (counts[row.category_slug] ?? 0) + 1;
  }
  return counts;
}

export async function adminListBlocks() {
  const client = await sb();
  if (!client) return {} as Record<string, unknown>;
  const { data } = await client.from("content_blocks").select("key, data");
  const map: Record<string, unknown> = {};
  for (const row of (data ?? []) as { key: string; data: unknown }[]) map[row.key] = row.data;
  return map;
}

export async function adminListPages() {
  const client = await sb();
  if (!client) return [] as Page[];
  const { data } = await client.from("pages").select("*").order("slug");
  return (data ?? []) as Page[];
}

export async function adminGetPage(slug: string) {
  const client = await sb();
  if (!client) return null;
  const { data } = await client.from("pages").select("*").eq("slug", slug).maybeSingle();
  return (data as Page | null) ?? null;
}

export async function adminListPosts() {
  const client = await sb();
  if (!client) return [] as Post[];
  const { data } = await client.from("posts").select("*").order("published_at", { ascending: false });
  return (data ?? []) as Post[];
}

export async function adminGetPost(slug: string) {
  const client = await sb();
  if (!client) return null;
  const { data } = await client.from("posts").select("*").eq("slug", slug).maybeSingle();
  return (data as Post | null) ?? null;
}

export async function adminListSeo() {
  const client = await sb();
  if (!client) return [] as SeoMeta[];
  const { data } = await client.from("seo_meta").select("*").order("path");
  return (data ?? []) as SeoMeta[];
}

export async function adminGetSettings() {
  const client = await sb();
  if (!client) return null;
  const { data } = await client.from("site_settings").select("*").limit(1).maybeSingle();
  return (data as SiteSettings | null) ?? null;
}

/** Routes offered in the SEO manager. Static routes plus every dynamic slug. */
export async function adminSeoTargets() {
  const [services, posts, pages] = await Promise.all([adminListServices(), adminListPosts(), adminListPages()]);
  return [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services index" },
    { path: "/about", label: "About" },
    { path: "/work", label: "Work / case studies" },
    { path: "/blog", label: "Insights index" },
    { path: "/contact", label: "Contact" },
    ...services.map((s) => ({ path: `/services/${s.slug}`, label: `Service — ${s.title}` })),
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, label: `Article — ${p.title}` })),
    ...pages.map((p) => ({ path: `/${p.slug}`, label: `Page — ${p.title}` })),
  ];
}
