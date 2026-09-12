export type ServiceCategory = {
  id?: string;
  slug: string;
  name: string;
  /** Short line shown under the category heading inside the mega menu. */
  blurb: string;
  icon: string;
  order_index: number;
  is_published?: boolean;
};

export type FAQ = { q: string; a: string };

export type Service = {
  id?: string;
  slug: string;
  category_slug: string;
  title: string;
  /** Compact label used inside the mega menu. */
  menu_label: string;
  excerpt: string;
  icon: string;
  /** Long-form HTML body rendered with .prose-dgb */
  body: string;
  features: string[];
  outcomes: { value: string; label: string }[];
  process: { title: string; detail: string }[];
  faqs: FAQ[];
  price_from?: string | null;
  is_featured: boolean;
  is_published: boolean;
  order_index: number;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  og_image?: string | null;
  updated_at?: string;
};

export type Page = {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  body: string;
  is_published: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  og_image?: string | null;
  updated_at?: string;
};

export type Post = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image?: string | null;
  author: string;
  tags: string[];
  published_at: string;
  is_published: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
};

export type Testimonial = {
  id?: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar_url?: string | null;
  is_published?: boolean;
  order_index?: number;
};

export type CaseStudy = {
  id?: string;
  slug: string;
  client: string;
  industry: string;
  headline: string;
  summary: string;
  metrics: { value: string; label: string }[];
  services: string[];
  cover_image?: string | null;
  is_published?: boolean;
  order_index?: number;
};

export type SeoMeta = {
  id?: string;
  /** Route path, e.g. "/", "/services", "/contact" */
  path: string;
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
  og_image?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  twitter_card?: string | null;
  canonical?: string | null;
  noindex?: boolean;
  nofollow?: boolean;
  json_ld?: string | null;
  updated_at?: string;
};

/** A link in the primary navigation. `has_mega` opens the services mega panel. */
export type MenuItem = {
  id?: string;
  label: string;
  href: string;
  order_index: number;
  is_published: boolean;
  open_in_new_tab: boolean;
  badge?: string | null;
  has_mega: boolean;
  updated_at?: string;
};

export type InquiryStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export type Inquiry = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
  source_path?: string | null;
  page_referrer?: string | null;
  status: InquiryStatus;
  notes?: string | null;
  created_at?: string;
};

export type SiteSettings = {
  id?: string;
  brand_name: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  instagram?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  ga_id?: string | null;
  default_seo_title?: string | null;
  default_seo_description?: string | null;
  default_og_image?: string | null;

  // Header + mega-menu chrome
  header_notice?: string | null;
  header_cta_label?: string | null;
  header_cta_href?: string | null;
  menu_promo_title?: string | null;
  menu_promo_text?: string | null;
  menu_promo_cta_label?: string | null;
  menu_promo_cta_href?: string | null;

  // Site-wide meta / verification / tracking
  favicon_url?: string | null;
  twitter_handle?: string | null;
  google_verification?: string | null;
  bing_verification?: string | null;
  gtm_id?: string | null;
  fb_pixel_id?: string | null;

  updated_at?: string;
};
