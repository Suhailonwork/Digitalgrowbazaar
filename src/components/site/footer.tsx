import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { getMegaMenu, getSiteSettings } from "@/lib/data";
import { Logo } from "@/components/site/logo";
import { siteConfig } from "@/lib/site";

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Our work", href: "/work" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Admin panel", href: "/admin" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const socialLinks = [
  { label: "Instagram", href: siteConfig.socials.instagram },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "YouTube", href: siteConfig.socials.youtube },
  { label: "Facebook", href: siteConfig.socials.facebook },
];

export async function SiteFooter() {
  const [groups, settings] = await Promise.all([getMegaMenu(), getSiteSettings()]);
  const year = new Date().getFullYear();

  // Two balanced columns of services in the footer, whatever the catalogue size.
  const columns = groups.slice(0, 4);

  return (
    <footer className="surface-dark relative overflow-hidden text-ink-300">
      <div className="grid-lines pointer-events-none absolute inset-0 text-white/40 opacity-30" aria-hidden />

      <div className="container-x relative">
        {/* CTA band */}
        <div className="border-b border-white/10 py-14 lg:py-16">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-bold leading-tight text-white text-balance sm:text-4xl">
                Let&apos;s find the growth you are leaving on the table.
              </h2>
              <p className="mt-3 text-ink-300">
                Share your website, ad account or seller panel. In 48 hours you get a written audit with the three things worth fixing first — no
                obligation, no sales deck.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-white px-7 font-semibold text-ink-950 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get my free audit
                <ArrowUpRight className="size-4.5" />
              </Link>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="inline-flex h-13 items-center gap-2 rounded-full px-6 font-semibold text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10"
              >
                <Phone className="size-4.5" />
                {settings.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-400">
              {settings.tagline} We build the websites, run the campaigns, shoot the content and manage the marketplace accounts that Indian brands
              grow on.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-aqua-400" />
                <span className="text-ink-300">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-aqua-400" />
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-ink-300 transition-colors hover:text-white">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-aqua-400" />
                <a href={`mailto:${settings.email}`} className="text-ink-300 transition-colors hover:text-white">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          {columns.map((group) => (
            <div key={group.category.slug} className="lg:col-span-2">
              <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">{group.category.name}</p>
              <ul className="mt-4 space-y-2.5">
                {group.services.slice(0, 6).map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="text-sm text-ink-400 transition-colors hover:text-white">
                      {service.menu_label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-ink-400 transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.brand_name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-ink-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
