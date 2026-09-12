-- ===========================================================================
--  Migration 002 — editable page sections
--  Run this in the Supabase SQL Editor, then `npm run seed` again.
--  (This is the same block that now lives at the end of schema.sql, pulled out
--   so an existing project only has to paste the new part.)
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
