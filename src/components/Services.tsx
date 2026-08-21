import { useEffect, useRef, useState, type ReactNode } from "react"
import { website } from "../data/website"
import { BrandMark } from "./Logo"
import { Reveal } from "./Reveal"

export function Services() {
  const { services } = website
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id={services.id} className="section-y bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-8">
          <Reveal>
            <p className="text-eyebrow uppercase tracking-[0.28em] text-gold">{services.eyebrow}</p>
            <h2 className="mt-4 font-serif text-heading leading-tight text-secondary">
              {services.headline.before}
              <em className="italic text-gold">{services.headline.accent}</em>
              {services.headline.after}
            </h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="text-body font-light leading-relaxed text-secondary/70 lg:text-right">{services.intro}</p>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col gap-3 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-4">
          {services.cards.map((card, index) => {
            const isOpen = openId === card.id

            return (
              <Reveal key={card.id} delayMs={index * 90}>
                <article
                  id={card.id}
                  className="group relative overflow-hidden outline outline-1 outline-gold lg:min-h-[34rem]"
                >
                  <img
                    src={card.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 lg:group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/70 lg:bg-primary/55 lg:transition-colors lg:duration-500 lg:group-hover:bg-primary/70" />
                  <div className="absolute inset-0 bg-accent/15" />

                  <button
                    type="button"
                    className="relative flex w-full items-center gap-4 px-5 py-5 text-left lg:hidden"
                    onClick={() => setOpenId(isOpen ? null : card.id)}
                    aria-expanded={isOpen}
                  >
                    <BrandMark className="h-8 w-auto shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-lead uppercase tracking-[0.16em] text-secondary">
                        {card.nameLines[0]}
                      </span>
                      <span className="mt-1 block text-caption uppercase tracking-[0.12em] text-secondary/75">
                        {card.caption}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 text-lead text-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "rotate-45" : "rotate-0"
                        }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <AccordionPanel isOpen={isOpen}>
                    <p className="px-5 pb-5 text-caption font-light leading-relaxed text-secondary/80">
                      {card.extended}
                    </p>
                  </AccordionPanel>

                  <div className="relative hidden h-full min-h-[34rem] flex-col items-center justify-between px-8 py-12 text-center lg:flex">
                    <BrandMark className="h-12 w-auto" />
                    <div>
                      <h3 className="font-serif text-card uppercase tracking-[0.18em] text-secondary">
                        {card.nameLines[0]}
                      </h3>
                      <div className="mx-auto mt-6 h-px w-16 bg-gold" />
                      <p className="mt-6 text-caption uppercase tracking-[0.16em] text-secondary/75">{card.caption}</p>
                    </div>
                    <p className="max-h-0 overflow-hidden text-caption font-light leading-relaxed text-secondary/80 opacity-0 transition-all duration-500 group-hover:max-h-56 group-hover:opacity-100">
                      {card.extended}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

type AccordionPanelProps = {
  isOpen: boolean
  children: ReactNode
}

function AccordionPanel({ isOpen, children }: AccordionPanelProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      setHeight(isOpen ? inner.scrollHeight : 0)
    })

    const observer = new ResizeObserver(() => {
      if (!isOpen) {
        return
      }
      setHeight(inner.scrollHeight)
    })
    observer.observe(inner)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [isOpen])

  return (
    <div
      className="relative overflow-hidden transition-[height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden"
      style={{ height, opacity: isOpen ? 1 : 0 }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  )
}
