"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2, Plus, TriangleAlert, X } from "lucide-react";
import { saveCategory, saveMenuItem } from "@/app/admin/actions";
import { idleState } from "@/lib/form-state";
import type { MenuItem, ServiceCategory } from "@/lib/types";

const control =
  "w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10";

const ICONS = [
  "Code2", "TrendingUp", "Clapperboard", "Store", "GraduationCap", "Globe", "ShoppingCart", "ShoppingBag",
  "LayoutPanelTop", "Smartphone", "Palette", "Wrench", "Search", "Share2", "Target", "Megaphone", "PenLine",
  "Mail", "Video", "Camera", "Sparkles", "Package", "ListChecks", "BarChart3", "ShieldCheck", "Presentation", "Users",
];

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? "Saving…" : label}
    </button>
  );
}

function Banner({ status, message }: { status: string; message: string }) {
  if (status === "idle" || !message) return null;
  return (
    <p
      role="status"
      className={`flex items-start gap-2 rounded-lg border px-3.5 py-2.5 text-sm ${
        status === "success" ? "border-aqua-500/30 bg-aqua-500/8 text-aqua-600" : "border-ember-500/30 bg-ember-500/8 text-ember-600"
      }`}
    >
      {status === "success" ? <CheckCircle2 className="mt-0.5 size-4 shrink-0" /> : <TriangleAlert className="mt-0.5 size-4 shrink-0" />}
      {message}
    </p>
  );
}

/* --------------------------------------------------------- navigation link */

export function MenuItemForm({ item, onDone }: { item?: MenuItem; onDone?: () => void }) {
  const [state, formAction] = useActionState(saveMenuItem, idleState);
  const isNew = !item?.id;

  return (
    <form action={formAction} className="space-y-3.5">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}

      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Label</span>
          <input name="label" required defaultValue={item?.label} placeholder="Services" className={control} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Link</span>
          <input name="href" required defaultValue={item?.href} placeholder="/services" className={control} />
        </label>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Badge</span>
          <input name="badge" defaultValue={item?.badge ?? ""} placeholder="New — optional" className={control} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Position</span>
          <input name="order_index" type="number" defaultValue={item?.order_index ?? 99} className={control} />
        </label>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-3">
        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-ink-200 px-3 py-2.5 text-sm">
          <input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} className="size-4 accent-brand-600" />
          Visible
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-ink-200 px-3 py-2.5 text-sm">
          <input type="checkbox" name="has_mega" defaultChecked={item?.has_mega ?? false} className="size-4 accent-brand-600" />
          Opens mega menu
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-ink-200 px-3 py-2.5 text-sm">
          <input type="checkbox" name="open_in_new_tab" defaultChecked={item?.open_in_new_tab ?? false} className="size-4 accent-brand-600" />
          New tab
        </label>
      </div>

      <Banner status={state.status} message={state.message} />

      <div className="flex items-center gap-2.5">
        <Submit label={isNew ? "Add link" : "Save link"} />
        {onDone ? (
          <button type="button" onClick={onDone} className="text-sm font-medium text-ink-500 hover:text-ink-800">
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

/* ------------------------------------------------------ mega menu column -- */

export function CategoryForm({ category, onDone }: { category?: ServiceCategory; onDone?: () => void }) {
  const [state, formAction] = useActionState(saveCategory, idleState);
  const isNew = !category?.slug;

  return (
    <form action={formAction} className="space-y-3.5">
      <input type="hidden" name="original_slug" value={category?.slug ?? ""} />

      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Column name</span>
          <input name="name" required defaultValue={category?.name} placeholder="Creative Studio" className={control} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Slug</span>
          <input name="slug" required defaultValue={category?.slug} placeholder="creative" className={control} />
          <span className="mt-1.5 block text-xs text-ink-400">Lowercase, hyphens only. Used as the anchor on /services.</span>
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-700">Blurb</span>
        <input name="blurb" defaultValue={category?.blurb} placeholder="Shown under the column heading in the mega menu." className={control} />
      </label>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Icon</span>
          <select name="icon" defaultValue={category?.icon ?? "Sparkles"} className={control}>
            {ICONS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Position</span>
          <input name="order_index" type="number" defaultValue={category?.order_index ?? 99} className={control} />
        </label>
      </div>

      <label className="flex w-fit cursor-pointer items-center gap-2.5 rounded-lg border border-ink-200 px-3 py-2.5 text-sm">
        <input type="checkbox" name="is_published" defaultChecked={category?.is_published ?? true} className="size-4 accent-brand-600" />
        Visible in the mega menu
      </label>

      <Banner status={state.status} message={state.message} />

      <div className="flex items-center gap-2.5">
        <Submit label={isNew ? "Add column" : "Save column"} />
        {onDone ? (
          <button type="button" onClick={onDone} className="text-sm font-medium text-ink-500 hover:text-ink-800">
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

/* ------------------------------------------------------ disclosure shells */

export function AddPanel({ kind }: { kind: "link" | "column" }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        <Plus className="size-4" />
        {kind === "link" ? "Add nav link" : "Add mega menu column"}
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-brand-200 bg-brand-50/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-sm font-bold text-ink-900">{kind === "link" ? "New navigation link" : "New mega menu column"}</h3>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-lg p-1 text-ink-400 hover:text-ink-800">
          <X className="size-4" />
        </button>
      </div>
      {kind === "link" ? <MenuItemForm onDone={() => setOpen(false)} /> : <CategoryForm onDone={() => setOpen(false)} />}
    </div>
  );
}

export function EditPanel({ item, category }: { item?: MenuItem; category?: ServiceCategory }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen((v) => !v)} className="text-xs font-semibold text-brand-700 hover:underline">
        {open ? "Close" : "Edit"}
      </button>
      {open ? (
        <div className="mt-4 rounded-xl border border-ink-200 bg-ink-50/60 p-4">
          {item ? <MenuItemForm item={item} onDone={() => setOpen(false)} /> : null}
          {category ? <CategoryForm category={category} onDone={() => setOpen(false)} /> : null}
        </div>
      ) : null}
    </>
  );
}
