export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={`flex min-w-0 items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" role="img" aria-label="Digital Grow Bazaar">
        <defs>
          <linearGradient id="dgb-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5b57f5" />
            <stop offset="55%" stopColor="#4a3fe0" />
            <stop offset="100%" stopColor="#12c7d4" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="12" fill="url(#dgb-mark)" />
        <path d="M10 27.5V19a2 2 0 0 1 2-2h1.6a2 2 0 0 1 2 2v8.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d="M18.2 27.5V14.5a2 2 0 0 1 2-2h1.6a2 2 0 0 1 2 2v13" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity=".78" />
        <path d="M26.4 27.5v-5.2" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".55" />
        <circle cx="27.7" cy="14.2" r="2.6" fill="#fff" />
      </svg>
      <span className="min-w-0 leading-none">
        <span
          className={`block truncate font-display text-[0.98rem] font-extrabold tracking-tight sm:text-[1.05rem] ${
            tone === "light" ? "text-white" : "text-ink-900"
          }`}
        >
          Digital Grow<span className="text-brand-500"> Bazaar</span>
        </span>
        {/* The strapline is the first thing to go when the bar gets tight. */}
        <span className="mt-1 hidden truncate text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ink-400 min-[380px]:block">
          Growth Partners
        </span>
      </span>
    </span>
  );
}
