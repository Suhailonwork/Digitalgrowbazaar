import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { SectionHeading } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { getBlock, getServices, getSiteSettings } from "@/lib/data";
import type { FAQ } from "@/lib/types";
import { CustomJsonLd, JsonLd, breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;


export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: "/contact",
    title: "Contact Us | Digital Grow Bazaar, Noida",
    description:
      "Talk to Digital Grow Bazaar about web development, digital marketing, videography, photoshoots, e-commerce training or Amazon, Flipkart and Meesho account management. Free audit, reply within one working day.",
    keywords: "contact digital marketing agency noida, ecommerce agency contact, website development enquiry, amazon account management contact",
  });
}

export default async function ContactPage() {
  const [services, settings, contactFaqs] = await Promise.all([
    getServices(),
    getSiteSettings(),
    getBlock<FAQ[]>("contact.faqs"),
  ]);
  const budgets = await getBlock<string[]>("contact.budgets");

  const channels = [
    { icon: Phone, label: "Call us", value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}`, note: siteConfig.hours },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat instantly", href: `https://wa.me/${settings.whatsapp}`, note: "Fastest response" },
    { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}`, note: "Replies within a day" },
    { icon: MapPin, label: "Visit", value: settings.address, href: `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`, note: "Office & studio" },
  ];

  return (
    <>
      <CustomJsonLd path="/contact" />
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]), faqJsonLd(contactFaqs)]} />

      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s talk about what you are trying to grow</>}
        description="Send us your website, ad account or seller panel and we will come back with a written audit and a plan. Free, and yours to keep either way."
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
      />

      <section className="border-b border-ink-100 bg-white py-14">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="card-hover group rounded-3xl border border-ink-100 bg-white p-6 hover:border-brand-200"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <c.icon className="size-5" strokeWidth={1.75} />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-ink-400">{c.label}</p>
              <p className="mt-1.5 font-display text-[1.02rem] font-bold leading-snug text-ink-900">{c.value}</p>
              <p className="mt-1 text-xs text-ink-400">{c.note}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-white py-18 lg:py-22">
        <div className="container-x grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Enquiry form"
              title={<>Tell us about your business</>}
              description="The more context you give us, the more specific the audit we can send back. Every field except the starred ones is optional."
            />
            <div className="mt-9 rounded-4xl border border-ink-100 bg-ink-50/60 p-6 shadow-card sm:p-9">
              <ContactForm services={services.map((s) => ({ slug: s.slug, title: s.title }))} budgets={budgets} />
            </div>
          </div>

          <div className="space-y-8">
            <div className="overflow-hidden rounded-4xl border border-ink-100 shadow-card">
              <iframe
                title={`${settings.brand_name} office location map`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-4xl border border-ink-100 bg-white p-7">
              <h2 className="font-display text-lg font-bold tracking-tight text-ink-900">Office hours</h2>
              <ul className="mt-4 space-y-2.5 text-[0.94rem] text-ink-600">
                <li className="flex items-center justify-between gap-4 border-b border-ink-100 pb-2.5">
                  <span className="flex items-center gap-2">
                    <Clock className="size-4 text-brand-500" /> Monday – Friday
                  </span>
                  <span className="font-medium text-ink-900">10:00 – 19:00</span>
                </li>
                <li className="flex items-center justify-between gap-4 border-b border-ink-100 pb-2.5">
                  <span className="flex items-center gap-2">
                    <Clock className="size-4 text-brand-500" /> Saturday
                  </span>
                  <span className="font-medium text-ink-900">10:00 – 16:00</span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2">
                    <Clock className="size-4 text-ink-300" /> Sunday
                  </span>
                  <span className="font-medium text-ink-400">Closed</span>
                </li>
              </ul>
              <p className="mt-5 text-sm text-ink-500">
                Marketplace emergencies — suspensions, listing takedowns during a sale — are covered outside these hours for retainer clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-18 lg:py-22">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading align="left" eyebrow="Before you write" title={<>Quick answers</>} />
          <FaqAccordion faqs={contactFaqs} />
        </div>
      </section>
    </>
  );
}
