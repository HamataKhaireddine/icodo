import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SeoHead } from '../components/SeoHead'
import { SiteFooter } from '../components/SiteLayout'

export default function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <>
      <SeoHead title={t('footer.links.privacy')} description={t('privacy.meta')} path="/privacy" />

      <article className="legal-page section-inner">
        <div className="legal-page__header reveal">
          <div className="section-tag">{t('footer.links.privacy')}</div>
          <h1 className="section-title">{t('privacy.title')}</h1>
          <p className="section-desc">{t('privacy.updated')}</p>
        </div>

        <div className="legal-page__body reveal">
          {(t('privacy.sections', { returnObjects: true }) as { title: string; body: string }[]).map((section) => (
            <section key={section.title} className="legal-page__section">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

        <p className="legal-page__back reveal">
          <Link to="/">← {t('privacy.back')}</Link>
        </p>
      </article>

      <SiteFooter />
    </>
  )
}
