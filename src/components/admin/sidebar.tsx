"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BarChart3, ExternalLink, FileText, Globe, Inbox, LayoutGrid, LogOut, Menu, Newspaper, PanelTop, Search, Settings, TextQuote, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { signOut } from "@/app/admin/actions";

const nav = [
  { label: "Dashboard", href: "/admin", icon: BarChart3, exact: true },
  { label: "Enquiries", href: "/admin/inquiries", icon: Inbox },
  { label: "SEO manager", href: "/admin/seo", icon: Search },
  { label: "Menu builder", href: "/admin/menu", icon: PanelTop },
  { label: "Page content", href: "/admin/content", icon: TextQuote },
  { label: "Services", href: "/admin/services", icon: LayoutGrid },
  { label: "Pages", href: "/admin/pages", icon: FileText },
  { label: "Articles", href: "/admin/posts", icon: Newspaper },
  { label: "Site settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ email, newCount }: { email: string; newCount: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));

  const list = (
    <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive(item.href, item.exact) ? "bg-brand-600 text-white" : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
          }`}
        >
          <item.icon className="size-4.5 shrink-0" strokeWidth={1.75} />
          <span className="flex-1">{item.label}</span>
          {item.href === "/admin/inquiries" && newCount > 0 ? (
            <span
              className={`rounded-full px-2 py-0.5 text-[0.7rem] font-bold ${
                isActive(item.href) ? "bg-white/20 text-white" : "bg-ember-500 text-white"
              }`}
            >
              {newCount}
            </span>
          ) : null}
        </Link>
      ))}
    </nav>
  );

  const footer = (
    <div className="border-t border-ink-200 p-3">
      <Link
        href="/"
        target="_blank"
        className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-100"
      >
        <Globe className="size-4.5" strokeWidth={1.75} />
        View website
        <ExternalLink className="ml-auto size-3.5 text-ink-300" />
      </Link>
      <div className="rounded-lg bg-ink-50 px-3 py-2.5">
        <p className="truncate text-xs text-ink-400">Signed in as</p>
        <p className="truncate text-sm font-medium text-ink-800">{email}</p>
      </div>
      <form action={signOut}>
        <button
          type="submit"
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-ember-500/10 hover:text-ember-600"
        >
          <LogOut className="size-4.5" strokeWidth={1.75} />
          Sign out
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* Mobile bar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-ink-200 bg-white px-4 lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-ink-200"
          aria-label="Open admin menu"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-ink-200 px-4">
              <Logo />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-lg p-2">
                <X className="size-5" />
              </button>
            </div>
            {list}
            {footer}
          </div>
        </div>
      ) : null}

      {/* Desktop rail */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-ink-200 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-ink-200 px-5">
          <Logo />
        </div>
        {list}
        {footer}
      </aside>
    </>
  );
}
