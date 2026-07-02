import { BUNDLED_LANGUAGES, type BundledLanguage } from '../constants/bundledLanguages'

export function parseLangParam(search: string): BundledLanguage | null {
  const raw = new URLSearchParams(search).get('lang')?.split('-')[0]?.toLowerCase()
  if (!raw) return null
  return (BUNDLED_LANGUAGES as readonly string[]).includes(raw) ? (raw as BundledLanguage) : null
}

export function setLangParam(lang: BundledLanguage | null) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (lang) url.searchParams.set('lang', lang)
  else url.searchParams.delete('lang')
  window.history.replaceState({}, '', url)
}

export function hreflangUrl(path: string, lang: BundledLanguage): string {
  const base = `https://www.icodo.io${path === '/' ? '' : path}`
  const url = new URL(base || 'https://www.icodo.io/')
  url.searchParams.set('lang', lang)
  return url.toString()
}
