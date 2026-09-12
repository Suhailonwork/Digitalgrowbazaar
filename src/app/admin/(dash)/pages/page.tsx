import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { adminListPages } from "@/lib/admin-data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  const pages = await adminListPages();

  return (
    <>
      <AdminPageHeader
        title="Pages"
        description="Standalone pages published at /your-slug — policies, landing pages, anything outside the fixed navigation."
        actions={
          <Link
            href="/admin/pages/new"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plus className="size-4" />
            New page
          </Link>
        }
      />

      <div className="p-5 sm:p-8">
        {pages.length === 0 ? (
          <div className="rounded-2xl border border-ink-200 bg-white px-6 py-14 text-center">
            <p className="text-sm text-ink-500">
              No pages in the database. The site is serving its built-in privacy, terms and refund pages — use{" "}
              <span className="font-medium text-ink-700">Import starter content</span> on the dashboard to make them editable here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[44rem] text-left text-sm">
                <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Title</th>
                    <th className="px-5 py-3 font-semibold">URL</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Updated</th>
                    <th className="px-5 py-3 font-semibold" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {pages.map((p) => (
                    <tr key={p.slug} className="transition-colors hover:bg-ink-50">
                      <td className="px-5 py-3.5">
                        <Link href={`/admin/pages/${p.slug}`} className="font-medium text-ink-900 hover:text-brand-700">
                          {p.title}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5">
                        <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs text-ink-500">/{p.slug}</code>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase ring-1 ring-inset ${
                            p.is_published ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-ink-100 text-ink-500 ring-ink-200"
                          }`}
                        >
                          {p.is_published ? "Live" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-ink-400">{formatDate(p.updated_at)}</td>
                      <td className="px-5 py-3.5 text-right">
                        <a
                          href={`/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-ink-400 hover:text-brand-700"
                        >
                          View <ExternalLink className="size-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
