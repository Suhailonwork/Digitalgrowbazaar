import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";
import { getSiteSettings } from "@/lib/data";
import { SUPABASE_URL } from "@/lib/supabase/config";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: true });
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
  weight: ["600", "700", "800"],
});

/** Site-wide defaults. Everything here is overridable from Admin → Site settings. */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brand = settings.brand_name || siteConfig.name;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: settings.default_seo_title || `${brand} | Web Development, Digital Marketing & E-commerce Growth`,
      template: `%s | ${brand}`,
    },
    description: settings.default_seo_description || siteConfig.description,
    applicationName: brand,
    authors: [{ name: brand, url: siteConfig.url }],
    creator: brand,
    publisher: brand,
    formatDetection: { telephone: true, address: true, email: true },
    category: "business",
    ...(settings.favicon_url ? { icons: { icon: settings.favicon_url, apple: settings.favicon_url } } : {}),
    verification: {
      ...(settings.google_verification ? { google: settings.google_verification } : {}),
      ...(settings.bing_verification ? { other: { "msvalidate.01": settings.bing_verification } } : {}),
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#07091c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const { ga_id: ga, gtm_id: gtm, fb_pixel_id: pixel } = settings;

  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable}`}>
      <head>
        {/* Warm the connection to Supabase before the first query fires. */}
        {SUPABASE_URL ? (
          <>
            <link rel="preconnect" href={SUPABASE_URL} crossOrigin="" />
            <link rel="dns-prefetch" href={SUPABASE_URL} />
          </>
        ) : null}
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        {children}

        {/* Analytics load after hydration so they never block interaction. */}
        {gtm ? (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
          </Script>
        ) : null}

        {ga && !gtm ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
            </Script>
          </>
        ) : null}

        {pixel ? (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
