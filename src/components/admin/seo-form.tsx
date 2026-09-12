"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { CheckCircle2, Globe, Loader2, TriangleAlert } from "lucide-react";
import { saveSeo } from "@/app/admin/actions";
import { idleState } from "@/lib/form-state";
import type { SeoMeta } from "@/lib/types";

const control =
  "w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10";

/** Google truncates around these lengths — the counters turn amber past them. */
const TITLE_MAX = 60;
const DESC_MAX = 158;

function Counter({ value, max }: { value: number; max: number }) {
  const over = value > max;
  return (
    <span className={`text-xs tabular-nums ${over ? "font-semibold text-ember-600" : "text-ink-400"}`}>
      {value}/{max}
    </span>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? "Saving…" : "Save SEO settings"}
    </button>
  );
}

export function SeoForm({
  path, existing, fallbackTitle, fallbackDescription, siteUrl,
}: {
  path: string;
  existing: SeoMeta | null;
  fallbackTitle: string;
  fallbackDescription: string;
  siteUrl: string;
}) {
  const [state, formAction] = useActionState(saveSeo, idleState);
  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");

  const shownTitle = title || fallbackTitle;
  const shownDesc = description || fallbackDescription;

  return (
    <form action={formAction} className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <input type="hidden" name="path" value={path} />

      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="seo-title" className="text-sm font-medium text-ink-700">
              Meta title
            </label>
            <Counter value={title.length} max={TITLE_MAX} />
          </div>
          <input
            id="seo-title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={fallbackTitle}
            className={control}
          />
          <p className="mt-1.5 text-xs text-ink-400">Leave blank to keep the page&apos;s built-in title.</p>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="seo-desc" className="text-sm font-medium text-ink-700">
              Meta description
            </label>
            <Counter value={description.length} max={DESC_MAX} />
          </div>
          <textarea
            id="seo-desc"
            name="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={fallbackDescription}
            className={`${control} resize-y`}
          />
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Focus keywords</span>
          <input name="keywords" defaultValue={existing?.keywords ?? ""} placeholder="comma, separated, keywords" className={control} />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-700">Open Graph image URL</span>
            <input name="og_image" defaultValue={existing?.og_image ?? ""} placeholder="https://…/share.jpg" className={control} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-700">Canonical URL</span>
            <input name="canonical" defaultValue={existing?.canonical ?? ""} placeholder={`${siteUrl}${path}`} className={control} />
          </label>
        </div>

        <fieldset className="rounded-lg border border-ink-200 bg-white p-4">
          <legend className="px-1 text-sm font-medium text-ink-700">Social share card</legend>
          <div className="space-y-3.5">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-500">Share title</span>
              <input name="og_title" defaultValue={existing?.og_title ?? ""} placeholder={shownTitle} className={control} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-500">Share description</span>
              <textarea
                name="og_description"
                rows={2}
                defaultValue={existing?.og_description ?? ""}
                placeholder={shownDesc}
                className={`${control} resize-y`}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-500">Twitter card type</span>
              <select name="twitter_card" defaultValue={existing?.twitter_card ?? "summary_large_image"} className={control}>
                <option value="summary_large_image">Large image</option>
                <option value="summary">Small summary</option>
              </select>
            </label>
          </div>
        </fieldset>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink-200 bg-white px-3.5 py-3">
            <input type="checkbox" name="noindex" defaultChecked={existing?.noindex ?? false} className="mt-0.5 size-4 accent-brand-600" />
            <span>
              <span className="block text-sm font-medium text-ink-800">noindex</span>
              <span className="mt-0.5 block text-xs text-ink-400">Keep this page out of search results.</span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink-200 bg-white px-3.5 py-3">
            <input type="checkbox" name="nofollow" defaultChecked={existing?.nofollow ?? false} className="mt-0.5 size-4 accent-brand-600" />
            <span>
              <span className="block text-sm font-medium text-ink-800">nofollow</span>
              <span className="mt-0.5 block text-xs text-ink-400">Stop crawlers following links from this page.</span>
            </span>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Custom JSON-LD (advanced)</span>
          <textarea
            name="json_ld"
            rows={6}
            defaultValue={existing?.json_ld ?? ""}
            placeholder='{"@context":"https://schema.org","@type":"Product","name":"…"}'
            className={`${control} resize-y font-mono text-[0.8rem]`}
          />
          <span className="mt-1.5 block text-xs text-ink-400">
            Added on top of the structured data the page already outputs. Must be valid JSON.
          </span>
        </label>

        {state.status !== "idle" && state.message ? (
          <div
            role="status"
            aria-live="polite"
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
              state.status === "success" ? "border-aqua-500/30 bg-aqua-500/8 text-aqua-600" : "border-ember-500/30 bg-ember-500/8 text-ember-600"
            }`}
          >
            {state.status === "success" ? <CheckCircle2 className="mt-0.5 size-4 shrink-0" /> : <TriangleAlert className="mt-0.5 size-4 shrink-0" />}
            {state.message}
          </div>
        ) : null}

        <Submit />
      </div>

      {/* Live SERP preview */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-ink-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Google preview</p>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-xs text-ink-500">
              <span className="grid size-6 place-items-center rounded-full bg-ink-100">
                <Globe className="size-3.5 text-ink-400" />
              </span>
              <span className="truncate">
                {siteUrl.replace(/^https?:\/\//, "")}
                <span className="text-ink-400">{path === "/" ? "" : path.replace(/\//g, " › ")}</span>
              </span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-[1.05rem] leading-snug text-[#1a0dab]">{shownTitle}</p>
            <p className="mt-1 line-clamp-3 text-[0.82rem] leading-relaxed text-ink-500">{shownDesc}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Quick checks</p>
          <ul className="mt-3.5 space-y-2 text-sm">
            <li className={`flex items-start gap-2 ${shownTitle.length <= TITLE_MAX ? "text-ink-600" : "text-ember-600"}`}>
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current" />
              Title is {shownTitle.length} characters {shownTitle.length > TITLE_MAX ? "— it may be truncated" : "— good length"}
            </li>
            <li className={`flex items-start gap-2 ${shownDesc.length >= 70 && shownDesc.length <= DESC_MAX ? "text-ink-600" : "text-ember-600"}`}>
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current" />
              Description is {shownDesc.length} characters {shownDesc.length < 70 ? "— consider adding detail" : shownDesc.length > DESC_MAX ? "— it may be truncated" : "— good length"}
            </li>
            <li className="flex items-start gap-2 text-ink-600">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current" />
              This page is {existing?.noindex ? "hidden from" : "visible to"} search engines{existing?.nofollow ? ", and its links are not followed" : ""}
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}
