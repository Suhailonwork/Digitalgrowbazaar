"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, LogIn, TriangleAlert } from "lucide-react";
import { signIn } from "@/app/admin/actions";
import { idleState } from "@/lib/form-state";

const control =
  "w-full rounded-lg border border-ink-200 bg-white px-3.5 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : <LogIn className="size-4" />}
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useActionState(signIn, idleState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-700">Email</span>
        <input name="email" type="email" required autoComplete="email" placeholder="you@digitalgrowbazaar.com" className={control} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-700">Password</span>
        <input name="password" type="password" required autoComplete="current-password" placeholder="••••••••" className={control} />
      </label>

      {state.status === "error" ? (
        <p role="alert" className="flex items-start gap-2.5 rounded-lg border border-ember-500/30 bg-ember-500/8 px-4 py-3 text-sm text-ember-600">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          {state.message}
        </p>
      ) : null}

      <Submit />
    </form>
  );
}
