import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { UiIcon } from './UiIcon'

export type MobileNavLink = { href: string; label: string }

export function MobileNavMenu({
  open,
  onClose,
  links,
  id = 'mobile-nav',
}: {
  open: boolean
  onClose: () => void
  links: MobileNavLink[]
  id?: string
}) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const panel = (
    <div
      className="mobile-nav-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        id={id}
        className="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.menuTitle')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-nav-head">
          <span className="mobile-nav-title">{t('nav.menuTitle')}</span>
          <button
            type="button"
            className="mobile-nav-close"
            onClick={onClose}
            aria-label={t('nav.menuCloseAria')}
          >
            <UiIcon id="icon-x" className="ui-icon--mobile-nav" />
          </button>
        </div>
        <ul className="mobile-nav-list">
          {links.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="mobile-nav-link"
                onClick={() => {
                  onClose()
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return createPortal(panel, document.body)
}
