import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { getPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";

export async function InsightsSection() {
  const posts = (await getPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-ink-50 py-20 lg:py-26">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Insights"
            title={<>What we have learned, written down</>}
            description="Playbooks and teardowns from the accounts we run. No fluff, no gated PDFs."
          />
          <ButtonLink href="/blog" variant="outline" size="md" className="shrink-0">
            All articles
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} order={i}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-hover group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 hover:border-brand-200"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full bg-brand-50 px-2.5 py-1 text-[0.7rem] font-semibold text-brand-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 font-display text-[1.15rem] font-bold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-brand-700">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink-500">{post.excerpt}</p>
                <p className="mt-6 flex items-center gap-2 border-t border-ink-100 pt-5 text-xs text-ink-400">
                  <CalendarDays className="size-3.5" />
                  {formatDate(post.published_at)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
