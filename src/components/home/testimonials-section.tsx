import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { getTestimonials } from "@/lib/data";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <section className="bg-ink-50 py-20 lg:py-26">
      <div className="container-x">
        <SectionHeading
          eyebrow="Client voices"
          title={<>What it is actually like to work with us</>}
          description="Unedited feedback from founders and sellers who let us near their revenue."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((t, i) => (
            <Reveal key={`${t.name}-${i}`} order={i % 3}>
              <figure className="relative flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7">
                <Quote className="absolute right-6 top-6 size-8 text-ink-100" aria-hidden />
                <div className="flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="size-4 fill-ember-400 text-ember-400" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-600">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-500 to-aqua-500 font-display text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink-900">{t.name}</span>
                    <span className="block text-xs text-ink-400">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
