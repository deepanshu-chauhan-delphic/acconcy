import { website } from "../data/website"
import { Reveal } from "./Reveal"

export function Story() {
  const { story } = website

  return (
    <section id={story.id} className="bg-primary text-secondary">
      <div className="section-y mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <Reveal className="relative min-h-[28rem] outline outline-1 outline-gold">
          <img src={story.image} alt="" className="h-full min-h-[28rem] w-full object-cover" />
          <blockquote className="absolute bottom-0 left-0 max-w-md bg-primary p-7 text-secondary">
            <p className="font-serif text-quote leading-snug">“{story.quote.text}”</p>
            <footer className="mt-5 text-eyebrow uppercase tracking-[0.22em] text-gold">{story.quote.attribution}</footer>
          </blockquote>
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="text-eyebrow uppercase tracking-[0.28em] text-gold">{story.eyebrow}</p>
            <h2 className="mt-5 font-serif text-heading leading-tight">
              {story.headline.before}
              <em className="italic text-gold">{story.headline.accent}</em>
              {story.headline.after}
            </h2>
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-body font-light leading-relaxed text-secondary/72">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3" delayMs={120}>
            {story.captions.map((item) => (
              <div key={item.label}>
                <p className="font-medium tracking-wide text-secondary">{item.label}</p>
                <p className="mt-1 text-caption text-secondary/55">{item.caption}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
