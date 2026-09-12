"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, ChevronDown, Loader2, RotateCcw, TriangleAlert } from "lucide-react";
import { saveBlock } from "@/app/admin/actions";
import { idleState } from "@/lib/form-state";
import { humanise, type BlockShape } from "@/lib/blocks-format";

const control =
  "w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? "Saving…" : "Save section"}
    </button>
  );
}

/** Column hint shown above a pipe-separated list editor. */
function RowHint({ fields }: { fields: string[] }) {
  return (
    <span className="mt-1.5 block text-xs text-ink-400">
      One per line, columns separated by <code className="rounded bg-ink-100 px-1 font-mono">|</code> in this order:{" "}
      <span className="font-medium text-ink-600">{fields.map(humanise).join(" | ")}</span>
      {fields.length > 1 ? <> . Use <code className="rounded bg-ink-100 px-1 font-mono">;</code> to separate items inside a list column.</> : null}
    </span>
  );
}

export function BlockEditor({
  blockKey, label, description, shape, values, isOverridden, resetAction,
}: {
  blockKey: string;
  label: string;
  description?: string;
  shape: BlockShape;
  values: Record<string, string>;
  isOverridden: boolean;
  resetAction: (formData: FormData) => Promise<void>;
}) {
  const [state, formAction] = useActionState(saveBlock, idleState);
  const [open, setOpen] = useState(false);

  return (
    <section className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-ink-900">{label}</span>
            {isOverridden ? (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-bold uppercase text-emerald-700 ring-1 ring-inset ring-emerald-200">
                Edited
              </span>
            ) : (
              <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[0.65rem] font-bold uppercase text-ink-500">Default</span>
            )}
          </span>
          {description ? <span className="mt-0.5 block text-sm text-ink-500">{description}</span> : null}
          <code className="mt-1 block text-xs text-ink-400">{blockKey}</code>
        </span>
        <ChevronDown className={`size-4 shrink-0 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="border-t border-ink-100 bg-ink-50/50 p-5">
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="key" value={blockKey} />

            {shape.kind === "lines" ? (
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-700">Items</span>
                <textarea name="__value" rows={8} defaultValue={values.__value} className={`${control} resize-y font-mono text-[0.8rem]`} />
                <span className="mt-1.5 block text-xs text-ink-400">One per line.</span>
              </label>
            ) : null}

            {shape.kind === "rows" ? (
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-700">Rows</span>
                <textarea name="__value" rows={8} defaultValue={values.__value} className={`${control} resize-y font-mono text-[0.8rem]`} />
                <RowHint fields={shape.fields} />
              </label>
            ) : null}

            {shape.kind === "object"
              ? shape.fields.map((field) => (
                  <label key={field.key} className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink-700">{humanise(field.key)}</span>
                    {field.kind === "text" ? (
                      <input name={field.key} defaultValue={values[field.key]} className={control} />
                    ) : (
                      <>
                        <textarea
                          name={field.key}
                          rows={field.kind === "rows" ? 5 : 4}
                          defaultValue={values[field.key]}
                          className={`${control} resize-y font-mono text-[0.8rem]`}
                        />
                        {field.kind === "rows" ? <RowHint fields={field.fields} /> : <span className="mt-1.5 block text-xs text-ink-400">One per line.</span>}
                      </>
                    )}
                  </label>
                ))
              : null}

            {shape.kind === "json" ? (
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-700">JSON</span>
                <textarea name="__value" rows={12} defaultValue={values.__value} className={`${control} resize-y font-mono text-[0.8rem]`} />
              </label>
            ) : null}

            {state.status !== "idle" && state.message ? (
              <p
                role="status"
                className={`flex items-start gap-2 rounded-lg border px-3.5 py-2.5 text-sm ${
                  state.status === "success"
                    ? "border-aqua-500/30 bg-aqua-500/8 text-aqua-600"
                    : "border-ember-500/30 bg-ember-500/8 text-ember-600"
                }`}
              >
                {state.status === "success" ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                ) : (
                  <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                )}
                {state.message}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <Submit />
              {isOverridden ? (
                <button
                  type="submit"
                  formAction={resetAction}
                  formNoValidate
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-600 transition-colors hover:border-ember-400 hover:text-ember-600"
                >
                  <RotateCcw className="size-4" />
                  Reset to default
                </button>
              ) : null}
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}
