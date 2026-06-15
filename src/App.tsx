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
import type { HeroSeg } from './locales/en'

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

  const heroLines = t('hero.lines', { returnObjects: true }) as HeroSeg[][]
  const marqueeItems = t('marquee', { returnObjects: true }) as string[]
  const services = t('services.items', { returnObjects: true }) as {
    icon: string
    title: string
    desc: string
  }[]
  const posFeatures = t('pos.features', { returnObjects: true }) as { icon: string; title: string; desc: string }[]
  const posApps = t('pos.apps', { returnObjects: true }) as {
    icon: string
    name: string
    desc: string
    featured: boolean
    span: 1 | 2
    wideStyle?: boolean
  }[]
  const portfolioItems = t('portfolio.items', { returnObjects: true }) as {
    id: string
    href: string
    tag: string
    name: string
    desc: string
    thumb: string
    icon: string
    /** Optional: e.g. `/portfolio/assam.jpg` — overrides auto preview from project URL */
    thumbUrl?: string
  }[]
  const whyItems = t('why.items', { returnObjects: true }) as { icon: string; title: string; desc: string }[]
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

  const doubledMarquee = useMemo(() => [...marqueeItems, ...marqueeItems], [marqueeItems])

  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const mobileNavLinks = useMemo(
    () => [
      { href: '#services', label: t('nav.services') },
      { href: '#pos', label: t('nav.solutions') },
      { href: '#portfolio', label: t('nav.portfolio') },
      { href: '#pricing', label: t('nav.pricing') },
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
      <div className="cursor" id="cursor" style={{ left: 0, top: 0, width: 12, height: 12 }} />
      <div className="cursor-ring" id="cursorRing" style={{ left: 0, top: 0, width: 40, height: 40 }} />

      <nav id="navbar">
        <a href="#hero" className="nav-logo">
          <img className="logo-img" src="/icodo-logo.png" alt="ICODo" />
        </a>
        <ul className="nav-links">
          <li>
            <a href="#services">{t('nav.services')}</a>
          </li>
          <li>
            <a href="#pos">{t('nav.solutions')}</a>
          </li>
          <li>
            <a href="#portfolio">{t('nav.portfolio')}</a>
          </li>
          <li>
            <a href="#pricing">{t('nav.pricing')}</a>
          </li>
          <li>
            <a href="#contact">{t('nav.contact')}</a>
          </li>
        </ul>
        <div className="nav-right">
          <LanguageSwitcher />
          <VisitorRegionButton />
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
      </nav>

      <MobileNavMenu
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        links={mobileNavLinks}
        id="codo-mobile-nav"
      />

      <a href="#contact" className="support-fab" title={t('supportFab.aria')} aria-label={t('supportFab.aria')}>
        <UiIcon id="icon-headset" className="ui-icon--fab" />
      </a>

      <section id="hero">
        <div className="hero-bg-grid" aria-hidden />
        <div className="hero-glow" aria-hidden />
        <div className="hero-layout">
          <div className="hero-content">
            <div className="hero-badge">{t('hero.badge')}</div>
            <h1 className="hero-title">
              {heroLines.map((line, li) => (
                <span className="line" key={li}>
                  {line.map((seg, si) => {
                    if (seg.t === 'space') return <span key={si}> </span>
                    if (seg.t === 'accent') {
                      return (
                        <span key={si} className="word" style={{ animationDelay: seg.delay }}>
                          <span className="accent" data-text={seg.text}>
                            {seg.text}
                          </span>
                        </span>
                      )
                    }
                    return (
                      <span key={si} className="word" style={{ animationDelay: seg.delay }}>
                        {seg.text}
                      </span>
                    )
                  })}
                </span>
              ))}
            </h1>
            <p className="hero-sub" dangerouslySetInnerHTML={{ __html: t('hero.sub') }} />
            <div className="hero-actions">
              <a href="#portfolio" className="btn-primary">
                {t('hero.ctaPrimary')}{' '}
                <UiIcon id="icon-arrow-up-right" className="ui-icon--inline-arrow" />
              </a>
              <a href="#pricing" className="btn-outline">
                {t('hero.ctaSecondary')}
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-num" data-count="100">
                  100+
                </span>
                <span className="stat-label">{t('hero.statProjects')}</span>
              </div>
              <div className="stat">
                <span className="stat-num" data-count="50">
                  50+
                </span>
                <span className="stat-label">{t('hero.statClients')}</span>
              </div>
              <div className="stat">
                <span className="stat-num" data-count="5">
                  5+
                </span>
                <span className="stat-label">{t('hero.statYears')}</span>
              </div>
              <div className="stat">
                <span className="stat-num" data-count="15">
                  15+
                </span>
                <span className="stat-label">{t('hero.statServices')}</span>
              </div>
            </div>
          </div>

          <div className="hero-banner reveal">
            <div className="hero-banner-frame">
              <img src="/icodo-logo.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <div className="marquee-wrap" aria-hidden>
        <div className="marquee-track" id="marqueeTrack">
          {doubledMarquee.map((label, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-ico" aria-hidden>
                <UiIcon id="icon-hex" />
              </span>{' '}
              {label}
            </div>
          ))}
        </div>
      </div>

      <section id="showreel" style={{ padding: '100px 0' }}>
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('showreel.tag')}</div>
            <h2 className="section-title">
              {t('showreel.title')} <span className="accent">{t('showreel.titleAccent')}</span>
            </h2>
            <p className="section-desc">{t('showreel.desc')}</p>
          </div>
          <div
            className="reveal"
            style={{
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-medium), 0 0 48px var(--lime-glow)',
              aspectRatio: '16 / 9',
              background: 'var(--card)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)',
                borderRadius: 100,
                padding: '6px 16px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                zIndex: 2,
              }}
            >
              <span className="live-dot" aria-hidden />
              {t('showreel.live')}
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('services.tag')}</div>
            <h2 className="section-title">
              {t('services.title')} <span className="accent">{t('services.titleAccent')}</span>
            </h2>
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
                <div className="service-num">{String(i + 1).padStart(2, '0')}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pos">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('pos.tag')}</div>
            <h2 className="section-title">
              {t('pos.title')} <span className="accent">{t('pos.titleAccent')}</span>
            </h2>
            <p className="section-desc">{t('pos.desc')}</p>
          </div>
          <div className="pos-grid">
            <div className="pos-content reveal">
              <div className="section-tag pos-suite-tag">
                {t('pos.suiteTag')}
              </div>
              <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: '2rem', fontWeight: 800, lineHeight: 1.1, marginTop: 10 }}>
                {t('pos.suiteTitle1')}
                <br />
                <span style={{ color: 'var(--lime)' }}>{t('pos.suiteTitle2')}</span>
              </h3>
              <p style={{ color: 'var(--gray)', marginTop: 16, fontSize: '0.9rem', lineHeight: 1.7 }}>{t('pos.suiteDesc')}</p>
              <ul className="pos-feature-list">
                {posFeatures.map((f, i) => (
                  <li key={f.title} className={`pos-feature reveal reveal-delay-${(i % 4) + 1}`}>
                    <div className="pos-feature-icon">
                      <UiIcon id={f.icon} />
                    </div>
                    <div className="pos-feature-text">
                      <strong>{f.title}</strong>
                      {f.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pos-visual reveal reveal-delay-2">
              <div className="pos-app-grid">
                {posApps.map((a) => (
                  <div
                    key={a.name}
                    className={`pos-app-card${a.featured ? ' featured' : ''}`}
                    style={
                      a.wideStyle
                        ? {
                            gridColumn: 'span 2',
                            background: 'rgba(37, 99, 235, 0.06)',
                            borderColor: 'rgba(56, 189, 248, 0.2)',
                          }
                        : undefined
                    }
                  >
                    <div className="app-icon">
                      <UiIcon id={a.icon} />
                    </div>
                    <div className="app-name">{a.name}</div>
                    <div className="app-desc">{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('portfolio.tag')}</div>
            <h2 className="section-title">
              {t('portfolio.title')} <span className="accent">{t('portfolio.titleAccent')}</span>
            </h2>
            <p className="section-desc">{t('portfolio.desc')}</p>
          </div>
          <div className="portfolio-grid">
            {portfolioItems.map((item, i) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`portfolio-card reveal reveal-delay-${(i % 3) + 1}`}
              >
                <PortfolioThumb item={item} />
                <div className="portfolio-arrow" aria-hidden>
                  <UiIcon id="icon-arrow-up-right" className="ui-icon--arrow" />
                </div>
                <div className="portfolio-info">
                  <div className="portfolio-tag">{item.tag}</div>
                  <div className="portfolio-name">{item.name}</div>
                  <div className="portfolio-desc">{item.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('pricing.tag')}</div>
            <h2 className="section-title">
              {t('pricing.title')} <span className="accent">{t('pricing.titleAccent')}</span>
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
          <p style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '0.82rem', marginTop: 32 }}>
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
            <a href="#contact" style={{ color: 'var(--lime)', textDecoration: 'none' }}>
              {t('pricing.footnoteLink')}
            </a>{' '}
            {t('pricing.footnoteSuffix')}
          </p>
        </div>
      </section>

      <section id="why">
        <div className="section-inner">
          <div className="why-grid">
            <div>
              <div className="section-tag reveal">{t('why.tag')}</div>
              <h2 className="section-title reveal" style={{ textAlign: 'left', marginTop: 10 }}>
                {t('why.title1')}
                <br />
                <span className="accent">{t('why.title2')}</span>
              </h2>
              <div className="why-list">
                {whyItems.map((item, i) => (
                  <div key={item.title} className={`why-item reveal reveal-delay-${(i % 4) + 1}`}>
                    <div className="why-item-icon">
                      <UiIcon id={item.icon} />
                    </div>
                    <div>
                      <div className="why-item-title">{item.title}</div>
                      <div className="why-item-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-visual reveal reveal-delay-2">
              <div className="code-block">
                <div className="code-win-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
                <pre>
                  <span className="code-comment">// Codo approach to every project</span>
                  {'\n\n'}
                  <span className="code-kw">const</span> <span className="code-var">codo</span> = {'{'}
                  {'\n  '}
                  <span className="code-fn">build</span>: (<span className="code-var">idea</span>) =&gt; {'{'}
                  {'\n    '}
                  <span className="code-kw">return</span> {'{'}
                  {'\n      '}
                  design: <span className="code-str">&quot;pixel-perfect&quot;</span>,{'\n      '}
                  code: <span className="code-str">&quot;production-ready&quot;</span>,{'\n      '}
                  delivery: <span className="code-str">&quot;on-time&quot;</span>,{'\n      '}
                  support: <span className="code-str">&quot;always-on&quot;</span>
                  {'\n    };'}
                  {'\n  },'}
                  {'\n\n  '}
                  <span className="code-fn">solve</span>: (<span className="code-var">problem</span>) =&gt; {'{'}
                  {'\n    '}
                  <span className="code-kw">const</span> <span className="code-var">solution</span> = <span className="code-fn">analyze</span>(<span className="code-var">problem</span>);{'\n    '}
                  <span className="code-kw">return</span> <span className="code-var">solution</span>
                  {'\n      .'}
                  <span className="code-fn">optimize</span>(){'\n      .'}
                  <span className="code-fn">deploy</span>(){'\n      .'}
                  <span className="code-fn">scale</span>();{'\n  }'}
                  {'\n};'}
                  {'\n\n'}
                  <span className="code-comment">// Result:</span>
                  {'\n'}
                  <span className="code-var">console</span>.<span className="code-fn">log</span>(<span className="code-lime">&quot;Your business, elevated.&quot;</span>);<span className="typing-cursor">█</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('contact.tag')}</div>
            <h2 className="section-title">
              {t('contact.title')} <span className="accent">{t('contact.titleAccent')}</span>
            </h2>
            <p className="section-desc">{t('contact.desc')}</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info reveal">
              <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '1.5rem' }}>{t('contact.asideTitle')}</h3>
              <p style={{ color: 'var(--gray)', marginTop: 12, lineHeight: 1.7, fontSize: '0.9rem' }}>{t('contact.asideBody')}</p>
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
                      {i === 0 ? (
                        <div className="contact-channel-label">{t('contact.phoneLabel')}</div>
                      ) : null}
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
        </div>
      </section>

      <footer>
        <div className="footer-logo">
          <img className="logo-img" src="/icodo-logo.png" alt="ICODo" />
        </div>
        <div className="footer-copy">
          {t('footer.rights')} {t('footer.made')}
        </div>
        <div className="footer-tagline">{t('footer.tagline')}</div>
      </footer>
    </>
  )
}

export default App
