import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { submitContactForm } from '../lib/submitContactForm'

export function ContactForm({ className = '' }: { className?: string }) {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const serviceOptions = t('contact.services', { returnObjects: true }) as string[]
  const budgetOptions = t('contact.budgetOptions', { returnObjects: true }) as string[]

  const submitLabel = useMemo(() => {
    if (loading) return t('contact.form.sending')
    if (sent) return t('contact.form.sent')
    return t('contact.form.submit')
  }, [loading, sent, t])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const data = new FormData(form)

    setLoading(true)
    try {
      await submitContactForm({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        company: String(data.get('company') ?? ''),
        service: String(data.get('service') ?? ''),
        budget: String(data.get('budget') ?? ''),
        message: String(data.get('message') ?? ''),
      })
      setSent(true)
      form.reset()
      window.setTimeout(() => setSent(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('contact.form.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={`contact-form ${className}`.trim()} onSubmit={onSubmit}>
      <div className="contact-form__row">
        <label className="contact-form__field">
          <span>{t('contact.form.name')}</span>
          <input type="text" name="name" placeholder={t('contact.form.namePh')} required disabled={loading} />
        </label>
        <label className="contact-form__field">
          <span>{t('contact.form.email')}</span>
          <input type="email" name="email" placeholder={t('contact.form.emailPh')} required disabled={loading} />
        </label>
      </div>
      <div className="contact-form__row">
        <label className="contact-form__field">
          <span>{t('contact.form.company')}</span>
          <input type="text" name="company" placeholder={t('contact.form.companyPh')} disabled={loading} />
        </label>
        <label className="contact-form__field">
          <span>{t('contact.form.service')}</span>
          <select name="service" defaultValue="" required disabled={loading}>
            <option value="" disabled>
              {t('contact.form.servicePh')}
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="contact-form__field">
        <span>{t('contact.form.budget')}</span>
        <select name="budget" defaultValue="" required disabled={loading}>
          <option value="" disabled>
            {t('contact.form.budgetPh')}
          </option>
          {budgetOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label className="contact-form__field">
        <span>{t('contact.form.message')}</span>
        <textarea
          name="message"
          rows={5}
          placeholder={t('contact.form.messagePh')}
          required
          disabled={loading}
        />
      </label>
      {error ? (
        <p className="contact-form__error" role="alert">
          {error}{' '}
          <a href={`mailto:${t('contact.emailVal')}`}>{t('contact.emailVal')}</a>
        </p>
      ) : null}
      <button type="submit" className="btn btn--primary btn--lg" disabled={loading}>
        {submitLabel}
      </button>
    </form>
  )
}
