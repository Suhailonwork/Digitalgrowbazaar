import Link from "next/link";
import { Database, ExternalLink } from "lucide-react";

const steps = [
  { title: "Create a Supabase project", detail: "Go to supabase.com, create a free project and wait for it to finish provisioning." },
  { title: "Run the schema", detail: "Open the SQL Editor and paste the contents of supabase/schema.sql from this repository, then run it." },
  { title: "Copy your API keys", detail: "Project Settings → API Keys. Copy the Project URL, the publishable key (sb_publishable_…) and the secret key (sb_secret_…)." },
  {
    title: "Fill in .env",
    detail:
      "Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY and SUPABASE_SECRET_KEY, then restart the dev server. The legacy names (NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY) still work if your project predates the rename.",
  },
  { title: "Create your admin user", detail: "Authentication → Users → Add user. Use that email and password to sign in here." },
  { title: "Import the starter content", detail: "Once signed in, the dashboard offers a one-click import that copies all 25 services, articles and policy pages into your database so they become editable." },
];

export function SetupNotice() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-aqua-500 text-white">
        <Database className="size-6" strokeWidth={1.75} />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink-900">Connect Supabase to unlock the admin panel</h1>
      <p className="mt-3 leading-relaxed text-ink-500">
        The public website is running on built-in seed content, so it works right now. The admin panel, dynamic pages and the contact-form inbox need
        a Supabase project. It takes about five minutes.
      </p>

      <ol className="mt-9 space-y-4">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4 rounded-2xl border border-ink-200 bg-white p-5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 font-display text-sm font-bold text-brand-700">
              {i + 1}
            </span>
            <span>
              <span className="block font-semibold text-ink-900">{step.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-ink-500">{step.detail}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Open Supabase <ExternalLink className="size-4" />
        </a>
        <Link href="/" className="inline-flex h-11 items-center gap-2 rounded-lg border border-ink-200 bg-white px-5 text-sm font-semibold text-ink-700">
          Back to website
        </Link>
      </div>
    </div>
  );
}
