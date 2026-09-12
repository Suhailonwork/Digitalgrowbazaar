import Link from "next/link";
import { Download, Search } from "lucide-react";
import { AdminPageHeader, StatusPill } from "@/components/admin/page-header";
import { adminInquiryCounts, adminListInquiries } from "@/lib/admin-data";
import { formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";

const filters = ["all", "new", "contacted", "qualified", "won", "lost"] as const;

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const { status = "all", q = "" } = await searchParams;
  const [inquiries, counts] = await Promise.all([adminListInquiries({ status, q }), adminInquiryCounts()]);

  return (
    <>
      <AdminPageHeader
        title="Enquiries"
        description="Every submission from the website contact forms, newest first."
        actions={
          // eslint-disable-next-line @next/next/no-html-link-for-pages -- Route Handler download, must be a full request
          <a
            href="/admin/inquiries/export"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            <Download className="size-4" />
            Export CSV
          </a>
        }
      />

      <div className="space-y-5 p-5 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const count = f === "all" ? counts.total : counts[f];
              const active = status === f;
              return (
                <Link
                  key={f}
                  href={`/admin/inquiries${f === "all" ? "" : `?status=${f}`}`}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium capitalize transition-colors ${
                    active ? "bg-brand-600 text-white" : "border border-ink-200 bg-white text-ink-600 hover:border-brand-300"
                  }`}
                >
                  {f}
                  <span className={`rounded-full px-1.5 text-[0.7rem] font-bold ${active ? "bg-white/20" : "bg-ink-100 text-ink-500"}`}>{count}</span>
                </Link>
              );
            })}
          </div>

          <form className="relative w-full lg:w-72">
            <input type="hidden" name="status" value={status} />
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-300" />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search name, email, phone…"
              className="w-full rounded-lg border border-ink-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
            />
          </form>
        </div>

        <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
          {inquiries.length === 0 ? (
            <p className="px-5 py-16 text-center text-sm text-ink-400">
              {q || status !== "all" ? "No enquiries match this filter." : "No enquiries yet. They will appear here as soon as someone submits a form."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[52rem] text-left text-sm">
                <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Contact</th>
                    <th className="px-5 py-3 font-semibold">Service</th>
                    <th className="px-5 py-3 font-semibold">Budget</th>
                    <th className="px-5 py-3 font-semibold">Source</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="transition-colors hover:bg-ink-50">
                      <td className="px-5 py-4">
                        <Link href={`/admin/inquiries/${inq.id}`} className="block">
                          <span className="block font-semibold text-ink-900 hover:text-brand-700">{inq.name}</span>
                          <span className="block text-xs text-ink-400">{inq.email}</span>
                          <span className="block text-xs text-ink-400">{inq.phone}</span>
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-ink-600">{inq.service || "—"}</td>
                      <td className="px-5 py-4 text-ink-600">{inq.budget || "—"}</td>
                      <td className="px-5 py-4">
                        <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs text-ink-500">{inq.source_path || "/"}</code>
                      </td>
                      <td className="px-5 py-4">
                        <StatusPill status={inq.status} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-ink-400">{formatDateTime(inq.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
