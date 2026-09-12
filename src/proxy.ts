import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/** Next 16 renamed the middleware convention to `proxy`. */
export default async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
