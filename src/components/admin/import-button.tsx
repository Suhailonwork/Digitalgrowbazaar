"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, DownloadCloud, Loader2, TriangleAlert } from "lucide-react";
import { importSeedContent } from "@/app/admin/actions";
import { idleState } from "@/lib/form-state";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : <DownloadCloud className="size-4" />}
      {pending ? "Importing…" : "Import starter content"}
    </button>
  );
}

/** One-click copy of the built-in catalogue into Supabase. Safe to re-run. */
export function ImportSeedButton() {
  const [state, formAction] = useActionState(importSeedContent, idleState);

  return (
    <form action={formAction} className="space-y-3">
      <Submit />
      {state.status !== "idle" && state.message ? (
        <p
          role="status"
          className={`flex items-start gap-2 text-sm ${state.status === "success" ? "text-emerald-600" : "text-ember-600"}`}
        >
          {state.status === "success" ? <CheckCircle2 className="mt-0.5 size-4 shrink-0" /> : <TriangleAlert className="mt-0.5 size-4 shrink-0" />}
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
