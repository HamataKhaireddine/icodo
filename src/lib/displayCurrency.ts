import type { VisitorGeo } from './visitorGeo'

/** ISO 3166-1 alpha-2 → primary ISO 4217 (when API omits currency). */
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  FR: 'EUR',
  DE: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
  IE: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
  LU: 'EUR',
  MC: 'EUR',
  AD: 'EUR',
  EE: 'EUR',
  LV: 'EUR',
  LT: 'EUR',
  SK: 'EUR',
  SI: 'EUR',
  CY: 'EUR',
  MT: 'EUR',
  HR: 'EUR',
  GB: 'GBP',
  US: 'USD',
  CA: 'CAD',
  AU: 'AUD',
  NZ: 'NZD',
  CH: 'CHF',
  SE: 'SEK',
  NO: 'NOK',
  DK: 'DKK',
  IS: 'ISK',
  PL: 'PLN',
  CZ: 'CZK',
  HU: 'HUF',
  RO: 'RON',
  BG: 'BGN',
  TR: 'TRY',
  RU: 'RUB',
  UA: 'UAH',
  SA: 'SAR',
  AE: 'AED',
  QA: 'QAR',
  KW: 'KWD',
  BH: 'BHD',
  OM: 'OMR',
  EG: 'EGP',
  MA: 'MAD',
  TN: 'TND',
  DZ: 'DZD',
  IN: 'INR',
  JP: 'JPY',
  KR: 'KRW',
  CN: 'CNY',
  TW: 'TWD',
  HK: 'HKD',
  SG: 'SGD',
  MY: 'MYR',
  TH: 'THB',
  VN: 'VND',
  ID: 'IDR',
  PH: 'PHP',
  BR: 'BRL',
  MX: 'MXN',
  AR: 'ARS',
  CL: 'CLP',
  CO: 'COP',
  ZA: 'ZAR',
  NG: 'NGN',
  KE: 'KES',
  IL: 'ILS',
  JO: 'JOD',
  LB: 'LBP',
  PK: 'PKR',
  BD: 'BDT',
}

function isIso4217(code: string): boolean {
  return /^[A-Z]{3}$/i.test(code)
}

function currencyFromLanguageTags(uiTag: string, navigatorTag: string): string {
  const uiBase = (uiTag.split('-')[0] || 'en').toLowerCase()
  const nav = navigatorTag.toLowerCase()

  if (uiBase === 'pt') {
    if (nav.startsWith('pt-br') || nav.includes('-br')) return 'BRL'
    return 'EUR'
  }

  const eurLang = new Set([
    'fr',
    'de',
    'it',
    'es',
    'nl',
    'el',
    'sk',
    'sl',
    'et',
    'lv',
    'lt',
    'fi',
    'ga',
    'mt',
    'hr',
    'ca',
    'eu',
    'lb',
    'gl',
  ])
  if (eurLang.has(uiBase)) return 'EUR'

  if (uiBase === 'ar' || uiBase === 'he' || uiBase === 'fa' || uiBase === 'ur') {
    if (nav.startsWith('ar-sa')) return 'SAR'
    if (nav.startsWith('ar-ae')) return 'AED'
    if (nav.startsWith('ar-qa')) return 'QAR'
    if (nav.startsWith('ar-eg')) return 'EGP'
    if (nav.startsWith('ar-ma')) return 'MAD'
    return 'QAR'
  }

  if (uiBase === 'en') {
    if (nav.startsWith('en-gb')) return 'GBP'
    if (nav.startsWith('en-au')) return 'AUD'
    if (nav.startsWith('en-nz')) return 'NZD'
    if (nav.startsWith('en-ca')) return 'CAD'
    return 'USD'
  }

  if (uiBase === 'ja') return 'JPY'
  if (uiBase === 'ko') return 'KRW'
  if (uiBase === 'zh') return nav.includes('-tw') || nav.includes('-hk') ? 'TWD' : 'CNY'
  if (uiBase === 'hi' || uiBase === 'bn' || uiBase === 'ta' || uiBase === 'te' || uiBase === 'mr') return 'INR'
  if (uiBase === 'pl') return 'PLN'
  if (uiBase === 'tr') return 'TRY'
  if (uiBase === 'ru') return 'RUB'
  if (uiBase === 'uk') return 'UAH'
  if (uiBase === 'sv') return 'SEK'
  if (uiBase === 'da') return 'DKK'
  if (uiBase === 'no' || uiBase === 'nb' || uiBase === 'nn') return 'NOK'
  if (uiBase === 'cs') return 'CZK'
  if (uiBase === 'hu') return 'HUF'
  if (uiBase === 'ro') return 'RON'
  if (uiBase === 'th') return 'THB'
  if (uiBase === 'vi') return 'VND'
  if (uiBase === 'id') return 'IDR'
  if (uiBase === 'ms') return 'MYR'

  return 'QAR'
}

export type ResolveCurrencyOptions = {
  /** If true, skip IP/country and use only UI + navigator (e.g. user picked a language manually). */
  ignoreGeo?: boolean
}

/**
 * Pick display ISO 4217: geo API → country map → UI language (+ navigator for pt/en/ar).
 * With `ignoreGeo`, only language tags apply (French → EUR even when IP is Qatar).
 */
export function resolveDisplayCurrency(
  geo: VisitorGeo | null,
  uiLanguageTag: string,
  navigatorLanguageTag: string,
  options?: ResolveCurrencyOptions,
): string {
  if (!options?.ignoreGeo) {
    if (geo?.currency && isIso4217(geo.currency)) {
      return geo.currency.toUpperCase()
    }
    const cc = geo?.countryCode?.toUpperCase()
    if (cc && COUNTRY_TO_CURRENCY[cc]) {
      return COUNTRY_TO_CURRENCY[cc]
    }
  }
  return currencyFromLanguageTags(uiLanguageTag, navigatorLanguageTag)
}
