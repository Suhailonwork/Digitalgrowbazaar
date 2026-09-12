import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

const suggestions = [
  { label: "All services", href: "/services" },
  { label: "Amazon account management", href: "/services/amazon-account-management" },
  { label: "Website development", href: "/services/website-development" },
  { label: "Product photoshoot", href: "/services/product-photoshoot" },
  { label: "Insights", href: "/blog" },
  { label: "Contact us", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="surface-dark relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 text-white/40 opacity-25" aria-hidden />
      <div className="container-x relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-7xl font-extrabold tracking-tight text-gradient sm:text-8xl">404</p>
        <h1 className="mt-6 max-w-xl font-display text-3xl font-bold text-white text-balance sm:text-4xl">
          That page has moved, or never existed
        </h1>
        <p className="mt-4 max-w-lg text-ink-300">
          Check the address, or jump to one of the pages people usually want.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" size="lg">
            <Home className="size-4.5" />
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="light" size="lg">
            Talk to us
            <ArrowRight className="size-4.5" />
          </ButtonLink>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-full px-4 py-2 text-sm text-ink-300 ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/10 hover:text-white"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
