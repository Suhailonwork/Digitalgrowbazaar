"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import type { MenuItem, Service, ServiceCategory, SiteSettings } from "@/lib/types";

export type MenuGroup = { category: ServiceCategory; services: Service[] };

export function Header({ groups, settings, navItems }: { groups: MenuGroup[]; settings: SiteSettings; navItems: MenuItem[] }) {
  const primaryNav = navItems.map((item) => ({
    label: item.label,
    href: item.href,
    mega: item.has_mega,
    badge: item.badge,
    external: item.open_in_new_tab,
  }));
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // The drawer duplicates the whole service catalogue; only build it once the
  // user actually opens it. The desktop mega menu keeps those links crawlable.
  const [drawerReady, setDrawerReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close both menus when the route changes (adjusting state during render, which
  // React prefers over an effect for derived resets).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  // Small grace period so the pointer can travel from trigger to panel.
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || megaOpen ? "border-b border-ink-100 bg-white/90 backdrop-blur-xl" : "border-b border-transparent bg-white/70 backdrop-blur-sm"
        }`}
      >
        {/* Utility strip */}
        <div className="hidden bg-ink-950 text-ink-300 lg:block">
          <div className="container-x flex h-9 items-center justify-between text-[0.8rem]">
            <p className="flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-aqua-400" />
              {settings.header_notice}
            </p>
            <div className="flex items-center gap-5">
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                {settings.phone}
              </a>
              <span className="text-ink-700">|</span>
              <a href={`mailto:${settings.email}`} className="transition-colors hover:text-white">
                {settings.email}
              </a>
            </div>
          </div>
        </div>

        <nav className="container-x flex h-[68px] items-center justify-between gap-4" aria-label="Primary">
          {/* The wordmark is the only part allowed to shrink, so a long CMS-set CTA
              label can never push the menu button past the right edge. */}
          <Link href="/" className="min-w-0 shrink" aria-label={`${settings.brand_name} home`}>
            <Logo />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={item.mega ? openMega : scheduleClose}
                onMouseLeave={item.mega ? scheduleClose : undefined}
              >
                {item.mega ? (
                  <button
                    type="button"
                    onClick={() => setMegaOpen((v) => !v)}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${
                      isActive(item.href) || megaOpen ? "text-brand-700" : "text-ink-700 hover:text-brand-700"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`size-4 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${
                      isActive(item.href) ? "text-brand-700" : "text-ink-700 hover:text-brand-700"
                    }`}
                  >
                    {item.label}
                    {item.badge ? (
                      <span className="rounded-full bg-ember-500 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase leading-none text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700 sm:inline-flex lg:hidden xl:inline-flex"
              aria-label="Call us"
            >
              <Phone className="size-4.5" strokeWidth={1.75} />
            </a>
            <ButtonLink href={settings.header_cta_href || "/contact"} size="md" className="hidden sm:inline-flex">
              {settings.header_cta_label || "Free growth audit"}
              <ArrowRight className="size-4 shrink-0" />
            </ButtonLink>
            <button
              type="button"
              onClick={() => {
                setDrawerReady(true);
                setMobileOpen(true);
              }}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-800 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>

        {/* ------------------------------- Mega menu ------------------------------ */}
        <div
          onMouseEnter={openMega}
          onMouseLeave={scheduleClose}
          className={`absolute inset-x-0 top-full origin-top border-b border-ink-100 bg-white shadow-[0_30px_60px_-30px_rgba(20,24,48,0.35)] transition-all duration-300 ${
            megaOpen ? "pointer-events-auto visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-2 opacity-0"
          } hidden lg:block`}
        >
          <div className="container-x py-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-9 xl:grid-cols-5">
              {groups.map((group) => (
                <div key={group.category.slug}>
                  <Link
                    href={`/services#${group.category.slug}`}
                    className="group mb-4 flex items-start gap-3 border-b border-ink-100 pb-3"
                  >
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-500 to-aqua-500 text-white">
                      <Icon name={group.category.icon} className="size-4.5" />
                    </span>
                    <span>
                      <span className="block font-display text-[0.95rem] font-bold text-ink-900 transition-colors group-hover:text-brand-700">
                        {group.category.name}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-ink-400">{group.category.blurb}</span>
                    </span>
                  </Link>
                  <ul className="space-y-0.5">
                    {group.services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex items-center justify-between gap-2 rounded-lg px-2 py-[7px] text-[0.875rem] text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                        >
                          <span className="leading-snug">{service.menu_label}</span>
                          <ArrowRight className="size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink-50 px-6 py-5">
              <div>
                <p className="font-display text-[1.05rem] font-bold text-ink-900">{settings.menu_promo_title}</p>
                <p className="mt-1 text-sm text-ink-500">{settings.menu_promo_text}</p>
              </div>
              <div className="flex items-center gap-3">
                <ButtonLink href="/services" variant="outline" size="sm">
                  All services
                </ButtonLink>
                <ButtonLink href={settings.menu_promo_cta_href || "/contact"} size="sm">
                  {settings.menu_promo_cta_label || "Book a free audit"}
                  <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --------------------------- Mobile drawer -----------------------------
          Deliberately a sibling of <header>: the bar carries a backdrop-filter,
          which makes it the containing block for fixed descendants and would
          otherwise clip this drawer to the 68px strip. */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-ink-950/50 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[min(24rem,90vw)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-ink-100 px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-ink-200 text-ink-700"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
            <ul className="space-y-1">
              {primaryNav
                .filter((i) => !i.mega)
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-[0.98rem] font-medium ${
                        isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-ink-800"
                      }`}
                    >
                      {item.label}
                      {item.badge ? (
                        <span className="rounded-full bg-ember-500 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase leading-none text-white">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
            </ul>

            <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Services</p>
            <div className="mt-2 space-y-1">
              {drawerReady ? groups.map((group) => <MobileGroup key={group.category.slug} group={group} />) : null}
            </div>
          </div>

          <div className="shrink-0 space-y-3 border-t border-ink-100 p-5">
            <ButtonLink href={settings.header_cta_href || "/contact"} size="md" className="w-full">
              {settings.header_cta_label || "Book a free growth audit"}
              <ArrowRight className="size-4" />
            </ButtonLink>
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 text-sm font-medium text-ink-600"
            >
              <Phone className="size-4" /> {settings.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileGroup({ group }: { group: MenuGroup }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-ink-100">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-3 py-3 text-left"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-linear-to-br from-brand-500 to-aqua-500 text-white">
          <Icon name={group.category.icon} className="size-4" />
        </span>
        <span className="flex-1 text-[0.92rem] font-semibold text-ink-900">{group.category.name}</span>
        <ChevronDown className={`size-4 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <ul className="overflow-hidden">
          {group.services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="block border-t border-ink-100 px-3 py-2.5 pl-14 text-sm text-ink-600">
                {service.menu_label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
