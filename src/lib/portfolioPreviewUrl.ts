/**
 * Live site preview image. Prefer `thumbUrl` on project/case-study items
 * (local cover in /public/portfolio/) — WordPress mShots often returns 403.
 */
export function portfolioPreviewImageUrl(siteUrl: string, width = 800): string {
  const u = siteUrl.trim()
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(u)}?w=${width}`
}
