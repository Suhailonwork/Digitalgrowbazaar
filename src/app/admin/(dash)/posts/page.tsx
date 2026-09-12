import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { adminListPosts } from "@/lib/admin-data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await adminListPosts();

  return (
    <>
      <AdminPageHeader
        title="Articles"
        description="Blog content at /blog — the main engine for long-tail organic traffic."
        actions={
          <Link
            href="/admin/posts/new"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plus className="size-4" />
            New article
          </Link>
        }
      />

      <div className="p-5 sm:p-8">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-ink-200 bg-white px-6 py-14 text-center">
            <p className="text-sm text-ink-500">
              No articles in the database yet. The blog is showing built-in seed articles until you add your own.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="px-5 py-3 font-semibold">Tags</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Published</th>
                  <th className="px-5 py-3 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {posts.map((p) => (
                  <tr key={p.slug} className="transition-colors hover:bg-ink-50">
                    <td className="px-5 py-3.5">
                      <Link href={`/admin/posts/${p.slug}`} className="font-medium text-ink-900 hover:text-brand-700">
                        {p.title}
                      </Link>
                      <code className="mt-0.5 block text-xs text-ink-400">/blog/{p.slug}</code>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-ink-500">{(p.tags ?? []).join(", ") || "—"}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase ring-1 ring-inset ${
                          p.is_published ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-ink-100 text-ink-500 ring-ink-200"
                        }`}
                      >
                        {p.is_published ? "Live" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-ink-400">{formatDate(p.published_at)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <a
                        href={`/blog/${p.slug}`}
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
        )}
      </div>
    </>
  );
}
