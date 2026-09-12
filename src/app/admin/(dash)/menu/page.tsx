import Link from "next/link";
import { ArrowDown, ArrowUp, ExternalLink, Eye, EyeOff, LayoutGrid, Trash2, TriangleAlert } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AddPanel, EditPanel } from "@/components/admin/menu-editors";
import { Icon } from "@/components/ui/icon";
import { adminListCategories, adminListMenuItems, adminListServices, adminServiceCountsByCategory } from "@/lib/admin-data";
import { deleteCategory, deleteMenuItem, moveCategory, moveMenuItem, moveService } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

function MoveButtons({ action, fields }: { action: (fd: FormData) => Promise<void>; fields: Record<string, string> }) {
  return (
    <span className="flex items-center gap-1">
      {(["up", "down"] as const).map((direction) => (
        <form key={direction} action={action}>
          {Object.entries(fields).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} />
          ))}
          <input type="hidden" name="direction" value={direction} />
          <button
            type="submit"
            aria-label={`Move ${direction}`}
            className="grid size-7 place-items-center rounded-md border border-ink-200 text-ink-400 transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            {direction === "up" ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />}
          </button>
        </form>
      ))}
    </span>
  );
}

export default async function MenuManagerPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const [navItems, categories, services, counts] = await Promise.all([
    adminListMenuItems(),
    adminListCategories(),
    adminListServices(),
    adminServiceCountsByCategory(),
  ]);

  return (
    <>
      <AdminPageHeader
        title="Menu builder"
        description="Add, edit, reorder and remove everything in the header — the top navigation and every column of the mega menu."
        actions={
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-700"
          >
            Preview site <ExternalLink className="size-3.5" />
          </a>
        }
      />

      <div className="space-y-8 p-5 sm:p-8">
        {error === "category-in-use" ? (
          <p className="flex items-start gap-3 rounded-lg border border-ember-500/30 bg-ember-500/8 px-4 py-3 text-sm text-ember-600">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" />
            That column still has services in it. Move those services to another column first, then delete it.
          </p>
        ) : null}

        {navItems.length === 0 && categories.length === 0 ? (
          <p className="rounded-2xl border border-ink-200 bg-white px-6 py-12 text-center text-sm text-ink-500">
            Nothing in the database yet — the header is running on built-in defaults. Use{" "}
            <span className="font-medium text-ink-700">Import starter content</span> on the dashboard, then come back here to customise it.
          </p>
        ) : null}

        {/* ------------------------------ Top navigation ----------------------- */}
        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight text-ink-900">Top navigation</h2>
              <p className="mt-1 text-sm text-ink-500">
                The links across the header. Tick <span className="font-medium">Opens mega menu</span> on the one that should reveal the services
                panel.
              </p>
            </div>
            <AddPanel kind="link" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
            {navItems.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-ink-400">No custom navigation links yet.</p>
            ) : (
              <ul className="divide-y divide-ink-100">
                {navItems.map((item) => (
                  <li key={item.id} className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                      <MoveButtons action={moveMenuItem} fields={{ id: item.id ?? "" }} />

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-ink-900">{item.label}</span>
                          {item.badge ? (
                            <span className="rounded-full bg-ember-500 px-2 py-0.5 text-[0.65rem] font-bold uppercase text-white">{item.badge}</span>
                          ) : null}
                          {item.has_mega ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[0.65rem] font-bold uppercase text-brand-700">
                              <LayoutGrid className="size-3" /> Mega
                            </span>
                          ) : null}
                          {item.open_in_new_tab ? (
                            <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[0.65rem] font-bold uppercase text-ink-500">New tab</span>
                          ) : null}
                        </span>
                        <code className="mt-0.5 block text-xs text-ink-400">{item.href}</code>
                      </span>

                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${item.is_published ? "text-emerald-600" : "text-ink-400"}`}>
                        {item.is_published ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                        {item.is_published ? "Visible" : "Hidden"}
                      </span>

                      <span className="flex items-center gap-3">
                        <EditPanel item={item} />
                        <form action={deleteMenuItem}>
                          <input type="hidden" name="id" value={item.id} />
                          <button
                            type="submit"
                            aria-label={`Delete ${item.label}`}
                            className="grid size-7 place-items-center rounded-md border border-ink-200 text-ink-400 transition-colors hover:border-ember-400 hover:text-ember-600"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </form>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ------------------------------ Mega menu ---------------------------- */}
        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight text-ink-900">Mega menu columns</h2>
              <p className="mt-1 text-sm text-ink-500">
                Each column is a service category. Reorder columns here and reorder the services inside them — the header, footer and services page
                all follow this order.
              </p>
            </div>
            <AddPanel kind="column" />
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {categories.map((category) => {
              const inColumn = services
                .filter((s) => s.category_slug === category.slug)
                .sort((a, b) => a.order_index - b.order_index);

              return (
                <div key={category.slug} className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-ink-100 bg-ink-50/60 px-5 py-4">
                    <MoveButtons action={moveCategory} fields={{ slug: category.slug }} />
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-500 to-aqua-500 text-white">
                      <Icon name={category.icon} className="size-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink-900">{category.name}</span>
                      <span className="mt-0.5 block truncate text-xs text-ink-400">{category.blurb || "No blurb set"}</span>
                    </span>
                    <span className="text-xs font-semibold text-ink-400">{counts[category.slug] ?? 0} services</span>
                    <span className="flex items-center gap-3">
                      <EditPanel category={category} />
                      <form action={deleteCategory}>
                        <input type="hidden" name="slug" value={category.slug} />
                        <button
                          type="submit"
                          aria-label={`Delete ${category.name}`}
                          className="grid size-7 place-items-center rounded-md border border-ink-200 text-ink-400 transition-colors hover:border-ember-400 hover:text-ember-600"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </form>
                    </span>
                  </div>

                  {inColumn.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-ink-400">
                      No services in this column yet.{" "}
                      <Link href="/admin/services/new" className="font-semibold text-brand-700 hover:underline">
                        Add one
                      </Link>
                      .
                    </p>
                  ) : (
                    <ul className="divide-y divide-ink-100">
                      {inColumn.map((service) => (
                        <li key={service.slug} className="flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-2.5">
                          <MoveButtons action={moveService} fields={{ slug: service.slug, category_slug: category.slug }} />
                          <Link href={`/admin/services/${service.slug}`} className="min-w-0 flex-1 truncate text-sm text-ink-700 hover:text-brand-700">
                            {service.menu_label || service.title}
                          </Link>
                          {!service.is_published ? (
                            <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[0.65rem] font-bold uppercase text-ink-500">Draft</span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <p className="text-sm text-ink-400">
          The promo card at the bottom of the mega menu, the notice bar above the header and the header button are all editable in{" "}
          <Link href="/admin/settings" className="font-semibold text-brand-700 hover:underline">
            Site settings
          </Link>
          .
        </p>
      </div>
    </>
  );
}
