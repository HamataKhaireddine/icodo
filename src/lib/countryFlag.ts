/** PNG from flagcdn (works on Windows where emoji flags often don’t render). */
export function flagCdnUrl(countryCode: string, width: 20 | 40 | 80 = 40): string {
  const cc = countryCode.trim().toUpperCase().slice(0, 2)
  const safe = /^[A-Z]{2}$/.test(cc) ? cc : 'QA'
  return `https://flagcdn.com/w${width}/${safe.toLowerCase()}.png`
}

/** Regional indicator symbols → flag emoji (fallback when image fails). */
export function countryCodeToFlagEmoji(countryCode: string): string {
  const up = countryCode.trim().toUpperCase()
  if (up.length !== 2 || !/^[A-Z]{2}$/.test(up)) return '🌍'
  const A = 0x1f1e6
  const chars = [...up]
  try {
    return String.fromCodePoint(
      A + chars[0]!.charCodeAt(0) - 65,
      A + chars[1]!.charCodeAt(0) - 65,
    )
  } catch {
    return '🌍'
  }
}
