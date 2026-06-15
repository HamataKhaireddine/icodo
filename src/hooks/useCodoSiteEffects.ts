import { useEffect, useRef } from 'react'

const CURSOR_HOVER =
  'a, button, .service-card, .pos-feature, .pricing-card, .portfolio-card, .why-item, .pos-app-card, .contact-channel, input, select, textarea, .visitor-prefs-trigger, .visitor-prefs-btn, .nav-menu-btn, .mobile-nav-close, .mobile-nav-link, .support-fab'

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

export function useCodoSiteEffects() {
  const ringRaf = useRef<number>(0)

  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const cursorRing = document.getElementById('cursorRing')
    const navbar = document.getElementById('navbar')
    if (!cursor || !cursorRing || !navbar) return

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = `${mx}px`
      cursor.style.top = `${my}px`
    }

    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      cursorRing.style.left = `${rx}px`
      cursorRing.style.top = `${ry}px`
      ringRaf.current = requestAnimationFrame(animRing)
    }

    const enlarge = () => {
      cursor.style.width = '20px'
      cursor.style.height = '20px'
      cursorRing.style.width = '60px'
      cursorRing.style.height = '60px'
    }
    const shrink = () => {
      cursor.style.width = '12px'
      cursor.style.height = '12px'
      cursorRing.style.width = '40px'
      cursorRing.style.height = '40px'
    }

    document.addEventListener('mousemove', onMove)
    ringRaf.current = requestAnimationFrame(animRing)

    const hoverEls = document.querySelectorAll<HTMLElement>(CURSOR_HOVER)
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', enlarge)
      el.addEventListener('mouseleave', shrink)
    })

    const reveals = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.12 },
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
      window.scrollTo({ top, behavior: 'smooth' })
    }
    document.addEventListener('click', onAnchorClick)

    const syncNavPadding = () => {
      const scrolled = window.scrollY > 50
      const v = scrolled ? 12 : 18
      if (window.matchMedia('(max-width: 900px)').matches) {
        navbar.style.padding = `${v}px 20px ${v}px 10px`
      } else {
        navbar.style.padding = `${v}px 60px`
      }
    }

    const onScroll = () => {
      syncNavPadding()
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
    const onResize = () => {
      syncNavPadding()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    onScroll()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(ringRaf.current)
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      reveals.forEach((r) => io.unobserve(r))
      io.disconnect()
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', enlarge)
        el.removeEventListener('mouseleave', shrink)
      })
      statsObserver.disconnect()
    }
  }, [])
}
