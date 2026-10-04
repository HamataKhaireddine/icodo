import { useEffect } from 'react'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UiIcon } from '../components/UiIcon'
import { ContactForm } from '../components/ContactForm'
import { EngagementSection } from '../components/EngagementSection'
import { TeamSection } from '../components/TeamSection'
import { ProjectThumb } from '../components/ProjectThumb'
import { ProjectsSection } from '../components/ProjectsSection'
import { BlogCard } from '../components/BlogCard'
import { blogPosts } from '../data/blogPosts'
import { SeoHead } from '../components/SeoHead'
import { HomeHero } from '../components/HomeHero'
import '../home-v2.css'
import { SiteFooter } from '../components/SiteLayout'
import { caseStudies } from '../data/caseStudies'

export default function HomePage() {
  const { t } = useTranslation()

  const clientItems = t('clients.items', { returnObjects: true }) as { name: string; icon: string }[]
  const services = t('services.items', { returnObjects: true }) as {
    icon: string
    title: string
    desc: string
  }[]
  const processSteps = t('process.homeSteps', { returnObjects: true }) as {
    num: string
    title: string
    desc: string
  }[]
  const whyItems = (t('why.items', { returnObjects: true }) as { icon: string; title: string; desc: string }[]).slice(
    0,
    3,
  )
  const stats = t('stats.items', { returnObjects: true }) as {
    value: number
    suffix: string
    label: string
  }[]
  const phoneNumbers = t('contact.phoneNumbers', { returnObjects: true }) as { tel: string; display: string }[]

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('is-home')
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    const prevTheme = meta?.content
    if (meta) meta.content = '#05070d'
    return () => {
      root.classList.remove('is-home')
      if (meta && prevTheme) meta.content = prevTheme
    }
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return
    requestAnimationFrame(() => {
      const nav = document.getElementById('navbar')
      const navH = nav?.offsetHeight ?? 72
      window.scrollTo({ top: el.offsetTop - navH - 8, behavior: 'auto' })
    })
  }, [])

  return (
    <>
      <SeoHead title={t('seo.homeTitle')} description={t('seo.homeDescription')} path="/" />
      <div className="home-v2">

      <HomeHero />

      <section className="home-trust" aria-labelledby="home-trust-title">
        <div className="section-inner">
          <h2 id="home-trust-title" className="home-trust__label">
            {t('clients.label')}
          </h2>
          <ul className="home-trust__logos">
            {clientItems.map((client) => (
              <li key={client.name} className="home-trust__logo">
                <UiIcon id={client.icon} />
                {client.name}
              </li>
            ))}
          </ul>
          <ul className="home-trust__proof">
            <li>{t('hero.trustResponse')}</li>
            <li>{t('hero.trustProjects')}</li>
            <li>{t('hero.trustExperience')}</li>
          </ul>
          <dl className="home-trust__stats">
            {stats.map((stat) => (
              <div key={stat.label} className="home-trust__stat">
                <dt className="home-trust__stat-label">{stat.label}</dt>
                <dd className="home-trust__stat-value">
                  {stat.value}
                  {stat.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="case-studies" className="section-block section-block--muted">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('caseStudies.tag')}</div>
            <h2 className="section-title">{t('caseStudies.title')}</h2>
            <p className="section-desc">{t('caseStudies.desc')}</p>
          </div>
          <div className="case-studies-grid">
            {caseStudies.map((study, i) => (
              <Link
                key={study.slug}
                to={`/case-studies/${study.slug}`}
                className={`case-study-card reveal reveal-delay-${(i % 2) + 1}`}
              >
                <ProjectThumb
                  href={study.href}
                  thumb={study.thumb}
                  thumbUrl={study.thumbUrl}
                  icon={study.icon}
                  alt={study.title}
                />
                <div className="case-study-card__body">
                  <div className="case-study-card__category">{study.category}</div>
                  <h3 className="case-study-card__title">{study.title}</h3>
                  <p className="case-study-card__tagline">{study.tagline}</p>
                  {study.metrics.length > 0 ? (
                    <div className="case-study-card__metrics">
                      {study.metrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="case-study-card__metric">
                          <span className="case-study-card__metric-value">{m.value}</span>
                          <span className="case-study-card__metric-label">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <span className="case-study-card__link">{t('caseStudies.readStudy')} →</span>
                </div>
              </Link>
            ))}
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
          <div className="solutions-grid">
            {services.map((s, i) => (
              <article key={i} className={`solution-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="solution-card__icon">
                  <UiIcon id={s.icon} />
                </div>
                <h3 className="solution-card__title">{s.title}</h3>
                <p className="solution-card__desc">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EngagementSection />

      <section id="process" className="section-block">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('process.tag')}</div>
            <h2 className="section-title">{t('process.title')}</h2>
            <p className="section-desc">{t('process.desc')}</p>
          </div>
          <div className="process-timeline process-timeline--compact">
            {processSteps.map((step, i) => (
              <div key={i} className={`process-step reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="process-step__num">{step.num}</div>
                <div className="process-step__title">{step.title}</div>
                <p className="process-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="process-home-link reveal">
            <Link to="/about">{t('process.seeFull')}</Link>
          </p>
        </div>
      </section>

      <TestimonialsSection />

      <section id="why" className="section-block section-block--tight">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('why.tag')}</div>
            <h2 className="section-title">{t('why.title')}</h2>
          </div>
          <div className="why-grid">
            {whyItems.map((item, i) => (
              <article key={i} className={`why-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="why-card__icon">
                  <UiIcon id={item.icon} />
                </div>
                <h3 className="why-card__title">{item.title}</h3>
                <p className="why-card__desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta" aria-labelledby="home-cta-title">
        <div className="section-inner">
          <div className="home-cta__panel reveal">
            <h2 id="home-cta-title" className="home-cta__title">
              {t('aboutPage.ctaTitle')}
            </h2>
            <p className="home-cta__desc">{t('aboutPage.ctaDesc')}</p>
            <Link to="/contact" className="btn btn--primary btn--lg">
              {t('nav.cta')}
            </Link>
          </div>
        </div>
      </section>

      <section id="leadership" className="section-block section-block--muted">
        <div className="section-inner">
          <TeamSection />
        </div>
      </section>

      <section id="contact" className="section-block">
        <div className="section-inner">
          <div className="contact-page__grid">
            <div className="reveal">
              <div className="section-tag">{t('contact.tag')}</div>
              <h2 className="section-title" style={{ textAlign: 'start', marginBottom: 16 }}>
                {t('contact.title')}
              </h2>
              <p className="section-desc" style={{ textAlign: 'start', marginBottom: 24 }}>
                {t('contact.desc')}
              </p>
              <Link to="/contact" className="btn btn--secondary" style={{ marginBottom: 24 }}>
                {t('booking.calendlyLabel')} →
              </Link>
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
            </div>
            <div className="reveal reveal-delay-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />

      <section id="insights" className="section-block">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('blog.tag')}</div>
            <h2 className="section-title">{t('blog.title')}</h2>
            <p className="section-desc">{t('blog.desc')}</p>
          </div>
          <div className="blog-grid">
            {blogPosts.slice(0, 3).map((post, i) => (
              <BlogCard key={post.slug} post={post} className={`reveal reveal-delay-${(i % 3) + 1}`} />
            ))}
          </div>
          <p className="blog-home-more reveal">
            <Link to="/blog">{t('blog.viewAll')} →</Link>
          </p>
        </div>
      </section>

      <SiteFooter />
      </div>
    </>
  )
}
