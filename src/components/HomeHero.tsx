import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../home-hero.css'

const HERO_VIDEO_SRC =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4b73c700-3112-4c07-bd48-0af2893dff7c.mp4'
const HERO_POSTER_SRC = '/hero/icodo-hero-poster.webp'

/** Intro phases: `pre` = hidden start state, `play` = entrance running, `done` = static (no intro classes). */
type IntroPhase = 'pre' | 'play' | 'done'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Inline custom property for staggered entrance delays (valid CSS time value). */
function delay(seconds: number): CSSProperties {
  return { '--ih-delay': `${seconds}s` } as CSSProperties
}

export function HomeHero() {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const userPausedRef = useRef(false)
  const [reducedMotion] = useState(prefersReducedMotion)
  const [phase, setPhase] = useState<IntroPhase>(() => (prefersReducedMotion() ? 'done' : 'pre'))
  const [videoPlaying, setVideoPlaying] = useState(false)

  const pillars = t('hero.pillars', { returnObjects: true }) as string[]

  /* Entrance timeline: wait for fonts (with failsafe), run once, then drop intro classes. */
  useEffect(() => {
    if (reducedMotion) return
    const root = document.documentElement
    let started = false
    let doneTimer = 0
    const start = () => {
      if (started) return
      started = true
      root.classList.add('ih-nav-play')
      setPhase('play')
      doneTimer = window.setTimeout(() => {
        setPhase('done')
        root.classList.remove('ih-nav-play')
      }, 2000)
    }
    const failsafe = window.setTimeout(start, 900)
    if (document.fonts?.ready) {
      document.fonts.ready.then(start, start)
    } else {
      start()
    }
    return () => {
      window.clearTimeout(failsafe)
      window.clearTimeout(doneTimer)
      root.classList.remove('ih-nav-play')
    }
  }, [reducedMotion])

  /* Decorative background video: muted autoplay with retries; pause when hidden or offscreen. */
  useEffect(() => {
    const video = videoRef.current
    const hero = heroRef.current
    if (!video || !hero || reducedMotion) return

    video.muted = true
    let inView = true

    const tryPlay = () => {
      if (userPausedRef.current || !inView || document.visibilityState !== 'visible') return
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    const onPlay = () => setVideoPlaying(true)
    const onPause = () => setVideoPlaying(false)
    const onVisibility = () => {
      if (document.visibilityState === 'visible') tryPlay()
      else video.pause()
    }
    const onFirstInteraction = () => {
      tryPlay()
      removeInteraction()
    }
    const interactionEvents: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'touchstart']
    const removeInteraction = () =>
      interactionEvents.forEach((ev) => window.removeEventListener(ev, onFirstInteraction))

    video.addEventListener('canplay', tryPlay)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    document.addEventListener('visibilitychange', onVisibility)
    interactionEvents.forEach((ev) => window.addEventListener(ev, onFirstInteraction, { passive: true }))

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) tryPlay()
        else video.pause()
      },
      { threshold: 0.05 },
    )
    io.observe(hero)
    tryPlay()

    return () => {
      io.disconnect()
      removeInteraction()
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      document.removeEventListener('visibilitychange', onVisibility)
      video.pause()
    }
  }, [reducedMotion])

  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      userPausedRef.current = false
      video.muted = true
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } else {
      userPausedRef.current = true
      video.pause()
    }
  }

  const phaseClass = phase === 'done' ? '' : ` ih-hero--intro ih-hero--${phase}`

  return (
    <section id="hero" ref={heroRef} className={`ih-hero${phaseClass}`} aria-labelledby="ih-hero-title">
      <div className="ih-hero__media" aria-hidden="true">
        <img className="ih-hero__poster" src={HERO_POSTER_SRC} alt="" width={1536} height={1024} decoding="async" />
        {reducedMotion ? null : (
          <video
            ref={videoRef}
            className="ih-hero__video"
            src={HERO_VIDEO_SRC}
            poster={HERO_POSTER_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          />
        )}
      </div>
      <div className="ih-hero__overlay" aria-hidden="true" />

      <div className="ih-hero__content">
        <p className="ih-hero__eyebrow ih-rise" style={delay(0.26)}>
          {t('hero.eyebrow')}
        </p>
        <h1 id="ih-hero-title" className="ih-hero__title">
          <span className="ih-line">
            <span className="ih-line__inner" style={delay(0.34)}>
              {t('hero.titleBefore')} <span className="ih-hero__accent">{t('hero.titleAccent')}</span>
            </span>
          </span>
          <span className="ih-line">
            <span className="ih-line__inner" style={delay(0.48)}>
              {t('hero.titleAfter')}
            </span>
          </span>
        </h1>
        <p className="ih-hero__desc ih-rise" style={delay(0.86)}>
          {t('hero.sub')}
        </p>
        <div className="ih-hero__actions">
          <Link to="/contact" className="ih-btn ih-btn--primary ih-rise" style={delay(1)}>
            {t('hero.ctaPrimary')}
          </Link>
          <a href="#case-studies" className="ih-btn ih-btn--glass ih-rise" style={delay(1.07)}>
            {t('hero.ctaSecondary')}
          </a>
        </div>
        <ul className="ih-hero__pillars ih-rise" style={delay(1.15)}>
          {pillars.map((pillar) => (
            <li key={pillar} className="ih-hero__pillar">
              {pillar}
            </li>
          ))}
        </ul>
      </div>

      {reducedMotion ? null : (
        <button
          type="button"
          className="ih-hero__video-toggle"
          onClick={toggleVideo}
          aria-pressed={!videoPlaying}
          aria-label={videoPlaying ? t('hero.videoPause') : t('hero.videoPlay')}
        >
          {videoPlaying ? (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <rect x="3" y="2.5" width="3.5" height="11" rx="1" fill="currentColor" />
              <rect x="9.5" y="2.5" width="3.5" height="11" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M4 2.6v10.8a.6.6 0 0 0 .9.5l8.6-5.4a.6.6 0 0 0 0-1L4.9 2.1a.6.6 0 0 0-.9.5Z" fill="currentColor" />
            </svg>
          )}
        </button>
      )}
    </section>
  )
}
