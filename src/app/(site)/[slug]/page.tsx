import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/page-hero";
import { getPage, getPages } from "@/lib/data";
import { CustomJsonLd, JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";

export const revalidate = 3600;

/** Catch-all for CMS pages created in Admin → Pages (privacy policy, terms, landing pages…). */
export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Page not found" };

  return buildMetadata({
    path: `/${page.slug}`,
    title: page.seo_title || page.title,
    description: page.seo_description || page.subtitle || `${page.title} — Digital Grow Bazaar`,
    keywords: page.seo_keywords || undefined,
    image: page.og_image,
  });
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <>
      <CustomJsonLd path={`/${page.slug}`} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: page.title, path: `/${page.slug}` },
        ])}
      />
      <PageHero
        title={page.title}
        description={page.subtitle ?? undefined}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: page.title, path: `/${page.slug}` }]}
      />
      <section className="bg-white py-18 lg:py-22">
        <div className="container-x max-w-3xl">
          <div className="prose-dgb" dangerouslySetInnerHTML={{ __html: page.body }} />
          {page.updated_at ? <p className="mt-12 border-t border-ink-100 pt-6 text-sm text-ink-400">Last updated {formatDate(page.updated_at)}</p> : null}
        </div>
      </section>
    </>
  );
}
