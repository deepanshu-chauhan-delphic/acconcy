import { useEffect, useRef, useState } from "react"
import { website } from "../data/website"
import { BrandLogo } from "./Logo"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      applyScroll(y)
    }

    const onLenisScroll = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return
      }
      const scroll = event.detail?.scroll
      if (typeof scroll === "number") {
        applyScroll(scroll)
      }
    }

    const applyScroll = (y: number) => {
      setIsScrolled(y > 16)

      if (isOpen || y < 28) {
        setIsHidden(false)
        lastY.current = y
        return
      }

      const delta = y - lastY.current
      if (delta > 8) {
        setIsHidden(true)
      } else if (delta < -8) {
        setIsHidden(false)
      }
      lastY.current = y
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("acconcy-scroll", onLenisScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("acconcy-scroll", onLenisScroll)
    }
  }, [isOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[transform,opacity,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isHidden ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"
      } ${
        isScrolled || isOpen
          ? "border-primary/10 bg-secondary/95 backdrop-blur-md"
          : "border-transparent bg-secondary/88 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <a href="#top" className="flex items-center" aria-label="Acconcy home">
          <BrandLogo className="h-8" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {website.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-nav font-medium uppercase tracking-[0.22em] text-primary/75 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={website.nav.contactHref}
            className="hidden border border-gold px-5 py-2 text-nav font-medium uppercase tracking-[0.22em] text-primary transition-colors hover:bg-gold hover:text-primary md:inline-block"
          >
            {website.nav.contactLabel}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-primary lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-px w-5 origin-center bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-px w-5 bg-primary transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-px w-5 origin-center bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div>
          <div className="border-t border-gold/25 bg-secondary px-6 py-6">
            <ul className="flex flex-col gap-4">
              {website.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-nav uppercase tracking-[0.22em] text-primary/85"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={website.nav.contactHref}
                  className="inline-block border border-gold px-5 py-2 text-nav uppercase tracking-[0.22em] text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {website.nav.contactLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
