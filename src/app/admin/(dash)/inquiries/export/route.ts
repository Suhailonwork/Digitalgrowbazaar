import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { adminListInquiries } from "@/lib/admin-data";

const COLUMNS = ["created_at", "name", "email", "phone", "company", "service", "budget", "status", "source_path", "message", "notes"] as const;

/** Escapes a value for CSV, guarding against spreadsheet formula injection. */
function cell(value: unknown) {
  const raw = value == null ? "" : String(value);
  const safe = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return new NextResponse("Unauthorised", { status: 401 });

  const inquiries = await adminListInquiries({ limit: 5000 });
  const rows = [COLUMNS.join(","), ...inquiries.map((inq) => COLUMNS.map((c) => cell(inq[c as keyof typeof inq])).join(","))];
  const stamp = new Date().toISOString().slice(0, 10);

  return new NextResponse(`﻿${rows.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="dgb-enquiries-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
