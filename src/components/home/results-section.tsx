import { SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { getCaseStudies } from "@/lib/data";

export async function ResultsSection() {
  const studies = await getCaseStudies();

  return (
    <section className="bg-white py-20 lg:py-26">
      <div className="container-x">
        <SectionHeading
          eyebrow="Proof, not promises"
          title={<>Numbers from accounts we still run today</>}
          description="Three engagements, three different problems. Full breakdowns are on the work page."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {studies.slice(0, 3).map((study, i) => (
            <Reveal key={study.slug} order={i}>
              <article className="card-hover flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{study.industry}</p>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-ink-900">{study.headline}</h3>
                <p className="mt-3 flex-1 text-[0.94rem] leading-relaxed text-ink-500">{study.summary}</p>
                <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-ink-100 pt-6">
                  {study.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="font-display text-2xl font-extrabold tracking-tight text-gradient">{m.value}</dd>
                      <p className="mt-1 text-[0.72rem] leading-tight text-ink-400">{m.label}</p>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-sm font-semibold text-ink-700">{study.client}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
