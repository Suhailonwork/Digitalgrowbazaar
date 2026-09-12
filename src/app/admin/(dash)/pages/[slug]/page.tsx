import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminForm, Field, FormCard, TextArea, Toggle } from "@/components/admin/form";
import { adminGetPage } from "@/lib/admin-data";
import { deletePage, savePage } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function EditPagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isNew = slug === "new";
  const page = isNew ? null : await adminGetPage(slug);
  if (!isNew && !page) notFound();

  return (
    <>
      <AdminPageHeader
        title={isNew ? "New page" : `Edit — ${page?.title}`}
        description={isNew ? "Published immediately at /your-slug and added to the sitemap." : `/${page?.slug}`}
        actions={
          <Link
            href="/admin/pages"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700"
          >
            <ArrowLeft className="size-4" />
            All pages
          </Link>
        }
      />

      <div className="p-5 sm:p-8">
        <AdminForm action={savePage} submitLabel={isNew ? "Create page" : "Save page"}>
          <input type="hidden" name="original_slug" value={isNew ? "" : (page?.slug ?? "")} />

          <div className="grid gap-6 xl:grid-cols-2">
            <FormCard title="Page details">
              <Field label="Title" name="title" required defaultValue={page?.title} />
              <Field label="Slug" name="slug" required defaultValue={page?.slug} placeholder="privacy-policy" hint="Published at /your-slug" />
              <TextArea label="Subtitle" name="subtitle" rows={2} defaultValue={page?.subtitle} hint="Shown under the heading in the page hero." />
              <Toggle label="Published" name="is_published" defaultChecked={page?.is_published ?? true} />
            </FormCard>

            <FormCard title="Search engine settings">
              <Field label="SEO title" name="seo_title" defaultValue={page?.seo_title} />
              <TextArea label="Meta description" name="seo_description" rows={3} defaultValue={page?.seo_description} />
              <Field label="Keywords" name="seo_keywords" defaultValue={page?.seo_keywords} placeholder="comma, separated" />
              <Field label="Open Graph image URL" name="og_image" defaultValue={page?.og_image} />
            </FormCard>
          </div>

          <FormCard title="Content" description="HTML is rendered as-is. Use h2, h3, p, ul, ol, blockquote and strong.">
            <TextArea label="Body" name="body" rows={18} mono defaultValue={page?.body} />
          </FormCard>
        </AdminForm>

        {!isNew ? (
          <form action={deletePage} className="mt-8 rounded-2xl border border-ember-500/30 bg-ember-500/5 p-6">
            <input type="hidden" name="slug" value={page?.slug} />
            <h2 className="font-display text-base font-bold tracking-tight text-ink-900">Delete this page</h2>
            <p className="mt-1 text-sm text-ink-500">The URL will start returning a 404. This cannot be undone.</p>
            <button
              type="submit"
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-ember-500/40 bg-white px-4 text-sm font-semibold text-ember-600 hover:bg-ember-500 hover:text-white"
            >
              <Trash2 className="size-4" />
              Delete page
            </button>
          </form>
        ) : null}
      </div>
    </>
  );
}
