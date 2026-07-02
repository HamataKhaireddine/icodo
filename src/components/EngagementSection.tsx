import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function EngagementSection() {
  const { t } = useTranslation()
  const models = t('engagement.items', { returnObjects: true }) as {
    title: string
    range: string
    duration: string
    desc: string
    includes: string[]
  }[]

  return (
    <section id="engagement" className="section-block section-block--muted">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-tag">{t('engagement.tag')}</div>
          <h2 className="section-title">{t('engagement.title')}</h2>
          <p className="section-desc">{t('engagement.desc')}</p>
        </div>
        <div className="engagement-grid">
          {models.map((model, i) => (
            <article
              key={i}
              className={`engagement-card reveal reveal-delay-${(i % 3) + 1}${i === 1 ? ' engagement-card--featured' : ''}`}
            >
              {i === 1 ? <span className="engagement-card__badge">{t('engagement.popular')}</span> : null}
              <h3 className="engagement-card__title">{model.title}</h3>
              <p className="engagement-card__range">{model.range}</p>
              <p className="engagement-card__duration">{model.duration}</p>
              <p className="engagement-card__desc">{model.desc}</p>
              <ul className="engagement-card__list">
                {model.includes.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn--secondary engagement-card__cta">
                {t('engagement.cta')}
              </Link>
            </article>
          ))}
        </div>
        <p className="engagement-footnote reveal">{t('engagement.footnote')}</p>
      </div>
    </section>
  )
}
