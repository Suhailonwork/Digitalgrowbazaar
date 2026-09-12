import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/site/logo";
import { isSupabaseConfigured, missingSupabaseEnvVar } from "@/lib/supabase/config";

export const metadata = { title: "Sign in", robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Logo />
          <h1 className="mt-10 font-display text-2xl font-bold tracking-tight text-ink-900">Sign in to the admin panel</h1>
          <p className="mt-2 text-sm text-ink-500">Manage enquiries, SEO, services and site content.</p>

          {!isSupabaseConfigured ? (
            <div className="mt-6 rounded-lg border border-ember-500/30 bg-ember-500/8 px-4 py-3.5 text-sm text-ember-600">
              <strong className="font-semibold">{missingSupabaseEnvVar()}</strong> is missing from your <code className="font-mono">.env</code> file.
              Add it, restart the dev server, then sign in with a user created in Supabase Authentication.
            </div>
          ) : null}

          <div className="mt-8">
            <LoginForm next={next || "/admin"} />
          </div>

          <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-brand-700">
            <ArrowLeft className="size-4" />
            Back to website
          </Link>
        </div>
      </div>

      <div className="surface-dark relative hidden overflow-hidden lg:block">
        <div className="grid-lines pointer-events-none absolute inset-0 text-white/40 opacity-25" aria-hidden />
        <div className="relative flex h-full flex-col justify-center px-16">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-aqua-400 ring-1 ring-inset ring-white/15">
            <ShieldCheck className="size-6" strokeWidth={1.75} />
          </span>
          <h2 className="mt-8 max-w-md font-display text-3xl font-bold leading-tight text-white text-balance">
            Everything on the public site is editable from here.
          </h2>
          <ul className="mt-8 space-y-3.5 text-ink-300">
            {[
              "Read and triage every contact-form enquiry",
              "Override title, description and JSON-LD per URL",
              "Add or edit services, pages and articles",
              "Update contact details site-wide in one place",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-aqua-400" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
