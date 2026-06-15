import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './locales/en'
import { ar } from './locales/ar'
import { fr } from './locales/fr'
import { ja } from './locales/ja'

const RTL_BASE = new Set(['ar', 'he', 'fa', 'ur', 'yi'])

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    fr: { translation: fr },
    ja: { translation: ja },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export function setDocumentLang(lang: string) {
  const base = lang.split('-')[0]?.toLowerCase() || 'en'
  document.documentElement.lang = lang
  document.documentElement.dir = RTL_BASE.has(base) ? 'rtl' : 'ltr'
}

export default i18n
