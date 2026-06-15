/** Primary language subtag for i18next. */
export function toI18nLanguageCode(localeOrLang: string): string {
  const t = localeOrLang.trim()
  if (!t) return 'en'
  return t.split('-')[0]?.toLowerCase() || 'en'
}
