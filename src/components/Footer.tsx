import { website } from "../data/website"
import { BrandLogo } from "./Logo"

export function Footer() {
  const { footer } = website

  return (
    <footer className="border-t border-gold/25 bg-primary">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:grid-cols-4 lg:px-10 lg:py-16">
        <div>
          <a href="#top" className="inline-block" aria-label="Acconcy home">
            <BrandLogo className="h-8" />
          </a>
          <p className="mt-6 max-w-xs text-caption font-light leading-relaxed text-secondary/65">{footer.tagline}</p>
        </div>
        {footer.columns.map((column) => (
          <div key={column.heading}>
            <p className="text-eyebrow uppercase tracking-[0.24em] text-gold">{column.heading}</p>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={`${column.heading}-${link.label}`}>
                  <a
                    href={link.href}
                    className="text-caption uppercase tracking-[0.14em] text-secondary/75 transition-colors hover:text-gold"
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gold/15 px-6 py-6 lg:px-10">
        <p className="mx-auto max-w-7xl text-caption leading-relaxed text-secondary/45">{footer.legal}</p>
      </div>
    </footer>
  )
}
