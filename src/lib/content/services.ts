import type { Service, ServiceCategory } from "@/lib/types";

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "web",
    name: "Web & Product",
    blurb: "Sites and storefronts built to convert, not just to look good.",
    icon: "Code2",
    order_index: 1,
  },
  {
    slug: "marketing",
    name: "Digital Marketing",
    blurb: "Search, social and paid media that compounds month over month.",
    icon: "TrendingUp",
    order_index: 2,
  },
  {
    slug: "creative",
    name: "Creative Studio",
    blurb: "Video, photography and design produced in-house, on schedule.",
    icon: "Clapperboard",
    order_index: 3,
  },
  {
    slug: "ecommerce",
    name: "E-commerce Operations",
    blurb: "Amazon, Flipkart and Meesho accounts run like a full-time team.",
    icon: "Store",
    order_index: 4,
  },
  {
    slug: "training",
    name: "Training & Consulting",
    blurb: "Hands-on programmes that make your own team self-sufficient.",
    icon: "GraduationCap",
    order_index: 5,
  },
];

/** Category-level delivery rhythm, reused so every service page stays consistent. */
export const processFor: Record<string, { title: string; detail: string }[]> = {
  web: [
    { title: "Discovery & scoping", detail: "We map your buyers, competitors and conversion goals, then agree a sitemap, feature list and fixed timeline before a single pixel is drawn." },
    { title: "Design & prototype", detail: "Wireframes first, then a clickable UI in your brand language. You approve screens before development starts, so there are no expensive surprises later." },
    { title: "Build & integrate", detail: "Clean, fast, mobile-first code with your CRM, payment gateway, WhatsApp, analytics and marketing pixels wired in and tested." },
    { title: "Launch & iterate", detail: "Core Web Vitals pass, schema markup in place, 30 days of post-launch support, then a monthly improvement cycle if you want us to stay on." },
  ],
  marketing: [
    { title: "Audit & baseline", detail: "A full teardown of your current traffic, rankings, ad accounts and tracking so we know exactly what the starting line looks like." },
    { title: "Strategy & forecast", detail: "Keyword and audience mapping, channel mix, budget split and a realistic month-by-month forecast you can hold us to." },
    { title: "Execute weekly", detail: "Content, links, creatives, campaigns and landing pages ship every week, not in one big batch at month end." },
    { title: "Report & double down", detail: "A live dashboard plus a monthly call where we cut what is not working and put the budget behind what is." },
  ],
  creative: [
    { title: "Creative brief", detail: "We lock the story, shot list, references and deliverable formats so the shoot day runs to the minute." },
    { title: "Pre-production", detail: "Location or studio, props, models, styling, script and scheduling handled end to end by our production team." },
    { title: "Shoot day", detail: "Professional lighting, camera and direction. You get live previews on set so approvals happen there and then." },
    { title: "Post & delivery", detail: "Editing, colour, sound, retouching and platform-specific exports: marketplace-compliant stills, reels, YouTube cuts and ad variants." },
  ],
  ecommerce: [
    { title: "Account audit", detail: "Health, policy flags, listing quality, buy-box share, ad wastage and pricing gaps across every marketplace you sell on." },
    { title: "Fix the foundation", detail: "Catalogue clean-up, keyword-rich listings, A+ content, correct categories, compliant images and inventory hygiene." },
    { title: "Scale demand", detail: "Marketplace ads, deals, coupons, festive calendars and pricing strategy managed daily against a target ACoS." },
    { title: "Operate & protect", detail: "Order and return management, claims, reimbursements, account health monitoring and rapid response on suspensions." },
  ],
  training: [
    { title: "Skill assessment", detail: "We benchmark where your team is today and design the curriculum around the gaps that actually cost you money." },
    { title: "Live cohort sessions", detail: "Practical, screen-share sessions on real dashboards, never slide-only theory." },
    { title: "Guided project", detail: "Every participant ships something real: a live listing, a running campaign or a launched store." },
    { title: "Certification & support", detail: "Assessment, certificate and a 60-day doubt-clearing window so learning survives contact with the real world." },
  ],
};

type Seed = Omit<Service, "process">;

const seed: Seed[] = [
  {
    slug: "website-development",
    category_slug: "web",
    title: "Website Design & Development",
    menu_label: "Website Development",
    excerpt: "Fast, responsive, SEO-ready websites that turn visitors into enquiries.",
    icon: "Globe",
    price_from: "24,999",
    is_featured: true,
    is_published: true,
    order_index: 1,
    body: `<p>Your website is the only salesperson that works at 2 a.m. We build business websites that load in under two seconds, read well on a budget Android phone, and are structured so Google can actually understand what you sell.</p>
<h2>Built for conversion, not just for looks</h2>
<p>Every page we ship starts from a conversion goal: a call, a WhatsApp message, a form, a purchase. Layout, copy hierarchy and CTA placement follow from that goal. We instrument everything with GA4 and Search Console from day one, so you can see which page brought which enquiry.</p>
<h2>Technology that ages well</h2>
<p>Depending on your needs we build on Next.js, WordPress or Shopify. You get clean, documented code, an admin panel you can actually use, and full ownership of the hosting, domain and source. No lock-in, no monthly hostage fees.</p>`,
    features: [
      "Mobile-first responsive design tested on real devices",
      "Core Web Vitals green, LCP under 2.5 seconds",
      "On-page SEO, schema markup and XML sitemap built in",
      "WhatsApp, click-to-call and lead-form integrations",
      "Self-serve admin panel for content updates",
      "Free SSL, security hardening and 30-day post-launch support",
    ],
    outcomes: [
      { value: "1.4s", label: "Median load time" },
      { value: "2.7x", label: "Avg. lift in form fills" },
      { value: "100%", label: "Code & hosting ownership" },
    ],
    faqs: [
      { q: "How long does a website take?", a: "A 6-8 page business website takes 12-18 working days from content sign-off. E-commerce builds and custom portals run 4-8 weeks depending on scope." },
      { q: "Do I own the website?", a: "Completely. Domain, hosting, source code and admin credentials are transferred to your own accounts at handover." },
      { q: "Can you redesign my existing website?", a: "Yes. We audit the current site, keep the URLs and rankings that are working, and redirect the rest properly so you do not lose search traffic." },
      { q: "What do you need from me to start?", a: "Logo, brand colours if you have them, a service list and any existing photos or copy. If you have none of that, our creative studio can produce it." },
    ],
    seo_title: "Website Design & Development Company in Delhi | Digital Grow Bazaar",
    seo_description: "Custom website design and development for Indian businesses. Fast, mobile-first, SEO-ready websites with full code ownership and 30 days of free support.",
    seo_keywords: "website development company, website design Delhi, business website design, responsive web development, seo friendly website",
  },
  {
    slug: "ecommerce-website-development",
    category_slug: "web",
    title: "E-commerce Website Development",
    menu_label: "E-commerce Website",
    excerpt: "Own-brand D2C stores on Shopify, WooCommerce or headless Next.js.",
    icon: "ShoppingCart",
    price_from: "49,999",
    is_featured: true,
    is_published: true,
    order_index: 2,
    body: `<p>Marketplaces give you volume. Your own store gives you margin, customer data and a brand. We build D2C storefronts that hold their own against Amazon on speed and on trust.</p>
<h2>The whole commerce stack</h2>
<p>Product catalogue and variants, payment gateway, shipping partners, COD verification, abandoned-cart recovery, GST invoicing and a returns flow that does not create support tickets. Everything is connected on day one, not in a vague phase two.</p>
<h2>Optimised for repeat purchase</h2>
<p>We wire in WhatsApp order updates, review collection, loyalty offers and Meta and Google product feeds, so every rupee you spend on ads has somewhere efficient to land.</p>`,
    features: [
      "Shopify, WooCommerce or headless Next.js builds",
      "Razorpay, PhonePe and Cashfree plus COD flows",
      "Shiprocket, Delhivery and pincode serviceability",
      "Abandoned cart and WhatsApp order notifications",
      "Product feed for Google Shopping and Meta catalogue",
      "GST-compliant invoicing and returns workflow",
    ],
    outcomes: [
      { value: "3.1%", label: "Avg. store conversion" },
      { value: "-38%", label: "Cart abandonment" },
      { value: "48 hrs", label: "Catalogue go-live" },
    ],
    faqs: [
      { q: "Shopify or WooCommerce?", a: "Shopify if you want speed and low maintenance. WooCommerce if you need deep customisation or already run WordPress. We recommend based on your catalogue size and team, not on commission." },
      { q: "Can you migrate my existing store?", a: "Yes. Products, customers, orders and SEO redirects are migrated with zero downtime." },
      { q: "Do you handle product photography?", a: "Our in-house studio shoots and retouches the full catalogue, including marketplace-compliant white-background images." },
    ],
    seo_title: "E-commerce Website Development Company | Shopify & WooCommerce Experts",
    seo_description: "Launch a D2C e-commerce store that converts. Shopify, WooCommerce and headless Next.js development with payments, shipping, COD and WhatsApp automation.",
    seo_keywords: "ecommerce website development, shopify development india, woocommerce developer, d2c store setup, online store development company",
  },
  {
    slug: "web-application-development",
    category_slug: "web",
    title: "Web Application & Portal Development",
    menu_label: "Web Apps & Portals",
    excerpt: "Dashboards, CRMs, booking systems and B2B portals built to your workflow.",
    icon: "LayoutPanelTop",
    price_from: "1,20,000",
    is_featured: false,
    is_published: true,
    order_index: 3,
    body: `<p>When a spreadsheet stops scaling, you need software shaped like your business. We build internal tools and customer portals that replace the manual follow-ups eating your team's day.</p>
<h2>Practical software, shipped in sprints</h2>
<p>Role-based access, approval flows, reporting, notifications and integrations with the tools you already pay for. We ship in two-week sprints so you can use version one while version two is being built.</p>`,
    features: [
      "Custom CRM, ERP-lite and admin dashboards",
      "Role-based access control and audit logs",
      "Booking, quotation and approval workflows",
      "REST and GraphQL APIs with third-party integrations",
      "Automated reports over email and WhatsApp",
      "Cloud deployment with backups and monitoring",
    ],
    outcomes: [
      { value: "2 wks", label: "Sprint cadence" },
      { value: "60%", label: "Manual work removed" },
      { value: "99.9%", label: "Uptime target" },
    ],
    faqs: [
      { q: "How do you price custom software?", a: "A fixed-price discovery sprint produces a spec and an estimate. After that we work either fixed-scope or as a monthly retained team, whichever fits your roadmap." },
      { q: "Will we get the source code?", a: "Yes. Code lives in your own Git organisation from the very first commit." },
    ],
    seo_title: "Custom Web Application & Portal Development Company in India",
    seo_description: "Custom CRM, dashboard, booking and B2B portal development. Role-based, integrated, cloud-deployed web applications shipped in two-week sprints.",
    seo_keywords: "web application development, custom crm development, portal development company, saas development india",
  },
  {
    slug: "mobile-app-development",
    category_slug: "web",
    title: "Mobile App Development",
    menu_label: "Mobile Apps",
    excerpt: "Android and iOS apps from a single React Native codebase.",
    icon: "Smartphone",
    price_from: "1,80,000",
    is_featured: false,
    is_published: true,
    order_index: 4,
    body: `<p>One codebase, both stores, half the maintenance. We build customer apps, delivery apps and internal field apps in React Native, dropping to native modules wherever performance demands it.</p>
<h2>From build to the store listing</h2>
<p>We handle Play Store and App Store submission, store-listing ASO, push notifications, crash reporting and staged rollouts, which are the parts most agencies quietly leave to you.</p>`,
    features: [
      "React Native for Android and iOS",
      "Push notifications and in-app messaging",
      "Offline-first data sync",
      "Payment gateway and UPI integration",
      "Play Store and App Store submission with ASO",
      "Crash reporting and release monitoring",
    ],
    outcomes: [
      { value: "1", label: "Codebase, two stores" },
      { value: "6-10 wks", label: "MVP timeline" },
      { value: "4.5", label: "Avg. store rating" },
    ],
    faqs: [
      { q: "Native or cross-platform?", a: "React Native covers around 90% of business apps at far lower cost. We recommend native only when you need heavy graphics, AR or deep hardware access." },
      { q: "Do you maintain the app after launch?", a: "Yes. Monthly maintenance covers OS updates, store policy changes, bug fixes and small feature additions." },
    ],
    seo_title: "Mobile App Development Company | Android & iOS Apps in India",
    seo_description: "React Native mobile app development for Android and iOS. Payments, push notifications, offline sync, store submission and ASO handled end to end.",
    seo_keywords: "mobile app development company, react native developer india, android app development, ios app development company",
  },
  {
    slug: "ui-ux-design",
    category_slug: "web",
    title: "UI/UX Design",
    menu_label: "UI/UX Design",
    excerpt: "Research-led interface design that removes friction from every step.",
    icon: "Palette",
    price_from: "35,000",
    is_featured: false,
    is_published: true,
    order_index: 5,
    body: `<p>Good design is not decoration. It is the shortest path between a user's intent and your business outcome. We research, wireframe, prototype and test before anything gets built.</p>
<h2>Design systems, not one-off screens</h2>
<p>You get a Figma design system with tokens, components, states and documentation, so your product stays consistent as your team grows.</p>`,
    features: [
      "User research and journey mapping",
      "Wireframes and clickable prototypes",
      "Figma design system with reusable components",
      "Accessibility (WCAG AA) checks",
      "Conversion-focused landing page design",
      "Developer handoff with specs and assets",
    ],
    outcomes: [
      { value: "AA", label: "Accessibility baseline" },
      { value: "-42%", label: "Drop-off in key flows" },
      { value: "1 file", label: "Single source of truth" },
    ],
    faqs: [
      { q: "Can you design for a product we already have?", a: "Yes. We start with a UX audit and heatmap analysis, then redesign the highest-impact flows first." },
    ],
    seo_title: "UI/UX Design Services | Product & Website Design Agency",
    seo_description: "Research-led UI/UX design: user journeys, wireframes, Figma design systems, accessibility and conversion-focused interface design.",
    seo_keywords: "ui ux design services, product design agency india, figma design system, website ux audit",
  },
  {
    slug: "website-maintenance-support",
    category_slug: "web",
    title: "Website Maintenance & Support",
    menu_label: "Maintenance & Support",
    excerpt: "Updates, backups, security and speed, handled monthly so you never think about it.",
    icon: "Wrench",
    price_from: "4,999/mo",
    is_featured: false,
    is_published: true,
    order_index: 6,
    body: `<p>Most websites do not fail dramatically. They rot. Plugins go stale, images bloat, SSL expires, and one morning the site is down during your biggest campaign.</p>
<h2>A maintained site is a cheaper site</h2>
<p>Our retainer covers updates, daily backups, uptime monitoring, malware scanning, speed tuning and a monthly block of content changes. If something breaks, we fix it. There is no per-incident invoice.</p>`,
    features: [
      "Daily off-site backups with one-click restore",
      "Core, plugin and dependency updates",
      "24/7 uptime monitoring and alerts",
      "Malware scanning and firewall rules",
      "Monthly speed and Core Web Vitals tuning",
      "Included hours for content and design edits",
    ],
    outcomes: [
      { value: "99.9%", label: "Uptime maintained" },
      { value: "4 hrs", label: "Critical response" },
      { value: "Daily", label: "Backup frequency" },
    ],
    faqs: [
      { q: "We did not build the site with you. Can you still maintain it?", a: "Yes, after a one-time audit to bring it to a safe baseline. We support WordPress, Shopify, WooCommerce and custom Node or PHP stacks." },
    ],
    seo_title: "Website Maintenance & Support Services (AMC) in India",
    seo_description: "Monthly website maintenance: backups, updates, security, uptime monitoring, speed tuning and content edits under one predictable retainer.",
    seo_keywords: "website maintenance services, website amc india, wordpress maintenance company, website support services",
  },
  {
    slug: "seo-services",
    category_slug: "marketing",
    title: "SEO Services",
    menu_label: "Search Engine Optimisation",
    excerpt: "Rank for what your buyers actually search, and keep the rankings.",
    icon: "Search",
    price_from: "18,000/mo",
    is_featured: true,
    is_published: true,
    order_index: 1,
    body: `<p>SEO is the only channel where yesterday's work still pays you next year. We do it the durable way: technical foundations, genuinely useful content, and links that are earned rather than bought in bulk.</p>
<h2>Technical, content and authority, in that order</h2>
<p>We start by fixing crawlability, site speed, indexation and schema. Then we build topic clusters around commercial-intent keywords. Only then do we invest in digital PR and link acquisition, because links pointing at a broken site are wasted money.</p>
<h2>Local SEO that fills the phone</h2>
<p>For service businesses we optimise your Google Business Profile, build citation consistency across Indian directories, and run a review engine, because the map pack often outperforms position one.</p>`,
    features: [
      "Full technical audit with fixes implemented, not just listed",
      "Keyword and intent mapping to your service pages",
      "Content plan with briefs, or fully written articles",
      "Digital PR and white-hat link acquisition",
      "Google Business Profile and local citations",
      "Live Looker Studio dashboard with rank and traffic",
    ],
    outcomes: [
      { value: "3.8x", label: "Avg. organic traffic in 9 months" },
      { value: "Top 3", label: "Target for money keywords" },
      { value: "Weekly", label: "Shipping cadence" },
    ],
    faqs: [
      { q: "How long before SEO shows results?", a: "Technical fixes can move things in 4-6 weeks. Meaningful ranking and traffic gains usually land between month three and month six, and compound from there." },
      { q: "Do you guarantee first position?", a: "No honest agency can, because Google does not sell guarantees. We do commit to a defined monthly scope, transparent reporting and measurable traffic and lead targets." },
      { q: "Is local SEO included?", a: "Google Business Profile optimisation and local citations are included in every plan for businesses with a physical or service-area presence." },
      { q: "Do you work on e-commerce SEO?", a: "Yes, including category and product page templates, faceted navigation control, product schema and marketplace cannibalisation issues." },
    ],
    seo_title: "SEO Services Company in India | Technical, Local & E-commerce SEO",
    seo_description: "Result-driven SEO services: technical audits, content clusters, white-hat link building and local SEO with transparent monthly reporting.",
    seo_keywords: "seo services india, seo company Delhi, local seo services, technical seo audit, ecommerce seo agency",
  },
  {
    slug: "social-media-marketing",
    category_slug: "marketing",
    title: "Social Media Marketing",
    menu_label: "Social Media Marketing",
    excerpt: "A content engine for Instagram, Facebook, LinkedIn and YouTube.",
    icon: "Share2",
    price_from: "15,000/mo",
    is_featured: true,
    is_published: true,
    order_index: 2,
    body: `<p>Posting consistently is not a strategy. We build a content system: a monthly calendar tied to your offers, formats proven for your category, and a publishing rhythm your audience can rely on.</p>
<h2>Made for the feed you are actually on</h2>
<p>Reels and carousels for Instagram, thought-leadership for LinkedIn, shorts and long-form for YouTube. Our in-house studio produces the assets, so you are never stuck waiting on stock photos.</p>`,
    features: [
      "Monthly content calendar with an approval workflow",
      "12-20 designed posts, reels and stories per month",
      "Community management and DM responses",
      "Influencer and UGC campaign coordination",
      "Hashtag, trend and competitor research",
      "Monthly performance report with next-month plan",
    ],
    outcomes: [
      { value: "20+", label: "Assets per month" },
      { value: "4.2x", label: "Avg. reach growth" },
      { value: "2 hrs", label: "DM response time" },
    ],
    faqs: [
      { q: "Do you create the creatives or do we?", a: "We do. Design, copy, shooting and editing are all in-house. You approve everything from a shared calendar." },
      { q: "Which platforms do you cover?", a: "Instagram, Facebook, LinkedIn, YouTube and X. We usually recommend concentrating on two rather than spreading thin across five." },
    ],
    seo_title: "Social Media Marketing Agency | Instagram, LinkedIn & YouTube",
    seo_description: "Social media marketing with in-house content production: calendars, reels, carousels, community management and monthly performance reporting.",
    seo_keywords: "social media marketing agency, instagram marketing india, smm services company, social media management Delhi",
  },
  {
    slug: "google-ads-ppc",
    category_slug: "marketing",
    title: "Google Ads & PPC Management",
    menu_label: "Google Ads (PPC)",
    excerpt: "Search, Shopping and Performance Max campaigns run to a target CPA.",
    icon: "Target",
    price_from: "20,000/mo",
    is_featured: false,
    is_published: true,
    order_index: 3,
    body: `<p>Paid search is the fastest way to test whether people want what you sell. We run it with strict discipline: clean account structure, correct conversion tracking and ruthless negative keyword hygiene.</p>
<h2>Tracking first, spend second</h2>
<p>Before a rupee is spent we verify GA4, Google Ads conversions, enhanced conversions and offline import where relevant. Optimising against wrong data is the most expensive mistake in performance marketing.</p>`,
    features: [
      "Search, Shopping, Performance Max and YouTube campaigns",
      "Conversion tracking and GA4 audit before launch",
      "Landing page recommendations and A/B tests",
      "Daily bid, budget and negative keyword management",
      "Competitor and auction-insight monitoring",
      "Weekly spend, CPA and ROAS reporting",
    ],
    outcomes: [
      { value: "-34%", label: "Avg. cost per lead" },
      { value: "Daily", label: "Account optimisation" },
      { value: "100%", label: "Ad account ownership" },
    ],
    faqs: [
      { q: "Who owns the ad account?", a: "You do. We work inside your Google Ads account with manager access, so history and data stay with you if we ever part ways." },
      { q: "What is the minimum ad budget?", a: "We recommend at least fifty thousand rupees a month in media spend for search. Below that there is not enough data to optimise on." },
    ],
    seo_title: "Google Ads & PPC Management Agency in India",
    seo_description: "Google Ads management for Search, Shopping and Performance Max. Conversion tracking, daily optimisation and transparent CPA reporting.",
    seo_keywords: "google ads agency india, ppc management services, performance max agency, google shopping ads management",
  },
  {
    slug: "meta-ads-management",
    category_slug: "marketing",
    title: "Meta Ads for Facebook & Instagram",
    menu_label: "Meta Ads Management",
    excerpt: "Creative-led paid social built around a tested offer, not boosted posts.",
    icon: "Megaphone",
    price_from: "20,000/mo",
    is_featured: false,
    is_published: true,
    order_index: 4,
    body: `<p>On Meta, the creative is the targeting. We produce and test a steady stream of hooks, angles and formats, then scale the winners while the account structure stays boringly simple.</p>
<h2>Full funnel, from cold traffic to retention</h2>
<p>Prospecting, warm audiences, retargeting and a WhatsApp or catalogue retention layer, with the Conversions API installed so you are not flying blind on iOS traffic.</p>`,
    features: [
      "Conversions API and Pixel setup with event matching",
      "8-15 new ad creatives tested every month",
      "Advantage+ shopping and catalogue campaigns",
      "Audience, lookalike and exclusion architecture",
      "Landing page and offer testing",
      "Weekly ROAS and creative-performance reporting",
    ],
    outcomes: [
      { value: "4.6x", label: "Avg. blended ROAS" },
      { value: "15", label: "Creatives tested monthly" },
      { value: "CAPI", label: "Server-side tracking" },
    ],
    faqs: [
      { q: "Do you make the ad creatives?", a: "Yes. Statics, reels and UGC-style videos are produced by our creative studio and iterated based on what the data says." },
      { q: "Can you fix a restricted ad account?", a: "We handle policy reviews, business verification and appeals, and we restructure the account so the same rejection does not repeat." },
    ],
    seo_title: "Meta Ads Agency | Facebook & Instagram Advertising Management",
    seo_description: "Facebook and Instagram ads management with in-house creative production, Conversions API tracking and weekly ROAS reporting.",
    seo_keywords: "meta ads agency, facebook ads management india, instagram advertising agency, performance marketing company",
  },
  {
    slug: "content-marketing",
    category_slug: "marketing",
    title: "Content Marketing & Copywriting",
    menu_label: "Content & Copywriting",
    excerpt: "Articles, landing pages and product copy written to rank and to sell.",
    icon: "PenLine",
    price_from: "12,000/mo",
    is_featured: false,
    is_published: true,
    order_index: 5,
    body: `<p>Content that ranks but does not convert is a vanity asset. Every brief we write starts from search intent and ends with a specific action we want the reader to take.</p>
<h2>Written by people, checked by editors</h2>
<p>Subject-matter research, original examples, Indian market context and a human editorial pass, plus schema and internal linking so each piece strengthens the whole site.</p>`,
    features: [
      "Topic clusters mapped to commercial intent",
      "SEO briefs with entities, structure and internal links",
      "Long-form articles, landing pages and product copy",
      "Editorial review with plagiarism and AI checks",
      "Content refresh programme for decaying pages",
      "Performance tracking per article",
    ],
    outcomes: [
      { value: "8-12", label: "Pieces per month" },
      { value: "2.9x", label: "Traffic per refreshed page" },
      { value: "0%", label: "Plagiarised content" },
    ],
    faqs: [
      { q: "Do you write in Hindi?", a: "Yes, Hindi, Hinglish and English, including regional variants for local campaigns." },
    ],
    seo_title: "Content Marketing & SEO Copywriting Services in India",
    seo_description: "SEO content marketing: keyword-mapped topic clusters, long-form articles, landing page copy and content refresh programmes.",
    seo_keywords: "content marketing agency india, seo content writing services, copywriting agency, blog writing services india",
  },
  {
    slug: "email-whatsapp-marketing",
    category_slug: "marketing",
    title: "Email & WhatsApp Marketing",
    menu_label: "Email & WhatsApp",
    excerpt: "Automated journeys that turn one-time buyers into repeat revenue.",
    icon: "Mail",
    price_from: "12,000/mo",
    is_featured: false,
    is_published: true,
    order_index: 6,
    body: `<p>Acquiring a customer is expensive. The second sale is where the margin lives. We build the retention layer: welcome flows, abandoned cart recovery, replenishment reminders and win-backs.</p>
<h2>WhatsApp is the highest-intent inbox in India</h2>
<p>Using the official WhatsApp Business API we set up template approvals, opt-in capture, catalogue sharing and order notifications. Compliant, and far better read than email.</p>`,
    features: [
      "WhatsApp Business API setup and template approvals",
      "Welcome, cart-recovery, replenishment and win-back flows",
      "List segmentation and deliverability hygiene",
      "Campaign design and copy",
      "A/B testing on subject lines and send times",
      "Revenue-attributed reporting per flow",
    ],
    outcomes: [
      { value: "22%", label: "Avg. revenue from retention" },
      { value: "68%", label: "WhatsApp open rate" },
      { value: "6", label: "Core automations live" },
    ],
    faqs: [
      { q: "Which tools do you work with?", a: "Klaviyo, Mailchimp, Brevo, WATI, Interakt and AiSensy. We can also work inside Shopify Email or whatever stack you already pay for." },
    ],
    seo_title: "Email & WhatsApp Marketing Automation Services | Retention Marketing",
    seo_description: "WhatsApp Business API and email marketing automation: welcome flows, cart recovery, win-backs and revenue-attributed reporting.",
    seo_keywords: "whatsapp marketing india, email marketing agency, whatsapp business api provider, retention marketing services",
  },
];

/** Web + Digital Marketing catalogue. Creative, e-commerce and training live in services-b.ts */
export const seedGroupA = seed;
