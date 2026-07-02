import { useEffect, useRef, useState } from 'react'
import { portfolioPreviewImageUrl } from '../lib/portfolioPreviewUrl'
import { UiIcon } from './UiIcon'

export function ProjectThumb({
  href,
  thumb,
  thumbUrl,
  icon,
  alt,
}: {
  href?: string
  thumb: string
  thumbUrl?: string
  icon: string
  alt: string
}) {
  const [imgFailed, setImgFailed] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const src = thumbUrl ?? (href ? portfolioPreviewImageUrl(href, 640) : null)

  useEffect(() => {
    if (!src) return
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
  }, [src])

  return (
    <div ref={rootRef} className="project-thumb" style={{ background: thumb }}>
      {src && shouldLoad && !imgFailed ? (
        <img
          src={src}
          alt={alt}
          className="project-thumb__img"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <UiIcon id={icon} className="project-thumb__icon" />
      )}
    </div>
  )
}
