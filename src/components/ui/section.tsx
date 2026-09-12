import type { ReactNode } from "react";

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={
        tone === "dark"
          ? "inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-aqua-300 ring-1 ring-inset ring-white/15"
          : "inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 ring-1 ring-inset ring-brand-100"
      }
    >
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow, title, description, align = "center", tone = "light", className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
          tone === "dark" ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-[1.0625rem] leading-relaxed text-pretty ${tone === "dark" ? "text-ink-300" : "text-ink-500"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
