import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section";
import { ServiceCard } from "@/components/ui/service-card";
import { Reveal } from "@/components/ui/reveal";
import { getFeaturedServices } from "@/lib/data";

export async function ServicesSection() {
  const services = (await getFeaturedServices()).slice(0, 6);

  return (
    <section className="bg-ink-50 py-20 lg:py-26" id="services">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="What we do"
            title={<>Six services. One team that actually talks to each other.</>}
            description="Most brands stitch together an agency, a freelancer and a cousin who knows Photoshop. We run the whole growth stack in-house, so the ad creative matches the landing page and the listing matches the photoshoot."
          />
          <ButtonLink href="/services" variant="outline" size="md" className="shrink-0">
            View all services
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} order={i % 3}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
