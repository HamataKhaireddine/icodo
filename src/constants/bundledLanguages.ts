/** Languages with full UI translations bundled in the app. */
export const BUNDLED_LANGUAGES = ['en', 'ar', 'fr', 'ja'] as const
export type BundledLanguage = (typeof BUNDLED_LANGUAGES)[number]
