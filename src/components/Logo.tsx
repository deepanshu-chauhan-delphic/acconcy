type BrandImageProps = {
  className?: string
}

export function BrandLogo({ className = "h-9 w-auto" }: BrandImageProps) {
  return (
    <img
      src="/brand/acconcy-header.png"
      alt="Acconcy"
      className={`w-auto object-contain object-left ${className}`}
    />
  )
}

export function BrandMark({ className = "h-10 w-auto" }: BrandImageProps) {
  return <img src="/brand/acconcy-mark.png" alt="" className={`object-contain ${className}`} />
}

export function BrandWatermark({ className = "" }: BrandImageProps) {
  return (
    <img
      src="/brand/acconcy-mark.png"
      alt=""
      className={`brand-mark pointer-events-none select-none opacity-[0.18] ${className}`}
    />
  )
}
