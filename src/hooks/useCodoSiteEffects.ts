import { useEffect, useRef } from 'react'

const CURSOR_HOVER =
  'a, button, .service-card, .pos-feature, .pricing-card, .portfolio-card, .why-item, .pos-app-card, .contact-channel, input, select, textarea, .visitor-prefs-trigger, .visitor-prefs-btn, .nav-menu-btn, .mobile-nav-close, .mobile-nav-link, .support-fab, .lang-switcher-trigger, .lang-switcher-option'

function countUp(el: HTMLElement, target: number, suffix = '') {
  let start = 0
  const dur = 2000
  const step = Math.max(8, dur / target)
  const timer = window.setInterval(() => {
    start += 1
    const suf = suffix || (target >= 100 ? '+' : target >= 5 ? '+' : '')
    el.textContent = String(start) + suf
    if (start >= target) window.clearInterval(timer)
  }, step)
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function shouldUseCustomCursor() {
  if (prefersReducedMotion()) return false
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return false
  return true
}

export function useCodoSiteEffects() {
  const ringRaf = useRef<number>(0)

  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const cursorRing = document.getElementById('cursorRing')
    const navbar = document.getElementById('navbar')
    if (!cursor || !cursorRing || !navbar) return

    const useCustomCursor = shouldUseCustomCursor()
    document.body.classList.toggle('no-custom-cursor', !useCustomCursor)

    let mx = -100
    let my = -100
    let rx = -100
    let ry = -100
    let ringActive = false
    let scrollTick = 0
    let lastScrollY = window.scrollY

    const setCursorPos = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const onMove = (e: MouseEvent) => {
      if (!useCustomCursor) return
      mx = e.clientX
      my = e.clientY
      setCursorPos(mx, my)
      if (!ringActive) {
        ringActive = true
        ringRaf.current = requestAnimationFrame(animRing)
      }
    }

    const animRing = () => {
      const dx = mx - rx
      const dy = my - ry
      rx += dx * 0.38
      ry += dy * 0.38
      cursorRing.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`

      if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4) {
        ringActive = false
        return
      }
      ringRaf.current = requestAnimationFrame(animRing)
    }

    const enlarge = () => {
      cursor.style.width = '18px'
      cursor.style.height = '18px'
      cursorRing.style.width = '52px'
      cursorRing.style.height = '52px'
      cursorRing.style.opacity = '0.75'
    }
    const shrink = () => {
      cursor.style.width = '12px'
      cursor.style.height = '12px'
      cursorRing.style.width = '40px'
      cursorRing.style.height = '40px'
      cursorRing.style.opacity = '0.55'
    }

    if (useCustomCursor) {
      document.addEventListener('mousemove', onMove, { passive: true })
    }

    const hoverEls = document.querySelectorAll<HTMLElement>(CURSOR_HOVER)
    if (useCustomCursor) {
      hoverEls.forEach((el) => {
        el.addEventListener('mouseenter', enlarge)
        el.addEventListener('mouseleave', shrink)
      })
    }

    const reveals = document.querySelectorAll('.reveal')
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
    reveals.forEach((r) => io.observe(r))

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          document.querySelectorAll<HTMLElement>('.stat-num').forEach((el) => {
            const count = parseInt(el.dataset.count ?? '0', 10)
            if (!Number.isFinite(count) || count <= 0) return
            el.textContent = '0'
            countUp(el, count)
          })
          statsObserver.disconnect()
        })
      },
      { threshold: 0.5 },
    )
    const heroStats = document.querySelector('.hero-stats')
    if (heroStats) statsObserver.observe(heroStats)

    const onAnchorClick = (ev: MouseEvent) => {
      const t = ev.target as HTMLElement | null
      const link = t?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      ev.preventDefault()
      const navH = navbar.offsetHeight
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
    document.addEventListener('click', onAnchorClick)

    const syncNavPadding = () => {
      const scrolled = window.scrollY > 50
      const v = scrolled ? 12 : 16
      navbar.style.paddingBlock = `${v}px`
      navbar.style.paddingInline = getComputedStyle(document.documentElement).getPropertyValue('--site-gutter').trim() || '60px'
      document.documentElement.style.setProperty('--nav-height', `${navbar.offsetHeight}px`)
    }

    const updateActiveNav = () => {
      const navH = navbar.offsetHeight + 20
      const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-links a')
      let current = ''
      document.querySelectorAll('section[id]').forEach((sec) => {
        const el = sec as HTMLElement
        if (window.scrollY >= el.offsetTop - navH) current = el.id
      })
      navLinks.forEach((a) => {
        const active = a.getAttribute('href') === `#${current}`
        a.classList.toggle('active', active)
      })
    }

    const onScroll = () => {
      if (scrollTick) return
      scrollTick = requestAnimationFrame(() => {
        scrollTick = 0
        const y = window.scrollY
        const delta = Math.abs(y - lastScrollY)
        lastScrollY = y
        syncNavPadding()
        if (delta > 2) updateActiveNav()
      })
    }

    const onResize = () => {
      syncNavPadding()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    syncNavPadding()
    updateActiveNav()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(ringRaf.current)
      cancelAnimationFrame(scrollTick)
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      reveals.forEach((r) => io.unobserve(r))
      io.disconnect()
      if (useCustomCursor) {
        hoverEls.forEach((el) => {
          el.removeEventListener('mouseenter', enlarge)
          el.removeEventListener('mouseleave', shrink)
        })
      }
      statsObserver.disconnect()
      document.body.classList.remove('no-custom-cursor')
    }
  }, [])
}
