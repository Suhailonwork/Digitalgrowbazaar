import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Hosts allowed to serve the site. Everything else — chiefly the *.vercel.app
 * deployment URLs — is redirected onto the canonical domain so Google never
 * indexes a duplicate origin.
 */
const ALLOWED_HOSTS = new Set(["digitalgrowbazaar.com", "www.digitalgrowbazaar.com"]);
const CANONICAL_ORIGIN = "https://digitalgrowbazaar.com";

/** Next 16 renamed the middleware convention to `proxy`. */
export default async function proxy(request: NextRequest) {
  const canonical = enforceCanonicalHost(request);
  if (canonical) return canonical;

  // Supabase session refresh and the login wall stay scoped to the admin panel.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  return NextResponse.next();
}

function enforceCanonicalHost(request: NextRequest): NextResponse | null {
  // Local dev and preview deployments keep serving on their own hostnames.
  if (process.env.VERCEL_ENV !== "production") return null;

  // Vercel terminates TLS in front of the app, so the host the visitor typed
  // arrives in x-forwarded-host; `host` is the fallback for any other runtime.
  const header = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const host = header.split(",")[0].trim().toLowerCase().replace(/:\d+$/, "");

  if (!host || ALLOWED_HOSTS.has(host)) return null;

  const target = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, CANONICAL_ORIGIN);
  return NextResponse.redirect(target, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
