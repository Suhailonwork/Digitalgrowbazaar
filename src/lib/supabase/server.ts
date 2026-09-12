import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY, SUPABASE_URL, canWriteServerSide, isSupabaseConfigured } from "./config";

/**
 * Cookie-free anon client for public content.
 *
 * Reading published rows needs no session, and avoiding `cookies()` is what
 * lets these queries run inside `unstable_cache` and keeps public pages
 * statically renderable. Never use this for anything user-specific.
 */
let publicClient: ReturnType<typeof createClient> | null = null;

export function createPublicSupabase() {
  if (!isSupabaseConfigured) return null;
  publicClient ??= createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-application-name": "dgb-public" } },
  });
  return publicClient;
}

/** Request-scoped client that reads the signed-in admin session from cookies. */
export async function createServerSupabase() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component — the middleware refreshes the session instead.
        }
      },
    },
  });
}

/**
 * Service-role client. Bypasses RLS, so it must never be imported into a
 * Client Component. Used for public inquiry inserts and admin write actions.
 */
export function createAdminSupabase() {
  if (!canWriteServerSide) return null;
  return createServerClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
}

/** Returns the signed-in user, or null. */
export async function getSessionUser() {
  const supabase = await createServerSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user ?? null;
}
