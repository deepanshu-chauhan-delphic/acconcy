import { website } from "../data/website"

export function Hero() {
  const { hero } = website

  return (
    <section id="top" className="relative min-h-[78svh] overflow-hidden">
      <img src={hero.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-primary/72" />
      <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/55 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-end px-6 pt-24 pb-12 lg:px-10 lg:pt-28 lg:pb-16">
        <div className="hidden max-w-64 border border-gold/40 bg-primary/85 p-5 backdrop-blur-sm lg:absolute lg:top-32 lg:right-10 lg:block">
          <p className="text-eyebrow uppercase tracking-[0.28em] text-gold">{hero.callout.eyebrow}</p>
          {hero.callout.lines.map((line) => (
            <p key={line} className="mt-2 text-caption uppercase tracking-[0.16em] text-secondary/90">
              {line}
            </p>
          ))}
        </div>

        <div className="max-w-3xl">
          <div className="mb-8 border-l border-gold/50 pl-4 lg:hidden">
            <p className="text-eyebrow uppercase tracking-[0.28em] text-gold">{hero.callout.eyebrow}</p>
            {hero.callout.lines.map((line) => (
              <p key={line} className="mt-2 text-caption uppercase tracking-[0.16em] text-secondary/90">
                {line}
              </p>
            ))}
          </div>

          <h1 className="font-serif text-display leading-[1.05] text-secondary">
            {hero.headline.line1}
            <br />
            <em className="italic text-gold">{hero.headline.accent}</em>
            <br />
            {hero.headline.line3}
          </h1>
          <p className="mt-8 max-w-xl text-lead font-light leading-relaxed text-secondary/78">{hero.description}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-3 bg-secondary px-6 py-3 text-nav font-medium uppercase tracking-[0.2em] text-primary transition-opacity hover:opacity-90"
            >
              {hero.primaryCta.label}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-3 text-nav font-medium uppercase tracking-[0.2em] text-secondary transition-colors hover:text-gold"
            >
              {hero.secondaryCta.label}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
