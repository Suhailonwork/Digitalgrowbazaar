import type { ReactNode } from "react";

/**
 * Fades content in as it scrolls into view, using a CSS scroll-driven animation.
 * This is a server component — it ships no JavaScript at all. `order` staggers
 * items in a row by shifting the animation range rather than delaying a timer.
 */
export function Reveal({ children, order = 0, className = "" }: { children: ReactNode; order?: number; className?: string }) {
  return (
    <div className={`reveal ${className}`} style={order ? ({ "--reveal-order": order } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
