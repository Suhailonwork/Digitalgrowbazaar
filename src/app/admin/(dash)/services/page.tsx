import Link from "next/link";
import { ExternalLink, Plus, Star } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { adminListCategories, adminListServices } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const [services, categories] = await Promise.all([adminListServices(), adminListCategories()]);
  const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      <AdminPageHeader
        title="Services"
        description="Everything here feeds the mega menu, the services index and each service page."
        actions={
          <Link
            href="/admin/services/new"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plus className="size-4" />
            New service
          </Link>
        }
      />

      <div className="p-5 sm:p-8">
        {services.length === 0 ? (
          <div className="rounded-2xl border border-ink-200 bg-white px-6 py-14 text-center">
            <p className="text-sm text-ink-500">
              No services in the database yet. Use <span className="font-medium text-ink-700">Import starter content</span> on the dashboard to
              load all 25, or add one manually.
            </p>
            <Link
              href="/admin/services/new"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white"
            >
              <Plus className="size-4" /> Add the first service
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[46rem] text-left text-sm">
                <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Service</th>
                    <th className="px-5 py-3 font-semibold">Category</th>
                    <th className="px-5 py-3 font-semibold">Order</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {services.map((s) => (
                    <tr key={s.slug} className="transition-colors hover:bg-ink-50">
                      <td className="px-5 py-3.5">
                        <Link href={`/admin/services/${s.slug}`} className="flex items-center gap-2 font-medium text-ink-900 hover:text-brand-700">
                          {s.title}
                          {s.is_featured ? <Star className="size-3.5 fill-ember-400 text-ember-400" aria-label="Featured" /> : null}
                        </Link>
                        <code className="mt-0.5 block text-xs text-ink-400">/services/{s.slug}</code>
                      </td>
                      <td className="px-5 py-3.5 text-ink-600">{categoryName(s.category_slug)}</td>
                      <td className="px-5 py-3.5 text-ink-500">{s.order_index}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase ring-1 ring-inset ${
                            s.is_published ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-ink-100 text-ink-500 ring-ink-200"
                          }`}
                        >
                          {s.is_published ? "Live" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <a
                          href={`/services/${s.slug}`}
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
