export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
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
      <span className="leading-none">
        <span className={`block font-display text-[1.05rem] font-extrabold tracking-tight ${tone === "light" ? "text-white" : "text-ink-900"}`}>
          Digital Grow<span className="text-brand-500"> Bazaar</span>
        </span>
        <span className={`mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.22em] ${tone === "light" ? "text-ink-400" : "text-ink-400"}`}>
          Growth Partners
        </span>
      </span>
    </span>
  );
}
