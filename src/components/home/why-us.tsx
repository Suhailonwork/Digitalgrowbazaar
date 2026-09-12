import { SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { getBlock } from "@/lib/data";
import type { Pillar, SectionCopy } from "@/lib/content/blocks";


export async function WhyUs() {
  const [copy, pillars] = await Promise.all([
    getBlock<SectionCopy>("home.why_us_copy"),
    getBlock<Pillar[]>("home.why_us"),
  ]);

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-26">
      <div className="container-x">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} order={i}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-ink-100 bg-ink-50/60 p-8 transition-colors hover:border-brand-200 hover:bg-white">
                <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-600 shadow-card ring-1 ring-ink-100">
                  <Icon name={pillar.icon} className="size-5.5" />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink-900">{pillar.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-500">{pillar.body}</p>
                <span
                  className="absolute right-6 top-6 font-display text-5xl font-extrabold text-ink-100 transition-colors group-hover:text-brand-100"
                  aria-hidden
                >
                  0{i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
