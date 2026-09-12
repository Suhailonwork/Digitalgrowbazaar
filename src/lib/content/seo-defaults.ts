/**
 * Starting metadata for the fixed routes. These mirror the fallbacks each page
 * declares in its own `generateMetadata`, and are seeded into `seo_meta` so the
 * title and description of every page — not just services and articles — become
 * editable from Admin → SEO manager.
 */
export const staticSeoDefaults = [
  {
    path: "/",
    title: "Digital Grow Bazaar | Web Development, Digital Marketing & E-commerce Growth",
    description:
      "Full-stack growth partner in Delhi: website development, SEO and digital marketing, videography and product photoshoots, e-commerce training, and Amazon, Flipkart and Meesho account management.",
    keywords:
      "digital marketing agency Delhi, website development company india, ecommerce account management, amazon flipkart meesho seller services, product photoshoot, videography, ecommerce training",
  },
  {
    path: "/services",
    title: "Our Services | Web, Marketing, Creative & E-commerce",
    description:
      "Explore every service from Digital Grow Bazaar: website and e-commerce development, SEO and paid media, videography and product photoshoots, seller training, and Amazon, Flipkart and Meesho account management.",
    keywords:
      "digital marketing services, website development services, ecommerce account management services, product photoshoot, videography services, ecommerce training india",
  },
  {
    path: "/about",
    title: "About Us | The Team Behind Digital Grow Bazaar",
    description:
      "Founded in 2017 in Delhi, Digital Grow Bazaar is a 40-person team of developers, marketers, editors and marketplace specialists helping Indian brands grow online.",
    keywords: "about digital grow bazaar, digital marketing agency Delhi, ecommerce agency india, web development team Delhi",
  },
  {
    path: "/work",
    title: "Our Work & Case Studies | Digital Grow Bazaar",
    description:
      "Real results from Indian brands we work with: marketplace revenue growth, organic traffic gains and D2C store performance, with the numbers behind each engagement.",
    keywords: "digital marketing case studies india, amazon seller case study, ecommerce growth results, seo case study india",
  },
  {
    path: "/blog",
    title: "Insights & Playbooks | Digital Grow Bazaar Blog",
    description:
      "Practical guides on e-commerce, SEO, marketplace selling and web development, written by the team that runs these accounts every day.",
    keywords: "ecommerce blog india, amazon seller tips, seo guide india, digital marketing insights",
  },
  {
    path: "/contact",
    title: "Contact Us | Digital Grow Bazaar, Delhi",
    description:
      "Talk to Digital Grow Bazaar about web development, digital marketing, videography, photoshoots, e-commerce training or Amazon, Flipkart and Meesho account management. Free audit, reply within one working day.",
    keywords: "contact digital marketing agency Delhi, ecommerce agency contact, website development enquiry, amazon account management contact",
  },
];
