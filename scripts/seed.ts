/**
 * Pushes the built-in catalogue into Supabase.
 *
 *   npm run seed
 *
 * Idempotent: every table is upserted on its natural key, so re-running only
 * refreshes rows. Uses the secret key, so it bypasses RLS and needs no login.
 */
import { createClient } from "@supabase/supabase-js";
import {
  fallbackCaseStudies,
  fallbackCategories,
  fallbackMenuItems,
  fallbackPages,
  fallbackPosts,
  fallbackServices,
  fallbackTestimonials,
} from "../src/lib/content";
import { CONTENT_BLOCKS } from "../src/lib/content/blocks";
import { staticSeoDefaults } from "../src/lib/content/seo-defaults";
import { siteConfig } from "../src/lib/site";

try {
  process.loadEnvFile(".env");
} catch {
  try {
    process.loadEnvFile(".env.local");
  } catch {
    // Fall through to the check below.
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const secret = process.env.SUPABASE_SECRET_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!url || !secret) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env — nothing to seed.");
  process.exit(1);
}

const sb = createClient(url, secret, { auth: { persistSession: false } });

let failed = 0;

/** Supabase query builders are thenable rather than real Promises. */
type Result = PromiseLike<{ error: { message: string } | null }>;

async function step(label: string, run: () => Result) {
  const { error } = await run();
  if (error) {
    failed += 1;
    console.error(`  ✗ ${label}: ${error.message}`);
  } else {
    console.log(`  ✓ ${label}`);
  }
}

async function main() {
  console.log(`Seeding ${url}\n`);

  // Categories must land before services — services reference them by slug.
  await step(`${fallbackCategories.length} service categories`, () =>
    sb.from("service_categories").upsert(
      fallbackCategories.map((c) => ({ ...c, is_published: true })),
      { onConflict: "slug" },
    ),
  );

  await step(`${fallbackServices.length} services`, () =>
    sb.from("services").upsert([...fallbackServices], { onConflict: "slug" }),
  );

  await step(`${fallbackMenuItems.length} menu items`, () =>
    sb.from("menu_items").upsert([...fallbackMenuItems], { onConflict: "href" }),
  );

  await step(`${fallbackCaseStudies.length} case studies`, () =>
    sb.from("case_studies").upsert(
      fallbackCaseStudies.map((c) => ({ ...c, is_published: true })),
      { onConflict: "slug" },
    ),
  );

  await step(`${fallbackPosts.length} articles`, () => sb.from("posts").upsert([...fallbackPosts], { onConflict: "slug" }));

  await step(`${fallbackPages.length} pages`, () => sb.from("pages").upsert([...fallbackPages], { onConflict: "slug" }));

  await step(`${CONTENT_BLOCKS.length} content blocks`, () =>
    sb.from("content_blocks").upsert(
      CONTENT_BLOCKS.map((b) => ({ key: b.key, label: b.label, description: b.description, data: b.data })),
      { onConflict: "key" },
    ),
  );

  await step(`${staticSeoDefaults.length} SEO records`, () =>
    sb.from("seo_meta").upsert([...staticSeoDefaults], { onConflict: "path" }),
  );

  // Testimonials have no natural key, so only seed them into an empty table.
  const { count } = await sb.from("testimonials").select("id", { count: "exact", head: true });
  if (count) {
    console.log(`  – testimonials: ${count} already present, skipped`);
  } else {
    await step(`${fallbackTestimonials.length} testimonials`, () =>
      sb.from("testimonials").insert(fallbackTestimonials.map((t) => ({ ...t, is_published: true }))),
    );
  }

  const { data: settings } = await sb.from("site_settings").select("id").limit(1).maybeSingle();
  if (settings) {
    console.log("  – site settings: already present, left untouched");
  } else {
    await step("site settings", () =>
      sb.from("site_settings").insert({
        brand_name: siteConfig.name,
        tagline: siteConfig.tagline,
        phone: siteConfig.phone,
        email: siteConfig.email,
        whatsapp: siteConfig.whatsapp,
        address: `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
        instagram: siteConfig.socials.instagram,
        facebook: siteConfig.socials.facebook,
        linkedin: siteConfig.socials.linkedin,
        youtube: siteConfig.socials.youtube,
        header_notice: "Now onboarding for the Q4 festive season — limited marketplace slots.",
        header_cta_label: "Free growth audit",
        header_cta_href: "/contact",
        menu_promo_title: "Not sure which service you need?",
        menu_promo_text: "Send us your website or seller panel — you get a written audit with priorities in 48 hours, free.",
        menu_promo_cta_label: "Book a free audit",
        menu_promo_cta_href: "/contact",
      }),
    );
  }

  console.log(failed === 0 ? "\nDone. Every table is now served from Supabase." : `\nFinished with ${failed} error(s).`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
