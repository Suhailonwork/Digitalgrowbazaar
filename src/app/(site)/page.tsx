import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { PlatformMarquee } from "@/components/home/marquee";
import { StatsBand } from "@/components/home/stats-band";
import { ServicesSection } from "@/components/home/services-section";
import { WhyUs } from "@/components/home/why-us";
import { MarketplaceSection } from "@/components/home/marketplace-section";
import { ProcessSection } from "@/components/home/process-section";
import { ResultsSection } from "@/components/home/results-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { InsightsSection } from "@/components/home/insights-section";
import { HomeContactSection } from "@/components/home/contact-section";
import { CustomJsonLd, buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: "/",
    title: "Digital Grow Bazaar | Web Development, Digital Marketing & E-commerce Growth",
    description:
      "Full-stack growth partner in Noida: website development, SEO and digital marketing, videography and product photoshoots, e-commerce training, and Amazon, Flipkart and Meesho account management.",
    keywords:
      "digital marketing agency noida, website development company india, ecommerce account management, amazon flipkart meesho seller services, product photoshoot, videography, ecommerce training",
  });
}

export default function HomePage() {
  return (
    <>
      <CustomJsonLd path="/" />
      <Hero />
      <PlatformMarquee />
      <StatsBand />
      <ServicesSection />
      <WhyUs />
      <MarketplaceSection />
      <ProcessSection />
      <ResultsSection />
      <TestimonialsSection />
      <InsightsSection />
      <FaqSection />
      <HomeContactSection />
    </>
  );
}
