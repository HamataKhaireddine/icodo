import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { CountryFlagMark } from './CountryFlagMark'
import { CURRENCY_CHOICES } from '../constants/currencyChoices'
import { BUNDLED_LANGUAGES } from './LanguageSwitcher'
import { useVisitorLocale } from '../context/VisitorLocaleContext'
import { ISO_3166_ALPHA2 } from '../data/iso3166Alpha2'

export function RegionPreferencesModal({ onClose }: { onClose: () => void }) {
  const { t, i18n } = useTranslation()
  const {
    effectiveCountryCode,
    displayCurrency,
    applyVisitorPreferences,
    clearVisitorPreferences,
  } = useVisitorLocale()

  const [country, setCountry] = useState(effectiveCountryCode)
  const [language, setLanguage] = useState(() => (i18n.language || 'en').split('-')[0] ?? 'en')
  const [currency, setCurrency] = useState(displayCurrency)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const regionNames = useMemo(
    () => new Intl.DisplayNames([i18n.language || 'en'], { type: 'region' }),
    [i18n.language],
  )
  const langNames = useMemo(
    () => new Intl.DisplayNames([i18n.language || 'en'], { type: 'language' }),
    [i18n.language],
  )
  const currencyNames = useMemo(
    () => new Intl.DisplayNames([i18n.language || 'en'], { type: 'currency' }),
    [i18n.language],
  )

  const currencyOptions = useMemo(() => {
    const s = new Set<string>(CURRENCY_CHOICES)
    s.add(displayCurrency)
    s.add(currency)
    return [...s].sort()
  }, [displayCurrency, currency])

  const modal = (
    <div
      className="visitor-prefs-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="visitor-prefs-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="visitor-prefs-dialog">
        <h2 id="visitor-prefs-title" className="visitor-prefs-title">
          {t('prefs.title')}
        </h2>

        <div className="visitor-prefs-fields">
          <label className="visitor-prefs-label" htmlFor="vp-country">
            {t('prefs.country')}
          </label>
          <select
            id="vp-country"
            className="visitor-prefs-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {ISO_3166_ALPHA2.map((code) => (
              <option key={code} value={code}>
                {regionNames.of(code) ?? code}
              </option>
            ))}
          </select>

            <label className="visitor-prefs-label" htmlFor="vp-lang">
              {t('prefs.language')}
            </label>
            <select
              id="vp-lang"
              className="visitor-prefs-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {BUNDLED_LANGUAGES.map((code) => (
                <option key={code} value={code}>
                  {langNames.of(code) ?? code}
                </option>
              ))}
            </select>

            <label className="visitor-prefs-label" htmlFor="vp-cur">
              {t('prefs.currency')}
            </label>
            <select
              id="vp-cur"
              className="visitor-prefs-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencyOptions.map((code) => (
                <option key={code} value={code}>
                  {code} — {currencyNames.of(code) ?? code}
                </option>
              ))}
            </select>
          </div>

          <div className="visitor-prefs-actions">
            <button
              type="button"
              className="visitor-prefs-btn visitor-prefs-btn--ghost"
              onClick={() => {
                clearVisitorPreferences()
                onClose()
              }}
            >
              {t('prefs.useAuto')}
            </button>
            <div className="visitor-prefs-actions-main">
              <button type="button" className="visitor-prefs-btn visitor-prefs-btn--outline" onClick={onClose}>
                {t('prefs.cancel')}
              </button>
              <button
                type="button"
                className="visitor-prefs-btn visitor-prefs-btn--primary"
                onClick={() => {
                  applyVisitorPreferences({
                    countryCode: country,
                    language,
                    currency,
                  })
                  onClose()
                }}
              >
                {t('prefs.confirm')}
              </button>
            </div>
          </div>
        </div>
      </div>
  )

  return createPortal(modal, document.body)
}

export function VisitorRegionButton() {
  const { t } = useTranslation()
  const { effectiveCountryCode } = useVisitorLocale()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="visitor-prefs-trigger"
        onClick={() => setOpen(true)}
        aria-label={t('prefs.openAria')}
        title={t('prefs.openAria')}
      >
        <CountryFlagMark countryCode={effectiveCountryCode} className="visitor-prefs-flag-img" />
      </button>
      {open ? <RegionPreferencesModal onClose={() => setOpen(false)} /> : null}
    </>
  )
}
