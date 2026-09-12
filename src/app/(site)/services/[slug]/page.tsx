import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section";
import { ServiceCard } from "@/components/ui/service-card";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { getBlock, getCategories, getService, getServices, getSiteSettings } from "@/lib/data";
import { CustomJsonLd, JsonLd, breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };

  return buildMetadata({
    path: `/services/${service.slug}`,
    title: service.seo_title || `${service.title} | Digital Grow Bazaar`,
    description: service.seo_description || service.excerpt,
    keywords: service.seo_keywords || undefined,
    image: service.og_image,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, allServices, categories, settings, budgets] = await Promise.all([
    getService(slug),
    getServices(),
    getCategories(),
    getSiteSettings(),
    getBlock<string[]>("contact.budgets"),
  ]);

  if (!service) notFound();

  const category = categories.find((c) => c.slug === service.category_slug);
  const related = allServices.filter((s) => s.category_slug === service.category_slug && s.slug !== service.slug).slice(0, 3);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <CustomJsonLd path={`/services/${service.slug}`} />
      <JsonLd
        data={[
          serviceJsonLd(service),
          breadcrumbJsonLd(crumbs),
          ...(service.faqs.length ? [faqJsonLd(service.faqs)] : []),
        ]}
      />

      <PageHero eyebrow={category?.name ?? "Service"} title={service.title} description={service.excerpt} breadcrumbs={crumbs}>
        <div className="flex flex-wrap items-center gap-3.5">
          <ButtonLink href="#enquire" size="lg">
            Get a proposal
            <ArrowRight className="size-4.5" />
          </ButtonLink>
          <a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            className="inline-flex h-13 items-center gap-2 rounded-full px-6 font-semibold text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10"
          >
            <Phone className="size-4.5" />
            {settings.phone}
          </a>
          {service.price_from ? (
            <span className="inline-flex h-13 items-center rounded-full bg-white/8 px-5 text-sm font-medium text-ink-200 ring-1 ring-inset ring-white/12">
              Starts at <span className="ml-1.5 font-bold text-white">₹{service.price_from}</span>
            </span>
          ) : null}
        </div>
      </PageHero>

      {/* Outcome strip */}
      {service.outcomes.length > 0 ? (
        <section className="border-b border-ink-100 bg-white">
          <div className="container-x grid gap-px bg-ink-100 sm:grid-cols-3">
            {service.outcomes.map((o) => (
              <div key={o.label} className="bg-white px-6 py-8 text-center">
                <p className="font-display text-3xl font-extrabold tracking-tight text-gradient">{o.value}</p>
                <p className="mt-1.5 text-sm text-ink-500">{o.label}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Body + sticky sidebar */}
      <section className="bg-white py-18 lg:py-22">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <div className="prose-dgb" dangerouslySetInnerHTML={{ __html: service.body }} />

            {service.features.length > 0 ? (
              <div className="mt-14">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900">What is included</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-ink-50/50 px-4 py-3.5">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-500" strokeWidth={2} />
                      <span className="text-[0.92rem] leading-snug text-ink-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-[124px] lg:self-start">
            <div className="rounded-4xl border border-ink-100 bg-ink-50/60 p-7 shadow-card">
              <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-aqua-500 text-white">
                <Icon name={service.icon} className="size-5.5" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold tracking-tight text-ink-900">Talk to a {category?.name.toLowerCase()} specialist</h2>
              <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink-500">
                A 20-minute call, a written scope, and a fixed quote within two working days. No pressure, no retainer minimum discussion until you
                have seen the plan.
              </p>
              <div className="mt-6 space-y-3">
                <ButtonLink href="#enquire" size="md" className="w-full">
                  Request a quote
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi, I'd like to know more about ${service.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-ink-200 bg-white text-[0.95rem] font-semibold text-ink-800 transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  WhatsApp us
                </a>
              </div>

              <ul className="mt-7 space-y-2.5 border-t border-ink-200/70 pt-6 text-sm text-ink-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-aqua-500" /> Free audit before you commit
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-aqua-500" /> Flat pricing, no commission
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-aqua-500" /> You keep full account ownership
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Process */}
      {service.process.length > 0 ? (
        <section className="bg-ink-50 py-18 lg:py-22">
          <div className="container-x">
            <SectionHeading
              align="left"
              eyebrow="How it runs"
              title={<>Our delivery process for {service.title.toLowerCase()}</>}
              description="Every engagement follows the same four beats, so you always know which stage you are in."
            />
            <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, i) => (
                <Reveal key={step.title} order={i}>
                  <li className="h-full rounded-3xl border border-ink-100 bg-white p-7">
                    <span className="font-display text-sm font-extrabold tracking-[0.2em] text-brand-500">0{i + 1}</span>
                    <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-ink-900">{step.title}</h3>
                    <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-500">{step.detail}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* FAQs */}
      {service.faqs.length > 0 ? (
        <section className="bg-white py-18 lg:py-22">
          <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              align="left"
              eyebrow="FAQs"
              title={<>{service.title} — common questions</>}
              description="Straight answers to what clients ask us most about this service."
            />
            <FaqAccordion faqs={service.faqs} />
          </div>
        </section>
      ) : null}

      {/* Related */}
      {related.length > 0 ? (
        <section className="bg-ink-50 py-18 lg:py-22">
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
              <SectionHeading align="left" eyebrow="Pairs well with" title={<>More from {category?.name}</>} />
              <Link href="/services" className="shrink-0 text-sm font-semibold text-brand-700 hover:underline">
                View all services →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} compact />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Enquiry */}
      <section id="enquire" className="bg-white py-18 lg:py-22">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="Next step"
            title={<>Get a scoped quote for {service.title.toLowerCase()}</>}
            description="Tell us where you are today. We will send a written scope, a timeline and a fixed price — usually within two working days."
          />
          <div className="rounded-4xl border border-ink-100 bg-ink-50/60 p-6 shadow-card sm:p-9">
            <ContactForm
              services={allServices.map((s) => ({ slug: s.slug, title: s.title }))}
              defaultService={service.title}
              budgets={budgets}
            />
          </div>
        </div>
      </section>
    </>
  );
}
