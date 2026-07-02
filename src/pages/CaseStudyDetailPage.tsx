import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getCaseStudy } from '../data/caseStudies'
import { SeoHead } from '../components/SeoHead'
import { SiteFooter } from '../components/SiteLayout'

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const study = slug ? getCaseStudy(slug) : undefined

  if (!study) {
    return <Navigate to="/#case-studies" replace />
  }

  return (
    <>
      <SeoHead title={study.title} description={study.tagline} path={`/case-studies/${study.slug}`} />

      <header className="cs-detail__hero">
        <div className="section-inner">
          <Link to="/#case-studies" className="cs-detail__back reveal">
            ← {t('caseStudies.tag')}
          </Link>
          <div className="cs-detail__meta reveal">
            <span>{study.category}</span>
            <span>{study.client}</span>
            <span>{study.year}</span>
          </div>
          <h1 className="cs-detail__title reveal">{study.title}</h1>
          <p className="cs-detail__tagline reveal">{study.tagline}</p>
          <div className="cs-detail__thumb reveal" style={{ background: study.thumb }} aria-hidden />
        </div>
      </header>

      <div className="cs-detail__content">
        <div className="cs-detail__grid">
          <div>
            <section className="cs-detail__section reveal">
              <h2>{t('caseStudies.problem')}</h2>
              <p>{study.problem}</p>
            </section>
            <section className="cs-detail__section reveal">
              <h2>{t('caseStudies.solution')}</h2>
              <p>{study.solution}</p>
              {study.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
            <section className="cs-detail__section reveal">
              <h2>{t('caseStudies.features')}</h2>
              <ul className="cs-detail__list">
                {study.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
            <section className="cs-detail__section reveal">
              <h2>{t('caseStudies.impact')}</h2>
              <ul className="cs-detail__list">
                {study.impact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="cs-detail__sidebar reveal">
            <div className="cs-detail__sidebar-card">
              <h3>{t('caseStudies.timeline')}</h3>
              <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>{study.timeline}</p>
            </div>
            <div className="cs-detail__sidebar-card">
              <h3>{t('caseStudies.stack')}</h3>
              <div className="cs-detail__stack">
                {study.stack.map((tech) => (
                  <span key={tech} className="tech-group__pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {study.href ? (
              <a
                href={study.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
                style={{ width: '100%' }}
              >
                {t('caseStudies.liveSite')} →
              </a>
            ) : null}
            <Link to="/contact" className="btn btn--primary" style={{ width: '100%', textAlign: 'center' }}>
              {t('caseStudies.cta')}
            </Link>
          </aside>
        </div>
      </div>

      <SiteFooter />
    </>
  )
}
