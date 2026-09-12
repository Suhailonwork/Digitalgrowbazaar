import { getMegaMenu, getMenuItems, getSiteSettings } from "@/lib/data";
import { Header } from "@/components/site/header";

/** Server wrapper: loads the menu from Supabase (or seed data) once per request. */
export async function SiteHeader() {
  const [groups, settings, navItems] = await Promise.all([getMegaMenu(), getSiteSettings(), getMenuItems()]);
  return <Header groups={groups} settings={settings} navItems={navItems} />;
}
