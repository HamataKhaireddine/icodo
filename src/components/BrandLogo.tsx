type BrandLogoProps = {
  light?: boolean
  className?: string
}

export function BrandLogo({ light = false, className = '' }: BrandLogoProps) {
  return (
    <span className={`brand-logo${light ? ' brand-logo--light' : ''} ${className}`.trim()} aria-hidden>
      <span className="brand-logo__word">ICODO</span>
      <span className="brand-logo__bar" />
    </span>
  )
}
