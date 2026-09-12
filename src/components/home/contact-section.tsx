import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/section";
import { ContactForm } from "@/components/site/contact-form";
import { getBlock, getServices, getSiteSettings } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export async function HomeContactSection() {
  const [services, settings, budgets] = await Promise.all([
    getServices(),
    getSiteSettings(),
    getBlock<string[]>("contact.budgets"),
  ]);
  const options = services.map((s) => ({ slug: s.slug, title: s.title }));

  return (
    <section className="bg-white py-20 lg:py-26" id="enquiry">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Start here"
            title={<>Tell us what is stuck. We will tell you what we would do.</>}
            description="Fill this in and a strategist — not a salesperson — reviews your business before calling you back."
          />

          <ul className="mt-10 space-y-5">
            <li className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Phone className="size-5" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">Call or WhatsApp</span>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="font-display text-lg font-bold text-ink-900 hover:text-brand-700">
                  {settings.phone}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Mail className="size-5" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">Email</span>
                <a href={`mailto:${settings.email}`} className="font-display text-lg font-bold text-ink-900 hover:text-brand-700">
                  {settings.email}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <MapPin className="size-5" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">Studio & office</span>
                <span className="block text-[0.98rem] font-medium text-ink-700">{settings.address}</span>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Clock className="size-5" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">Working hours</span>
                <span className="block text-[0.98rem] font-medium text-ink-700">{siteConfig.hours}</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-4xl border border-ink-100 bg-ink-50/60 p-6 shadow-card sm:p-9">
          <ContactForm services={options} budgets={budgets} />
        </div>
      </div>
    </section>
  );
}
