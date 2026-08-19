import { useEffect } from "react"
import Lenis from "lenis"

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    })

    let frame = 0
    const tick = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      window.dispatchEvent(new CustomEvent("acconcy-scroll", { detail: { scroll } }))
    })

    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }
      const link = target.closest('a[href^="#"]')
      if (!(link instanceof HTMLAnchorElement)) {
        return
      }
      const hash = link.getAttribute("href")
      if (!hash) {
        return
      }
      event.preventDefault()
      if (hash === "#top") {
        lenis.scrollTo(0)
        return
      }
      const destination = document.querySelector(hash)
      if (destination instanceof HTMLElement) {
        lenis.scrollTo(destination, { offset: -72 })
      }
    }

    document.addEventListener("click", onClick)
    return () => {
      document.removeEventListener("click", onClick)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}
