/**
 * Live site preview image (WordPress mShots). Falls back to icon in UI on error.
 * Optional `thumbUrl` on an item overrides this (e.g. `/portfolio/assam.jpg`).
 */
export function portfolioPreviewImageUrl(siteUrl: string, width = 800): string {
  const u = siteUrl.trim()
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(u)}?w=${width}`
}
