import type { Service } from "@/lib/types";

type Seed = Omit<Service, "process">;

/** Creative Studio + E-commerce Operations + Training catalogue. */
export const seedGroupB: Seed[] = [
  // ------------------------------------------------------------- CREATIVE --
  {
    slug: "videography-video-production",
    category_slug: "creative",
    title: "Videography & Video Production",
    menu_label: "Videography",
    excerpt: "Brand films, product videos and ad creatives shot and edited in-house.",
    icon: "Video",
    price_from: "25,000",
    is_featured: true,
    is_published: true,
    order_index: 1,
    body: `<p>Video is the format that sells hardest on every platform that matters, and it is the format most brands outsource badly. We run production end to end: script, shoot, edit, sound, colour and platform-ready exports.</p>
<h2>One shoot, a month of content</h2>
<p>We plan every shoot day so it produces a full content bank: a hero brand film, product demos, a batch of vertical reels, testimonial cuts and thumbnail stills. You get variety without paying for five separate shoots.</p>
<h2>Built for the algorithm and the buyer</h2>
<p>Hook in the first two seconds, captions burned in for silent viewing, aspect ratios for every placement, and a version cut specifically for marketplace listings where Amazon and Flipkart have their own duration and compliance rules.</p>`,
    features: [
      "Scripting, storyboarding and shot lists",
      "4K multi-camera shoot with professional lighting and audio",
      "Brand films, product demos, explainers and testimonials",
      "Vertical reels and YouTube Shorts cut from the same shoot",
      "Editing, colour grading, sound design, subtitles and motion graphics",
      "Exports for Instagram, YouTube, Meta ads and marketplace listings",
    ],
    outcomes: [
      { value: "30+", label: "Assets from one shoot day" },
      { value: "4K", label: "Capture standard" },
      { value: "5-7 days", label: "Edit turnaround" },
    ],
    faqs: [
      { q: "Do you shoot at our location or in a studio?", a: "Both. We have a Delhi studio for controlled product and interview work, and we travel across the NCR and to other cities for on-location shoots." },
      { q: "Do you provide models, actors or voice-over artists?", a: "Yes. Casting, styling, hair and make-up, props and voice-over in Hindi or English are all arranged as part of pre-production." },
      { q: "How many revisions are included?", a: "Two rounds of edit revisions are included in every package. Further rounds are billed hourly, though they are rarely needed because you approve the cut structure before final polish." },
      { q: "Can you make ad creatives for our running campaigns?", a: "That is one of our most requested packages: monthly batches of performance creatives, produced against the angles our media team wants to test." },
    ],
    seo_title: "Videography & Video Production Company in Delhi | Brand & Product Videos",
    seo_description:
      "Professional video production: brand films, product videos, reels, ad creatives and testimonials. 4K shoot, in-house editing and platform-ready exports.",
    seo_keywords: "videography services Delhi, video production company india, product video shoot, corporate video production, ad film making",
  },
  {
    slug: "product-photoshoot",
    category_slug: "creative",
    title: "Product Photoshoot & Photography",
    menu_label: "Product Photoshoot",
    excerpt: "Catalogue, lifestyle and model photography that is marketplace-compliant.",
    icon: "Camera",
    price_from: "149/image",
    is_featured: true,
    is_published: true,
    order_index: 2,
    body: `<p>On a marketplace, your photograph is your shop window, your salesperson and your packaging all at once. A weak first image caps your conversion rate no matter how good the product is.</p>
<h2>Marketplace-compliant from the first frame</h2>
<p>Pure white background at the exact value Amazon requires, correct frame fill, no props in the main image, and the infographic and lifestyle secondary images that actually drive the add-to-cart. We shoot to the specification of every platform you sell on.</p>
<h2>Volume without losing quality</h2>
<p>Our studio workflow handles hundreds of SKUs a week with consistent lighting, angles and colour, so your catalogue looks like one brand rather than fifty different shoots.</p>`,
    features: [
      "White-background catalogue images for Amazon, Flipkart and Meesho",
      "Lifestyle, model and on-location shoots",
      "360-degree spins and macro detail shots",
      "Infographic and A+ content image design",
      "Professional retouching, clipping and colour correction",
      "Bulk SKU workflow with consistent styling",
    ],
    outcomes: [
      { value: "300+", label: "SKUs per week capacity" },
      { value: "100%", label: "Marketplace compliance" },
      { value: "3-5 days", label: "Delivery turnaround" },
    ],
    faqs: [
      { q: "How do we send you the products?", a: "Courier them to our Delhi studio or we arrange a pickup within the NCR. Products are photographed, repacked and returned, or held for your next shoot if you prefer." },
      { q: "What is the per-image cost?", a: "Catalogue images start at a low per-image rate that drops with volume. Lifestyle and model shoots are quoted per shoot day, and you always get the full quote before we begin." },
      { q: "Do you provide models?", a: "Yes, for apparel, jewellery, beauty and lifestyle categories, along with styling and make-up." },
      { q: "Will the images pass Amazon's image quality checks?", a: "Yes. We shoot to the current technical specification for each marketplace, including background colour, minimum resolution and frame-fill rules." },
    ],
    seo_title: "Product Photoshoot & E-commerce Photography Studio in Delhi",
    seo_description:
      "Product photography for Amazon, Flipkart and Meesho: white-background catalogue images, lifestyle and model shoots, 360 spins and A+ infographics.",
    seo_keywords: "product photoshoot Delhi, ecommerce product photography, amazon product photography, catalogue photography services, model photoshoot india",
  },
  {
    slug: "reels-ad-film-production",
    category_slug: "creative",
    title: "Reels & Ad Film Production",
    menu_label: "Reels & Ad Films",
    excerpt: "Short-form video batches produced monthly for social and paid campaigns.",
    icon: "Clapperboard",
    price_from: "18,000/mo",
    is_featured: false,
    is_published: true,
    order_index: 3,
    body: `<p>Short-form video burns through creative faster than any other format. A monthly batch keeps your feed and your ad account fed without a scramble every week.</p>
<h2>Hooks tested, not guessed</h2>
<p>We write multiple hooks per concept and cut variants of the same footage, so the media team can test which opening actually stops the scroll.</p>`,
    features: [
      "Monthly batch of 10-20 vertical reels",
      "UGC-style and creator-led formats",
      "Multiple hook variants per concept",
      "Trending audio, captions and motion graphics",
      "Ad-ready exports for Meta, Google and YouTube",
      "Performance review feeding the next batch",
    ],
    outcomes: [
      { value: "20", label: "Reels per month" },
      { value: "3", label: "Hook variants per concept" },
      { value: "48 hrs", label: "Rush turnaround available" },
    ],
    faqs: [
      { q: "Can you use footage we already have?", a: "Yes. We regularly build reel batches from existing shoot footage, which is the cheapest way to get started." },
    ],
    seo_title: "Instagram Reels & Ad Film Production Services in India",
    seo_description: "Monthly short-form video production: reels, UGC-style ads, hook variants and platform-ready exports for Meta, Google and YouTube campaigns.",
    seo_keywords: "reels production company, ad film production india, ugc video creation, short form video agency",
  },
  {
    slug: "graphic-design-branding",
    category_slug: "creative",
    title: "Graphic Design & Brand Identity",
    menu_label: "Graphic Design & Branding",
    excerpt: "Logos, brand guidelines, packaging and the design system behind them.",
    icon: "Sparkles",
    price_from: "20,000",
    is_featured: false,
    is_published: true,
    order_index: 4,
    body: `<p>A brand is a promise people can recognise at a glance. We build the visual system that makes yours consistent everywhere it appears, from a marketplace thumbnail to a trade-show banner.</p>
<h2>Identity first, then everything downstream</h2>
<p>Logo, typography, colour, iconography and layout rules come first. Packaging, catalogues, social templates, pitch decks and marketplace A+ modules then follow the same system.</p>`,
    features: [
      "Logo design with multiple routes and revisions",
      "Brand guidelines covering colour, type and usage",
      "Packaging and label design with print-ready files",
      "Social media and marketplace template kits",
      "Brochures, catalogues and pitch decks",
      "Source files handed over in full",
    ],
    outcomes: [
      { value: "3", label: "Logo routes explored" },
      { value: "1", label: "System, every touchpoint" },
      { value: "Print", label: "Ready CMYK files" },
    ],
    faqs: [
      { q: "Do we get the editable source files?", a: "Yes. Vector logo files, fonts and layered source files for everything we design are yours to keep." },
    ],
    seo_title: "Graphic Design & Brand Identity Agency in India",
    seo_description: "Logo design, brand guidelines, packaging, catalogues and social template kits built as one consistent visual system.",
    seo_keywords: "graphic design agency india, logo design company, brand identity design, packaging design services",
  },

  // ------------------------------------------------------------ ECOMMERCE --
  {
    slug: "amazon-account-management",
    category_slug: "ecommerce",
    title: "Amazon Seller Account Management",
    menu_label: "Amazon Account Management",
    excerpt: "Listings, ads, inventory and account health managed daily by specialists.",
    icon: "Package",
    price_from: "18,000/mo",
    is_featured: true,
    is_published: true,
    order_index: 1,
    body: `<p>Amazon rewards operational discipline. Sellers who win are not the ones with the best product, they are the ones who fix listing quality, keep inventory healthy, defend the buy box and manage ads to a target ACoS every single day.</p>
<h2>We run the account like it is ours</h2>
<p>Cataloguing and listing optimisation, A+ Content and Brand Store, Sponsored Products, Brands and Display campaigns, FBA shipment planning, pricing strategy, deals and coupons, and daily account health monitoring. You get a named account manager, not a ticket queue.</p>
<h2>Recovering what Amazon owes you</h2>
<p>Lost and damaged inventory, over-charged fees, incorrect weight and dimension charges and unreturned refunds add up quietly. We audit and file reimbursement claims as part of the retainer.</p>`,
    features: [
      "Seller Central and Vendor Central management",
      "Listing optimisation, A+ Content and Brand Store design",
      "Sponsored Products, Brands and Display campaign management",
      "FBA shipment planning and inventory health",
      "Buy box, pricing and competitor monitoring",
      "Reimbursement claims, case filing and appeals",
    ],
    outcomes: [
      { value: "2.4x", label: "Avg. GMV in 6 months" },
      { value: "-31%", label: "Avg. ACoS reduction" },
      { value: "Daily", label: "Account health checks" },
    ],
    faqs: [
      { q: "Do you take a commission on sales?", a: "Our standard model is a flat monthly retainer, which keeps our advice honest. A hybrid retainer plus performance model is available for larger accounts." },
      { q: "Can you help with a suspended account?", a: "Yes. We write and file the Plan of Action, handle the appeal correspondence and then fix the underlying operational cause so it does not repeat." },
      { q: "We are new to Amazon. Can you launch us?", a: "Full launch is included: GST and brand registry, category approvals, cataloguing, first shipment planning and the launch ad strategy." },
      { q: "Will we have access to our own account?", a: "Always. We work inside your Seller Central with the access level you grant, and you can see everything we do." },
    ],
    seo_title: "Amazon Account Management Services India | Seller Central Experts",
    seo_description:
      "End-to-end Amazon seller account management: listing optimisation, A+ Content, PPC campaigns, FBA, reimbursements and account health monitoring.",
    seo_keywords: "amazon account management services, amazon seller central management india, amazon ppc agency, amazon listing optimisation, amazon account handling",
  },
  {
    slug: "flipkart-account-management",
    category_slug: "ecommerce",
    title: "Flipkart Seller Account Management",
    menu_label: "Flipkart Account Management",
    excerpt: "Growth, ads and operations for Flipkart sellers, including Big Billion Days.",
    icon: "Store",
    price_from: "15,000/mo",
    is_featured: true,
    is_published: true,
    order_index: 2,
    body: `<p>Flipkart runs on its own logic: Growth Score, Rank Booster, Smart Fulfilment and event calendars that decide your whole quarter. Sellers who treat it like Amazon leave money on the table.</p>
<h2>Built around the Flipkart playbook</h2>
<p>We manage listing quality and Growth Score, run PLA and Rank Booster campaigns to a target ROI, plan Big Billion Days and other event participation months ahead, and keep your fulfilment and returns metrics inside the seller-tier thresholds that unlock better visibility.</p>`,
    features: [
      "Seller Hub management and Growth Score improvement",
      "Cataloguing, listing quality and content scoring",
      "PLA, Rank Booster and Smart Advertising campaigns",
      "Big Billion Days and event calendar planning",
      "Smart Fulfilment, F-Assured and returns management",
      "Claims, penalties and payment reconciliation",
    ],
    outcomes: [
      { value: "2.1x", label: "Avg. order growth" },
      { value: "Gold+", label: "Target seller tier" },
      { value: "Weekly", label: "Ad optimisation cycle" },
    ],
    faqs: [
      { q: "Can you improve our Growth Score?", a: "Yes. It is driven by listing quality, fulfilment reliability, returns and cancellations. We work each lever and track the score weekly." },
      { q: "Do you handle Big Billion Days preparation?", a: "Event planning starts six to eight weeks ahead: inventory forecasting, price laddering, deal nominations and ad budget staging." },
      { q: "What about Flipkart penalties and claims?", a: "We file and follow up on SPF claims, wrong-return claims and penalty disputes as part of the monthly scope." },
    ],
    seo_title: "Flipkart Account Management Services | Seller Hub & Ads Experts",
    seo_description:
      "Flipkart seller account management: cataloguing, Growth Score, PLA and Rank Booster ads, Big Billion Days planning, returns and claims handling.",
    seo_keywords: "flipkart account management, flipkart seller services india, flipkart ads agency, flipkart cataloging services, flipkart seller hub management",
  },
  {
    slug: "meesho-account-management",
    category_slug: "ecommerce",
    title: "Meesho Seller Account Management",
    menu_label: "Meesho Account Management",
    excerpt: "Price-led growth on Meesho without destroying your margin.",
    icon: "ShoppingBag",
    price_from: "12,000/mo",
    is_featured: true,
    is_published: true,
    order_index: 3,
    body: `<p>Meesho is a volume and price game with a return rate that can quietly eat every rupee of profit. Winning there is about catalogue breadth, tight pricing and controlling RTO, not about brand storytelling.</p>
<h2>Margin-aware growth</h2>
<p>We build a wide, well-tagged catalogue, price against live competitor data, manage Meesho Ads for profitable SKUs only, and attack the return and RTO drivers, from sizing charts to packaging, that decide whether volume is worth having.</p>`,
    features: [
      "Bulk catalogue upload and quality-score improvement",
      "Competitive price monitoring and repricing strategy",
      "Meesho Ads campaign management",
      "Return and RTO reduction programme",
      "Inventory, dispatch SLA and NDR handling",
      "Payment reconciliation and claim filing",
    ],
    outcomes: [
      { value: "3.2x", label: "Avg. order volume" },
      { value: "-24%", label: "Return rate reduction" },
      { value: "500+", label: "SKUs uploaded weekly" },
    ],
    faqs: [
      { q: "How do you reduce Meesho returns?", a: "Accurate size charts, honest photography, better packaging, quality checks before dispatch and pruning the SKUs whose return rate never recovers." },
      { q: "Is Meesho worth it for a branded product?", a: "It depends on your price band. We run a margin analysis first and tell you honestly if the channel does not suit your cost structure." },
    ],
    seo_title: "Meesho Account Management Services | Seller Panel & Ads",
    seo_description:
      "Meesho seller account management: bulk cataloguing, repricing, Meesho Ads, return and RTO reduction, and payment reconciliation.",
    seo_keywords: "meesho account management, meesho seller services, meesho cataloging services, meesho ads management, meesho supplier panel handling",
  },
  {
    slug: "catalog-listing-services",
    category_slug: "ecommerce",
    title: "Cataloguing & Listing Optimisation",
    menu_label: "Cataloguing & Listings",
    excerpt: "Keyword-rich listings and clean catalogue data across every marketplace.",
    icon: "ListChecks",
    price_from: "60/SKU",
    is_featured: false,
    is_published: true,
    order_index: 4,
    body: `<p>Marketplace search is a keyword game with a compliance layer on top. A listing that is missing attributes or stuffed into the wrong category simply will not be shown, however good the product is.</p>
<h2>Data quality is ranking quality</h2>
<p>We research the terms buyers actually use, write titles and bullets that rank and read well, complete every backend attribute, and keep one master catalogue synced across Amazon, Flipkart, Meesho, JioMart and your own store.</p>`,
    features: [
      "Marketplace keyword research per SKU",
      "Titles, bullets, descriptions and backend search terms",
      "Correct category and attribute mapping",
      "A+ Content and enhanced brand modules",
      "Bulk upload templates and flat files",
      "Master catalogue synced across channels",
    ],
    outcomes: [
      { value: "1,000+", label: "SKUs per week" },
      { value: "+64%", label: "Avg. listing impressions" },
      { value: "99%", label: "Attribute completion" },
    ],
    faqs: [
      { q: "Do you work per SKU or per project?", a: "Both. Per-SKU pricing suits ongoing catalogue additions, project pricing suits a one-time clean-up of an existing catalogue." },
    ],
    seo_title: "E-commerce Cataloguing & Product Listing Services in India",
    seo_description: "Marketplace cataloguing and listing optimisation: keyword research, titles and bullets, attributes, A+ Content and bulk uploads.",
    seo_keywords: "ecommerce cataloging services, product listing services india, amazon listing optimization, bulk product upload services",
  },
  {
    slug: "marketplace-ads-management",
    category_slug: "ecommerce",
    title: "Marketplace Ads Management",
    menu_label: "Marketplace Ads (PPC)",
    excerpt: "Amazon, Flipkart and Meesho ad spend managed to a profitable ACoS.",
    icon: "BarChart3",
    price_from: "15,000/mo",
    is_featured: false,
    is_published: true,
    order_index: 5,
    body: `<p>Marketplace ads are the fastest lever on the platform and the easiest place to waste money. Most accounts we audit are paying for irrelevant search terms and bidding against their own products.</p>
<h2>Structure, then bids</h2>
<p>We rebuild the campaign structure around match types and SKU profitability, harvest converting search terms into exact campaigns, negate the rest, and pace budgets around your stock position so you never advertise something you cannot ship.</p>`,
    features: [
      "Campaign restructure by match type and SKU margin",
      "Search-term harvesting and negative keyword hygiene",
      "Bid management against a target ACoS or ROAS",
      "Budget pacing tied to inventory levels",
      "Sponsored Brands and Display retargeting",
      "Weekly profitability reporting per SKU",
    ],
    outcomes: [
      { value: "-31%", label: "Avg. ACoS" },
      { value: "+58%", label: "Ad-attributed revenue" },
      { value: "Weekly", label: "Search-term review" },
    ],
    faqs: [
      { q: "What ACoS should we target?", a: "It depends on your contribution margin and whether the SKU is in launch or harvest phase. We model your break-even ACoS first, then set the target from that." },
    ],
    seo_title: "Amazon, Flipkart & Meesho Ads Management Agency",
    seo_description: "Marketplace PPC management: campaign restructure, search-term harvesting, ACoS-targeted bidding and weekly profitability reporting.",
    seo_keywords: "amazon ppc management india, flipkart ads agency, marketplace advertising services, amazon sponsored products management",
  },
  {
    slug: "account-reinstatement-appeals",
    category_slug: "ecommerce",
    title: "Account Reinstatement & Appeals",
    menu_label: "Suspension & Appeals",
    excerpt: "Suspended listing or account? A structured Plan of Action, fast.",
    icon: "ShieldCheck",
    price_from: "On request",
    is_featured: false,
    is_published: true,
    order_index: 6,
    body: `<p>A suspension is a revenue emergency with a paperwork solution. Generic templates get rejected, and every rejected appeal makes the next one harder.</p>
<h2>Root cause, evidence, prevention</h2>
<p>We diagnose the real trigger, gather the invoices and evidence the platform expects, write a Plan of Action in the structure they respond to, and then fix the operational cause so you are not back here next quarter.</p>`,
    features: [
      "Suspension root-cause diagnosis",
      "Plan of Action drafting and submission",
      "Invoice and authorisation document preparation",
      "Intellectual property and counterfeit complaint handling",
      "Escalation correspondence and follow-up",
      "Preventive account health monitoring afterwards",
    ],
    outcomes: [
      { value: "24 hrs", label: "First appeal filed" },
      { value: "87%", label: "Reinstatement rate" },
      { value: "1:1", label: "Named specialist" },
    ],
    faqs: [
      { q: "How quickly can you file an appeal?", a: "We aim to submit the first Plan of Action within 24 hours of receiving the suspension notice and your documents." },
      { q: "What if a previous appeal was already rejected?", a: "We can still help. We review the rejected submissions, identify what the platform found insufficient and rebuild the case from there." },
    ],
    seo_title: "Amazon & Flipkart Account Reinstatement & Appeal Services",
    seo_description: "Suspended marketplace account or listing? Root-cause diagnosis, Plan of Action drafting, document preparation and escalation handling.",
    seo_keywords: "amazon account reinstatement india, amazon suspension appeal service, flipkart account suspended help, plan of action writing",
  },

  // ------------------------------------------------------------- TRAINING --
  {
    slug: "ecommerce-business-training",
    category_slug: "training",
    title: "E-commerce Business Training",
    menu_label: "E-commerce Business Training",
    excerpt: "Learn to launch and run a profitable marketplace business, on live accounts.",
    icon: "GraduationCap",
    price_from: "14,999",
    is_featured: true,
    is_published: true,
    order_index: 1,
    body: `<p>Most e-commerce courses teach you how to register a seller account and stop there. Registration is the easy part. Staying profitable after fees, returns and ad spend is the part nobody explains.</p>
<h2>A practical programme, run on real accounts</h2>
<p>Over six weeks you go from product selection and sourcing to a live, optimised listing running its first ad campaign. Sessions are conducted on real Seller Central, Flipkart Seller Hub and Meesho panels, sharing screens, not slides.</p>
<h2>What you will actually be able to do</h2>
<p>Pick products using data instead of instinct, register and complete GST and brand compliance, build listings that rank, calculate true unit economics including every marketplace fee, run ads to a profitable ACoS, and control returns and RTO. You leave with the spreadsheets and checklists we use internally.</p>
<h2>Who this is for</h2>
<p>New sellers preparing to launch, existing sellers stuck at a plateau, and business owners who want to supervise an in-house team properly rather than depend entirely on an agency.</p>`,
    features: [
      "6-week live cohort, weekend batches available",
      "Product research, sourcing and unit-economics modelling",
      "Account registration, GST, brand registry and compliance",
      "Listing, cataloguing and marketplace SEO practice",
      "Live ad campaign setup on a real budget",
      "Return, RTO and profitability control systems",
      "Templates, calculators and checklists included",
      "Certificate plus 60 days of doubt clearing",
    ],
    outcomes: [
      { value: "6 wks", label: "Programme length" },
      { value: "1 live", label: "Listing launched by you" },
      { value: "60 days", label: "Post-course support" },
    ],
    faqs: [
      { q: "Do I need an existing seller account?", a: "No. If you do not have one we walk you through registration during the programme. If you do, we use your live account so the work is immediately useful." },
      { q: "Is the training online or in person?", a: "Both. Live online cohorts run every month, and we run in-person batches and corporate workshops at our Delhi office." },
      { q: "What language are sessions in?", a: "Hindi and English mixed, which is how the industry actually talks. Recordings are available for every session." },
      { q: "Will you help after the course ends?", a: "You get 60 days of doubt clearing in a private group, and many participants later move onto a light-touch consulting retainer." },
    ],
    seo_title: "E-commerce Business Training Course in India | Amazon, Flipkart & Meesho",
    seo_description:
      "Practical 6-week e-commerce seller training on live Amazon, Flipkart and Meesho accounts: product research, listings, ads, unit economics and returns control.",
    seo_keywords: "ecommerce business training, amazon seller training india, flipkart seller course, meesho seller training, online selling course Delhi",
  },
  {
    slug: "digital-marketing-training",
    category_slug: "training",
    title: "Digital Marketing Training",
    menu_label: "Digital Marketing Training",
    excerpt: "SEO, Meta and Google Ads taught on live campaigns and real budgets.",
    icon: "Presentation",
    price_from: "17,999",
    is_featured: false,
    is_published: true,
    order_index: 2,
    body: `<p>Certifications do not run campaigns. This programme puts you inside real ad accounts and real Search Console properties from week one.</p>
<h2>Modules that map to actual jobs</h2>
<p>SEO and content, Meta Ads, Google Ads, analytics and tracking, WhatsApp and email automation, and reporting. Each module ends with a deliverable you can show a client or an employer.</p>`,
    features: [
      "8-week live cohort with recordings",
      "Hands-on SEO audit and content brief practice",
      "Meta and Google Ads campaigns on a live budget",
      "GA4, Tag Manager and conversion tracking",
      "Portfolio project with a real business",
      "Placement guidance and interview preparation",
    ],
    outcomes: [
      { value: "8 wks", label: "Programme length" },
      { value: "5", label: "Portfolio deliverables" },
      { value: "Live", label: "Ad budget provided" },
    ],
    faqs: [
      { q: "Do I need a marketing background?", a: "No. The programme starts from fundamentals, though it moves quickly, so expect around six hours of practice a week." },
    ],
    seo_title: "Digital Marketing Training Course in Delhi | Live Campaign Practice",
    seo_description: "8-week practical digital marketing course covering SEO, Meta Ads, Google Ads, GA4 and automation, taught on live accounts with a portfolio project.",
    seo_keywords: "digital marketing course Delhi, digital marketing training india, seo training institute, google ads course with live practice",
  },
  {
    slug: "ecommerce-consulting",
    category_slug: "training",
    title: "E-commerce Growth Consulting",
    menu_label: "Growth Consulting",
    excerpt: "A senior operator in your corner, monthly, without a full agency retainer.",
    icon: "Users",
    price_from: "25,000/mo",
    is_featured: false,
    is_published: true,
    order_index: 3,
    body: `<p>Some teams do not need an agency. They need someone experienced to review the numbers, call out the real problem and set the next month's priorities.</p>
<h2>How the retainer works</h2>
<p>A monthly account and P&L review, a written priority list, two working calls a month with your team, and asynchronous access for the decisions that cannot wait. We also help you hire and train the in-house people who will eventually replace us.</p>`,
    features: [
      "Monthly account, ads and P&L review",
      "Written priorities with owners and deadlines",
      "Two working calls a month with your team",
      "Hiring support: JDs, tests and interview panels",
      "SOP and dashboard setup for in-house teams",
      "Asynchronous access between calls",
    ],
    outcomes: [
      { value: "Monthly", label: "Strategic review" },
      { value: "SOPs", label: "Documented for your team" },
      { value: "Async", label: "Between-call access" },
    ],
    faqs: [
      { q: "Is this instead of managed services?", a: "Usually yes. Consulting suits teams who have people but need direction. If you lack the people, a managed retainer is the better fit and we will say so." },
    ],
    seo_title: "E-commerce Growth Consulting for Indian D2C & Marketplace Sellers",
    seo_description: "Monthly e-commerce consulting: account and P&L review, prioritised action plans, hiring support and SOPs for in-house teams.",
    seo_keywords: "ecommerce consultant india, d2c growth consulting, marketplace consulting services, ecommerce business consultant Delhi",
  },
];
