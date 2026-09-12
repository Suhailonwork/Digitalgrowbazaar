-- ===========================================================================
--  Digital Grow Bazaar — Supabase schema
--  Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
--  Afterwards, sign in to /admin and click "Import starter content" to populate
--  the tables from the site's built-in catalogue.
-- ===========================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- helpers --
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------------------------------- service_categories
create table if not exists public.service_categories (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,
  blurb        text not null default '',
  icon         text not null default 'Sparkles',
  order_index  int  not null default 99,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ------------------------------------------------------------------ services
create table if not exists public.services (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  category_slug   text not null references public.service_categories(slug) on update cascade on delete restrict,
  title           text not null,
  menu_label      text not null default '',
  excerpt         text not null default '',
  icon            text not null default 'Sparkles',
  body            text not null default '',
  features        jsonb not null default '[]'::jsonb,
  outcomes        jsonb not null default '[]'::jsonb,
  process         jsonb not null default '[]'::jsonb,
  faqs            jsonb not null default '[]'::jsonb,
  price_from      text,
  is_featured     boolean not null default false,
  is_published    boolean not null default true,
  order_index     int not null default 99,
  seo_title       text,
  seo_description text,
  seo_keywords    text,
  og_image        text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists services_category_idx on public.services (category_slug, order_index);
create index if not exists services_published_idx on public.services (is_published);

-- --------------------------------------------------------------------- pages
create table if not exists public.pages (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null,
  subtitle        text,
  body            text not null default '',
  is_published    boolean not null default true,
  seo_title       text,
  seo_description text,
  seo_keywords    text,
  og_image        text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- --------------------------------------------------------------------- posts
create table if not exists public.posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null,
  excerpt         text not null default '',
  body            text not null default '',
  cover_image     text,
  author          text not null default 'Digital Grow Bazaar',
  tags            text[] not null default '{}',
  published_at    date not null default current_date,
  is_published    boolean not null default true,
  seo_title       text,
  seo_description text,
  seo_keywords    text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists posts_published_idx on public.posts (is_published, published_at desc);

-- -------------------------------------------------------------- testimonials
create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  role         text not null default '',
  company      text not null default '',
  quote        text not null,
  rating       int not null default 5 check (rating between 1 and 5),
  avatar_url   text,
  is_published boolean not null default true,
  order_index  int not null default 99,
  created_at   timestamptz not null default now()
);

-- --------------------------------------------------------------- case_studies
create table if not exists public.case_studies (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  client       text not null,
  industry     text not null default '',
  headline     text not null,
  summary      text not null default '',
  metrics      jsonb not null default '[]'::jsonb,
  services     text[] not null default '{}',
  cover_image  text,
  is_published boolean not null default true,
  order_index  int not null default 99,
  created_at   timestamptz not null default now()
);

-- ------------------------------------------------------------------ seo_meta
create table if not exists public.seo_meta (
  id          uuid primary key default gen_random_uuid(),
  path        text unique not null,
  title       text,
  description text,
  keywords    text,
  og_image    text,
  canonical   text,
  noindex     boolean not null default false,
  json_ld     text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------- inquiries
create table if not exists public.inquiries (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text not null,
  company       text,
  service       text,
  budget        text,
  message       text not null,
  source_path   text,
  page_referrer text,
  status        text not null default 'new' check (status in ('new','contacted','qualified','won','lost')),
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists inquiries_created_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

-- ------------------------------------------------------------- site_settings
create table if not exists public.site_settings (
  id                      uuid primary key default gen_random_uuid(),
  brand_name              text not null default 'Digital Grow Bazaar',
  tagline                 text not null default '',
  phone                   text not null default '',
  email                   text not null default '',
  whatsapp                text not null default '',
  address                 text not null default '',
  instagram               text,
  facebook                text,
  linkedin                text,
  youtube                 text,
  ga_id                   text,
  default_seo_title       text,
  default_seo_description text,
  default_og_image        text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- ------------------------------------------------------------------ triggers
do $$
declare t text;
begin
  foreach t in array array['service_categories','services','pages','posts','seo_meta','inquiries','site_settings']
  loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;

-- ===========================================================================
--  Row Level Security
--  Public visitors: read published content, and submit an enquiry.
--  Signed-in users (your admin accounts): full control.
-- ===========================================================================
alter table public.service_categories enable row level security;
alter table public.services           enable row level security;
alter table public.pages              enable row level security;
alter table public.posts              enable row level security;
alter table public.testimonials       enable row level security;
alter table public.case_studies       enable row level security;
alter table public.seo_meta           enable row level security;
alter table public.inquiries          enable row level security;
alter table public.site_settings      enable row level security;

-- Public read of published rows -------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['service_categories','services','pages','posts','testimonials','case_studies']
  loop
    execute format('drop policy if exists "public read published" on public.%I', t);
    execute format(
      'create policy "public read published" on public.%I for select to anon, authenticated using (is_published = true)', t);
  end loop;
end $$;

-- seo_meta and site_settings are readable by everyone (they only hold metadata)
drop policy if exists "public read seo" on public.seo_meta;
create policy "public read seo" on public.seo_meta
  for select to anon, authenticated using (true);

drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings
  for select to anon, authenticated using (true);

-- Anyone may submit an enquiry, nobody anonymous may read one --------------
drop policy if exists "anon can submit inquiry" on public.inquiries;
create policy "anon can submit inquiry" on public.inquiries
  for insert to anon, authenticated with check (true);

drop policy if exists "admins read inquiries" on public.inquiries;
create policy "admins read inquiries" on public.inquiries
  for select to authenticated using (true);

drop policy if exists "admins update inquiries" on public.inquiries;
create policy "admins update inquiries" on public.inquiries
  for update to authenticated using (true) with check (true);

drop policy if exists "admins delete inquiries" on public.inquiries;
create policy "admins delete inquiries" on public.inquiries
  for delete to authenticated using (true);

-- Signed-in admins can write everything else ------------------------------
do $$
declare t text;
begin
  foreach t in array array['service_categories','services','pages','posts','testimonials','case_studies','seo_meta','site_settings']
  loop
    execute format('drop policy if exists "admins full access" on public.%I', t);
    execute format(
      'create policy "admins full access" on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- ===========================================================================
--  Next steps
--  1. Authentication → Users → Add user: create your admin login.
--  2. Sign in at /admin/login.
--  3. Dashboard → "Import starter content" to load the built-in catalogue.
--
--  NOTE: every signed-in Supabase user is an admin here. If you ever enable
--  public sign-ups, replace `to authenticated using (true)` above with a check
--  against an allow-list table, e.g.
--     using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
-- ===========================================================================

-- ===========================================================================
--  Navigation, header and extended meta support
--  Added after the initial release. This whole file is idempotent, so you can
--  safely paste and re-run it over an existing project.
-- ===========================================================================

-- ---------------------------------------------------------------- menu_items
create table if not exists public.menu_items (
  id              uuid primary key default gen_random_uuid(),
  label           text not null,
  href            text unique not null,
  order_index     int  not null default 99,
  is_published    boolean not null default true,
  open_in_new_tab boolean not null default false,
  badge           text,
  has_mega        boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists menu_items_order_idx on public.menu_items (order_index);

-- Header, mega-menu promo and verification/meta fields -----------------------
alter table public.site_settings add column if not exists header_notice        text;
alter table public.site_settings add column if not exists header_cta_label     text;
alter table public.site_settings add column if not exists header_cta_href      text;
alter table public.site_settings add column if not exists menu_promo_title     text;
alter table public.site_settings add column if not exists menu_promo_text      text;
alter table public.site_settings add column if not exists menu_promo_cta_label text;
alter table public.site_settings add column if not exists menu_promo_cta_href  text;
alter table public.site_settings add column if not exists favicon_url          text;
alter table public.site_settings add column if not exists twitter_handle       text;
alter table public.site_settings add column if not exists google_verification  text;
alter table public.site_settings add column if not exists bing_verification    text;
alter table public.site_settings add column if not exists gtm_id               text;
alter table public.site_settings add column if not exists fb_pixel_id          text;

-- Per-route social and robots control ---------------------------------------
alter table public.seo_meta add column if not exists og_title       text;
alter table public.seo_meta add column if not exists og_description text;
alter table public.seo_meta add column if not exists twitter_card   text;
alter table public.seo_meta add column if not exists nofollow       boolean not null default false;

-- Triggers, RLS and policies for the new table ------------------------------
drop trigger if exists set_updated_at on public.menu_items;
create trigger set_updated_at before update on public.menu_items
  for each row execute function public.touch_updated_at();

alter table public.menu_items enable row level security;

drop policy if exists "public read published" on public.menu_items;
create policy "public read published" on public.menu_items
  for select to anon, authenticated using (is_published = true);

drop policy if exists "admins full access" on public.menu_items;
create policy "admins full access" on public.menu_items
  for all to authenticated using (true) with check (true);

-- Default primary navigation (only inserted when the href is not already there)
insert into public.menu_items (label, href, order_index, has_mega) values
  ('Home',     '/',         1, false),
  ('About',    '/about',    2, false),
  ('Services', '/services', 3, true),
  ('Work',     '/work',     4, false),
  ('Insights', '/blog',     5, false),
  ('Contact',  '/contact',  6, false)
on conflict (href) do nothing;

-- ===========================================================================
--  Editable content blocks
--  Homepage / about / contact sections that used to be hard-coded in the
--  components. Each row is one section, stored as JSON so the shape can grow
--  without a migration. Edited from Admin → Content.
-- ===========================================================================

create table if not exists public.content_blocks (
  id          uuid primary key default gen_random_uuid(),
  key         text unique not null,
  label       text not null default '',
  description text,
  data        jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists set_updated_at on public.content_blocks;
create trigger set_updated_at before update on public.content_blocks
  for each row execute function public.touch_updated_at();

alter table public.content_blocks enable row level security;

drop policy if exists "public read blocks" on public.content_blocks;
create policy "public read blocks" on public.content_blocks
  for select to anon, authenticated using (true);

drop policy if exists "admins full access" on public.content_blocks;
create policy "admins full access" on public.content_blocks
  for all to authenticated using (true) with check (true);
