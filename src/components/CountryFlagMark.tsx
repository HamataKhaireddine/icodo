import { useState } from 'react'
import { countryCodeToFlagEmoji, flagCdnUrl } from '../lib/countryFlag'

type Props = {
  countryCode: string
  className?: string
  /** 'trigger' = nav button, 'option' = smaller */
  variant?: 'trigger' | 'option'
}

export function CountryFlagMark({ countryCode, className, variant = 'trigger' }: Props) {
  const [useFallback, setUseFallback] = useState(false)
  const w = variant === 'trigger' ? 28 : 20
  const h = variant === 'trigger' ? 21 : 15

  if (useFallback) {
    return (
      <span className={className} aria-hidden style={{ fontSize: variant === 'trigger' ? '1.25rem' : '1rem' }}>
        {countryCodeToFlagEmoji(countryCode)}
      </span>
    )
  }

  return (
    <img
      src={flagCdnUrl(countryCode, 40)}
      alt=""
      width={w}
      height={h}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setUseFallback(true)}
    />
  )
}
