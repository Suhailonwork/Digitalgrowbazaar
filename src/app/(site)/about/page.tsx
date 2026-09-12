import type { Metadata } from "next";
import { ArrowRight, Building2 } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { Icon } from "@/components/ui/icon";
import { CustomJsonLd, JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getBlock } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import type { Pillar, StatItem, TeamItem, TimelineItem } from "@/lib/content/blocks";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: "/about",
    title: "About Us | The Team Behind Digital Grow Bazaar",
    description:
      "Founded in 2017 in Noida, Digital Grow Bazaar is a 40-person team of developers, marketers, editors and marketplace specialists helping Indian brands grow online.",
    keywords: "about digital grow bazaar, digital marketing agency noida, ecommerce agency india, web development team noida",
  });
}




export default async function AboutPage() {
  const [values, timeline, team, stats] = await Promise.all([
    getBlock<Pillar[]>("about.values"),
    getBlock<TimelineItem[]>("about.timeline"),
    getBlock<TeamItem[]>("about.team"),
    getBlock<StatItem[]>("home.stats"),
  ]);

  return (
    <>
      <CustomJsonLd path="/about" />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      <PageHero
        eyebrow="About us"
        title={<>We started because good work kept getting split across four vendors</>}
        description="Digital Grow Bazaar is 40 people in Noida who build websites, run campaigns, shoot content and manage marketplace accounts — deliberately under one roof, because the handovers between agencies were where every project used to break."
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
      >
        <div className="flex flex-wrap items-center gap-3.5">
          <ButtonLink href="/contact" size="lg">
            Work with us
            <ArrowRight className="size-4.5" />
          </ButtonLink>
          <ButtonLink href="/work" variant="light" size="lg">
            See our results
          </ButtonLink>
        </div>
      </PageHero>

      <section className="border-b border-ink-100 bg-white">
        <div className="container-x grid gap-px bg-ink-100 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-9 text-center">
              <p className="font-display text-3xl font-extrabold tracking-tight text-gradient">{s.value}</p>
              <p className="mt-1.5 text-sm text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-18 lg:py-22">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="prose-dgb">
            <h2 className="!mt-0">The problem we were built to solve</h2>
            <p>
              In 2017 a typical growing Indian brand worked with a website vendor, a separate SEO freelancer, a video guy who was someone&apos;s
              cousin, and an intern uploading products to Amazon. Each did their bit competently. The business still went nowhere, because nobody
              owned the whole picture.
            </p>
            <p>
              <strong>Growth is not a set of tasks. It is a chain.</strong> The photograph decides the click-through rate. The click-through rate
              decides the ad cost. The landing page decides the conversion. The listing decides whether any of it turns into an order. Break one link
              and the rest of the spend is wasted.
            </p>
            <h2>How we are set up differently</h2>
            <p>
              Every client has a single account manager and a working group that includes whichever specialists the account needs. They share one
              thread, one calendar and one set of numbers. When the marketplace team notices a returns problem, the photography team is already in
              the conversation.
            </p>
            <p>
              We charge flat retainers rather than a commission on ad spend or GMV, which means the honest recommendation and the profitable one are
              always the same recommendation.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-4xl border border-ink-100 bg-ink-50/60 p-8">
              <span className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-aqua-500 text-white">
                <Building2 className="size-5" strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold tracking-tight text-ink-900">The team, by function</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {team.map((t) => (
                  <div key={t.name} className="rounded-2xl bg-white p-5">
                    <p className="font-display text-2xl font-extrabold text-brand-600">{t.count}</p>
                    <p className="mt-1 text-sm font-semibold text-ink-900">{t.name}</p>
                    <p className="mt-0.5 text-xs leading-snug text-ink-400">{t.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-ink-100 bg-white p-8">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink-900">Where we work from</h2>
              <p className="mt-3 leading-relaxed text-ink-500">
                Our office and studio are in Sector 63, Noida. Roughly two-thirds of our clients are elsewhere in India and work with us entirely
                remotely — Bengaluru, Jaipur, Surat, Ludhiana, Hyderabad and beyond.
              </p>
              <p className="mt-3 text-sm text-ink-400">{siteConfig.address.street}, {siteConfig.address.city} {siteConfig.address.postalCode}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-18 lg:py-22">
        <div className="container-x">
          <SectionHeading eyebrow="How we think" title={<>Four rules we do not bend</>} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} order={i}>
                <div className="h-full rounded-3xl border border-ink-100 bg-white p-8">
                  <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon name={v.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink-900">{v.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink-500">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-18 lg:py-22">
        <div className="container-x">
          <SectionHeading eyebrow="Our story" title={<>Nine years, one step at a time</>} />
          <ol className="mt-14 grid gap-6 lg:grid-cols-5">
            {timeline.map((t, i) => (
              <Reveal key={t.year} order={i}>
                <li className="relative h-full rounded-3xl border border-ink-100 bg-ink-50/60 p-6">
                  <span className="font-display text-sm font-extrabold tracking-[0.2em] text-brand-500">{t.year}</span>
                  <h3 className="mt-2.5 font-display text-[1.05rem] font-bold leading-snug tracking-tight text-ink-900">{t.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-500">{t.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <TestimonialsSection />
    </>
  );
}
