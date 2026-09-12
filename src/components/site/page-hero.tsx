import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/section";

export function PageHero({
  eyebrow, title, description, breadcrumbs = [], children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="surface-dark relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 text-white/40 opacity-25" aria-hidden />
      <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand-500/25 blur-[120px]" aria-hidden />

      <div className="container-x relative py-16 lg:py-22">
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {i > 0 ? <ChevronRight className="size-3.5 text-ink-600" aria-hidden /> : null}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-ink-200" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-white">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="max-w-3xl animate-fade-up">
          {eyebrow ? <Eyebrow tone="dark">{eyebrow}</Eyebrow> : null}
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-white text-balance sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {description ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300 text-pretty">{description}</p> : null}
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
