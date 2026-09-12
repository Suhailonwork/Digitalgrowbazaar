import Link from "next/link";
import { ArrowRight, Inbox, Search, TrendingUp, Users } from "lucide-react";
import { AdminPageHeader, StatusPill } from "@/components/admin/page-header";
import { adminInquiryCounts, adminListInquiries, adminListSeo, adminListServices } from "@/lib/admin-data";
import { ImportSeedButton } from "@/components/admin/import-button";
import { relativeTime } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [counts, recent, services, seo] = await Promise.all([
    adminInquiryCounts(),
    adminListInquiries({ limit: 8 }),
    adminListServices(),
    adminListSeo(),
  ]);

  const cards = [
    { label: "Total enquiries", value: counts.total, icon: Inbox, href: "/admin/inquiries" },
    { label: "New / untouched", value: counts.new, icon: Users, href: "/admin/inquiries?status=new", accent: true },
    { label: "Won", value: counts.won, icon: TrendingUp, href: "/admin/inquiries?status=won" },
    { label: "SEO overrides", value: seo.length, icon: Search, href: "/admin/seo" },
  ];

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Everything happening across the site at a glance." />

      <div className="space-y-6 p-5 sm:p-8">
        {services.length === 0 ? (
          <section className="rounded-2xl border border-brand-200 bg-brand-50/60 p-6">
            <h2 className="font-display text-base font-bold tracking-tight text-ink-900">Finish setting up</h2>
            <p className="mt-1 max-w-2xl text-sm text-ink-600">
              Your database is connected but empty, so the public site is still rendering its built-in catalogue. Import it once and everything
              becomes editable from here — 25 services, five categories, testimonials, case studies, articles and policy pages.
            </p>
            <div className="mt-4">
              <ImportSeedButton />
            </div>
          </section>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className={`group rounded-2xl border bg-white p-5 transition-colors hover:border-brand-300 ${
                card.accent && card.value > 0 ? "border-ember-400/50" : "border-ink-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <card.icon className="size-5" strokeWidth={1.75} />
                </span>
                <ArrowRight className="size-4 text-ink-300 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900">{card.value}</p>
              <p className="mt-0.5 text-sm text-ink-500">{card.label}</p>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <section className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
            <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
              <h2 className="font-display text-base font-bold tracking-tight text-ink-900">Latest enquiries</h2>
              <Link href="/admin/inquiries" className="text-sm font-semibold text-brand-700 hover:underline">
                View all
              </Link>
            </div>

            {recent.length === 0 ? (
              <p className="px-5 py-12 text-center text-sm text-ink-400">
                No enquiries yet. Submissions from the website contact forms land here automatically.
              </p>
            ) : (
              <ul className="divide-y divide-ink-100">
                {recent.map((inq) => (
                  <li key={inq.id}>
                    <Link href={`/admin/inquiries/${inq.id}`} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-ink-50">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-500 to-aqua-500 font-display text-sm font-bold text-white">
                        {inq.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="truncate text-sm font-semibold text-ink-900">{inq.name}</span>
                          <StatusPill status={inq.status} />
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-ink-400">
                          {inq.service || "General enquiry"} · {inq.email}
                        </span>
                      </span>
                      <span className="hidden shrink-0 text-xs text-ink-400 sm:block">{relativeTime(inq.created_at)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="space-y-6">
            <div className="rounded-2xl border border-ink-200 bg-white p-5">
              <h2 className="font-display text-base font-bold tracking-tight text-ink-900">Pipeline</h2>
              <ul className="mt-4 space-y-3">
                {(["new", "contacted", "qualified", "won", "lost"] as const).map((s) => {
                  const pct = counts.total ? Math.round((counts[s] / counts.total) * 100) : 0;
                  return (
                    <li key={s}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize text-ink-600">{s}</span>
                        <span className="font-semibold text-ink-900">{counts[s]}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
                        <div className="h-full rounded-full bg-linear-to-r from-brand-500 to-aqua-500" style={{ width: `${pct}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white p-5">
              <h2 className="font-display text-base font-bold tracking-tight text-ink-900">Content</h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-ink-500">Services published</dt>
                  <dd className="font-semibold text-ink-900">{services.filter((s) => s.is_published).length}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-500">Services in draft</dt>
                  <dd className="font-semibold text-ink-900">{services.filter((s) => !s.is_published).length}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-500">Routes with SEO overrides</dt>
                  <dd className="font-semibold text-ink-900">{seo.length}</dd>
                </div>
              </dl>
              <Link href="/admin/seo" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline">
                Manage SEO <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
