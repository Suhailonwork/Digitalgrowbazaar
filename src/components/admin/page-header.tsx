import type { ReactNode } from "react";

export function AdminPageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="border-b border-ink-200 bg-white">
      <div className="flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-ink-900">{title}</h1>
          {description ? <p className="mt-1 text-sm text-ink-500">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2.5">{actions}</div> : null}
      </div>
    </div>
  );
}

const tones: Record<string, string> = {
  new: "bg-brand-50 text-brand-700 ring-brand-200",
  contacted: "bg-amber-50 text-amber-700 ring-amber-200",
  qualified: "bg-aqua-500/10 text-aqua-600 ring-aqua-500/25",
  won: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  lost: "bg-ink-100 text-ink-500 ring-ink-200",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide ring-1 ring-inset ${tones[status] ?? tones.lost}`}
    >
      {status}
    </span>
  );
}

export function AdminLinkButton({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "outline" }) {
  const cls =
    variant === "primary"
      ? "bg-brand-600 text-white hover:bg-brand-700"
      : "border border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:text-brand-700";
  return (
    <a href={href} className={`inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors ${cls}`}>
      {children}
    </a>
  );
}
