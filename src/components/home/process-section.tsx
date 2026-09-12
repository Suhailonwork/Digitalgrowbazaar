import { SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { getBlock } from "@/lib/data";
import type { ProcessStep, SectionCopy } from "@/lib/content/blocks";

export async function ProcessSection() {
  const [copy, steps] = await Promise.all([
    getBlock<SectionCopy>("home.process_copy"),
    getBlock<ProcessStep[]>("home.process"),
  ]);

  return (
    <section className="bg-ink-50 py-20 lg:py-26">
      <div className="container-x">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <Reveal key={step.n} order={i}>
              <li className="relative h-full rounded-3xl border border-ink-100 bg-white p-7">
                <span className="font-display text-sm font-extrabold tracking-[0.2em] text-brand-500">{step.n}</span>
                <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-ink-900">{step.title}</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-500">{step.body}</p>
                {i < steps.length - 1 ? (
                  <span
                    className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-400 ring-1 ring-ink-100 lg:grid"
                    aria-hidden
                  >
                    →
                  </span>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
