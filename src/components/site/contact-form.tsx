"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { usePathname } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { submitInquiry } from "@/app/actions/contact";
import { initialContactState } from "@/lib/form-state";

const fieldBase =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.95rem] text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(74,63,224,0.8)] transition-all hover:bg-brand-700 disabled:opacity-70 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="size-4.5 animate-spin" /> Sending…
        </>
      ) : (
        <>
          Send my enquiry <ArrowRight className="size-4.5" />
        </>
      )}
    </button>
  );
}

export function ContactForm({
  services,
  defaultService,
  budgets = [],
}: {
  services: { slug: string; title: string }[];
  defaultService?: string;
  budgets?: string[];
}) {
  const [state, formAction] = useActionState(submitInquiry, initialContactState);
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="source_path" value={pathname} />
      {/* Honeypot — hidden from users, catches naive bots. */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="company_website">Do not fill this in</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
            Your name <span className="text-ember-500">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Rahul Sharma" className={fieldBase} />
          {state.errors?.name ? <p className="mt-1.5 text-xs text-ember-600">{state.errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-700">
            Phone / WhatsApp <span className="text-ember-500">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" className={fieldBase} />
          {state.errors?.phone ? <p className="mt-1.5 text-xs text-ember-600">{state.errors.phone}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
            Email <span className="text-ember-500">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={fieldBase} />
          {state.errors?.email ? <p className="mt-1.5 text-xs text-ember-600">{state.errors.email}</p> : null}
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink-700">
            Company / brand
          </label>
          <input id="company" name="company" type="text" autoComplete="organization" placeholder="Optional" className={fieldBase} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink-700">
            What do you need?
          </label>
          <select id="service" name="service" defaultValue={defaultService ?? ""} className={fieldBase}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Multiple services">Multiple services / not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-ink-700">
            Indicative budget
          </label>
          <select id="budget" name="budget" defaultValue="" className={fieldBase}>
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
          Tell us about your business <span className="text-ember-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="What you sell, where you sell it, and what is not working right now."
          className={`${fieldBase} resize-y`}
        />
        {state.errors?.message ? <p className="mt-1.5 text-xs text-ember-600">{state.errors.message}</p> : null}
      </div>

      {state.status !== "idle" && state.message ? (
        <div
          role="status"
          aria-live="polite"
          className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm ${
            state.status === "success" ? "border-aqua-500/30 bg-aqua-500/8 text-aqua-600" : "border-ember-500/30 bg-ember-500/8 text-ember-600"
          }`}
        >
          {state.status === "success" ? (
            <CheckCircle2 className="mt-0.5 size-4.5 shrink-0" />
          ) : (
            <TriangleAlert className="mt-0.5 size-4.5 shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />
        <p className="text-xs leading-relaxed text-ink-400 sm:max-w-[16rem]">
          We reply within one working day. Your details are never shared or sold.
        </p>
      </div>
    </form>
  );
}
