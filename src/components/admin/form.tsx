"use client";

import { useActionState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { idleState, type ActionState } from "@/lib/form-state";

const control =
  "w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10 disabled:bg-ink-50";

export function Field({
  label, name, hint, required, type = "text", defaultValue, placeholder, className = "",
}: {
  label: string;
  name: string;
  hint?: string;
  required?: boolean;
  type?: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-ink-700">
        {label} {required ? <span className="text-ember-500">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className={control}
      />
      {hint ? <span className="mt-1.5 block text-xs text-ink-400">{hint}</span> : null}
    </label>
  );
}

export function TextArea({
  label, name, hint, rows = 5, defaultValue, placeholder, required, mono, className = "",
}: {
  label: string;
  name: string;
  hint?: string;
  rows?: number;
  defaultValue?: string | null;
  placeholder?: string;
  required?: boolean;
  mono?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-ink-700">
        {label} {required ? <span className="text-ember-500">*</span> : null}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className={`${control} resize-y ${mono ? "font-mono text-[0.8rem] leading-relaxed" : ""}`}
      />
      {hint ? <span className="mt-1.5 block text-xs text-ink-400">{hint}</span> : null}
    </label>
  );
}

export function Select({
  label, name, options, defaultValue, hint, className = "",
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string | null;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>
      <select name={name} defaultValue={defaultValue ?? ""} className={control}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint ? <span className="mt-1.5 block text-xs text-ink-400">{hint}</span> : null}
    </label>
  );
}

export function Toggle({ label, name, defaultChecked, hint }: { label: string; name: string; defaultChecked?: boolean; hint?: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink-200 bg-white px-3.5 py-3">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-0.5 size-4 accent-brand-600" />
      <span>
        <span className="block text-sm font-medium text-ink-800">{label}</span>
        {hint ? <span className="mt-0.5 block text-xs text-ink-400">{hint}</span> : null}
      </span>
    </label>
  );
}

export function FormCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-6">
      <h2 className="font-display text-base font-bold tracking-tight text-ink-900">{title}</h2>
      {description ? <p className="mt-1 text-sm text-ink-500">{description}</p> : null}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? "Saving…" : label}
    </button>
  );
}

/**
 * Wraps a server action with useActionState and renders the result banner —
 * every admin edit form uses this so feedback is consistent.
 */
export function AdminForm({
  action, children, submitLabel = "Save changes", footer,
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  children: ReactNode;
  submitLabel?: string;
  footer?: ReactNode;
}) {
  const [state, formAction] = useActionState(action, idleState);

  return (
    <form action={formAction} className="space-y-5">
      {children}

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

      <div className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t border-ink-200 bg-ink-50/95 py-4 backdrop-blur">
        <SubmitButton label={submitLabel} />
        {footer}
      </div>
    </form>
  );
}
