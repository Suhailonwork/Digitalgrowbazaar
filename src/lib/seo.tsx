import type { Metadata } from "next";
import { getSeoMeta, getSiteSettings } from "@/lib/data";
import { siteConfig } from "@/lib/site";

type MetaInput = {
  path: string;
  title: string;
  description: string;
  keywords?: string | string[];
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
};

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** OG image route — every page gets a generated card unless it supplies its own. */
export function ogImageFor(title: string, subtitle?: string) {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  return `/api/og?${params.toString()}`;
}

/**
 * Builds page metadata, letting Admin → SEO override any field per route.
 * Falls back to the values the page itself passes in.
 */
export async function buildMetadata(input: MetaInput): Promise<Metadata> {
  const [override, settings] = await Promise.all([getSeoMeta(input.path), getSiteSettings()]);

  const title = override?.title || input.title;
  const description = override?.description || input.description || settings.default_seo_description || siteConfig.description;
  const keywords = override?.keywords || (Array.isArray(input.keywords) ? input.keywords.join(", ") : input.keywords);
  const image = override?.og_image || input.image || settings.default_og_image || ogImageFor(title);
  const canonical = override?.canonical || absoluteUrl(input.path);

  // Social copy can differ from the search snippet; it falls back when unset.
  const ogTitle = override?.og_title || title;
  const ogDescription = override?.og_description || description;
  const twitterCard = (override?.twitter_card as "summary" | "summary_large_image" | null) || "summary_large_image";

  const noindex = override?.noindex ?? input.noindex ?? false;
  const nofollow = override?.nofollow ?? false;

  // The root layout appends " | Digital Grow Bazaar". Skip the template when the
  // title already carries the brand, so it is never doubled up.
  const brand = settings.brand_name || siteConfig.name;
  const titleField = title.includes(brand) ? { absolute: title } : title;

  return {
    title: titleField,
    description,
    keywords: keywords || undefined,
    alternates: { canonical },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: input.type ?? "website",
      url: canonical,
      siteName: brand,
      title: ogTitle,
      description: ogDescription,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
    },
    twitter: {
      card: twitterCard,
      title: ogTitle,
      description: ogDescription,
      images: [image],
      ...(settings.twitter_handle ? { site: settings.twitter_handle, creator: settings.twitter_handle } : {}),
    },
  };
}

/* --------------------------------- JSON-LD -------------------------------- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.svg"),
    image: absoluteUrl("/api/og?title=" + encodeURIComponent(siteConfig.name)),
    description: siteConfig.description,
    telephone: siteConfig.phoneHref,
    email: siteConfig.email,
    foundingDate: siteConfig.founded,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "City", name: "Noida" },
      { "@type": "City", name: "Delhi" },
      { "@type": "City", name: "Gurugram" },
    ],
    openingHours: "Mo-Sa 10:00-19:00",
    sameAs: Object.values(siteConfig.socials),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": absoluteUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: absoluteUrl("/blog?q={search_term_string}") },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: { title: string; slug: string; excerpt: string; price_from?: string | null }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    url: absoluteUrl(`/services/${service.slug}`),
    description: service.excerpt,
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: { "@type": "Country", name: "India" },
    ...(service.price_from
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: service.price_from.replace(/[^0-9]/g, "") || undefined,
            url: absoluteUrl(`/services/${service.slug}`),
          },
        }
      : {}),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(post: { title: string; slug: string; excerpt: string; published_at: string; author: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

/** Renders a JSON-LD block. Next dedupes identical scripts across the tree. */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\u003c") }}
        />
      ))}
    </>
  );
}

/**
 * Renders the optional custom JSON-LD an admin saved for this route.
 * Sits alongside the structured data each page already outputs.
 */
export async function CustomJsonLd({ path }: { path: string }) {
  const meta = await getSeoMeta(path);
  if (!meta?.json_ld) return null;

  // The admin form validates this on save, but never trust stored input at render time.
  let parsed: unknown;
  try {
    parsed = JSON.parse(meta.json_ld);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;

  return <JsonLd data={parsed as object | object[]} />;
}
