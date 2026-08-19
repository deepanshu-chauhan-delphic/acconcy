import { useState, type FormEvent } from "react"
import { website } from "../data/website"
import { BrandWatermark } from "./Logo"
import { Reveal } from "./Reveal"

export function Cta() {
  const { cta, contact } = website
  const [isSent, setIsSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSent(true)
  }

  return (
    <section id={contact.id} className="section-y relative overflow-hidden border-t border-gold/25 bg-primary">
      <BrandWatermark className="absolute left-1/2 top-1/2 h-[22rem] w-auto -translate-x-1/2 -translate-y-1/2" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-serif text-heading leading-tight text-secondary">
            {cta.headline.before}
            <em className="italic text-gold">{cta.headline.accent}</em>
          </h2>
          <p className="mt-6 text-lead font-light leading-relaxed text-secondary/72">{cta.description}</p>
        </Reveal>

        <Reveal delayMs={100}>
          {isSent ? (
            <p className="mt-10 text-body text-gold">{contact.fields.sent}</p>
          ) : (
            <form className="mx-auto mt-12 grid max-w-xl gap-4 text-left" onSubmit={onSubmit}>
              <label className="block">
                <span className="text-eyebrow uppercase tracking-[0.2em] text-secondary/60">{contact.fields.name}</span>
                <input
                  required
                  name="name"
                  className="mt-2 w-full border border-gold/40 bg-transparent px-4 py-3 text-body text-secondary outline-none focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="text-eyebrow uppercase tracking-[0.2em] text-secondary/60">{contact.fields.email}</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full border border-gold/40 bg-transparent px-4 py-3 text-body text-secondary outline-none focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="text-eyebrow uppercase tracking-[0.2em] text-secondary/60">{contact.fields.message}</span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="mt-2 w-full border border-gold/40 bg-transparent px-4 py-3 text-body text-secondary outline-none focus:border-gold"
                />
              </label>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-3 border border-gold px-6 py-3 text-nav font-medium uppercase tracking-[0.2em] text-secondary transition-colors hover:bg-gold hover:text-primary"
              >
                {cta.button}
                <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
