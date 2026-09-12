import type { MetadataRoute } from "next";
import { getPages, getPosts, getServices } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

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

  return [
    ...staticRoutes,
    ...services.map((s) => ({
      url: url(`/services/${s.slug}`),
      lastModified: s.updated_at ? new Date(s.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: s.is_featured ? 0.9 : 0.8,
    })),
    ...posts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(p.published_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...pages.map((p) => ({
      url: url(`/${p.slug}`),
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
