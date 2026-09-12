"use server";

import { headers } from "next/headers";
import { createAdminSupabase } from "@/lib/supabase/server";
import { canWriteServerSide, isSupabaseConfigured } from "@/lib/supabase/config";
import type { Inquiry } from "@/lib/types";
import type { ContactState } from "@/lib/form-state";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{8,18}$/;

export async function submitInquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never fill a hidden field.
  if ((formData.get("company_website") as string)?.trim()) {
    return { status: "success", message: "Thank you — we will be in touch shortly.", stored: false };
  }

  const name = ((formData.get("name") as string) || "").trim();
  const email = ((formData.get("email") as string) || "").trim().toLowerCase();
  const phone = ((formData.get("phone") as string) || "").trim();
  const company = ((formData.get("company") as string) || "").trim();
  const service = ((formData.get("service") as string) || "").trim();
  const budget = ((formData.get("budget") as string) || "").trim();
  const message = ((formData.get("message") as string) || "").trim();
  const sourcePath = ((formData.get("source_path") as string) || "/contact").trim();

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (message.length < 10) errors.message = "Tell us a little more — at least 10 characters.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please correct the highlighted fields.", errors };
  }

  const record: Inquiry = {
    name, email, phone,
    company: company || null,
    service: service || null,
    budget: budget || null,
    message,
    source_path: sourcePath,
    status: "new",
  };

  if (!isSupabaseConfigured || !canWriteServerSide) {
    // Demo mode: no database wired up yet. Say so rather than pretending it saved.
    console.info("[contact] Supabase not configured — inquiry not persisted:", record);
    return {
      status: "success",
      stored: false,
      message: "Thanks! Your details were received. (Demo mode: connect Supabase to store enquiries in the admin panel.)",
    };
  }

  try {
    const hdrs = await headers();
    const supabase = createAdminSupabase();
    if (!supabase) throw new Error("admin client unavailable");

    const { error } = await supabase.from("inquiries").insert({
      ...record,
      page_referrer: hdrs.get("referer") || null,
    });
    if (error) throw error;

    return { status: "success", stored: true, message: "Thank you! Our team will call you back within one working day." };
  } catch (err) {
    console.error("[contact] failed to store inquiry", err);
    return {
      status: "error",
      message: "Something went wrong on our side. Please call or WhatsApp us instead — we do not want to lose your enquiry.",
    };
  }
}
