import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getPosts } from "@/lib/data";
import { CustomJsonLd, JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { formatDate, readingTime } from "@/lib/format";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: "/blog",
    title: "Insights & Playbooks | Digital Grow Bazaar Blog",
    description:
      "Practical guides on e-commerce, SEO, marketplace selling and web development, written by the team that runs these accounts every day.",
    keywords: "ecommerce blog india, amazon seller tips, seo guide india, digital marketing insights",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <CustomJsonLd path="/blog" />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }])} />

      <PageHero
        eyebrow="Insights"
        title={<>Playbooks from the accounts we actually run</>}
        description="No gated PDFs, no recycled listicles. These are the checklists and teardowns our own team works from."
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }]}
      />

      <section className="bg-white py-18 lg:py-22">
        <div className="container-x">
          {featured ? (
            <Link
              href={`/blog/${featured.slug}`}
              className="card-hover group grid gap-8 rounded-4xl border border-ink-100 bg-ink-50/50 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-11"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-600 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-white">Latest</span>
                  {featured.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white px-3 py-1 text-[0.7rem] font-semibold text-ink-500">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-brand-700 text-balance sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-500">{featured.excerpt}</p>
              </div>
              <div className="flex flex-col justify-end gap-3 text-sm text-ink-400">
                <p className="flex items-center gap-2">
                  <CalendarDays className="size-4" /> {formatDate(featured.published_at)}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="size-4" /> {readingTime(featured.body)} min read
                </p>
                <p className="font-semibold text-brand-700">Read the article &rarr;</p>
              </div>
            </Link>
          ) : null}

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} order={i % 3}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card-hover group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 hover:border-brand-200"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-full bg-brand-50 px-2.5 py-1 text-[0.7rem] font-semibold text-brand-700">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 font-display text-[1.15rem] font-bold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-brand-700">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink-500">{post.excerpt}</p>
                  <p className="mt-6 flex items-center gap-4 border-t border-ink-100 pt-5 text-xs text-ink-400">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" /> {formatDate(post.published_at)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" /> {readingTime(post.body)} min
                    </span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
