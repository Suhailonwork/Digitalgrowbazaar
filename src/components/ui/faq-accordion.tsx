"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FAQ } from "@/lib/types";

export function FaqAccordion({ faqs, className = "" }: { faqs: FAQ[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={`divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-100 bg-white ${className}`}>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
              >
                <span className={`font-display text-[1.02rem] font-semibold leading-snug ${isOpen ? "text-brand-700" : "text-ink-900"}`}>
                  {faq.q}
                </span>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-brand-600 text-white" : "bg-ink-50 text-ink-500"
                  }`}
                  aria-hidden
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-6 pb-6 pr-16 text-[0.95rem] leading-relaxed text-ink-500 sm:px-7 sm:pr-20">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
