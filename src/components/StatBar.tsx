import { website } from "../data/website"

export function StatBar() {
  return (
    <section className="border-y border-gold/25 bg-primary">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {website.stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex items-baseline gap-4 px-6 py-5 lg:px-10 lg:py-8 ${index > 0 ? "border-l border-gold/25" : ""}`}
          >
            <span className="font-serif text-stat text-gold">{stat.value}</span>
            <span className="text-caption uppercase leading-snug tracking-[0.16em] text-secondary/75">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
