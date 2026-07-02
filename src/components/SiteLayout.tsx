import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CodoIconSprite } from './CodoIconSprite'
import { MobileNavMenu } from './MobileNavMenu'
import { UiIcon } from './UiIcon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { VisitorRegionButton } from './VisitorRegionControls'
import { useCodoSiteEffects } from '../hooks/useCodoSiteEffects'
import { setDocumentLang } from '../i18n'
import i18n from '../i18n'

export function SiteLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useCodoSiteEffects()

  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`)

  const mobileNavLinks = useMemo(
    () => [
      { href: sectionHref('services'), label: t('nav.services') },
      { href: sectionHref('process'), label: t('nav.process') },
      { href: sectionHref('case-studies'), label: t('nav.caseStudies') },
      { href: '/about', label: t('nav.about') },
      { href: '/blog', label: t('nav.blog') },
      { href: '/contact', label: t('nav.contact') },
    ],
    [t, isHome],
  )

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handler = () => setDocumentLang(i18n.language)
    i18n.on('languageChanged', handler)
    return () => {
      i18n.off('languageChanged', handler)
    }
  }, [])

  return (
    <>
      <CodoIconSprite />

      <header id="navbar" className="nav-shell">
        <div className="nav-pill">
          <Link to="/" className="nav-logo" aria-label="ICODO home">
            <img className="logo-img" src="/icodo-logo.png" alt="ICODO" />
          </Link>
          <ul className="nav-links">
            <li>
              <a href={sectionHref('services')}>{t('nav.services')}</a>
            </li>
            <li>
              <a href={sectionHref('process')}>{t('nav.process')}</a>
            </li>
            <li>
              <a href={sectionHref('case-studies')}>{t('nav.caseStudies')}</a>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : undefined}>
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : undefined}>
                {t('nav.blog')}
              </Link>
            </li>
            <li>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : undefined}>
                {t('nav.contact')}
              </Link>
            </li>
          </ul>
          <div className="nav-end">
            <div className="nav-utilities">
              <LanguageSwitcher />
              <VisitorRegionButton />
            </div>
            <Link to="/contact" className="nav-cta">
              {t('nav.cta')}
            </Link>
            <button
              type="button"
              className={`nav-menu-btn${mobileNavOpen ? ' nav-menu-btn--open' : ''}`}
              aria-expanded={mobileNavOpen}
              aria-controls="codo-mobile-nav"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-label={mobileNavOpen ? t('nav.menuCloseAria') : t('nav.menuOpenAria')}
            >
              <UiIcon id={mobileNavOpen ? 'icon-x' : 'icon-menu'} className="ui-icon--nav-menu" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavMenu
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        links={mobileNavLinks}
        id="codo-mobile-nav"
      />

      <main>{children}</main>
    </>
  )
}

export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="footer-premium">
      <div className="footer-premium__grid">
        <div className="footer-premium__brand">
          <Link to="/">
            <img className="logo-img" src="/icodo-logo.png" alt="ICODO" style={{ filter: 'brightness(0) invert(1)' }} />
          </Link>
          <p>{t('footer.tagline')}</p>
        </div>
        <div className="footer-premium__col">
          <h4>{t('footer.columns.company')}</h4>
          <ul>
            <li>
              <Link to="/about">{t('footer.links.about')}</Link>
            </li>
            <li>
              <a href="/#process">{t('footer.links.process')}</a>
            </li>
            <li>
              <Link to="/contact">{t('footer.links.contact')}</Link>
            </li>
          </ul>
        </div>
        <div className="footer-premium__col">
          <h4>{t('footer.columns.services')}</h4>
          <ul>
            <li>
              <a href="/#services">Digital Product Development</a>
            </li>
            <li>
              <a href="/#services">AI Solutions</a>
            </li>
            <li>
              <a href="/#case-studies">{t('footer.links.caseStudies')}</a>
            </li>
          </ul>
        </div>
        <div className="footer-premium__col">
          <h4>{t('footer.columns.resources')}</h4>
          <ul>
            <li>
              <Link to="/blog">{t('footer.links.blog')}</Link>
            </li>
            <li>
              <a href={`mailto:${t('contact.emailVal')}`}>{t('footer.social.email')}</a>
            </li>
            <li>
              <Link to="/privacy">{t('footer.links.privacy')}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-premium__bottom">
        <span>
          {t('footer.rights')} {t('footer.made')}
        </span>
        <Link to="/privacy">{t('footer.links.privacy')}</Link>
      </div>
    </footer>
  )
}
