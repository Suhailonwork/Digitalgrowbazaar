import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminForm, Field, FormCard, Select, TextArea, Toggle } from "@/components/admin/form";
import { adminGetService, adminListCategories } from "@/lib/admin-data";
import { deleteService, saveService } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const ICONS = [
  "Globe", "ShoppingCart", "ShoppingBag", "LayoutPanelTop", "Smartphone", "Palette", "Wrench", "Search", "Share2",
  "Target", "Megaphone", "PenLine", "Mail", "Video", "Camera", "Clapperboard", "Sparkles", "Package", "Store",
  "ListChecks", "BarChart3", "ShieldCheck", "GraduationCap", "Presentation", "Users", "Code2", "TrendingUp",
];

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isNew = slug === "new";
  const [service, categories] = await Promise.all([isNew ? null : adminGetService(slug), adminListCategories()]);

  if (!isNew && !service) notFound();

  const categoryOptions = categories.length
    ? categories.map((c) => ({ value: c.slug, label: c.name }))
    : [
        { value: "web", label: "Web & Product" },
        { value: "marketing", label: "Digital Marketing" },
        { value: "creative", label: "Creative Studio" },
        { value: "ecommerce", label: "E-commerce Operations" },
        { value: "training", label: "Training & Consulting" },
      ];

  const pipeJoin = (rows: { [k: string]: string }[] | undefined, a: string, b: string) =>
    (rows ?? []).map((r) => `${r[a]} | ${r[b]}`).join("\n");

  return (
    <>
      <AdminPageHeader
        title={isNew ? "New service" : `Edit — ${service?.title}`}
        description={isNew ? "Adding a service publishes it to the mega menu, services index and sitemap." : `/services/${service?.slug}`}
        actions={
          <>
            {!isNew ? (
              <a
                href={`/services/${service?.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-700"
              >
                View page <ExternalLink className="size-3.5" />
              </a>
            ) : null}
            <Link
              href="/admin/services"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700"
            >
              <ArrowLeft className="size-4" />
              All services
            </Link>
          </>
        }
      />

      <div className="p-5 sm:p-8">
        <AdminForm action={saveService} submitLabel={isNew ? "Create service" : "Save service"}>
          <input type="hidden" name="original_slug" value={isNew ? "" : (service?.slug ?? "")} />

          <div className="grid gap-6 xl:grid-cols-2">
            <FormCard title="Basics" description="Shown on cards, in the mega menu and at the top of the page.">
              <Field label="Title" name="title" required defaultValue={service?.title} placeholder="Website Design & Development" />
              <Field
                label="Slug"
                name="slug"
                required
                defaultValue={service?.slug}
                placeholder="website-development"
                hint="The URL becomes /services/your-slug. Changing it breaks existing links."
              />
              <Field label="Menu label" name="menu_label" defaultValue={service?.menu_label} hint="Shorter label used inside the mega menu." />
              <TextArea label="Excerpt" name="excerpt" rows={2} defaultValue={service?.excerpt} hint="One line, used on cards and in search results." />
              <div className="grid gap-4 sm:grid-cols-2">
                <Select label="Category" name="category_slug" options={categoryOptions} defaultValue={service?.category_slug ?? "web"} />
                <Select
                  label="Icon"
                  name="icon"
                  options={ICONS.map((i) => ({ value: i, label: i }))}
                  defaultValue={service?.icon ?? "Sparkles"}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Price from" name="price_from" defaultValue={service?.price_from} placeholder="24,999" hint="Rupee sign is added automatically." />
                <Field label="Order" name="order_index" type="number" defaultValue={service?.order_index ?? 99} hint="Lower numbers appear first." />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Toggle label="Published" name="is_published" defaultChecked={service?.is_published ?? true} hint="Unpublished services are hidden everywhere." />
                <Toggle label="Featured" name="is_featured" defaultChecked={service?.is_featured ?? false} hint="Featured services appear on the homepage." />
              </div>
            </FormCard>

            <div className="space-y-6">
              <FormCard title="Page content" description="HTML is rendered as-is. Use h2, h3, p, ul and strong.">
                <TextArea
                  label="Body"
                  name="body"
                  rows={12}
                  mono
                  defaultValue={service?.body}
                  placeholder={"<p>Opening paragraph…</p>\n<h2>A section heading</h2>\n<p>More detail…</p>"}
                />
              </FormCard>

              <FormCard title="Search engine settings" description="Leave blank to use the title and excerpt above.">
                <Field label="SEO title" name="seo_title" defaultValue={service?.seo_title} hint="Aim for under 60 characters." />
                <TextArea label="Meta description" name="seo_description" rows={3} defaultValue={service?.seo_description} hint="Aim for 120–158 characters." />
                <Field label="Keywords" name="seo_keywords" defaultValue={service?.seo_keywords} placeholder="comma, separated" />
                <Field label="Open Graph image URL" name="og_image" defaultValue={service?.og_image} placeholder="https://…" />
              </FormCard>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <FormCard title="Features" description="One per line. Shown as the 'What is included' checklist.">
              <TextArea label="Feature list" name="features" rows={7} defaultValue={(service?.features ?? []).join("\n")} mono />
            </FormCard>

            <FormCard title="Outcomes" description="One per line, in the format: value | label">
              <TextArea
                label="Outcome stats"
                name="outcomes"
                rows={4}
                mono
                defaultValue={pipeJoin(service?.outcomes as unknown as { [k: string]: string }[], "value", "label")}
                placeholder={"1.4s | Median load time\n2.7x | Lift in form fills"}
              />
            </FormCard>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <FormCard title="Process steps" description="One per line, in the format: step title | description">
              <TextArea
                label="Process"
                name="process"
                rows={6}
                mono
                defaultValue={pipeJoin(service?.process as unknown as { [k: string]: string }[], "title", "detail")}
                placeholder={"Discovery | We map your buyers and goals\nDesign | Wireframes then UI"}
              />
            </FormCard>

            <FormCard title="FAQs" description="One per line, in the format: question | answer. These also generate FAQ schema.">
              <TextArea
                label="FAQs"
                name="faqs"
                rows={6}
                mono
                defaultValue={pipeJoin(service?.faqs as unknown as { [k: string]: string }[], "q", "a")}
                placeholder={"How long does it take? | Around 12-18 working days."}
              />
            </FormCard>
          </div>
        </AdminForm>

        {!isNew ? (
          <form action={deleteService} className="mt-8 rounded-2xl border border-ember-500/30 bg-ember-500/5 p-6">
            <input type="hidden" name="slug" value={service?.slug} />
            <h2 className="font-display text-base font-bold tracking-tight text-ink-900">Delete this service</h2>
            <p className="mt-1 text-sm text-ink-500">It disappears from the menu, the sitemap and search results. This cannot be undone.</p>
            <button
              type="submit"
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-ember-500/40 bg-white px-4 text-sm font-semibold text-ember-600 hover:bg-ember-500 hover:text-white"
            >
              <Trash2 className="size-4" />
              Delete service
            </button>
          </form>
        ) : null}
      </div>
    </>
  );
}
