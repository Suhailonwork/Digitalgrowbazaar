/**
 * Supabase renamed its API keys: `anon` → publishable (`sb_publishable_…`) and
 * `service_role` → secret (`sb_secret_…`). Both naming schemes are accepted, so
 * the keys work whether they were copied from the current dashboard or from an
 * older project using the legacy JWT keys.
 *
 * These must stay as literal `process.env.NEXT_PUBLIC_*` lookups. Next.js
 * inlines public env vars by static analysis, so a dynamic `process.env[name]`
 * would compile to `undefined` in the browser bundle — and this module reaches
 * the client through `client.ts`.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";

/** SERVER ONLY. Bypasses RLS — never import into a Client Component. */
export const SUPABASE_SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";

/** True once a project URL + publishable key exist. Everything degrades to seed content otherwise. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

/** Service-role writes (contact form inserts, admin mutations) need the secret key too. */
export const canWriteServerSide = Boolean(isSupabaseConfigured && SUPABASE_SECRET_KEY);

/** Names the first missing variable, for actionable setup errors. */
export function missingSupabaseEnvVar(): string | null {
  if (!SUPABASE_URL) return "NEXT_PUBLIC_SUPABASE_URL";
  if (!SUPABASE_PUBLISHABLE_KEY) return "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY";
  return null;
}
