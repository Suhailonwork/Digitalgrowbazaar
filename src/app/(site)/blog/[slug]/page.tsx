import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, User } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { getPost, getPosts } from "@/lib/data";
import { CustomJsonLd, JsonLd, articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { formatDate, readingTime } from "@/lib/format";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };

  return buildMetadata({
    path: `/blog/${post.slug}`,
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    keywords: post.seo_keywords || post.tags.join(", "),
    image: post.cover_image,
    type: "article",
    publishedTime: post.published_at,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <CustomJsonLd path={`/blog/${post.slug}`} />
      <JsonLd data={[articleJsonLd(post), breadcrumbJsonLd(crumbs)]} />

      <PageHero eyebrow={post.tags[0] ?? "Insights"} title={post.title} description={post.excerpt} breadcrumbs={crumbs}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-400">
          <span className="flex items-center gap-2">
            <User className="size-4" /> {post.author}
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4" /> {formatDate(post.published_at)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="size-4" /> {readingTime(post.body)} min read
          </span>
        </div>
      </PageHero>

      <article className="bg-white py-18 lg:py-22">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="prose-dgb max-w-none" dangerouslySetInnerHTML={{ __html: post.body }} />

          <aside className="lg:sticky lg:top-[124px] lg:self-start">
            <div className="rounded-4xl border border-ink-100 bg-ink-50/60 p-7">
              <h2 className="font-display text-lg font-bold tracking-tight text-ink-900">Want this done for you?</h2>
              <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink-500">
                We apply exactly this on client accounts every week. Send us yours and we will audit it free.
              </p>
              <ButtonLink href="/contact" size="md" className="mt-5 w-full">
                Get a free audit
              </ButtonLink>
            </div>

            {more.length > 0 ? (
              <div className="mt-6 rounded-4xl border border-ink-100 bg-white p-7">
                <h2 className="font-display text-lg font-bold tracking-tight text-ink-900">Read next</h2>
                <ul className="mt-4 space-y-4">
                  {more.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="group block">
                        <span className="block text-[0.95rem] font-semibold leading-snug text-ink-800 transition-colors group-hover:text-brand-700">
                          {p.title}
                        </span>
                        <span className="mt-1 block text-xs text-ink-400">{formatDate(p.published_at)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </article>
    </>
  );
}
