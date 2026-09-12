import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import type { Service } from "@/lib/types";

export function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-hover group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 hover:border-brand-200"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-brand-50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-aqua-500 text-white shadow-[0_10px_24px_-10px_rgba(91,87,245,0.9)]">
          <Icon name={service.icon} className="size-5.5" />
        </span>
        <ArrowUpRight className="size-5 shrink-0 text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
      </div>

      <h3 className="relative mt-6 font-display text-[1.2rem] font-bold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-brand-700">
        {service.title}
      </h3>
      <p className="relative mt-2.5 flex-1 text-[0.94rem] leading-relaxed text-ink-500">{service.excerpt}</p>

      {!compact && service.features.length > 0 ? (
        <ul className="relative mt-5 space-y-2 border-t border-ink-100 pt-5">
          {service.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-[0.85rem] leading-snug text-ink-500">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-linear-to-br from-brand-500 to-aqua-500" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
      ) : null}

      {service.price_from ? (
        <p className="relative mt-5 text-xs font-semibold uppercase tracking-wider text-ink-400">
          Starts at <span className="text-brand-600">₹{service.price_from}</span>
        </p>
      ) : null}
    </Link>
  );
}
