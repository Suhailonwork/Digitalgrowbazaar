import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Mail, MessageCircle, Phone, Trash2 } from "lucide-react";
import { AdminPageHeader, StatusPill } from "@/components/admin/page-header";
import { AdminForm, Select, TextArea } from "@/components/admin/form";
import { adminGetInquiry } from "@/lib/admin-data";
import { deleteInquiry, updateInquiry } from "@/app/admin/actions";
import { formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inquiry = await adminGetInquiry(id);
  if (!inquiry) notFound();

  const waHref = `https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hi ${inquiry.name}, thanks for reaching out to Digital Grow Bazaar about ${inquiry.service || "our services"}.`,
  )}`;

  return (
    <>
      <AdminPageHeader
        title={inquiry.name}
        description={`Received ${formatDateTime(inquiry.created_at)} from ${inquiry.source_path || "/"}`}
        actions={
          <Link
            href="/admin/inquiries"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700"
          >
            <ArrowLeft className="size-4" />
            All enquiries
          </Link>
        }
      />

      <div className="grid gap-6 p-5 sm:p-8 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-ink-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-base font-bold tracking-tight text-ink-900">Message</h2>
              <StatusPill status={inquiry.status} />
            </div>
            <p className="mt-4 whitespace-pre-wrap leading-relaxed text-ink-600">{inquiry.message}</p>

            <dl className="mt-6 grid gap-4 border-t border-ink-100 pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Service requested</dt>
                <dd className="mt-1 text-sm font-medium text-ink-800">{inquiry.service || "Not specified"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Budget</dt>
                <dd className="mt-1 text-sm font-medium text-ink-800">{inquiry.budget || "Not specified"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Company</dt>
                <dd className="mt-1 text-sm font-medium text-ink-800">{inquiry.company || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Referrer</dt>
                <dd className="mt-1 truncate text-sm font-medium text-ink-800">{inquiry.page_referrer || "Direct"}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-6">
            <h2 className="font-display text-base font-bold tracking-tight text-ink-900">Update status &amp; notes</h2>
            <p className="mt-1 text-sm text-ink-500">Internal only — the customer never sees these notes.</p>
            <div className="mt-5">
              <AdminForm action={updateInquiry} submitLabel="Save enquiry">
                <input type="hidden" name="id" value={inquiry.id} />
                <Select label="Status" name="status" options={statusOptions} defaultValue={inquiry.status} />
                <TextArea
                  label="Internal notes"
                  name="notes"
                  rows={6}
                  defaultValue={inquiry.notes}
                  placeholder="Called on 12 Sept — asked for a quote on 3 marketplaces, sending proposal Monday."
                />
              </AdminForm>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-ink-200 bg-white p-6">
            <h2 className="font-display text-base font-bold tracking-tight text-ink-900">Reach out</h2>
            <div className="mt-4 space-y-2.5">
              <a
                href={`tel:${inquiry.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-lg border border-ink-200 px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                <Phone className="size-4 text-brand-500" />
                {inquiry.phone}
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-ink-200 px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                <MessageCircle className="size-4 text-brand-500" />
                WhatsApp with intro message
              </a>
              <a
                href={`mailto:${inquiry.email}?subject=${encodeURIComponent("Re: your enquiry to Digital Grow Bazaar")}`}
                className="flex items-center gap-3 rounded-lg border border-ink-200 px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                <Mail className="size-4 text-brand-500" />
                <span className="truncate">{inquiry.email}</span>
              </a>
              {inquiry.company ? (
                <p className="flex items-center gap-3 rounded-lg bg-ink-50 px-4 py-3 text-sm text-ink-600">
                  <Building2 className="size-4 text-ink-400" />
                  {inquiry.company}
                </p>
              ) : null}
            </div>
          </section>

          <section className="rounded-2xl border border-ember-500/30 bg-ember-500/5 p-6">
            <h2 className="font-display text-base font-bold tracking-tight text-ink-900">Danger zone</h2>
            <p className="mt-1 text-sm text-ink-500">Deleting an enquiry is permanent and cannot be undone.</p>
            <form action={deleteInquiry} className="mt-4">
              <input type="hidden" name="id" value={inquiry.id} />
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-ember-500/40 bg-white px-4 text-sm font-semibold text-ember-600 transition-colors hover:bg-ember-500 hover:text-white"
              >
                <Trash2 className="size-4" />
                Delete enquiry
              </button>
            </form>
          </section>
        </aside>
      </div>
    </>
  );
}
