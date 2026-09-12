import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { getCaseStudies, getServices } from "@/lib/data";
import { CustomJsonLd, JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: "/work",
    title: "Our Work & Case Studies | Digital Grow Bazaar",
    description:
      "Real results from Indian brands we work with: marketplace revenue growth, organic traffic gains and D2C store performance, with the numbers behind each engagement.",
    keywords: "digital marketing case studies india, amazon seller case study, ecommerce growth results, seo case study india",
  });
}

export default async function WorkPage() {
  const [studies, services] = await Promise.all([getCaseStudies(), getServices()]);
  const titleFor = (slug: string) => services.find((s) => s.slug === slug)?.title ?? slug;

  return (
    <>
      <CustomJsonLd path="/work" />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} />

      <PageHero
        eyebrow="Our work"
        title={<>Results we can show you inside the account</>}
        description="Every number below comes from an account we still manage. Ask us on a call and we will screen-share the dashboard it came from."
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]}
      />

      <section className="bg-white py-18 lg:py-22">
        <div className="container-x space-y-8">
          {studies.map((study, i) => (
            <Reveal key={study.slug} order={i}>
              <article className="grid gap-8 rounded-4xl border border-ink-100 bg-ink-50/50 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-11">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white">{study.client}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">{study.industry}</span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold leading-snug tracking-tight text-ink-900 text-balance sm:text-3xl">
                    {study.headline}
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-500">{study.summary}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {study.services.map((slug) => (
                      <Link
                        key={slug}
                        href={`/services/${slug}`}
                        className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                      >
                        {titleFor(slug)}
                      </Link>
                    ))}
                  </div>
                </div>

                <dl className="grid content-start gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl bg-white px-6 py-5">
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="font-display text-3xl font-extrabold tracking-tight text-gradient">{m.value}</dd>
                      <p className="mt-1 text-sm text-ink-500">{m.label}</p>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <TestimonialsSection />

      <section className="surface-dark py-18">
        <div className="container-x flex flex-col items-center gap-6 text-center">
          <SectionHeading tone="dark" eyebrow="Your turn" title={<>What would your numbers look like in six months?</>} />
          <ButtonLink href="/contact" size="lg">
            Find out with a free audit
            <ArrowRight className="size-4.5" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
