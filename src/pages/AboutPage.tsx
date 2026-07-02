import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TeamSection } from '../components/TeamSection'
import { SeoHead } from '../components/SeoHead'
import { SiteFooter } from '../components/SiteLayout'

export default function AboutPage() {
  const { t } = useTranslation()
  const values = t('aboutPage.values', { returnObjects: true }) as { title: string; desc: string }[]
  const journey = t('aboutPage.journey', { returnObjects: true }) as {
    year: string
    title: string
    desc: string
  }[]
  const industries = t('industries.items', { returnObjects: true }) as string[]
  const techGroups = t('tech.groups', { returnObjects: true }) as { label: string; items: string[] }[]
  const processSteps = t('process.steps', { returnObjects: true }) as {
    num: string
    title: string
    desc: string
  }[]

  return (
    <>
      <SeoHead title={t('footer.links.about')} description={t('seo.aboutDescription')} path="/about" />

      <div className="about-hero section-inner">
        <div className="section-tag reveal">{t('footer.links.about')}</div>
        <h1 className="about-hero__title reveal">{t('aboutPage.title')}</h1>
        <p className="section-desc reveal" style={{ textAlign: 'start', maxWidth: '36rem' }}>
          {t('aboutPage.mission')}
        </p>
      </div>

      <section className="about-block">
        <div className="section-inner">
          <TeamSection />
        </div>
      </section>

      <section className="about-block about-block--alt">
        <div className="section-inner">
          <h2 className="section-title reveal" style={{ fontSize: '1.5rem', marginBottom: 16 }}>
            Vision
          </h2>
          <p className="section-desc reveal" style={{ textAlign: 'start', maxWidth: '40rem' }}>
            {t('aboutPage.vision')}
          </p>
        </div>
      </section>

      <section className="about-block">
        <div className="section-inner">
          <div className="section-header reveal">
            <h2 className="section-title">Values</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <article key={i} className={`value-card reveal reveal-delay-${(i % 2) + 1}`}>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-block about-block--alt">
        <div className="section-inner">
          <div className="section-header reveal">
            <h2 className="section-title">Our journey</h2>
          </div>
          <div className="journey-list">
            {journey.map((item, i) => (
              <div key={i} className={`journey-item reveal reveal-delay-${(i % 2) + 1}`}>
                <div className="journey-item__year">{item.year}</div>
                <div>
                  <div className="journey-item__title">{item.title}</div>
                  <p className="journey-item__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-block">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('process.tag')}</div>
            <h2 className="section-title">{t('process.title')}</h2>
            <p className="section-desc">{t('process.desc')}</p>
          </div>
          <div className="process-timeline">
            {processSteps.map((step, i) => (
              <div key={i} className={`process-step reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="process-step__num">{step.num}</div>
                <div className="process-step__title">{step.title}</div>
                <p className="process-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-block about-block--alt">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('industries.tag')}</div>
            <h2 className="section-title">{t('industries.title')}</h2>
            <p className="section-desc">{t('industries.desc')}</p>
          </div>
          <div className="industries-row reveal">
            {industries.map((item, i) => (
              <span key={i} className="industry-pill">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="about-block">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('tech.tag')}</div>
            <h2 className="section-title">{t('tech.title')}</h2>
            <p className="section-desc">{t('tech.desc')}</p>
          </div>
          <div className="tech-groups">
            {techGroups.map((group, i) => (
              <article key={i} className={`tech-group reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="tech-group__label">{group.label}</div>
                <div className="tech-group__items">
                  {group.items.map((item, j) => (
                    <span key={j} className="tech-group__pill">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band__inner reveal">
          <h2 className="cta-band__title">{t('aboutPage.ctaTitle')}</h2>
          <p className="cta-band__desc">{t('aboutPage.ctaDesc')}</p>
          <Link to="/contact" className="btn btn--primary btn--lg">
            {t('nav.cta')}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
