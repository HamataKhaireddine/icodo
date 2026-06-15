export type VisitorGeo = {
  countryCode: string
  countryName: string
  currency: string
  /** BCP 47, for Intl (numbers/currency shapes) */
  intlLocale: string
  /** Primary language subtag for i18next (any ISO 639-1; missing bundles fall back to English). */
  i18nLng: string
}

/** When API omits `languages`, infer a reasonable default locale. */
const COUNTRY_DEFAULT_LOCALE: Record<string, string> = {
  FR: 'fr-FR',
  BE: 'fr-BE',
  CH: 'de-CH',
  DE: 'de-DE',
  AT: 'de-AT',
  ES: 'es-ES',
  IT: 'it-IT',
  PT: 'pt-PT',
  BR: 'pt-BR',
  NL: 'nl-NL',
  SE: 'sv-SE',
  NO: 'nb-NO',
  DK: 'da-DK',
  FI: 'fi-FI',
  PL: 'pl-PL',
  TR: 'tr-TR',
  JP: 'ja-JP',
  KR: 'ko-KR',
  CN: 'zh-CN',
  TW: 'zh-TW',
  IN: 'hi-IN',
  SA: 'ar-SA',
  AE: 'ar-AE',
  QA: 'ar-QA',
  EG: 'ar-EG',
  MA: 'ar-MA',
  DZ: 'ar-DZ',
  TN: 'ar-TN',
  US: 'en-US',
  GB: 'en-GB',
  CA: 'en-CA',
  AU: 'en-AU',
  NZ: 'en-NZ',
  IE: 'en-IE',
  MX: 'es-MX',
  AR: 'es-AR',
  CO: 'es-CO',
  RU: 'ru-RU',
  UA: 'uk-UA',
  GR: 'el-GR',
  IL: 'he-IL',
  IR: 'fa-IR',
  TH: 'th-TH',
  VN: 'vi-VN',
  ID: 'id-ID',
  MY: 'ms-MY',
  RO: 'ro-RO',
  HU: 'hu-HU',
  CZ: 'cs-CZ',
  SK: 'sk-SK',
}

function parseLanguagesField(languages: unknown): string | undefined {
  if (typeof languages !== 'string' || !languages.trim()) return undefined
  const first = languages.split(',')[0]?.split(';')[0]?.trim()
  return first || undefined
}

export async function fetchVisitorGeo(signal?: AbortSignal): Promise<VisitorGeo | null> {
  try {
    const r = await fetch('https://ipapi.co/json/', { signal })
    if (!r.ok) return null
    const d = (await r.json()) as Record<string, unknown>
    if (d.error) return null

    const countryCode = String(d.country_code || 'US').toUpperCase()
    const countryName = String(d.country_name || '')
    const currency = String(d.currency || 'USD').toUpperCase()

    const fromApi = parseLanguagesField(d.languages)
    const intlLocale = fromApi || COUNTRY_DEFAULT_LOCALE[countryCode] || 'en-US'
    const i18nLng = intlLocale.split('-')[0]?.toLowerCase() || 'en'

    return { countryCode, countryName, currency, intlLocale, i18nLng }
  } catch {
    return null
  }
}
