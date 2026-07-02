import { useEffect } from 'react'

type SeoHeadProps = {
  title: string
  description: string
  path?: string
  type?: 'website' | 'article'
}

const SITE = 'ICODO'
const BASE_URL = 'https://www.icodo.io'
const ORG_SAME_AS = [
  'https://www.linkedin.com/in/ahmad-hassan-62a65a240/',
  'https://github.com/ahmadhassankhan701',
]

export function SeoHead({ title, description, path = '/', type = 'website' }: SeoHeadProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`
    document.title = fullTitle

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.content = content
    }

    setMeta('description', description)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:type', type, true)
    setMeta('og:url', `${BASE_URL}${path}`, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${BASE_URL}${path === '/' ? '' : path}`

    let schema = document.getElementById('icodo-org-schema') as HTMLScriptElement | null
    if (!schema) {
      schema = document.createElement('script')
      schema.id = 'icodo-org-schema'
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE,
      url: BASE_URL,
      email: 'hello@icodo.io',
      foundingDate: '2026',
      legalName: 'ICODO Technologies W.L.L.',
      sameAs: ORG_SAME_AS,
    })
  }, [title, description, path, type])

  return null
}
