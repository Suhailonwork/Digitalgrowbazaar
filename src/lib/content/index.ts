import type { CaseStudy, MenuItem, Page, Post, Service, ServiceCategory, Testimonial } from "@/lib/types";
import { processFor, seedGroupA, serviceCategories } from "./services";
import { seedGroupB } from "./services-b";

/**
 * The built-in catalogue. Supabase overrides this at runtime when configured;
 * without Supabase the whole site still renders from here, so `npm run dev`
 * works on a fresh clone with no keys.
 */
export const fallbackServices: Service[] = [...seedGroupA, ...seedGroupB]
  .map((s) => ({ ...s, process: processFor[s.category_slug] ?? [] }))
  .sort((a, b) => a.order_index - b.order_index);

export const fallbackCategories: ServiceCategory[] = serviceCategories;

/** Default primary navigation, used until menu_items exists in the database. */
export const fallbackMenuItems: MenuItem[] = [
  { label: "Home", href: "/", order_index: 1, is_published: true, open_in_new_tab: false, has_mega: false },
  { label: "About", href: "/about", order_index: 2, is_published: true, open_in_new_tab: false, has_mega: false },
  { label: "Services", href: "/services", order_index: 3, is_published: true, open_in_new_tab: false, has_mega: true },
  { label: "Work", href: "/work", order_index: 4, is_published: true, open_in_new_tab: false, has_mega: false },
  { label: "Insights", href: "/blog", order_index: 5, is_published: true, open_in_new_tab: false, has_mega: false },
  { label: "Contact", href: "/contact", order_index: 6, is_published: true, open_in_new_tab: false, has_mega: false },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    name: "Ritu Malhotra",
    role: "Founder",
    company: "Aarna Home Décor",
    quote:
      "We were doing about ₹4 lakh a month on Amazon and losing money on ads. Six months in we are at ₹19 lakh with a 22% ACoS. What changed was the discipline, not some secret trick.",
    rating: 5,
    order_index: 1,
  },
  {
    name: "Karan Sethi",
    role: "Director",
    company: "Sethi Industrial Supplies",
    quote:
      "The new website ranks for eleven of our fourteen target keywords and brings in enquiries that used to come only from trade fairs. Their team explained every decision in plain language.",
    rating: 5,
    order_index: 2,
  },
  {
    name: "Meenal Shah",
    role: "Co-founder",
    company: "Bloom & Bark",
    quote:
      "One shoot day gave us three months of content. The product photos passed Amazon's checks first time, which had never happened with our earlier photographer.",
    rating: 5,
    order_index: 3,
  },
  {
    name: "Abhishek Yadav",
    role: "Seller",
    company: "AY Traders",
    quote:
      "I joined the training thinking I would learn listing tricks. I ended up rebuilding my pricing entirely. My returns dropped from 31% to 18% and I finally know my real margin per order.",
    rating: 5,
    order_index: 4,
  },
  {
    name: "Priya Raghavan",
    role: "Marketing Head",
    company: "Nexa Wellness",
    quote:
      "Their reporting is the first I have received from an agency that shows the numbers that went against them too. That is worth more than a pretty dashboard.",
    rating: 5,
    order_index: 5,
  },
  {
    name: "Sandeep Kumar",
    role: "Proprietor",
    company: "SK Electricals",
    quote:
      "Flipkart had suspended our top listing during the sale week. They filed the appeal the same day and it was back live in 72 hours.",
    rating: 5,
    order_index: 6,
  },
];

export const fallbackCaseStudies: CaseStudy[] = [
  {
    slug: "aarna-home-decor",
    client: "Aarna Home Décor",
    industry: "Home & Kitchen",
    headline: "₹4L to ₹19L monthly on Amazon in six months",
    summary:
      "A catalogue rebuild, A+ Content across 84 SKUs and a rebuilt ad structure took a stalled account from loss-making ads to a 22% ACoS at nearly five times the revenue.",
    metrics: [
      { value: "4.7x", label: "Revenue growth" },
      { value: "22%", label: "ACoS, down from 61%" },
      { value: "84", label: "SKUs relisted" },
    ],
    services: ["amazon-account-management", "product-photoshoot", "marketplace-ads-management"],
    order_index: 1,
  },
  {
    slug: "sethi-industrial",
    client: "Sethi Industrial Supplies",
    industry: "B2B Manufacturing",
    headline: "From trade-fair leads to 140 organic enquiries a month",
    summary:
      "A rebuilt website plus a technical and content SEO programme put eleven commercial keywords in the top three and turned search into their largest lead source.",
    metrics: [
      { value: "140", label: "Enquiries per month" },
      { value: "11", label: "Keywords in top 3" },
      { value: "3.8x", label: "Organic traffic" },
    ],
    services: ["website-development", "seo-services", "content-marketing"],
    order_index: 2,
  },
  {
    slug: "bloom-and-bark",
    client: "Bloom & Bark",
    industry: "Beauty & Personal Care",
    headline: "A D2C store that now outsells its marketplace channel",
    summary:
      "Shopify build, full catalogue photoshoot, Meta creative testing and a WhatsApp retention layer moved 58% of revenue to owned channels at a much healthier margin.",
    metrics: [
      { value: "58%", label: "Revenue from D2C" },
      { value: "4.6x", label: "Blended ROAS" },
      { value: "+34%", label: "Repeat purchase rate" },
    ],
    services: ["ecommerce-website-development", "product-photoshoot", "meta-ads-management", "email-whatsapp-marketing"],
    order_index: 3,
  },
];

export const fallbackPosts: Post[] = [
  {
    slug: "amazon-listing-optimisation-checklist-2026",
    title: "The Amazon Listing Optimisation Checklist We Use on Every Account",
    excerpt:
      "Titles, bullets, backend search terms, images and A+ modules — the exact order we work through when we take over an underperforming Amazon catalogue.",
    author: "DGB Marketplace Team",
    tags: ["Amazon", "Marketplace SEO"],
    published_at: "2026-07-14",
    is_published: true,
    cover_image: null,
    body: `<p>Every account we inherit has the same problem in a different costume: the listing is written for the brand, not for the search box. Here is the sequence we work through, and why the order matters.</p>
<h2>1. Fix the category and attributes first</h2>
<p>A listing in the wrong browse node cannot rank for its own category, no matter how good the copy is. Before touching a single word we verify the browse node, complete every required and recommended attribute, and make sure variation families are structured correctly.</p>
<h2>2. Harvest keywords from your own search-term report</h2>
<p>Tools are useful, but your ad account already knows which terms convert. Pull 90 days of search-term data, filter for converting terms, and build the keyword set from there before adding tool-sourced volume terms.</p>
<h2>3. Write the title for the first 80 characters</h2>
<p>Mobile truncates. Brand, primary keyword, key attribute and size or quantity should all appear before the cut. Everything after that is for the algorithm, not the shopper.</p>
<h2>4. Bullets answer objections, in order</h2>
<p>Lead each bullet with a capitalised benefit phrase, then a sentence of proof. The fourth and fifth bullets should pre-empt the two objections that show up most in your negative reviews.</p>
<h2>5. Backend search terms are not a dumping ground</h2>
<p>No repetition of words already in the title, no competitor brands, no punctuation. Use the space for synonyms, regional terms and common misspellings.</p>
<h2>6. Images do the actual selling</h2>
<p>Main image on pure white with 85% frame fill, then an infographic, a scale reference, a lifestyle shot, a detail macro and finally a comparison or bundle image. If you only fix one thing on a listing, fix image two.</p>
<h2>7. A+ Content, then measure</h2>
<p>Add A+ modules last, then wait a full 14 days before judging the result. Changing five things at once teaches you nothing about which one worked.</p>`,
    seo_title: "Amazon Listing Optimisation Checklist (2026) | Step-by-Step Guide",
    seo_description:
      "The seven-step Amazon listing optimisation sequence our marketplace team uses: browse nodes, keyword harvesting, titles, bullets, backend terms, images and A+ Content.",
    seo_keywords: "amazon listing optimization, amazon seo checklist, amazon a+ content, amazon keyword research",
  },
  {
    slug: "how-much-does-a-website-cost-in-india",
    title: "How Much Does a Website Actually Cost in India in 2026?",
    excerpt:
      "An honest breakdown of what ₹15,000, ₹50,000 and ₹3,00,000 buy you — and the recurring costs most quotations conveniently leave out.",
    author: "DGB Web Team",
    tags: ["Web Development", "Pricing"],
    published_at: "2026-06-02",
    is_published: true,
    cover_image: null,
    body: `<p>Website pricing in India spans two orders of magnitude for what sounds like the same deliverable. The difference is almost never the number of pages.</p>
<h2>What the price is actually buying</h2>
<p>A template installation, a custom design, and a custom build with integrations are three different products. Confusion about which one you are buying causes most of the disappointment in this industry.</p>
<h2>The recurring costs nobody quotes</h2>
<p>Domain, hosting, SSL, email, plugin licences, maintenance and content updates are annual realities. A cheap build with expensive licences often costs more over three years than a well-built site with none.</p>
<h2>Where it is worth spending more</h2>
<p>Speed, mobile experience, tracking setup and content quality change your conversion rate. Animation, sliders and parallax effects almost never do.</p>
<h2>Questions to ask any agency</h2>
<p>Who owns the domain and hosting? Will I get the source code? What is the post-launch support period? Which of these costs recur annually? Any agency that hesitates on the first two questions is telling you something important.</p>`,
    seo_title: "Website Development Cost in India 2026 | Honest Price Breakdown",
    seo_description:
      "What a website really costs in India in 2026: template vs custom pricing tiers, hidden recurring costs, and the four questions to ask before you sign.",
    seo_keywords: "website cost in india, website development price, ecommerce website cost, web design charges india",
  },
  {
    slug: "reduce-meesho-returns-rto",
    title: "Cutting Meesho Returns and RTO Without Cutting Your Prices",
    excerpt: "Return rates decide profitability on Meesho far more than pricing does. Six levers that consistently move the number.",
    author: "DGB Marketplace Team",
    tags: ["Meesho", "Operations"],
    published_at: "2026-04-21",
    is_published: true,
    cover_image: null,
    body: `<p>A 30% return rate can turn a profitable SKU into a slow leak. On Meesho, controlling returns is usually a bigger lever than another rupee off your price.</p>
<h2>1. Photograph honestly</h2>
<p>Over-saturated images sell the first order and buy the return. Colour-accurate photography reduces "not as described" returns more than any policy change.</p>
<h2>2. Size charts per style, not per brand</h2>
<p>A single generic size chart across styles is the single biggest driver of apparel returns. Measure each style and publish real garment measurements.</p>
<h2>3. Quality-check before dispatch</h2>
<p>A two-minute check on outbound orders costs far less than a return leg plus refurbishment.</p>
<h2>4. Packaging for the courier, not the shelf</h2>
<p>Damage in transit reads as a quality problem to the buyer. Bubble wrap and rigid mailers pay for themselves.</p>
<h2>5. Attack RTO with address quality</h2>
<p>Confirm high-risk COD orders, and flag repeat-RTO pincodes. Meesho's NDR flow can be worked actively rather than passively.</p>
<h2>6. Prune the incurable SKUs</h2>
<p>Some products return at 40% no matter what you do. Track return rate per SKU monthly and delist the ones that never recover.</p>`,
    seo_title: "How to Reduce Meesho Returns & RTO in 2026 | Seller Guide",
    seo_description: "Six practical levers to reduce Meesho return and RTO rates: honest photography, per-style size charts, QC, packaging, address quality and SKU pruning.",
    seo_keywords: "meesho return rate, reduce rto meesho, meesho seller tips, meesho profitability",
  },
];

export const fallbackPages: Page[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    subtitle: "How we collect, use and protect the information you share with us.",
    is_published: true,
    body: `<p>This policy explains what we collect when you use this website or engage our services, and what we do with it. It is written to be readable rather than to be legally impressive.</p>
<h2>What we collect</h2>
<ul><li>Details you submit through our enquiry forms: name, email, phone, company and your message.</li><li>Standard analytics data such as pages viewed, approximate location and device type.</li><li>Account and campaign data belonging to clients, accessed only under the permissions you grant us.</li></ul>
<h2>How we use it</h2>
<p>To respond to your enquiry, deliver the services you engage us for, send service updates, and improve this website. We do not sell your data, and we do not share it with third parties except the processors we need to operate, such as our email, hosting and analytics providers.</p>
<h2>Cookies</h2>
<p>We use cookies for analytics and, where you consent, for advertising measurement. You can block cookies in your browser settings; core parts of the site will still work.</p>
<h2>Data retention and your rights</h2>
<p>Enquiry records are kept for up to 36 months. You can ask us to access, correct or delete your data at any time by writing to our contact email, and we will act on the request within 30 days.</p>`,
    seo_title: "Privacy Policy",
    seo_description: "How Digital Grow Bazaar collects, uses, stores and protects personal information submitted through this website and during client engagements.",
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    subtitle: "The commercial terms that apply to our services and this website.",
    is_published: true,
    body: `<p>By engaging our services or using this website you agree to the terms below. Individual engagements are additionally governed by their signed proposal or statement of work, which takes precedence where the two differ.</p>
<h2>Scope and deliverables</h2>
<p>Every engagement is defined by a written proposal listing deliverables, timelines and dependencies. Work outside that scope is quoted separately before it begins.</p>
<h2>Payments</h2>
<p>Project work is billed 50% in advance and 50% before handover unless agreed otherwise. Retainers are billed monthly in advance. Media spend on advertising platforms is paid by the client directly to the platform.</p>
<h2>Client responsibilities</h2>
<p>Timely feedback, content, credentials and approvals. Timelines assume responses within three working days; delays shift delivery dates accordingly.</p>
<h2>Intellectual property</h2>
<p>On full payment, ownership of final delivered work transfers to the client. We retain the right to display non-confidential work in our portfolio unless you ask us in writing not to.</p>
<h2>Limitations</h2>
<p>We do not guarantee specific search rankings, advertising returns or marketplace outcomes, since these depend on platforms outside our control. We do commit to the agreed scope, cadence and reporting.</p>`,
    seo_title: "Terms & Conditions",
    seo_description: "Commercial terms for Digital Grow Bazaar engagements: scope, payments, client responsibilities, intellectual property and limitations.",
  },
  {
    slug: "refund-policy",
    title: "Refund & Cancellation Policy",
    subtitle: "When refunds apply, and how cancellations are handled.",
    is_published: true,
    body: `<h2>Project work</h2>
<p>The advance covers discovery, planning and initial production, and is non-refundable once that work has started. If you cancel mid-project, you are billed for completed milestones and receive everything produced up to that point.</p>
<h2>Monthly retainers</h2>
<p>Retainers run month to month with 30 days' written notice on either side. The current month is not pro-rated, and all assets, accounts and reports are handed over at the end of the notice period.</p>
<h2>Training programmes</h2>
<p>A full refund is available up to 48 hours before the first session. After the first session, refunds are not available, but you may transfer your seat to the next cohort once at no cost.</p>
<h2>Advertising spend</h2>
<p>Media budgets are paid by you directly to Google, Meta or the marketplace. We do not hold or refund media spend.</p>
<h2>How to request</h2>
<p>Write to our contact email with your invoice number. Approved refunds are processed to the original payment method within 7 to 10 working days.</p>`,
    seo_title: "Refund & Cancellation Policy",
    seo_description: "Refund and cancellation terms for Digital Grow Bazaar project work, monthly retainers, training programmes and advertising spend.",
  },
];

export function findService(slug: string, list: Service[] = fallbackServices) {
  return list.find((s) => s.slug === slug);
}
