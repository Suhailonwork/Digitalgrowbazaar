import Image from "next/image";
import logoDark from "@/assets/brand/logo-horizontal.png";
import logoLight from "@/assets/brand/logo-horizontal-light.png";

/** Rendered height in CSS pixels; the width follows the artwork's aspect ratio. */
const HEIGHT = 44;

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  // The light artwork swaps the navy lettering for white, for dark backgrounds.
  const src = tone === "light" ? logoLight : logoDark;
  return (
    <span className={`flex min-w-0 items-center ${className}`}>
      <Image
        src={src}
        alt="Digital Grow Bazaar"
        width={Math.round((src.width / src.height) * HEIGHT)}
        height={HEIGHT}
        loading="eager"
        // object-contain keeps the proportions when a tight header squeezes the width.
        className="h-10 w-auto max-w-full object-contain object-left sm:h-11"
      />
    </span>
  );
}
