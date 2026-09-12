import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

/** Generated Open Graph card. Used by every page that has no custom image. */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = (searchParams.get("title") || siteConfig.name).slice(0, 110);
  const subtitle = (searchParams.get("subtitle") || siteConfig.tagline).slice(0, 140);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #14113f 0%, #07091c 55%, #0a3b46 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: "linear-gradient(135deg, #5b57f5, #12c7d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            D
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontSize: 27, fontWeight: 700 }}>Digital Grow Bazaar</span>
            <span style={{ color: "#8790b0", fontSize: 16, letterSpacing: 3, textTransform: "uppercase" }}>Growth Partners</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "white", fontSize: title.length > 60 ? 56 : 66, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5 }}>{title}</div>
          <div style={{ color: "#b3bad2", fontSize: 26, marginTop: 22, lineHeight: 1.4 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#8790b0", fontSize: 22 }}>digitalgrowbazaar.com</span>
          <span
            style={{
              color: "#07091c",
              background: "linear-gradient(90deg, #34e0e8, #7c7cfb)",
              padding: "12px 26px",
              borderRadius: 999,
              fontSize: 21,
              fontWeight: 700,
            }}
          >
            Free growth audit
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
