import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CodoIconSprite } from './components/CodoIconSprite'
import { MobileNavMenu } from './components/MobileNavMenu'
import { UiIcon } from './components/UiIcon'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { VisitorRegionButton } from './components/VisitorRegionControls'
import { useVisitorLocale } from './context/VisitorLocaleContext'
import { BUDGET_THRESHOLDS_QAR, PLAN_PRICES_QAR } from './constants/pricingBase'
import { formatFxPublishedAt } from './lib/formatFxPublishedAt'
import { portfolioPreviewImageUrl } from './lib/portfolioPreviewUrl'
import { useCodoSiteEffects } from './hooks/useCodoSiteEffects'
import { setDocumentLang } from './i18n'

function PortfolioThumb({
  item,
}: {
  item: {
    href: string
    thumb: string
    icon: string
    thumbUrl?: string
  }
}) {
  const [imgFailed, setImgFailed] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const src = item.thumbUrl ?? portfolioPreviewImageUrl(item.href)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '120px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="portfolio-thumb" style={{ background: item.thumb }}>
      {shouldLoad && !imgFailed ? (
        <img
          src={src}
          alt=""
          className="portfolio-thumb-img"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <UiIcon id={item.icon} className="ui-icon--thumb" />
      )}
    </div>
  )
}

function App() {
  const { t, i18n } = useTranslation()
  const { formatMoneyFromQar, displayCurrency, rates, fxLastUpdatedUtc, ready: localeReady } =
    useVisitorLocale()
  useCodoSiteEffects()

  const [submitSent, setSubmitSent] = useState(false)
  const submitLabel = submitSent ? t('contact.form.sent') : t('contact.form.submit')

  const clientItems = t('clients.items', { returnObjects: true }) as { name: string; icon: string }[]
  const services = t('services.items', { returnObjects: true }) as {
    icon: string
    title: string
    desc: string
  }[]
  const techItems = t('tech.items', { returnObjects: true }) as string[]
  const testimonials = t('testimonials.items', { returnObjects: true }) as {
    quote: string
    name: string
    role: string
    initials: string
  }[]
  const portfolioItems = t('portfolio.items', { returnObjects: true }) as {
    id: string
    href: string
    tag: string
    name: string
    desc: string
    year?: string
    stack?: string[]
    thumb: string
    icon: string
    thumbUrl?: string
  }[]
  const teamMembers = t('team.members', { returnObjects: true }) as {
    name: string
    role: string
    bio: string
    initials: string
  }[]
  const silverRows = t('pricing.silverRows', { returnObjects: true }) as { ok: boolean; text: string }[]
  const goldRows = t('pricing.goldRows', { returnObjects: true }) as { ok: boolean; text: string }[]
  const platinumRows = t('pricing.platinumRows', { returnObjects: true }) as { ok: boolean; text: string }[]
  const serviceOptions = t('contact.services', { returnObjects: true }) as string[]
  const phoneNumbers = t('contact.phoneNumbers', { returnObjects: true }) as { tel: string; display: string }[]

  const budgetOptions = useMemo(() => {
    const [a, b, c] = BUDGET_THRESHOLDS_QAR
    return [
      t('contact.budgetOpt0', { amount: formatMoneyFromQar(a) }),
      t('contact.budgetOpt1', { from: formatMoneyFromQar(a), to: formatMoneyFromQar(b) }),
      t('contact.budgetOpt2', { from: formatMoneyFromQar(b), to: formatMoneyFromQar(c) }),
      t('contact.budgetOpt3', { amount: formatMoneyFromQar(c) }),
    ]
  }, [t, formatMoneyFromQar])

  const showcaseItems = portfolioItems.slice(0, 3)
  const portfolioRows = portfolioItems.slice(0, 4)

  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const mobileNavLinks = useMemo(
    () => [
      { href: '#services', label: t('nav.services') },
      { href: '#portfolio', label: t('nav.caseStudies') },
      { href: '#about', label: t('nav.about') },
      { href: '#contact', label: t('nav.contact') },
    ],
    [t],
  )

  useEffect(() => {
    const handler = () => setDocumentLang(i18n.language)
    i18n.on('languageChanged', handler)
    return () => {
      i18n.off('languageChanged', handler)
    }
  }, [i18n])

  const flashSubmit = () => {
    setSubmitSent(true)
    window.setTimeout(() => {
      setSubmitSent(false)
    }, 3000)
  }

  return (
    <>
      <CodoIconSprite />
      <div className="cursor" id="cursor" style={{ left: 0, top: 0, width: 10, height: 10 }} />
      <div className="cursor-ring" id="cursorRing" style={{ left: 0, top: 0, width: 36, height: 36 }} />

      <header id="navbar" className="nav-shell">
        <div className="nav-pill">
          <a href="#hero" className="nav-logo">
            <img className="logo-img" src="/icodo-logo.png" alt="ICODo" />
          </a>
          <ul className="nav-links">
            <li>
              <a href="#services">{t('nav.services')}</a>
            </li>
            <li>
              <a href="#portfolio">{t('nav.caseStudies')}</a>
            </li>
            <li>
              <a href="#about">{t('nav.about')}</a>
            </li>
            <li>
              <a href="#contact">{t('nav.contact')}</a>
            </li>
          </ul>
          <div className="nav-end">
            <div className="nav-utilities">
              <LanguageSwitcher />
              <VisitorRegionButton />
            </div>
            <a href="#contact" className="nav-cta">
              {t('nav.cta')}
            </a>
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

      <section id="hero">
        <div className="hero-layout">
          <div className="hero-content reveal">
            <span className="hero-tag">{t('hero.tag')}</span>
            <h1 className="hero-title">{t('hero.headline')}</h1>
            <p className="hero-sub">{t('hero.sub')}</p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                {t('hero.ctaPrimary')}
              </a>
              <a href="#portfolio" className="btn-outline">
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </div>
          <div className="hero-visual reveal reveal-delay-2">
            <div className="hero-card">
              <img src="/icodo-logo.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <div className="clients-bar">
        <p className="clients-label">{t('clients.label')}</p>
        <div className="clients-row">
          {clientItems.map((client) => (
            <div key={client.name} className="client-chip">
              <span className="client-chip-icon" aria-hidden>
                <UiIcon id={client.icon} />
              </span>
              <span className="client-chip-name">{client.name}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="showcase" className="section-block section-block--tight">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('showcase.tag')}</div>
            <h2 className="section-title">{t('showcase.title')}</h2>
            <p className="section-desc">{t('showcase.desc')}</p>
          </div>
          <div className="showcase-collage reveal">
            {showcaseItems[1] ? (
              <div className="showcase-card showcase-card--left">
                <PortfolioThumb item={showcaseItems[1]} />
              </div>
            ) : null}
            {showcaseItems[0] ? (
              <div className="showcase-card showcase-card--main">
                <PortfolioThumb item={showcaseItems[0]} />
              </div>
            ) : null}
            {showcaseItems[2] ? (
              <div className="showcase-card showcase-card--right">
                <PortfolioThumb item={showcaseItems[2]} />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="services" className="section-block">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('services.tag')}</div>
            <h2 className="section-title">{t('services.title')}</h2>
            <p className="section-desc">{t('services.desc')}</p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <article key={s.title} className={`service-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="service-icon">
                  <UiIcon id={s.icon} />
                </div>
                <div className="service-name">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
              </article>
            ))}
          </div>

          <div className="tech-row reveal">
            <span className="tech-pill" style={{ background: 'transparent', border: 'none', fontWeight: 700 }}>
              {t('tech.label')}
            </span>
            {techItems.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>

          {testimonials[0] ? (
            <div className="testimonial-block reveal">
              <p className="testimonial-quote">&ldquo;{testimonials[0].quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonials[0].initials}</div>
                <div>
                  <div className="testimonial-name">{testimonials[0].name}</div>
                  <div className="testimonial-role">{testimonials[0].role}</div>
                </div>
              </div>
              <a href="#portfolio" className="testimonial-cta">
                {t('testimonials.cta')} →
              </a>
            </div>
          ) : null}
        </div>
      </section>

      <section id="portfolio" className="section-block">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('portfolio.tag')}</div>
            <h2 className="section-title">{t('portfolio.title')}</h2>
            <p className="section-desc">{t('portfolio.desc')}</p>
          </div>
          <div className="portfolio-list">
            {portfolioRows.map((item, i) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card reveal reveal-delay-${(i % 3) + 1}`}
              >
                <div className="project-card__blob" aria-hidden />
                <div className="project-card__layout">
                  <div className="project-card__media-col">
                    <div className="project-card__clip">
                      <PortfolioThumb item={item} />
                      <div className="project-card__media-shade" aria-hidden />
                    </div>
                    <div className="project-card__index">{String(i + 1).padStart(2, '0')}</div>
                  </div>
                  <div className="project-card__panel-wrap">
                    <div className="project-card__panel">
                      <div className="project-card__meta">
                        <span className="project-card__category">{item.tag}</span>
                        {item.year ? <span className="project-card__year">{item.year}</span> : null}
                      </div>
                      <h3 className="project-card__title">{item.name}</h3>
                      <p className="project-card__desc">{item.desc}</p>
                      {item.stack && item.stack.length > 0 ? (
                        <div className="project-card__stack">
                          {item.stack.map((tech) => (
                            <span key={tech} className="project-card__stack-pill">
                              {tech}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <div className="project-card__footer">
                        <span className="project-card__cta">
                          <span className="project-card__arrow" aria-hidden>
                            <UiIcon id="icon-arrow-up-right" className="project-card__arrow-icon" />
                          </span>
                          {t('portfolio.viewProject')}
                        </span>
                        <span className="project-card__site">
                          <UiIcon id="icon-globe" className="project-card__site-icon" />
                          {t('portfolio.visitSite')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {testimonials[1] ? (
            <div className="testimonial-block reveal" style={{ marginTop: 64 }}>
              <p className="testimonial-quote">&ldquo;{testimonials[1].quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonials[1].initials}</div>
                <div>
                  <div className="testimonial-name">{testimonials[1].name}</div>
                  <div className="testimonial-role">{testimonials[1].role}</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section id="pricing" className="section-block section-block--tight">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('pricing.tag')}</div>
            <h2 className="section-title">
              {t('pricing.title')} {t('pricing.titleAccent')}
            </h2>
            <p className="section-desc">{t('pricing.desc')}</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card silver reveal reveal-delay-1">
              <div className="pricing-badge">
                <UiIcon id="icon-medal" className="ui-icon--badge" /> {t('pricing.silver.badge')}
              </div>
              <div className="pricing-price">
                <span className="pricing-amount" dir="ltr">
                  {localeReady ? formatMoneyFromQar(PLAN_PRICES_QAR.silver) : t('pricing.silver.amount')}
                </span>
              </div>
              <div className="pricing-period">{t('pricing.period')}</div>
              <p className="pricing-subtitle">{t('pricing.silver.subtitle')}</p>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {silverRows.map((row) => (
                  <li key={row.text} className={`pricing-feature ${row.ok ? 'included' : 'excluded'}`}>
                    <span className="check" aria-hidden={row.ok}>
                      {row.ok ? <UiIcon id="icon-check" className="ui-icon--check" /> : '○'}
                    </span>
                    {row.text}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="pricing-cta">
                {t('pricing.silver.cta')}
              </a>
            </div>

            <div className="pricing-card gold featured reveal reveal-delay-2">
              <div className="popular-tag">{t('pricing.popular')}</div>
              <div className="pricing-badge">
                <UiIcon id="icon-trophy" className="ui-icon--badge" /> {t('pricing.gold.badge')}
              </div>
              <div className="pricing-price">
                <span className="pricing-amount" dir="ltr">
                  {localeReady ? formatMoneyFromQar(PLAN_PRICES_QAR.gold) : t('pricing.gold.amount')}
                </span>
              </div>
              <div className="pricing-period">{t('pricing.period')}</div>
              <p className="pricing-subtitle">{t('pricing.gold.subtitle')}</p>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {goldRows.map((row) => (
                  <li key={row.text} className={`pricing-feature ${row.ok ? 'included' : 'excluded'}`}>
                    <span className="check" aria-hidden={row.ok}>
                      {row.ok ? <UiIcon id="icon-check" className="ui-icon--check" /> : '○'}
                    </span>
                    {row.text}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="pricing-cta">
                {t('pricing.gold.cta')}
              </a>
            </div>

            <div className="pricing-card platinum reveal reveal-delay-3">
              <div className="pricing-badge">
                <UiIcon id="icon-gem" className="ui-icon--badge" /> {t('pricing.platinum.badge')}
              </div>
              <div className="pricing-price">
                <span className="pricing-amount" dir="ltr">
                  {localeReady ? formatMoneyFromQar(PLAN_PRICES_QAR.platinum) : t('pricing.platinum.amount')}
                </span>
              </div>
              <div className="pricing-period">{t('pricing.period')}</div>
              <p className="pricing-subtitle">{t('pricing.platinum.subtitle')}</p>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {platinumRows.map((row) => (
                  <li key={row.text} className={`pricing-feature ${row.ok ? 'included' : 'excluded'}`}>
                    <span className="check" aria-hidden={row.ok}>
                      {row.ok ? <UiIcon id="icon-check" className="ui-icon--check" /> : '○'}
                    </span>
                    {row.text}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="pricing-cta">
                {t('pricing.platinum.cta')}
              </a>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 32 }}>
            {displayCurrency !== 'QAR' && rates
              ? t('pricing.footnoteConverted', { currency: displayCurrency })
              : t('pricing.footnoteQar')}
            {displayCurrency !== 'QAR' && rates && fxLastUpdatedUtc ? (
              <>
                {' '}
                {t('pricing.footnoteFxTime', {
                  date: formatFxPublishedAt(fxLastUpdatedUtc, i18n.language),
                })}
              </>
            ) : null}{' '}
            <a href="#contact" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
              {t('pricing.footnoteLink')}
            </a>{' '}
            {t('pricing.footnoteSuffix')}
          </p>
        </div>
      </section>

      <section id="about" className="section-block section-dark">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('team.tag')}</div>
            <h2 className="section-title">{t('team.title')}</h2>
            <p className="section-desc">{t('team.desc')}</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <article key={member.name} className={`team-card reveal reveal-delay-${(i % 2) + 1}`}>
                <div className="team-avatar">{member.initials}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </article>
            ))}
          </div>
          {testimonials[0] ? (
            <div className="testimonial-block testimonial-block--dark reveal">
              <p className="testimonial-quote">&ldquo;{testimonials[0].quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonials[0].initials}</div>
                <div>
                  <div className="testimonial-name">{testimonials[0].name}</div>
                  <div className="testimonial-role">{testimonials[0].role}</div>
                </div>
              </div>
              <a href="#contact" className="nav-cta" style={{ marginTop: 28, display: 'inline-flex' }}>
                {t('nav.cta')}
              </a>
            </div>
          ) : null}
        </div>
      </section>

      <section id="contact" className="section-block section-dark">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('booking.tag')}</div>
            <h2 className="section-title">{t('booking.title')}</h2>
            <p className="section-desc">{t('booking.desc')}</p>
          </div>
          <div className="booking-layout">
            <div className="booking-aside reveal">
              <h3>{t('contact.asideTitle')}</h3>
              <p>{t('contact.asideBody')}</p>
              <div className="contact-channels">
                <a href={`mailto:${t('contact.emailVal')}`} className="contact-channel">
                  <div className="contact-channel-icon">
                    <UiIcon id="icon-mail" />
                  </div>
                  <div>
                    <div className="contact-channel-label">{t('contact.emailLabel')}</div>
                    <div className="contact-channel-val">{t('contact.emailVal')}</div>
                  </div>
                </a>
                {phoneNumbers.map((phone, i) => (
                  <a key={phone.tel} href={`tel:${phone.tel}`} className="contact-channel">
                    <div className="contact-channel-icon">📞</div>
                    <div>
                      {i === 0 ? <div className="contact-channel-label">{t('contact.phoneLabel')}</div> : null}
                      <div className="contact-channel-val">{phone.display}</div>
                    </div>
                  </a>
                ))}
                <a href="https://www.codo.qa" target="_blank" rel="noopener noreferrer" className="contact-channel">
                  <div className="contact-channel-icon">
                    <UiIcon id="icon-globe" />
                  </div>
                  <div>
                    <div className="contact-channel-label">{t('contact.webLabel')}</div>
                    <div className="contact-channel-val">{t('contact.webVal')}</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="contact-form reveal reveal-delay-2">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cname">{t('contact.form.name')}</label>
                  <input id="cname" type="text" placeholder={t('contact.form.namePh')} autoComplete="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="cemail">{t('contact.form.email')}</label>
                  <input id="cemail" type="email" placeholder={t('contact.form.emailPh')} autoComplete="email" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="csvc">{t('contact.form.service')}</label>
                <select id="csvc" defaultValue="">
                  <option value="" disabled>
                    {t('contact.form.servicePh')}
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="cbud">{t('contact.form.budget')}</label>
                <select id="cbud" defaultValue="">
                  <option value="" disabled>
                    {t('contact.form.budgetPh')}
                  </option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="cmsg">{t('contact.form.message')}</label>
                <textarea id="cmsg" rows={4} placeholder={t('contact.form.messagePh')} />
              </div>
              <button
                type="button"
                className={`form-submit${submitSent ? ' form-submit--sent' : ''}`}
                onClick={() => {
                  flashSubmit()
                }}
              >
                {submitLabel}
              </button>
            </div>
          </div>
          <p className="booking-email-alt">
            {t('booking.emailAlt')}{' '}
            <a href={`mailto:${t('contact.emailVal')}`}>{t('contact.emailVal')}</a>
          </p>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-clients">
            {clientItems.map((client) => (
              <div key={client.name} className="client-chip client-chip--footer">
                <span className="client-chip-icon" aria-hidden>
                  <UiIcon id={client.icon} />
                </span>
                <span className="client-chip-name">{client.name}</span>
              </div>
            ))}
          </div>
          <div className="footer-main">
            <div className="footer-logo">
              <img className="logo-img" src="/icodo-logo.png" alt="ICODo" />
            </div>
            <div className="footer-copy">
              {t('footer.rights')} {t('footer.made')}
            </div>
            <div className="footer-links">
              <a href={`mailto:${t('contact.emailVal')}`}>{t('footer.social.email')}</a>
              <a href="https://www.codo.qa" target="_blank" rel="noopener noreferrer">
                {t('footer.social.web')}
              </a>
            </div>
          </div>
          <div className="footer-tagline">{t('footer.tagline')}</div>
        </div>
      </footer>
    </>
  )
}

export default App
