import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, Minus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { SeoForm } from "@/components/admin/seo-form";
import { adminListSeo, adminSeoTargets } from "@/lib/admin-data";
import { deleteSeo } from "@/app/admin/actions";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function SeoManagerPage({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const { path } = await searchParams;
  const [targets, overrides] = await Promise.all([adminSeoTargets(), adminListSeo()]);
  const byPath = new Map(overrides.map((o) => [o.path, o]));

  // Editing a single route.
  if (path) {
    const target = targets.find((t) => t.path === path);
    const existing = byPath.get(path) ?? null;

    return (
      <>
        <AdminPageHeader
          title={`SEO — ${target?.label ?? path}`}
          description={`Overrides the default metadata for ${path}`}
          actions={
            <>
              <a
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-700"
              >
                View page <ExternalLink className="size-3.5" />
              </a>
              <Link
                href="/admin/seo"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700"
              >
                <ArrowLeft className="size-4" />
                All routes
              </Link>
            </>
          }
        />

        <div className="space-y-6 p-5 sm:p-8">
          <SeoForm
            path={path}
            existing={existing}
            fallbackTitle={`${target?.label ?? "Page"} | ${siteConfig.name}`}
            fallbackDescription={siteConfig.description}
            siteUrl={siteConfig.url}
          />

          {existing ? (
            <form action={deleteSeo} className="rounded-2xl border border-ink-200 bg-white p-5">
              <input type="hidden" name="path" value={path} />
              <p className="text-sm font-medium text-ink-800">Remove this override</p>
              <p className="mt-1 text-sm text-ink-500">The page falls back to the metadata defined in its own template.</p>
              <button
                type="submit"
                className="mt-3 inline-flex h-10 items-center rounded-lg border border-ember-500/40 bg-white px-4 text-sm font-semibold text-ember-600 hover:bg-ember-500 hover:text-white"
              >
                Reset to default
              </button>
            </form>
          ) : null}
        </div>
      </>
    );
  }

  // Route list.
  return (
    <>
      <AdminPageHeader
        title="SEO manager"
        description="Override the title, description, keywords, social card, robots rules and structured data for any URL on the site."
      />

      <div className="p-5 sm:p-8">
        {/* Any route can be targeted, including ones not listed below. */}
        <form className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-ink-200 bg-white p-5">
          <label className="min-w-56 flex-1">
            <span className="mb-1.5 block text-sm font-medium text-ink-700">Edit any URL</span>
            <input
              name="path"
              required
              placeholder="/services/website-development"
              pattern="/.*"
              className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
            />
          </label>
          <button type="submit" className="inline-flex h-11 items-center rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700">
            Open editor
          </button>
          <p className="w-full text-xs text-ink-400 sm:w-auto sm:flex-1">
            Start with a slash. Useful for landing pages and campaign URLs that are not in the list.
          </p>
        </form>

        <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Page</th>
                  <th className="px-5 py-3 font-semibold">URL</th>
                  <th className="px-5 py-3 font-semibold">Custom SEO</th>
                  <th className="px-5 py-3 font-semibold">Indexing</th>
                  <th className="px-5 py-3 font-semibold">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {targets.map((t) => {
                  const o = byPath.get(t.path);
                  return (
                    <tr key={t.path} className="transition-colors hover:bg-ink-50">
                      <td className="px-5 py-3.5">
                        <Link href={`/admin/seo?path=${encodeURIComponent(t.path)}`} className="font-medium text-ink-900 hover:text-brand-700">
                          {t.label}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5">
                        <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs text-ink-500">{t.path}</code>
                      </td>
                      <td className="px-5 py-3.5">
                        {o ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                            <CheckCircle2 className="size-4" /> Set
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-ink-400">
                            <Minus className="size-4" /> Using default
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold ${o?.noindex ? "text-ember-600" : "text-ink-500"}`}>
                          {o?.noindex ? "noindex" : "indexable"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-ink-400">{o?.updated_at ? formatDate(o.updated_at) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-sm text-ink-400">
          Sitemap and robots.txt are generated automatically at{" "}
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 hover:underline">
            /sitemap.xml
          </a>{" "}
          and{" "}
          <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 hover:underline">
            /robots.txt
          </a>
          .
        </p>
      </div>
    </>
  );
}
