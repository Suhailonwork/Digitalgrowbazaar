# Digital Grow Bazaar

A full marketing + e-commerce agency website with a built-in admin panel, built on **Next.js 16 (App Router) + Supabase + Tailwind v4**.

Services covered: web development, digital marketing, videography, product photoshoots, e-commerce business training, and Amazon / Flipkart / Meesho account management.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

**The site runs with no configuration.** Without Supabase keys it renders from a built-in catalogue of 25 services, 3 articles, 3 case studies, testimonials and policy pages, so you can see the finished design immediately. Connect Supabase to make all of it editable and to start collecting enquiries.

---

## Connecting Supabase (about 5 minutes)

1. Create a free project at [supabase.com](https://supabase.com/dashboard).
2. **SQL Editor → New query** → paste all of [`supabase/schema.sql`](supabase/schema.sql) → Run. This creates every table, index, trigger and RLS policy. The file is idempotent, so re-run it any time you pull updates.
3. **Project Settings → API Keys** → copy the Project URL, the **publishable** key and the **secret** key into `.env`:

   ```env
   NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   SUPABASE_SECRET_KEY=sb_secret_...     # server only — never prefix with NEXT_PUBLIC_
   ```

   > Supabase renamed these keys (`anon` → publishable, `service_role` → secret). The legacy names
   > `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are still accepted, so older
   > projects work unchanged.

4. **Authentication → Users → Add user** — this is your admin login.
5. Load the content into your database:

   ```bash
   npm run seed
   ```

   This upserts every service, category, menu item, article, page, testimonial, case study, page section and the default per-route meta tags. It is idempotent, so re-run it any time. (The same thing is available as **Import starter content** on the admin dashboard.)

6. Restart the dev server and sign in at `/admin/login`.

> **If seeded content does not appear**, clear Next's persisted data cache: `rm -rf .next/cache`. Edits made *through the admin panel* bust that cache automatically; a CLI seed cannot.

> Every signed-in Supabase user is an admin. If you ever enable public sign-ups, tighten the policies at the bottom of `schema.sql` to check against an allow-list table.

---

## Admin panel — `/admin`

| Section | What it does |
| --- | --- |
| **Dashboard** | Enquiry counts, pipeline breakdown, latest submissions, content status |
| **Enquiries** | Every contact-form submission — filter by status, search by name/email/phone, open a record to set status and internal notes, one-click call/WhatsApp/email, **CSV export** |
| **SEO manager** | Per-URL meta tags: title, description, keywords, canonical, OG image, separate social title/description, Twitter card type, `noindex`, `nofollow` and custom JSON-LD — with a live Google preview and character counters. Works on any URL, including ones not in the list |
| **Menu builder** | Add, edit, delete and reorder top-navigation links (badges, new-tab, visibility, which one opens the mega menu) and every mega-menu column — plus reorder the services inside each column |
| **Page content** | Every section that used to be hard-coded: hero headline and buttons, stats, platform marquee, "why us" pillars, process steps, marketplace cards, homepage and contact FAQs, About values/timeline/team, and the budget dropdown. Edited as plain text (one item per line, `a \| b` for columns) — never raw JSON |
| **Services** | Full CRUD on the 25 services: content, features, outcomes, process, FAQs, pricing, icon, category, publish/feature flags and per-service SEO |
| **Pages** | Standalone pages published at `/your-slug` |
| **Articles** | Blog posts at `/blog/your-slug` |
| **Site settings** | Contact details, header notice bar and button, mega-menu promo card, socials, default meta tags, favicon, Twitter handle, Google/Bing verification, and GA4 / GTM / Meta Pixel IDs — all applied site-wide |

Saving anything busts the matching cache tag and purges the affected routes, so public pages update within a second — no redeploy.

---

## SEO

- Per-route `generateMetadata`, overridable from **Admin → SEO manager**
- Structured data: `ProfessionalService`, `WebSite` + `SearchAction`, `BreadcrumbList`, `Service` + `Offer`, `FAQPage`, `BlogPosting`, plus any custom JSON-LD you add per URL
- Dynamic [`/sitemap.xml`](src/app/sitemap.ts) (37 URLs, grows with your content) and [`/robots.txt`](src/app/robots.ts)
- Generated Open Graph cards at [`/api/og`](src/app/api/og/route.tsx) — every page gets a branded share image with no design work
- The mega menu is server-rendered, so all 25 service pages are linked from every page in the crawlable HTML
- Canonical URLs, `en-IN` locale, semantic headings, and FAQ blocks on the home, services and every service page
- Site-wide verification meta tags, favicon and social handle set from the admin, with GA4, GTM and Meta Pixel loaded `afterInteractive` so tracking never blocks paint

---

## Performance

Measured on the production build, homepage, warm:

| | |
| --- | --- |
| TTFB | **~7 ms** (statically prerendered) |
| HTML | **~62 KB** gzipped |
| JS | **~186 KB** gzipped — of which ~150 KB is the React 19 + Next 16 baseline |

What makes it fast:

- **Every public page is prerendered**, revalidated hourly and purged on demand when an admin saves.
- **Public reads use a cookie-free anon Supabase client** wrapped in `unstable_cache`. Without cookies the pages stay statically renderable, and the database is touched roughly once per cache tag rather than once per request.
- **Tag-based invalidation** (`TAGS` in `lib/data.ts`) means an edit is live immediately without dropping the whole cache.
- **The scroll reveal animation is pure CSS** (`animation-timeline: view()`), so ~30 elements per page animate with zero JavaScript and zero `IntersectionObserver` instances. Browsers without support render the content immediately.
- **The mobile drawer's service list is built on first open**, keeping the duplicated catalogue out of every page's HTML. The desktop mega menu keeps all 25 links crawlable.
- `optimizePackageImports` for `lucide-react` and the Supabase SDKs, `preconnect` to Supabase, self-hosted fonts with `display: swap`, and long-lived cache headers on generated OG images.

---

## Project layout

```
src/
  app/
    (site)/            Public site — home, services, service detail, about,
                       work, blog, contact, CMS pages, 404
    admin/
      login/           Sign-in screen
      (dash)/          Sidebar shell + dashboard, enquiries, SEO, menu builder,
                       services, pages, articles, settings
      actions.ts       All admin server actions (auth-guarded)
    actions/contact.ts Public contact-form server action
    api/og/            Open Graph image generation
    sitemap.ts robots.ts
  components/
    site/              Header + mega menu, footer, contact form, page hero
    home/              Homepage sections
    ui/                Buttons, cards, FAQ accordion, icons, reveal
    admin/             Admin form kit, sidebar, SEO form, menu editors, seed importer
  lib/
    content/           Built-in catalogue + page sections (the no-database fallback)
    blocks-format.ts   Turns section JSON into plain-text form fields and back
    data.ts            Public readers — Supabase with fallback to seed content
    admin-data.ts      Admin readers — see drafts and unpublished rows
    seo.tsx            Metadata builder + JSON-LD helpers
    supabase/          Browser, server, service-role clients + auth guard
  proxy.ts             Protects /admin, refreshes the auth session
scripts/seed.ts        `npm run seed` — pushes all content into Supabase
supabase/schema.sql    Tables, indexes, triggers, RLS policies
supabase/migrations/   Incremental SQL for projects created before a change
```

### How the fallback works

Every reader in `lib/data.ts` asks Supabase first and falls back to `lib/content` if Supabase is absent, errors, or returns no rows. The public site therefore stays up during a migration, a key rotation, or an outage — and `npm run dev` works on a fresh clone with no keys at all.

The same applies to page sections: `getBlock("home.hero")` returns the Supabase row when present, otherwise the built-in copy from `lib/content/blocks.ts`. The *shape* always comes from the built-in copy, so a malformed row can never break a component.

### What lives where

| Content | Table | Edited in |
| --- | --- | --- |
| Services & categories | `services`, `service_categories` | Admin → Services / Menu builder |
| Navigation & mega menu | `menu_items`, `service_categories` | Admin → Menu builder |
| Page sections (hero, stats, FAQs, …) | `content_blocks` | Admin → Page content |
| Per-URL meta tags | `seo_meta` | Admin → SEO manager |
| Brand, contact, tracking, defaults | `site_settings` | Admin → Site settings |
| Articles, pages, testimonials, case studies | `posts`, `pages`, `testimonials`, `case_studies` | Admin → Articles / Pages |
| Contact-form submissions | `inquiries` | Admin → Enquiries |

---

## Customising the brand

- **Name, phone, email, address, socials, stats** — `src/lib/site.ts`, then override at runtime in **Admin → Site settings**.
- **Colours and fonts** — the `@theme` block at the top of `src/app/globals.css`. The palette is indigo-violet (`brand`), cyan (`aqua`) and ember orange, with an `ink` neutral ramp.
- **Logo** — `src/components/site/logo.tsx` (inline SVG, no image asset needed).
- **Services and menu** — build them in **Admin → Menu builder**, or change `src/lib/content/services.ts` and `services-b.ts` for the built-in defaults. The header, footer and services page all follow the order set there.

> The placeholder phone, email and address in `src/lib/site.ts` are examples. Replace them before going live.

---

## Deploying

Works on any Node host; Vercel is the easiest path.

1. Push to Git and import the repo.
2. Add the same four environment variables, with `NEXT_PUBLIC_SITE_URL` set to your real domain (this drives canonicals, the sitemap and OG URLs).
3. Deploy. Then submit `/sitemap.xml` in Google Search Console and set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` for the verification meta tag.

```bash
npm run build    # production build
npm start        # serve it
npm run lint
```

---

## Notes

- Contact submissions are written server-side with the service-role key, so the anon key is never trusted with writes. The form also has a honeypot field.
- Without `SUPABASE_SERVICE_ROLE_KEY` the contact form still validates and responds, but tells you it is in demo mode rather than silently dropping the enquiry.
- `/admin` and `/api/` are disallowed in `robots.txt`, and every admin page sends `noindex`.
