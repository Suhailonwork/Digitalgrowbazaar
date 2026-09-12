import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { getBlock } from "@/lib/data";
import type { MarketplaceItem, SectionCopy } from "@/lib/content/blocks";


export async function MarketplaceSection() {
  const [copy, marketplaces] = await Promise.all([
    getBlock<SectionCopy>("home.marketplace_copy"),
    getBlock<MarketplaceItem[]>("home.marketplaces"),
  ]);

  return (
    <section className="surface-dark relative overflow-hidden py-20 lg:py-26">
      <div className="grid-lines pointer-events-none absolute inset-0 text-white/40 opacity-25" aria-hidden />
      <div className="container-x relative">
        <SectionHeading tone="dark" eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {marketplaces.map((mp, i) => (
            <Reveal key={mp.name} order={i}>
              <Link
                href={`/services/${mp.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-white/12 bg-white/6 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/10"
              >
                <span className={`inline-flex w-fit rounded-full bg-linear-to-r ${mp.accent} px-4 py-1.5 font-display text-sm font-bold text-white`}>
                  {mp.name}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{mp.name} account management</h3>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {mp.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[0.92rem] text-ink-300">
                      <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-aqua-400" strokeWidth={2} />
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  See what is included
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-white/12 bg-white/6 px-8 py-7 text-center">
          <p className="text-ink-200">
            Selling on more than one marketplace? <span className="font-semibold text-white">Bundled plans cut the cost by up to 30%.</span>
          </p>
          <ButtonLink href="/contact" size="md">
            Get a marketplace audit
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
