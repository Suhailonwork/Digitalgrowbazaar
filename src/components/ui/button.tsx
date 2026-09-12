import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_10px_30px_-10px_rgba(74,63,224,0.8)] hover:bg-brand-700 hover:shadow-[0_16px_40px_-12px_rgba(74,63,224,0.9)] hover:-translate-y-0.5",
  outline: "border border-ink-200 bg-white text-ink-800 hover:border-brand-400 hover:text-brand-700 hover:-translate-y-0.5",
  ghost: "text-ink-700 hover:text-brand-700 hover:bg-brand-50",
  light: "bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur hover:bg-white/20 hover:-translate-y-0.5",
};

// min-h rather than h: a label long enough to wrap grows the pill instead of
// spilling its text outside a fixed-height box.
const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-[0.95rem]",
  lg: "min-h-13 px-7 py-3 text-base",
};

/**
 * Tailwind orders utilities by its own canon, not by the order they appear in a
 * class string, and it emits `inline-flex` after `hidden`. A call site passing
 * "hidden sm:inline-flex" would therefore lose to the base class and the button
 * would stay on screen at every width — so drop the base display whenever the
 * caller supplies one of their own.
 */
const DISPLAY_UTILITY = /(?:^|\s)(?:[\w-]+:)*(?:hidden|flex|inline-flex|grid|inline-grid|block|inline-block|inline|contents)(?:\s|$)/;

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  const layout = DISPLAY_UTILITY.test(extra) ? base.replace("inline-flex ", "") : base;
  return `${layout} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

export function ButtonLink({
  href, children, variant = "primary", size = "md", className = "", ...rest
}: { href: string; children: ReactNode; variant?: Variant; size?: Size; className?: string } & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  children, variant = "primary", size = "md", className = "", ...rest
}: { variant?: Variant; size?: Size } & ComponentProps<"button">) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
