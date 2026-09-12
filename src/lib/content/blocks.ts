import type { FAQ } from "@/lib/types";

/**
 * Editable page sections. These used to live as `const` arrays inside the
 * components; they now ship as the fallback for the `content_blocks` table, so
 * the site still renders before the database is seeded and every value stays
 * editable from Admin → Content afterwards.
 */

export type HeroBlock = {
  badge: string;
  title_lead: string;
  title_highlight: string;
  subtitle: string;
  proof_points: string[];
  cta_primary_label: string;
  cta_primary_href: string;
  cta_secondary_label: string;
  cta_secondary_href: string;
  rating_value: string;
  rating_note: string;
  panel_title: string;
  panel_badge: string;
  panel_metrics: { value: string; label: string }[];
  float_left_label: string;
  float_left_value: string;
  float_left_delta: string;
  float_right_label: string;
  float_right_value: string;
  quick_links: { label: string; href: string; note: string }[];
};

export type StatItem = { value: string; label: string };
export type Pillar = { icon: string; title: string; body: string };
export type ProcessStep = { n: string; title: string; body: string };
export type MarketplaceItem = { name: string; slug: string; accent: string; points: string[] };
export type TimelineItem = { year: string; title: string; body: string };
export type TeamItem = { name: string; count: string; note: string };

export type SectionCopy = { eyebrow: string; title: string; description: string };

export const heroBlock: HeroBlock = {
  badge: "Trusted by 650+ Indian brands and sellers",
  title_lead: "Your growth partner for",
  title_highlight: "everything digital",
  subtitle:
    "Websites that convert, marketing that compounds, content shot in our own studio, and Amazon, Flipkart and Meesho accounts managed like a full-time team. One partner, one accountable plan.",
  proof_points: ["No lock-in contracts", "Named account manager", "Reporting you can audit"],
  cta_primary_label: "Get a free growth audit",
  cta_primary_href: "/contact",
  cta_secondary_label: "Explore services",
  cta_secondary_href: "/services",
  rating_value: "4.9/5",
  rating_note: "average client rating",
  panel_title: "Marketplace performance",
  panel_badge: "Last 90 days",
  panel_metrics: [
    { value: "+184%", label: "Revenue" },
    { value: "22%", label: "ACoS" },
    { value: "4.6x", label: "ROAS" },
  ],
  float_left_label: "Organic sessions",
  float_left_value: "48,910",
  float_left_delta: "↑ 3.8x",
  float_right_label: "New enquiries",
  float_right_value: "142 / month",
  quick_links: [
    { label: "Web Development", href: "/services/website-development", note: "From ₹24,999" },
    { label: "Digital Marketing", href: "/services/seo-services", note: "SEO · Ads · Social" },
    { label: "Video & Photoshoot", href: "/services/product-photoshoot", note: "In-house studio" },
    { label: "Amazon / Flipkart / Meesho", href: "/services/amazon-account-management", note: "Account handling" },
  ],
};

export const statsBlock: StatItem[] = [
  { value: "650+", label: "Brands scaled" },
  { value: "1,800+", label: "Projects delivered" },
  { value: "9 yrs", label: "In the trenches" },
  { value: "₹120Cr+", label: "Marketplace GMV managed" },
];

export const marqueeBlock: string[] = [
  "Amazon", "Flipkart", "Meesho", "Shopify", "WooCommerce", "Google Ads", "Meta Ads",
  "JioMart", "Myntra", "Next.js", "WordPress", "Razorpay", "Shiprocket", "GA4",
];

export const whyUsCopy: SectionCopy = {
  eyebrow: "Why brands stay",
  title: "The difference is operational, not decorative",
  description:
    "Everyone promises growth. What actually separates agencies is how the work gets done week to week — so here is exactly how we work.",
};

export const whyUsBlock: Pillar[] = [
  {
    icon: "MessageSquareText",
    title: "One team, one thread",
    body: "Your website developer, ad manager, editor and marketplace specialist sit in the same room and on the same WhatsApp group. Nothing gets lost in a handover.",
  },
  {
    icon: "Gauge",
    title: "Weekly shipping, not monthly promises",
    body: "Work goes live every week. You see progress in the account, not only in a deck at month end.",
  },
  {
    icon: "HandCoins",
    title: "Flat fees, no hidden commission",
    body: "We charge a retainer, not a cut of your ad spend or your GMV. That keeps our recommendations honest when the right answer is to spend less.",
  },
  {
    icon: "ShieldCheck",
    title: "You own everything",
    body: "Source code, domain, hosting, ad accounts, seller panels and analytics stay in your name. Leaving us should always be easy — that is why nobody does.",
  },
];

export const processCopy: SectionCopy = {
  eyebrow: "How we work",
  title: "A five-step rhythm we have run over 1,800 times",
  description: "No mystery, no black box. You always know what is happening this week and what it is supposed to achieve.",
};

export const processBlock: ProcessStep[] = [
  { n: "01", title: "Audit", body: "We look at everything — site, search, ads, listings, numbers — and write down what is actually broken." },
  { n: "02", title: "Plan", body: "A prioritised roadmap with owners, timelines and the outcome each item is meant to move." },
  { n: "03", title: "Build", body: "Design, development, shooting and campaign setup run in parallel, reviewed with you weekly." },
  { n: "04", title: "Launch", body: "Everything ships with tracking, schema and QA in place, so day one produces usable data." },
  { n: "05", title: "Compound", body: "Monthly reviews cut what is not working and reinvest in what is. Growth comes from the loop, not the launch." },
];

export const marketplaceCopy: SectionCopy = {
  eyebrow: "E-commerce account handling",
  title: "We run your marketplace accounts like they are our own",
  description:
    "Listings, ads, inventory, pricing, returns, claims and account health — managed daily by specialists who have handled over ₹120 crore of marketplace GMV.",
};

export const marketplaceBlock: MarketplaceItem[] = [
  {
    name: "Amazon",
    slug: "amazon-account-management",
    accent: "from-[#ff9900] to-[#ff6b35]",
    points: ["Seller & Vendor Central", "A+ Content and Brand Store", "Sponsored Ads to a target ACoS", "FBA planning & reimbursements"],
  },
  {
    name: "Flipkart",
    slug: "flipkart-account-management",
    accent: "from-[#2874f0] to-[#12c7d4]",
    points: ["Growth Score improvement", "PLA & Rank Booster campaigns", "Big Billion Days planning", "Claims and penalty disputes"],
  },
  {
    name: "Meesho",
    slug: "meesho-account-management",
    accent: "from-[#f43397] to-[#8b5cf6]",
    points: ["Bulk catalogue uploads", "Competitive repricing", "Return and RTO reduction", "Payment reconciliation"],
  },
];

export const homeFaqsBlock: FAQ[] = [
  {
    q: "What services does Digital Grow Bazaar offer?",
    a: "Website and e-commerce development, digital marketing (SEO, Google Ads, Meta Ads, social media, email and WhatsApp), videography and product photoshoots, e-commerce business training, and full account management for Amazon, Flipkart and Meesho.",
  },
  {
    q: "Do you work with businesses outside Noida and Delhi NCR?",
    a: "Yes. Around two-thirds of our clients are outside the NCR and we work with them entirely remotely. Photoshoots and videography can be arranged either at our Noida studio or on location in your city.",
  },
  {
    q: "How much do your services cost?",
    a: "Websites start at ₹24,999, marketing retainers at ₹15,000 a month, and marketplace account management at ₹12,000 a month. Every quotation is scoped to your catalogue size and goals, and you get the full price before any work begins.",
  },
  {
    q: "Do you take a commission on sales or ad spend?",
    a: "No. We charge flat retainers so that our advice stays honest even when the right recommendation is to spend less. Performance-linked models are available for larger accounts on request.",
  },
  {
    q: "How quickly can you start?",
    a: "Audits begin within 48 hours of getting access. Website projects typically start within a week of sign-off, and marketplace or marketing retainers usually go live within three to five working days.",
  },
  {
    q: "Who owns the accounts, code and creative assets?",
    a: "You do — always. Domains, hosting, source code, ad accounts, seller panels, analytics properties and raw shoot files are all in your name and handed over in full.",
  },
];

export const aboutValuesBlock: Pillar[] = [
  {
    icon: "Target",
    title: "Say the uncomfortable thing",
    body: "If your product is priced wrong or the channel does not suit you, you will hear it from us before you spend money finding out.",
  },
  {
    icon: "HeartHandshake",
    title: "Own the outcome, not the task",
    body: "Nobody here says 'that's not my department'. If the campaign underperforms because of the landing page, we fix the landing page.",
  },
  {
    icon: "Users",
    title: "Teach, don't gatekeep",
    body: "We train client teams knowing it may reduce their dependence on us. It has never once cost us an account.",
  },
  {
    icon: "Award",
    title: "Boring consistency wins",
    body: "Weekly shipping beats quarterly heroics. Almost every result we are proud of came from doing unglamorous work for eighteen months.",
  },
];

export const aboutTimelineBlock: TimelineItem[] = [
  { year: "2017", title: "Two people, one room", body: "Started as a two-person web development shop in Noida, building sites for local manufacturers and traders." },
  { year: "2019", title: "Marketing joins the stack", body: "Clients kept asking who would bring traffic to the sites we built, so we added SEO and paid media in-house." },
  { year: "2021", title: "The studio opens", body: "A dedicated photography and video studio, after one too many campaigns stalled waiting on client-supplied assets." },
  { year: "2023", title: "Marketplace practice", body: "A specialist team for Amazon, Flipkart and Meesho — today the fastest-growing part of the business." },
  { year: "2026", title: "40 people, one roof", body: "Developers, marketers, editors, photographers and marketplace managers, all in the same building." },
];

export const aboutTeamBlock: TeamItem[] = [
  { name: "Operations", count: "12", note: "Marketplace & account managers" },
  { name: "Marketing", count: "10", note: "SEO, paid media, content" },
  { name: "Engineering", count: "9", note: "Web, e-commerce, apps" },
  { name: "Creative", count: "9", note: "Photo, video, design" },
];

export const contactFaqsBlock: FAQ[] = [
  { q: "How soon will someone get back to me?", a: "Within one working day, usually the same day if you write before 5 pm IST. Enquiries that come in over the weekend are answered on Monday morning." },
  { q: "Can I visit your office or studio?", a: "Yes, we are in Sector 63, Noida. Call ahead so the right specialist is available, and we can show you the photography and video studio while you are here." },
  { q: "Do you offer a free consultation?", a: "Every new enquiry gets a free audit of whatever you share with us — website, ad account or seller panel — plus a 20-minute call to walk you through it." },
  { q: "Do you work with small businesses and new sellers?", a: "Regularly. Around 40% of our clients started with us before their first ₹1 lakh month. We will tell you honestly if a service is premature for your stage." },
];

export const budgetOptionsBlock: string[] = [
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "₹2,00,000+",
  "Not sure yet",
];

/** Every block, with the metadata the admin editor needs. */
export const CONTENT_BLOCKS = [
  { key: "home.hero", label: "Homepage hero", description: "Headline, subtitle, buttons and the floating result cards.", data: heroBlock },
  { key: "home.stats", label: "Stats band", description: "The four numbers under the hero. Also used on the About page.", data: statsBlock },
  { key: "home.marquee", label: "Platform marquee", description: "Scrolling list of platforms you work on.", data: marqueeBlock },
  { key: "home.why_us_copy", label: "Why us — heading", description: "Eyebrow, title and intro for the 'why brands stay' section.", data: whyUsCopy },
  { key: "home.why_us", label: "Why us — pillars", description: "The four differentiator cards.", data: whyUsBlock },
  { key: "home.process_copy", label: "Process — heading", description: "Eyebrow, title and intro for the process section.", data: processCopy },
  { key: "home.process", label: "Process — steps", description: "The five delivery steps.", data: processBlock },
  { key: "home.marketplace_copy", label: "Marketplaces — heading", description: "Eyebrow, title and intro for the marketplace section.", data: marketplaceCopy },
  { key: "home.marketplaces", label: "Marketplaces — cards", description: "Amazon, Flipkart and Meesho cards.", data: marketplaceBlock },
  { key: "home.faqs", label: "Homepage FAQs", description: "Also emitted as FAQPage structured data.", data: homeFaqsBlock },
  { key: "about.values", label: "About — values", description: "The four rules cards.", data: aboutValuesBlock },
  { key: "about.timeline", label: "About — timeline", description: "Company milestones.", data: aboutTimelineBlock },
  { key: "about.team", label: "About — team", description: "Headcount by function.", data: aboutTeamBlock },
  { key: "contact.faqs", label: "Contact FAQs", description: "Quick answers on the contact page.", data: contactFaqsBlock },
  { key: "contact.budgets", label: "Budget options", description: "Dropdown options in every enquiry form.", data: budgetOptionsBlock },
] as const;

export type ContentBlockKey = (typeof CONTENT_BLOCKS)[number]["key"];

/** Fallback lookup by key, used whenever the database has no row yet. */
export const fallbackBlocks: Record<string, unknown> = Object.fromEntries(
  CONTENT_BLOCKS.map((b) => [b.key, b.data]),
);
