import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FounderCard } from '../components/FounderCard'
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
          <FounderCard />
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
              <article key={v.title} className={`value-card reveal reveal-delay-${(i % 2) + 1}`}>
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
              <div key={item.year} className={`journey-item reveal reveal-delay-${(i % 2) + 1}`}>
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
