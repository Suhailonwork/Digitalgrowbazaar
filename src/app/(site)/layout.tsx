import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <SiteHeader />
      <main id="main" className="pt-[68px] lg:pt-[104px]">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppFloat number={settings.whatsapp} />
    </>
  );
}
