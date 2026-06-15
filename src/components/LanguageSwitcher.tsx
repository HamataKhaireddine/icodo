import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useVisitorLocale } from '../context/VisitorLocaleContext'

/** Languages with full UI translations bundled in the app. */
export const BUNDLED_LANGUAGES = ['en', 'ar', 'fr', 'ja'] as const
export type BundledLanguage = (typeof BUNDLED_LANGUAGES)[number]

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const { savedPrefs, detectedI18nLng, effectiveCountryCode, displayCurrency, applyVisitorPreferences, clearVisitorPreferences } =
    useVisitorLocale()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const activeLang = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0] ?? 'en'
  const isAuto = !savedPrefs

  const labels = useMemo(
    () =>
      Object.fromEntries(
        BUNDLED_LANGUAGES.map((code) => [code, t(`lang.${code}` as 'lang.en')]),
      ) as Record<BundledLanguage, string>,
    [t],
  )

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const selectLanguage = (code: BundledLanguage | 'auto') => {
    if (code === 'auto') {
      clearVisitorPreferences()
      setOpen(false)
      return
    }
    applyVisitorPreferences({
      countryCode: savedPrefs?.countryCode ?? effectiveCountryCode,
      language: code,
      currency: savedPrefs?.currency ?? displayCurrency,
    })
    setOpen(false)
  }

  const triggerLabel = isAuto
    ? labels[(detectedI18nLng.split('-')[0] as BundledLanguage) || 'en'] ?? t('lang.auto')
    : labels[activeLang as BundledLanguage] ?? activeLang.toUpperCase()

  return (
    <div className="lang-switcher" ref={rootRef}>
      <button
        type="button"
        className="lang-switcher-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('lang.switch')}
        title={t('lang.switch')}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lang-switcher-label">{triggerLabel}</span>
        <span className="lang-switcher-caret" aria-hidden />
      </button>
      {open ? (
        <ul className="lang-switcher-menu" role="listbox" aria-label={t('lang.switch')}>
          <li role="option" aria-selected={isAuto}>
            <button type="button" className="lang-switcher-option" onClick={() => selectLanguage('auto')}>
              {t('lang.auto')}
              {isAuto ? <span className="lang-switcher-check" aria-hidden>✓</span> : null}
            </button>
          </li>
          {BUNDLED_LANGUAGES.map((code) => (
            <li key={code} role="option" aria-selected={!isAuto && activeLang === code}>
              <button type="button" className="lang-switcher-option" onClick={() => selectLanguage(code)}>
                {labels[code]}
                {!isAuto && activeLang === code ? <span className="lang-switcher-check" aria-hidden>✓</span> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
