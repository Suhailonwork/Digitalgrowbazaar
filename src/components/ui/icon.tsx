import {
  ArrowRight, ArrowUpRight, Award, BarChart3, Building2, Camera, CheckCircle2, Clapperboard, Code2,
  Gauge, Globe, GraduationCap, HandCoins, HeartHandshake, LayoutPanelTop, ListChecks, Mail, Megaphone,
  MessageSquareText, Package, Palette, PenLine, Phone, Presentation, Rocket, Search, Share2, ShieldCheck,
  ShoppingBag, ShoppingCart, Smartphone, Sparkles, Store, Target, TrendingUp, Users, Video, Wrench,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  ArrowRight, ArrowUpRight, Award, BarChart3, Building2, Camera, CheckCircle2, Clapperboard, Code2,
  Gauge, Globe, GraduationCap, HandCoins, HeartHandshake, LayoutPanelTop, ListChecks, Mail, Megaphone,
  MessageSquareText, Package, Palette, PenLine, Phone, Presentation, Rocket, Search, Share2, ShieldCheck,
  ShoppingBag, ShoppingCart, Smartphone, Sparkles, Store, Target, TrendingUp, Users, Video, Wrench,
};

/** Names offered in the admin icon pickers. */
export const ICON_NAMES = Object.keys(registry).sort();

/** Resolves an icon name stored in the database to a Lucide component. */
export function Icon({ name, className }: { name?: string | null; className?: string }) {
  const Cmp = (name && registry[name]) || Sparkles;
  return <Cmp className={className} strokeWidth={1.75} aria-hidden />;
}
