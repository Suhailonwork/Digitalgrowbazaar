import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ServiceCard } from "@/components/ui/service-card";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { FaqSection } from "@/components/home/faq-section";
import { getMegaMenu } from "@/lib/data";
import { CustomJsonLd, JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: "/services",
    title: "Our Services | Web, Marketing, Creative & E-commerce",
    description:
      "Explore every service from Digital Grow Bazaar: website and e-commerce development, SEO and paid media, videography and product photoshoots, seller training, and Amazon, Flipkart and Meesho account management.",
    keywords:
      "digital marketing services, website development services, ecommerce account management services, product photoshoot, videography services, ecommerce training india",
  });
}

export default async function ServicesPage() {
  const groups = await getMegaMenu();
  const total = groups.reduce((n, g) => n + g.services.length, 0);

  return (
    <>
      <CustomJsonLd path="/services" />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        eyebrow="Services"
        title={<>Everything a growing brand needs, under one roof</>}
        description={`${total} services across five practices. Take one, or let us run the whole stack so nothing falls between the gaps.`}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]}
      />

      <nav aria-label="Service categories" className="sticky top-[68px] z-30 border-b border-ink-100 bg-white/90 backdrop-blur-lg lg:top-[104px]">
        <div className="container-x flex gap-2 overflow-x-auto py-3.5">
          {groups.map((g) => (
            <a
              key={g.category.slug}
              href={`#${g.category.slug}`}
              className="whitespace-nowrap rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {g.category.name}
            </a>
          ))}
        </div>
      </nav>

      {groups.map((group, gi) => (
        <section key={group.category.slug} id={group.category.slug} className={gi % 2 === 0 ? "bg-white py-18 lg:py-22" : "bg-ink-50 py-18 lg:py-22"}>
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-aqua-500 text-white">
                    <Icon name={group.category.icon} className="size-5" />
                  </span>
                  <span className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">{group.category.name}</span>
                </span>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-500">{group.category.blurb}</p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-ink-400">{group.services.length} services</p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.services.map((service, i) => (
                <Reveal key={service.slug} order={i % 3}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="surface-dark py-18">
        <div className="container-x flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-display text-3xl font-bold text-white text-balance sm:text-4xl">
            Still comparing options? Get a free audit instead.
          </h2>
          <p className="max-w-xl text-ink-300">
            We will look at your site, ad account or seller panel and send back the three highest-impact fixes — whether or not you hire us.
          </p>
          <ButtonLink href="/contact" size="lg">
            Request my free audit
            <ArrowRight className="size-4.5" />
          </ButtonLink>
        </div>
      </section>

      <FaqSection withSchema={false} />
    </>
  );
}
