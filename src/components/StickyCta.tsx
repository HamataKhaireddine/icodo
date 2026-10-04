import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function StickyCta() {
  const { t } = useTranslation()
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (location.pathname !== '/') return

    const onScroll = () => {
      setVisible(window.scrollY > 480)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  if (location.pathname !== '/') return null

  return (
    <div className={`sticky-cta${visible ? ' sticky-cta--visible' : ''}`}>
      <Link to="/contact" className="sticky-cta__btn">
        {t('nav.cta')}
      </Link>
    </div>
  )
}
