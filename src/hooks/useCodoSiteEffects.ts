import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function observeReveals() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          io.unobserve(e.target)
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
  )

  document.querySelectorAll('.reveal:not(.visible)').forEach((node) => {
    const el = node as HTMLElement
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      el.classList.add('visible')
      return
    }
    io.observe(node)
  })

  return io
}

function countUp(el: HTMLElement, target: number) {
  if (prefersReducedMotion()) {
    el.textContent = String(target)
    return
  }
  let start = 0
  const dur = 1600
  const step = Math.max(12, dur / target)
  const timer = window.setInterval(() => {
    start += 1
    el.textContent = String(start)
    if (start >= target) window.clearInterval(timer)
  }, step)
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useCodoSiteEffects() {
  const location = useLocation()
  const revealIoRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    revealIoRef.current?.disconnect()
    const frame = requestAnimationFrame(() => {
      revealIoRef.current = observeReveals()
    })
    return () => {
      cancelAnimationFrame(frame)
      revealIoRef.current?.disconnect()
      revealIoRef.current = null
    }
  }, [location.pathname])

  useEffect(() => {
    const navbar = document.getElementById('navbar')
    if (!navbar) return

    let scrollTick = 0
    let lastScrollY = window.scrollY
    let statsAnimated = false

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || statsAnimated) return
          statsAnimated = true
          document.querySelectorAll<HTMLElement>('.stat-num').forEach((el) => {
            const count = parseInt(el.dataset.count ?? '0', 10)
            if (!Number.isFinite(count) || count <= 0) return
            el.textContent = '0'
            countUp(el, count)
          })
          statsObserver.disconnect()
        })
      },
      { threshold: 0.4 },
    )
    const statsBar = document.querySelector('.stats-bar')
    if (statsBar) statsObserver.observe(statsBar)

    const onAnchorClick = (ev: MouseEvent) => {
      const t = ev.target as HTMLElement | null
      const link = t?.closest?.('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || href === '#') return

      if (href.startsWith('/#')) {
        const id = href.slice(2)
        if (window.location.pathname !== '/') return
        const target = document.getElementById(id)
        if (!target) return
        ev.preventDefault()
        const navH = navbar.offsetHeight
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 8
        window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
        return
      }

      const target = document.querySelector(href)
      if (!target) return
      ev.preventDefault()
      const navH = navbar.offsetHeight
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
    document.addEventListener('click', onAnchorClick)

    const syncNav = () => {
      const scrolled = window.scrollY > 24
      navbar.classList.toggle('nav-shell--glass', scrolled)
      navbar.style.paddingTop = scrolled ? '12px' : '16px'
      document.documentElement.style.setProperty('--nav-height', `${navbar.offsetHeight + 8}px`)
    }

    const updateActiveNav = () => {
      if (location.pathname !== '/') return
      const navH = navbar.offsetHeight + 20
      const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]')
      let current = ''
      document.querySelectorAll('section[id]').forEach((sec) => {
        const el = sec as HTMLElement
        if (window.scrollY >= el.offsetTop - navH) current = el.id
      })
      navLinks.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`)
      })
    }

    const onScroll = () => {
      if (scrollTick) return
      scrollTick = requestAnimationFrame(() => {
        scrollTick = 0
        const delta = Math.abs(window.scrollY - lastScrollY)
        lastScrollY = window.scrollY
        syncNav()
        if (delta > 2) updateActiveNav()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', syncNav, { passive: true })
    syncNav()
    updateActiveNav()

    return () => {
      cancelAnimationFrame(scrollTick)
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', syncNav)
      statsObserver.disconnect()
      navbar.classList.remove('nav-shell--glass')
    }
  }, [location.pathname])
}
