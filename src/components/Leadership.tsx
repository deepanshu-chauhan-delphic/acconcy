import { useRef, useState, type PointerEvent } from "react"
import { website } from "../data/website"
import { Reveal } from "./Reveal"

const SWIPE_THRESHOLD = 48

export function Leadership() {
  const { leadership } = website
  const leaders = leadership.leaders
  const lastIndex = leaders.length - 1
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const lockAxis = useRef<"x" | "y" | null>(null)

  const goTo = (index: number) => {
    const next = Math.min(lastIndex, Math.max(0, index))
    setActiveIndex(next)
    setDragX(0)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX
    startY.current = event.clientY
    lockAxis.current = null
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return
    }
    const dx = event.clientX - startX.current
    const dy = event.clientY - startY.current
    if (lockAxis.current === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      lockAxis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y"
    }
    if (lockAxis.current !== "x") {
      return
    }
    setDragX(dx)
  }

  const onPointerUp = () => {
    if (!isDragging) {
      return
    }
    if (lockAxis.current === "x") {
      if (dragX <= -SWIPE_THRESHOLD) {
        goTo(activeIndex + 1)
      } else if (dragX >= SWIPE_THRESHOLD) {
        goTo(activeIndex - 1)
      } else {
        setDragX(0)
      }
    } else {
      setDragX(0)
    }
    setIsDragging(false)
    lockAxis.current = null
  }

  const shift = `calc(${-activeIndex * 100}% + ${isDragging && lockAxis.current === "x" ? dragX : 0}px)`

  return (
    <section id={leadership.id} className="bg-primary">
      <div className="section-y mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <p className="text-eyebrow uppercase tracking-[0.28em] text-gold">{leadership.eyebrow}</p>
            <h2 className="mt-5 font-serif text-heading leading-tight text-secondary">
              {leadership.headline.before}
              <em className="italic text-gold">{leadership.headline.accent}</em>
              {leadership.headline.after}
            </h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="text-body font-light leading-relaxed text-secondary/70 lg:text-right">{leadership.intro}</p>
          </Reveal>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-b border-gold/25">
          <div className="flex min-w-0 flex-1">
            {leaders.map((leader, index) => (
              <button
                key={leader.number}
                type="button"
                onClick={() => goTo(index)}
                aria-pressed={index === activeIndex}
                className={`flex-1 px-3 py-4 text-left transition-colors duration-300 ${
                  index === activeIndex ? "text-gold" : "text-secondary/50 hover:text-secondary"
                }`}
              >
                <span className="block text-eyebrow uppercase tracking-[0.2em]">{leader.number}</span>
                <span className="mt-1 block font-serif text-lead leading-tight">{leader.name}</span>
                <span
                  className={`mt-3 block h-px w-full origin-left bg-gold transition-transform duration-500 ${
                    index === activeIndex ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="hidden shrink-0 gap-2 pb-4 sm:flex">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-primary disabled:opacity-30"
              aria-label="Previous leader"
              disabled={activeIndex === 0}
              onClick={() => goTo(activeIndex - 1)}
            >
              ←
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-primary disabled:opacity-30"
              aria-label="Next leader"
              disabled={activeIndex === lastIndex}
              onClick={() => goTo(activeIndex + 1)}
            >
              →
            </button>
          </div>
        </div>

        <p className="mt-3 text-caption uppercase tracking-[0.16em] text-secondary/45 sm:hidden">Swipe to meet both leaders</p>

        <div
          id={leadership.presenceId}
          className="mt-4 cursor-grab touch-pan-y overflow-hidden border border-gold/35 active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className={`flex ${isDragging && lockAxis.current === "x" ? "" : "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"}`}
            style={{ transform: `translateX(${shift})` }}
          >
            {leaders.map((leader) => (
              <article key={leader.number} className="grid w-full shrink-0 lg:grid-cols-2">
                <div className="flex items-center justify-center bg-primary p-5 max-lg:min-h-[18rem]">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    draggable={false}
                    className="h-auto max-h-[22rem] w-auto max-w-full object-contain outline outline-1 outline-gold"
                  />
                </div>
                <div className="flex flex-col justify-center border-t border-gold/25 p-6 lg:border-t-0 lg:border-l lg:p-8">
                  <p className="text-eyebrow uppercase tracking-[0.22em] text-gold">
                    {leader.number} / {String(leaders.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-serif text-heading text-secondary">{leader.name}</h3>
                  <p className="mt-2 text-eyebrow uppercase tracking-[0.22em] text-gold">{leader.role}</p>
                  <p className="mt-5 text-body font-light leading-relaxed text-secondary/72">{leader.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
