/** Static brand facts. Anything here can be overridden from Admin → Settings. */
export const siteConfig = {
  name: "Digital Grow Bazaar",
  shortName: "DGB",
  legalName: "Digital Grow Bazaar",
  tagline: "Growth is a craft. We do the craft.",
  description:
    "Digital Grow Bazaar is a full-stack growth partner for Indian brands — web development, digital marketing, videography, product photoshoots, e-commerce training and end-to-end Amazon, Flipkart and Meesho account management.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000",
  locale: "en_IN",
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  whatsapp: "919876543210",
  email: "hello@digitalgrowbazaar.com",
  salesEmail: "sales@digitalgrowbazaar.com",
  address: {
    street: "B-24, Ground Floor, Sector 63",
    city: "Noida",
    region: "Uttar Pradesh",
    postalCode: "201301",
    country: "IN",
  },
  hours: "Mon–Sat, 10:00–19:00 IST",
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
