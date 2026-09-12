import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Digital Grow Bazaar",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-ink-50 text-ink-800">{children}</div>;
}
