import { Reveal } from "@/components/ui/reveal";
import { getBlock } from "@/lib/data";
import type { StatItem } from "@/lib/content/blocks";

export async function StatsBand() {
  const stats = await getBlock<StatItem[]>("home.stats");

  return (
    <section className="bg-white py-14">
      <div className="container-x">
        <div className="grid gap-px overflow-hidden rounded-3xl bg-ink-100 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} order={i}>
              <div className="h-full bg-white px-6 py-9 text-center">
                <p className="font-display text-4xl font-extrabold tracking-tight text-gradient">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-ink-500">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
