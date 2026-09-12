import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Trim icon and Supabase imports down to only what each module actually uses.
  experimental: {
    optimizePackageImports: ["lucide-react", "@supabase/supabase-js", "@supabase/ssr"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31_536_000,
  },

  async headers() {
    return [
      {
        // Generated OG cards never change for a given query, so let CDNs keep them.
        source: "/api/og",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
