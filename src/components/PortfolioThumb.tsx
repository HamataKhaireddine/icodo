import { useEffect, useRef, useState } from 'react'
import { UiIcon } from './UiIcon'
import { portfolioPreviewImageUrl } from '../lib/portfolioPreviewUrl'

export function PortfolioThumb({
  item,
}: {
  item: {
    href: string
    thumb: string
    icon: string
    thumbUrl?: string
  }
}) {
  const [imgFailed, setImgFailed] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const src = item.thumbUrl ?? portfolioPreviewImageUrl(item.href)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '120px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="portfolio-thumb" style={{ background: item.thumb }}>
      {shouldLoad && !imgFailed ? (
        <img
          src={src}
          alt=""
          className="portfolio-thumb-img"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <UiIcon id={item.icon} className="ui-icon--thumb" />
      )}
    </div>
  )
}
