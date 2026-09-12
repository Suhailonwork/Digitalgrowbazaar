import { ExternalLink } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { BlockEditor } from "@/components/admin/block-editor";
import { adminListBlocks } from "@/lib/admin-data";
import { resetBlock } from "@/app/admin/actions";
import { CONTENT_BLOCKS } from "@/lib/content/blocks";
import { serializeBlock, shapeOf } from "@/lib/blocks-format";

export const dynamic = "force-dynamic";

const GROUPS = [
  { prefix: "home.", title: "Homepage", note: "Every section on the homepage, top to bottom." },
  { prefix: "about.", title: "About page", note: "Values, company timeline and team breakdown." },
  { prefix: "contact.", title: "Contact & forms", note: "Contact FAQs and the budget dropdown used in every enquiry form." },
];

export default async function AdminContentPage() {
  const saved = await adminListBlocks();

  return (
    <>
      <AdminPageHeader
        title="Page content"
        description="Headlines, stats, cards and FAQs across the site. Anything you have not edited falls back to the built-in copy."
        actions={
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-700"
          >
            Preview site <ExternalLink className="size-3.5" />
          </a>
        }
      />

      <div className="space-y-8 p-5 sm:p-8">
        {GROUPS.map((group) => {
          const blocks = CONTENT_BLOCKS.filter((b) => b.key.startsWith(group.prefix));
          if (blocks.length === 0) return null;

          return (
            <section key={group.prefix}>
              <h2 className="font-display text-lg font-bold tracking-tight text-ink-900">{group.title}</h2>
              <p className="mt-1 text-sm text-ink-500">{group.note}</p>

              <div className="mt-4 space-y-3">
                {blocks.map((block) => {
                  // The shape always comes from the built-in copy, so a saved row
                  // can never change the structure the components expect.
                  const shape = shapeOf(block.data);
                  const current = saved[block.key] ?? block.data;
                  return (
                    <BlockEditor
                      key={block.key}
                      blockKey={block.key}
                      label={block.label}
                      description={block.description}
                      shape={shape}
                      values={serializeBlock(shape, current)}
                      isOverridden={block.key in saved}
                      resetAction={resetBlock}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
