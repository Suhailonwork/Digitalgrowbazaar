import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminForm, Field, FormCard, TextArea, Toggle } from "@/components/admin/form";
import { adminGetPost } from "@/lib/admin-data";
import { deletePost, savePost } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isNew = slug === "new";
  const post = isNew ? null : await adminGetPost(slug);
  if (!isNew && !post) notFound();

  return (
    <>
      <AdminPageHeader
        title={isNew ? "New article" : `Edit — ${post?.title}`}
        description={isNew ? "Published at /blog/your-slug and added to the sitemap." : `/blog/${post?.slug}`}
        actions={
          <Link
            href="/admin/posts"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700"
          >
            <ArrowLeft className="size-4" />
            All articles
          </Link>
        }
      />

      <div className="p-5 sm:p-8">
        <AdminForm action={savePost} submitLabel={isNew ? "Create article" : "Save article"}>
          <input type="hidden" name="original_slug" value={isNew ? "" : (post?.slug ?? "")} />

          <div className="grid gap-6 xl:grid-cols-2">
            <FormCard title="Article details">
              <Field label="Title" name="title" required defaultValue={post?.title} />
              <Field label="Slug" name="slug" required defaultValue={post?.slug} hint="Published at /blog/your-slug" />
              <TextArea label="Excerpt" name="excerpt" rows={3} defaultValue={post?.excerpt} hint="Shown on cards and used as the fallback meta description." />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Author" name="author" defaultValue={post?.author ?? "Digital Grow Bazaar"} />
                <Field label="Publish date" name="published_at" type="date" defaultValue={(post?.published_at ?? "").slice(0, 10)} />
              </div>
              <Field label="Tags" name="tags" defaultValue={(post?.tags ?? []).join(", ")} placeholder="Amazon, Marketplace SEO" hint="Comma separated." />
              <Field label="Cover image URL" name="cover_image" defaultValue={post?.cover_image} />
              <Toggle label="Published" name="is_published" defaultChecked={post?.is_published ?? true} />
            </FormCard>

            <FormCard title="Search engine settings">
              <Field label="SEO title" name="seo_title" defaultValue={post?.seo_title} />
              <TextArea label="Meta description" name="seo_description" rows={3} defaultValue={post?.seo_description} />
              <Field label="Keywords" name="seo_keywords" defaultValue={post?.seo_keywords} placeholder="comma, separated" />
            </FormCard>
          </div>

          <FormCard title="Content" description="HTML is rendered as-is. Use h2 and h3 headings so the article earns rich results.">
            <TextArea label="Body" name="body" rows={20} mono defaultValue={post?.body} />
          </FormCard>
        </AdminForm>

        {!isNew ? (
          <form action={deletePost} className="mt-8 rounded-2xl border border-ember-500/30 bg-ember-500/5 p-6">
            <input type="hidden" name="slug" value={post?.slug} />
            <h2 className="font-display text-base font-bold tracking-tight text-ink-900">Delete this article</h2>
            <p className="mt-1 text-sm text-ink-500">Any rankings and backlinks it has earned will be lost. This cannot be undone.</p>
            <button
              type="submit"
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-ember-500/40 bg-white px-4 text-sm font-semibold text-ember-600 hover:bg-ember-500 hover:text-white"
            >
              <Trash2 className="size-4" />
              Delete article
            </button>
          </form>
        ) : null}
      </div>
    </>
  );
}
