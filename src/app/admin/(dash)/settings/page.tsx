import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminForm, Field, FormCard, TextArea } from "@/components/admin/form";
import { adminGetSettings } from "@/lib/admin-data";
import { saveSettings } from "@/app/admin/actions";
import { defaultSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const saved = await adminGetSettings();
  // Show the live defaults in empty fields so nothing looks blank on first run.
  const s = { ...defaultSettings, ...(saved ?? {}) };

  return (
    <>
      <AdminPageHeader
        title="Site settings"
        description="Contact details, header chrome, social links, meta defaults and tracking. These apply across every page."
      />

      <div className="p-5 sm:p-8">
        <AdminForm action={saveSettings} submitLabel="Save settings">
          <input type="hidden" name="id" value={saved?.id ?? ""} />

          <div className="grid gap-6 xl:grid-cols-2">
            <FormCard title="Brand">
              <Field label="Brand name" name="brand_name" required defaultValue={s.brand_name} />
              <TextArea label="Tagline" name="tagline" rows={2} defaultValue={s.tagline} />
            </FormCard>

            <FormCard title="Contact details" description="Used in the header, footer, contact page and Organization schema.">
              <Field label="Phone" name="phone" required defaultValue={s.phone} />
              <Field label="Email" name="email" type="email" required defaultValue={s.email} />
              <Field label="WhatsApp number" name="whatsapp" defaultValue={s.whatsapp} hint="Digits only, with country code: 919818435920" />
              <TextArea label="Address" name="address" rows={2} defaultValue={s.address} />
            </FormCard>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <FormCard title="Header bar" description="The notice strip above the navigation and the header button.">
              <TextArea label="Notice text" name="header_notice" rows={2} defaultValue={s.header_notice} hint="Leave blank to hide the strip." />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Button label" name="header_cta_label" defaultValue={s.header_cta_label} />
                <Field label="Button link" name="header_cta_href" defaultValue={s.header_cta_href} placeholder="/contact" />
              </div>
            </FormCard>

            <FormCard title="Mega menu promo" description="The card at the bottom of the services mega menu.">
              <Field label="Heading" name="menu_promo_title" defaultValue={s.menu_promo_title} />
              <TextArea label="Text" name="menu_promo_text" rows={2} defaultValue={s.menu_promo_text} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Button label" name="menu_promo_cta_label" defaultValue={s.menu_promo_cta_label} />
                <Field label="Button link" name="menu_promo_cta_href" defaultValue={s.menu_promo_cta_href} placeholder="/contact" />
              </div>
            </FormCard>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <FormCard title="Social profiles" description="Shown in the footer and in Organization structured data.">
              <Field label="Instagram" name="instagram" defaultValue={s.instagram} />
              <Field label="Facebook" name="facebook" defaultValue={s.facebook} />
              <Field label="LinkedIn" name="linkedin" defaultValue={s.linkedin} />
              <Field label="YouTube" name="youtube" defaultValue={s.youtube} />
            </FormCard>

            <FormCard title="Default meta tags" description="Fallbacks for any page without its own values.">
              <Field label="Default title" name="default_seo_title" defaultValue={s.default_seo_title} hint="Used on the homepage and as the tab-title suffix." />
              <TextArea label="Default description" name="default_seo_description" rows={3} defaultValue={s.default_seo_description} />
              <Field label="Default share image" name="default_og_image" defaultValue={s.default_og_image} placeholder="https://…/og.jpg" hint="1200×630. Leave blank to auto-generate one per page." />
              <Field label="Favicon URL" name="favicon_url" defaultValue={s.favicon_url} placeholder="https://…/favicon.png" />
              <Field label="Twitter / X handle" name="twitter_handle" defaultValue={s.twitter_handle} placeholder="@digitalgrowbzr" />
            </FormCard>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <FormCard title="Search engine verification" description="Pastes the verification meta tag into every page.">
              <Field label="Google Search Console" name="google_verification" defaultValue={s.google_verification} placeholder="Content value of the meta tag" />
              <Field label="Bing Webmaster Tools" name="bing_verification" defaultValue={s.bing_verification} />
            </FormCard>

            <FormCard title="Tracking" description="Scripts load after the page is interactive, so they never slow the first paint.">
              <Field label="Google Analytics 4 ID" name="ga_id" defaultValue={s.ga_id} placeholder="G-XXXXXXXXXX" />
              <Field label="Google Tag Manager ID" name="gtm_id" defaultValue={s.gtm_id} placeholder="GTM-XXXXXXX" hint="If set, GTM is loaded instead of the standalone GA tag." />
              <Field label="Meta (Facebook) Pixel ID" name="fb_pixel_id" defaultValue={s.fb_pixel_id} placeholder="123456789012345" />
            </FormCard>
          </div>
        </AdminForm>
      </div>
    </>
  );
}
