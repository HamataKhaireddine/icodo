/** Format API “last update” timestamp for footnotes (absolute time, visitor locale). */
export function formatFxPublishedAt(utcIso: string, locale: string): string {
  try {
    const d = new Date(utcIso)
    if (Number.isNaN(d.getTime())) return utcIso
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'UTC',
    }).format(d)
  } catch {
    return utcIso
  }
}
