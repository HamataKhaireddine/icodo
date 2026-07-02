import { useEffect } from 'react'
import { BUNDLED_LANGUAGES } from '../constants/bundledLanguages'
import { hreflangUrl } from '../lib/langUrl'

type SeoHeadProps = {
  title: string
  description: string
  path?: string
  type?: 'website' | 'article'
}

const SITE = 'ICODO'
const BASE_URL = 'https://www.icodo.io'
const OG_IMAGE = `${BASE_URL}/og-image.png`
const ORG_SAME_AS = [
  'https://www.linkedin.com/in/ahmad-hassan-62a65a240/',
  'https://www.linkedin.com/in/khair-eddine-hamata-25891425b/',
  'https://github.com/ahmadhassankhan701',
]

const TEAM_SCHEMA = [
  {
    '@type': 'Person',
    '@id': `${BASE_URL}#founder-ahmad`,
    name: 'Ahmad Hassan Khan',
    jobTitle: 'Founder & Technical Lead',
    url: 'https://www.linkedin.com/in/ahmad-hassan-62a65a240/',
    image: `${BASE_URL}/team/ahmad-hassan.jpg`,
    worksFor: { '@type': 'Organization', name: SITE, url: BASE_URL },
  },
  {
    '@type': 'Person',
    '@id': `${BASE_URL}#founder-khair`,
    name: 'Khair-eddine Hamata',
    jobTitle: 'Co-Founder & Lead Software Engineer',
    url: 'https://www.linkedin.com/in/khair-eddine-hamata-25891425b/',
    image: `${BASE_URL}/team/khair-eddine-hamata.jpg`,
    worksFor: { '@type': 'Organization', name: SITE, url: BASE_URL },
  },
] as const

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
    setMeta('og:image', OG_IMAGE, true)
    setMeta('og:image:width', '1200', true)
    setMeta('og:image:height', '630', true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:image', OG_IMAGE)
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${BASE_URL}${path === '/' ? '' : path}`

    document.querySelectorAll('link[data-icodo-hreflang]').forEach((el) => el.remove())
    for (const lang of BUNDLED_LANGUAGES) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = lang
      link.href = hreflangUrl(path, lang)
      link.setAttribute('data-icodo-hreflang', '1')
      document.head.appendChild(link)
    }
    const xDefault = document.createElement('link')
    xDefault.rel = 'alternate'
    xDefault.hreflang = 'x-default'
    xDefault.href = hreflangUrl(path, 'en')
    xDefault.setAttribute('data-icodo-hreflang', '1')
    document.head.appendChild(xDefault)

    let schema = document.getElementById('icodo-org-schema') as HTMLScriptElement | null
    if (!schema) {
      schema = document.createElement('script')
      schema.id = 'icodo-org-schema'
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: SITE,
          url: BASE_URL,
          email: 'hello@icodo.io',
          foundingDate: '2026',
          legalName: 'ICODO Technologies W.L.L.',
          logo: OG_IMAGE,
          sameAs: ORG_SAME_AS,
          founder: [
            { '@id': `${BASE_URL}#founder-ahmad` },
            { '@id': `${BASE_URL}#founder-khair` },
          ],
        },
        ...TEAM_SCHEMA,
      ],
    })
  }, [title, description, path, type])

  return null
}
