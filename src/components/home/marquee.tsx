import { getBlock } from "@/lib/data";

/** Continuous platform strip — the list is duplicated so the loop is seamless. */
export async function PlatformMarquee() {
  const platforms = await getBlock<string[]>("home.marquee");

  return (
    <section className="border-y border-ink-100 bg-white py-7" aria-label="Platforms we work with">
      <p className="container-x mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
        Platforms and channels we work on every day
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {[...platforms, ...platforms].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-ink-300 transition-colors hover:text-brand-500"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
