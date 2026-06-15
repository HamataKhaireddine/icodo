import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import i18n from '../i18n'
import { setDocumentLang } from '../i18n'
import { toI18nLanguageCode } from '../lib/i18nBundled'
import { resolveDisplayCurrency } from '../lib/displayCurrency'
import { convertQarTo, fetchQarFxSnapshot, type QarFxSnapshot, type QarRates } from '../lib/qarExchangeRates'
import { fetchVisitorGeo, type VisitorGeo } from '../lib/visitorGeo'

const STORAGE_PREFS = 'codo-visitor-prefs'
const STORAGE_LANG_MODE = 'codo-lang-mode'
const STORAGE_LANG_MANUAL = 'codo-lang-manual'

export type VisitorPrefs = {
  countryCode: string
  language: string
  currency: string
}

export type VisitorLocaleContextValue = {
  geo: VisitorGeo | null
  rates: QarRates | null
  fxLastUpdatedUtc: string | null
  ready: boolean
  /** Saved country/language/currency from the preferences popup; null = use automatic (IP). */
  savedPrefs: VisitorPrefs | null
  /** Country for flag: saved choice or geo. */
  effectiveCountryCode: string
  intlLocale: string
  displayCurrency: string
  detectedI18nLng: string
  applyVisitorPreferences: (p: VisitorPrefs) => void
  clearVisitorPreferences: () => void
  formatMoneyFromQar: (qarAmount: number) => string
}

const VisitorLocaleContext = createContext<VisitorLocaleContextValue | null>(null)

function parsePrefs(raw: string | null): VisitorPrefs | null {
  if (!raw?.trim()) return null
  try {
    const p = JSON.parse(raw) as VisitorPrefs
    if (
      typeof p.countryCode === 'string' &&
      typeof p.language === 'string' &&
      typeof p.currency === 'string' &&
      p.countryCode.length === 2 &&
      p.language.length >= 2 &&
      p.currency.length === 3
    ) {
      return {
        countryCode: p.countryCode.toUpperCase(),
        language: p.language.toLowerCase(),
        currency: p.currency.toUpperCase(),
      }
    }
  } catch {
    /* ignore */
  }
  return null
}

function writePrefs(p: VisitorPrefs | null) {
  try {
    if (p) localStorage.setItem(STORAGE_PREFS, JSON.stringify(p))
    else localStorage.removeItem(STORAGE_PREFS)
    localStorage.removeItem(STORAGE_LANG_MODE)
    localStorage.removeItem(STORAGE_LANG_MANUAL)
  } catch {
    /* ignore */
  }
}

function readInitialPrefs(): VisitorPrefs | null {
  if (typeof window === 'undefined') return null
  try {
    const fromPrefs = parsePrefs(localStorage.getItem(STORAGE_PREFS))
    if (fromPrefs) return fromPrefs
    if (localStorage.getItem(STORAGE_LANG_MODE) === 'manual') {
      const lang = localStorage.getItem(STORAGE_LANG_MANUAL)?.trim().toLowerCase()
      if (lang) {
        const migrated: VisitorPrefs = { countryCode: 'QA', language: lang, currency: 'QAR' }
        writePrefs(migrated)
        return migrated
      }
    }
  } catch {
    /* ignore */
  }
  return null
}

export function VisitorLocaleProvider({ children }: { children: ReactNode }) {
  const [geo, setGeo] = useState<VisitorGeo | null>(null)
  const [fxSnapshot, setFxSnapshot] = useState<QarFxSnapshot | null>(null)
  const rates = fxSnapshot?.rates ?? null
  const fxLastUpdatedUtc = fxSnapshot?.lastUpdateUtc ?? null
  const [ready, setReady] = useState(false)
  const [savedPrefs, setSavedPrefs] = useState<VisitorPrefs | null>(() => readInitialPrefs())

  const intlLocale = geo?.intlLocale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')
  const navLang = typeof navigator !== 'undefined' ? navigator.language : 'en-US'

  const [numberFormatLocale, setNumberFormatLocale] = useState(() =>
    savedPrefs?.language || i18n.resolvedLanguage || i18n.language || 'en',
  )
  useEffect(() => {
    const sync = (lng: string) => setNumberFormatLocale(lng)
    sync(i18n.resolvedLanguage || i18n.language || 'en')
    i18n.on('languageChanged', sync)
    return () => {
      i18n.off('languageChanged', sync)
    }
  }, [])

  const detectedI18nLng = useMemo(() => {
    if (geo?.i18nLng) return geo.i18nLng
    return toI18nLanguageCode(intlLocale)
  }, [geo, intlLocale])

  const effectiveCountryCode = useMemo(() => {
    if (savedPrefs?.countryCode) return savedPrefs.countryCode
    return (geo?.countryCode ?? 'US').toUpperCase()
  }, [savedPrefs, geo])

  const displayCurrency = useMemo(() => {
    if (savedPrefs?.currency) return savedPrefs.currency
    return resolveDisplayCurrency(geo, numberFormatLocale, navLang, {})
  }, [savedPrefs, geo, numberFormatLocale, navLang])

  const applyVisitorPreferences = useCallback((p: VisitorPrefs) => {
    const normalized: VisitorPrefs = {
      countryCode: p.countryCode.toUpperCase(),
      language: p.language.toLowerCase(),
      currency: p.currency.toUpperCase(),
    }
    setSavedPrefs(normalized)
    writePrefs(normalized)
    setNumberFormatLocale(normalized.language)
    void i18n.changeLanguage(normalized.language)
    setDocumentLang(normalized.language)
  }, [])

  const clearVisitorPreferences = useCallback(() => {
    setSavedPrefs(null)
    writePrefs(null)
    const lng = geo?.i18nLng ?? toI18nLanguageCode(intlLocale)
    void i18n.changeLanguage(lng)
    setDocumentLang(lng)
    setNumberFormatLocale(lng)
  }, [geo, intlLocale])

  const lastFxLoadAt = useRef(0)

  const loadFx = useCallback(async (signal: AbortSignal) => {
    const snap = await fetchQarFxSnapshot(signal)
    if (!signal.aborted) {
      setFxSnapshot(snap)
      if (snap) lastFxLoadAt.current = Date.now()
    }
  }, [])

  useEffect(() => {
    const ac = new AbortController()
    ;(async () => {
      try {
        const [g] = await Promise.all([fetchVisitorGeo(ac.signal), loadFx(ac.signal)])
        if (!ac.signal.aborted) setGeo(g)
      } catch {
        /* optional */
      } finally {
        if (!ac.signal.aborted) setReady(true)
      }
    })()
    return () => ac.abort()
  }, [loadFx])

  useEffect(() => {
    const minMs = 45 * 60 * 1000
    const onVis = () => {
      if (document.visibilityState !== 'visible') return
      if (lastFxLoadAt.current > 0 && Date.now() - lastFxLoadAt.current < minMs) return
      const ac = new AbortController()
      void loadFx(ac.signal)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [loadFx])

  useEffect(() => {
    if (!ready) return
    if (savedPrefs) {
      void i18n.changeLanguage(savedPrefs.language)
      setDocumentLang(savedPrefs.language)
      return
    }
    const lng = detectedI18nLng
    void i18n.changeLanguage(lng)
    setDocumentLang(lng)
  }, [ready, savedPrefs, detectedI18nLng])

  const formatMoneyFromQar = useCallback(
    (qarAmount: number) => {
      const cur = displayCurrency
      const rate = rates && cur !== 'QAR' ? rates[cur] : undefined
      const canConvert =
        rates != null && cur !== 'QAR' && typeof rate === 'number' && Number.isFinite(rate)
      const amount = canConvert ? convertQarTo(qarAmount, cur, rates) : qarAmount
      const curCode = canConvert ? cur : 'QAR'
      try {
        return new Intl.NumberFormat(numberFormatLocale, {
          style: 'currency',
          currency: curCode,
          maximumFractionDigits: ['JPY', 'KRW', 'VND', 'CLP', 'ISK'].includes(curCode) ? 0 : 2,
        }).format(amount)
      } catch {
        return `${amount.toFixed(2)} ${curCode}`
      }
    },
    [displayCurrency, numberFormatLocale, rates],
  )

  const value = useMemo<VisitorLocaleContextValue>(
    () => ({
      geo,
      rates,
      fxLastUpdatedUtc,
      ready,
      savedPrefs,
      effectiveCountryCode,
      intlLocale,
      displayCurrency,
      detectedI18nLng,
      applyVisitorPreferences,
      clearVisitorPreferences,
      formatMoneyFromQar,
    }),
    [
      geo,
      rates,
      fxLastUpdatedUtc,
      ready,
      savedPrefs,
      effectiveCountryCode,
      intlLocale,
      displayCurrency,
      detectedI18nLng,
      applyVisitorPreferences,
      clearVisitorPreferences,
      formatMoneyFromQar,
    ],
  )

  return <VisitorLocaleContext.Provider value={value}>{children}</VisitorLocaleContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useVisitorLocale() {
  const ctx = useContext(VisitorLocaleContext)
  if (!ctx) throw new Error('useVisitorLocale must be used within VisitorLocaleProvider')
  return ctx
}
