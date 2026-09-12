/**
 * Absolute origin used for canonicals, Open Graph and the sitemap. Set
 * NEXT_PUBLIC_SITE_URL in the host environment; the Vercel-provided domains are
 * a fallback so a forgotten variable never publishes localhost URLs to Google.
 */
function resolveSiteUrl(): string {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    "http://localhost:3000";
  const withProtocol = /^https?:\/\//.test(candidate) ? candidate : `https://${candidate}`;
  try {
    // Hostnames are case-insensitive, so parse and re-emit a single canonical
    // spelling — otherwise <loc> and rel=canonical can disagree with each other.
    const parsed = new URL(withProtocol);
    return `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, "");
  } catch {
    return withProtocol.replace(/\/+$/, "");
  }
}

/** Static brand facts. Anything here can be overridden from Admin → Settings. */
export const siteConfig = {
  name: "Digital Grow Bazaar",
  shortName: "DGB",
  legalName: "Digital Grow Bazaar",
  tagline: "Growth is a craft. We do the craft.",
  description:
    "Digital Grow Bazaar is a full-stack growth partner for Indian brands — web development, digital marketing, videography, product photoshoots, e-commerce training and end-to-end Amazon, Flipkart and Meesho account management.",
  url: resolveSiteUrl(),
  locale: "en_IN",
  phone: "+91 9818435920",
  phoneHref: "+919818435920",
  whatsapp: "919818435920",
  email: "hello@digitalgrowbazaar.com",
  salesEmail: "sales@digitalgrowbazaar.com",
  address: {
    street: "maujpur,shahadra",
    city: "Delhi",
    region: "Delhi",
    postalCode: "201301",
    country: "IN",
  },
  hours: "Mon–Fri 10:00–19:00, Sat 10:00–16:00 IST",
  founded: "2017",
  socials: {
    instagram: "https://instagram.com/digitalgrowbazaar",
    facebook: "https://facebook.com/digitalgrowbazaar",
    linkedin: "https://linkedin.com/company/digitalgrowbazaar",
    youtube: "https://youtube.com/@digitalgrowbazaar",
    x: "https://x.com/digitalgrowbzr",
  },
  stats: [
    { value: "650+", label: "Brands scaled" },
    { value: "1,800+", label: "Projects delivered" },
    { value: "9 yrs", label: "In the trenches" },
    { value: "₹120Cr+", label: "Marketplace GMV managed" },
  ],
} as const;

export const NAV_CTA = { label: "Get a free growth audit", href: "/contact" };
