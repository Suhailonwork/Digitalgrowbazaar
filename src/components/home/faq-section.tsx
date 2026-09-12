import { SectionHeading } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { getBlock } from "@/lib/data";
import type { FAQ } from "@/lib/types";


export async function FaqSection({ faqs, withSchema = true }: { faqs?: FAQ[]; withSchema?: boolean }) {
  const items = faqs ?? (await getBlock<FAQ[]>("home.faqs"));

  return (
    <section className="bg-white py-20 lg:py-26">
      {withSchema ? <JsonLd data={faqJsonLd(items)} /> : null}
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Questions"
            title={<>Answers before you have to ask</>}
            description="If your question is not here, ask it directly — we reply to every enquiry ourselves."
          />
          <ButtonLink href="/contact" variant="outline" size="md" className="mt-8">
            Ask us anything
          </ButtonLink>
        </div>
        <FaqAccordion faqs={items} />
      </div>
    </section>
  );
}
