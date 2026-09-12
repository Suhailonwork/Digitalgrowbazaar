import Link from "next/link";
import { ArrowRight, CheckCircle2, PlayCircle, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { getBlock } from "@/lib/data";
import type { HeroBlock } from "@/lib/content/blocks";

export async function Hero() {
  const hero = await getBlock<HeroBlock>("home.hero");

  return (
    <section className="surface-dark relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 text-white/50 opacity-25" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 top-10 size-[34rem] rounded-full bg-brand-500/25 blur-[130px] animate-float"
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-32 bottom-0 size-[26rem] rounded-full bg-aqua-500/20 blur-[120px]" aria-hidden />

      <div className="container-x relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-[0.8rem] font-medium text-ink-200 ring-1 ring-inset ring-white/15">
            <span className="flex -space-x-1.5" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="size-5 rounded-full bg-linear-to-br from-brand-400 to-aqua-400 ring-2 ring-ink-950" />
              ))}
            </span>
            {hero.badge}
          </span>

          {/* Fluid below sm: the highlight span is nowrap so it can outrun a 320px
              screen at a fixed 2.25rem. */}
          <h1 className="mt-6 font-display text-[clamp(1.85rem,7.4vw,2.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white text-balance sm:text-5xl lg:text-[3.65rem]">
            {hero.title_lead}{" "}
            <span className="relative whitespace-nowrap">
              <span className="bg-linear-to-r from-aqua-300 via-brand-300 to-ember-400 bg-clip-text text-transparent">{hero.title_highlight}</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10" fill="none" aria-hidden preserveAspectRatio="none">
                <path d="M2 7.5C60 2.5 130 1.5 298 5.5" stroke="url(#hero-underline)" strokeWidth="3.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="hero-underline" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34e0e8" />
                    <stop offset="1" stopColor="#ff6b35" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-300 text-pretty">
            {hero.subtitle}
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
            {hero.proof_points.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-ink-300">
                <CheckCircle2 className="size-4.5 text-aqua-400" strokeWidth={2} />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <ButtonLink href={hero.cta_primary_href} size="lg">
              {hero.cta_primary_label}
              <ArrowRight className="size-4.5" />
            </ButtonLink>
            <ButtonLink href={hero.cta_secondary_href} variant="light" size="lg">
              <PlayCircle className="size-4.5" />
              {hero.cta_secondary_label}
            </ButtonLink>
          </div>

          <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-7">
            <div className="flex items-center gap-1" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-ember-400 text-ember-400" />
              ))}
            </div>
            <p className="text-sm text-ink-400">
              <span className="font-semibold text-white">{hero.rating_value}</span> {hero.rating_note}
            </p>
          </div>
        </div>

        {/* Visual: stacked result cards */}
        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative mx-auto max-w-md">
            <div className="rounded-4xl border border-white/12 bg-white/6 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{hero.panel_title}</p>
                <span className="rounded-full bg-aqua-500/15 px-2.5 py-1 text-[0.7rem] font-semibold text-aqua-300">{hero.panel_badge}</span>
              </div>

              <div className="mt-6 flex h-40 items-end gap-2.5" aria-hidden>
                {[38, 46, 41, 58, 64, 60, 78, 86, 94].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-md bg-linear-to-t from-brand-500/40 to-aqua-400/90" style={{ height: `${h}%` }} />
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                {hero.panel_metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-xl font-bold text-white">{m.value}</p>
                    <p className="mt-0.5 text-[0.72rem] uppercase tracking-wider text-ink-400">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* These hang off the panel only once the hero splits into two columns.
                Below that the panel is full width, so floating them would bury the
                chart's own badge and metrics — stack them underneath instead. */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:block">
              <div className="rounded-2xl border border-white/12 bg-ink-900/90 p-4 shadow-2xl backdrop-blur-xl lg:absolute lg:-bottom-8 lg:-left-10 lg:w-56">
                <p className="text-[0.7rem] uppercase tracking-wider text-ink-400">{hero.float_left_label}</p>
                <p className="mt-1 font-display text-2xl font-bold text-white">
                  {hero.float_left_value} <span className="text-sm font-semibold text-aqua-400">{hero.float_left_delta}</span>
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-4/5 rounded-full bg-linear-to-r from-brand-400 to-aqua-400" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/12 bg-ink-900/90 px-4 py-3 shadow-2xl backdrop-blur-xl lg:absolute lg:-right-8 lg:-top-7">
                <p className="text-[0.7rem] uppercase tracking-wider text-ink-400">{hero.float_right_label}</p>
                <p className="font-display text-xl font-bold text-white">{hero.float_right_value}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick service jump bar */}
      <div className="container-x relative pb-14">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {hero.quick_links.map((item) => (
            <Link key={item.href} href={item.href} className="group bg-ink-950/80 px-5 py-5 transition-colors hover:bg-ink-900">
              <p className="flex items-center justify-between gap-2 font-display text-[0.95rem] font-semibold text-white">
                {item.label}
                <ArrowRight className="size-4 shrink-0 -translate-x-1 text-aqua-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </p>
              <p className="mt-1 text-xs text-ink-400">{item.note}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
