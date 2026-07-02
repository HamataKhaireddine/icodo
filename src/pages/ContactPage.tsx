import { useTranslation } from 'react-i18next'
import { ContactForm } from '../components/ContactForm'
import { CalendlyEmbed } from '../components/CalendlyEmbed'
import { SeoHead } from '../components/SeoHead'
import { SiteFooter } from '../components/SiteLayout'

export default function ContactPage() {
  const { t } = useTranslation()
  const phoneNumbers = t('contact.phoneNumbers', { returnObjects: true }) as { tel: string; display: string }[]
  const asideSteps = t('contact.asideBody').split('\n')

  return (
    <>
      <SeoHead title={t('contact.title')} description={t('seo.contactDescription')} path="/contact" />

      <div className="page-hero">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('contact.tag')}</div>
            <h1 className="section-title">{t('booking.title')}</h1>
            <p className="section-desc">{t('booking.desc')}</p>
          </div>
        </div>
      </div>

      <section className="section-block section-block--tight">
        <div className="section-inner">
          <CalendlyEmbed label={t('booking.calendlyLabel')} />
        </div>
      </section>

      <section className="section-block section-block--tight section-block--muted">
        <div className="section-inner">
          <div className="contact-page__grid">
            <div className="reveal">
              <h2 className="section-title" style={{ fontSize: '1.35rem', textAlign: 'start', marginBottom: 16 }}>
                {t('contact.asideTitle')}
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {asideSteps.map((step) => (
                  <li key={step} style={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
                    {step}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--brand-hover)', marginBottom: 24 }}>
                {t('contact.responseTime')}
              </p>
              <div className="contact-aside__item">
                <div className="contact-aside__label">{t('contact.emailLabel')}</div>
                <a className="contact-aside__value" href={`mailto:${t('contact.emailVal')}`}>
                  {t('contact.emailVal')}
                </a>
              </div>
              <div className="contact-aside__item">
                <div className="contact-aside__label">{t('contact.phoneLabel')}</div>
                {phoneNumbers.map((p) => (
                  <a key={p.tel} className="contact-aside__value" href={`tel:${p.tel}`} style={{ display: 'block' }}>
                    {p.display}
                  </a>
                ))}
                <a
                  className="contact-aside__value"
                  href={`https://wa.me/${t('contact.whatsappTel').replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', marginTop: 8 }}
                >
                  {t('contact.whatsappLabel')}
                </a>
              </div>
              <p style={{ marginTop: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {t('booking.emailAlt')}{' '}
                <a href={`mailto:${t('contact.emailVal')}`} style={{ color: 'var(--text)', fontWeight: 600 }}>
                  {t('contact.emailVal')}
                </a>
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <h2 className="section-title" style={{ fontSize: '1.35rem', textAlign: 'start', marginBottom: 20 }}>
                {t('contact.title')}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
