import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UiIcon } from '../components/UiIcon'
import { BlogCard } from '../components/BlogCard'
import { ContactForm } from '../components/ContactForm'
import { FounderCard } from '../components/FounderCard'
import { ProjectsSection } from '../components/ProjectsSection'
import { SeoHead } from '../components/SeoHead'
import { SiteFooter } from '../components/SiteLayout'
import { caseStudies } from '../data/caseStudies'
import { blogPosts } from '../data/blogPosts'

export default function HomePage() {
  const { t } = useTranslation()

  const clientItems = t('clients.items', { returnObjects: true }) as { name: string; icon: string }[]
  const services = t('services.items', { returnObjects: true }) as {
    icon: string
    title: string
    desc: string
  }[]
  const processSteps = t('process.steps', { returnObjects: true }) as {
    num: string
    title: string
    desc: string
  }[]
  const whyItems = t('why.items', { returnObjects: true }) as {
    icon: string
    title: string
    desc: string
  }[]
  const stats = t('stats.items', { returnObjects: true }) as {
    value: number
    suffix: string
    label: string
  }[]
  const techGroups = t('tech.groups', { returnObjects: true }) as { label: string; items: string[] }[]
  const testimonials = t('testimonials.items', { returnObjects: true }) as {
    quote: string
    name: string
    role: string
    company: string
    companyUrl?: string
    linkedIn?: string
    initials: string
  }[]
  const industries = t('industries.items', { returnObjects: true }) as string[]
  const heroPillars = t('hero.pillars', { returnObjects: true }) as string[]
  const phoneNumbers = t('contact.phoneNumbers', { returnObjects: true }) as { tel: string; display: string }[]

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
      <SeoHead
        title={t('seo.homeTitle')}
        description={t('seo.homeDescription')}
        path="/"
      />

      <section id="hero" className="hero-premium">
        <div className="hero-premium__inner">
          <div className="hero-premium__eyebrow reveal">{t('hero.eyebrow')}</div>
          <h1 className="hero-premium__title reveal">{t('hero.title')}</h1>
          <p className="hero-premium__sub reveal reveal-delay-1">{t('hero.sub')}</p>
          <div className="hero-premium__actions reveal reveal-delay-2">
            <Link to="/contact" className="btn btn--primary btn--lg">
              {t('hero.ctaPrimary')}
            </Link>
            <a href="#case-studies" className="btn btn--secondary btn--lg">
              {t('hero.ctaSecondary')}
            </a>
          </div>
          <div className="hero-premium__trust reveal reveal-delay-2">
            <span className="hero-premium__trust-item">
              <span className="hero-premium__trust-dot" aria-hidden />
              {t('hero.trustResponse')}
            </span>
            <span className="hero-premium__trust-item">
              <span className="hero-premium__trust-dot" aria-hidden />
              {t('hero.trustProjects')}
            </span>
            <span className="hero-premium__trust-item">
              <span className="hero-premium__trust-dot" aria-hidden />
              {t('hero.trustExperience')}
            </span>
          </div>
          <div className="hero-premium__pillars reveal reveal-delay-3">
            {heroPillars.map((pillar) => (
              <span key={pillar} className="hero-premium__pillar">
                {pillar}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stats-bar__grid">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`stat-item reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="stat-item__num">
                <span className="stat-num" data-count={stat.value}>
                  0
                </span>
                {stat.suffix}
              </div>
              <div className="stat-item__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="logo-strip">
        <p className="logo-strip__label">{t('clients.label')}</p>
        <div className="logo-strip__row">
          {clientItems.map((client) => (
            <div key={client.name} className="logo-chip">
              <UiIcon id={client.icon} />
              <span>{client.name}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="services" className="section-block">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('services.tag')}</div>
            <h2 className="section-title">{t('services.title')}</h2>
            <p className="section-desc">{t('services.desc')}</p>
          </div>
          <div className="solutions-grid">
            {services.map((s, i) => (
              <article key={s.title} className={`solution-card reveal reveal-delay-${(i % 3) + 1}`}>
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

      <section id="process" className="section-block section-block--muted">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('process.tag')}</div>
            <h2 className="section-title">{t('process.title')}</h2>
            <p className="section-desc">{t('process.desc')}</p>
          </div>
          <div className="process-timeline">
            {processSteps.map((step, i) => (
              <div key={step.title} className={`process-step reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="process-step__num">{step.num}</div>
                <div className="process-step__title">{step.title}</div>
                <p className="process-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="section-block">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('why.tag')}</div>
            <h2 className="section-title">{t('why.title')}</h2>
            <p className="section-desc">{t('why.desc')}</p>
          </div>
          <div className="why-grid">
            {whyItems.map((item, i) => (
              <article key={item.title} className={`why-card reveal reveal-delay-${(i % 3) + 1}`}>
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
                <div className="case-study-card__thumb" style={{ background: study.thumb }} />
                <div className="case-study-card__body">
                  <div className="case-study-card__category">{study.category}</div>
                  <h3 className="case-study-card__title">{study.title}</h3>
                  <p className="case-study-card__tagline">{study.tagline}</p>
                  <span className="case-study-card__link">
                    {t('caseStudies.readStudy')} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="section-block section-block--tight">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('industries.tag')}</div>
            <h2 className="section-title">{t('industries.title')}</h2>
            <p className="section-desc">{t('industries.desc')}</p>
          </div>
          <div className="industries-row reveal">
            {industries.map((name) => (
              <span key={name} className="industry-pill">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="section-block section-block--muted">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('tech.tag')}</div>
            <h2 className="section-title">{t('tech.title')}</h2>
            <p className="section-desc">{t('tech.desc')}</p>
          </div>
          <div className="tech-groups">
            {techGroups.map((group, i) => (
              <div key={group.label} className={`tech-group reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="tech-group__label">{group.label}</div>
                <div className="tech-group__items">
                  {group.items.map((item) => (
                    <span key={item} className="tech-group__pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="section-block">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('testimonials.tag')}</div>
            <h2 className="section-title">{t('testimonials.title')}</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((item, i) => (
              <blockquote key={item.name} className={`testimonial-card reveal reveal-delay-${(i % 3) + 1}`}>
                <p className="testimonial-card__quote">&ldquo;{item.quote}&rdquo;</p>
                <footer className="testimonial-card__author">
                  <span className="testimonial-card__avatar">{item.initials}</span>
                  <div>
                    <div className="testimonial-card__name">{item.name}</div>
                    <div className="testimonial-card__role">{item.role}</div>
                    <div className="testimonial-card__company">
                      {item.companyUrl ? (
                        <a href={item.companyUrl} target="_blank" rel="noopener noreferrer">
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                      {item.linkedIn ? (
                        <>
                          {' · '}
                          <a href={item.linkedIn} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                          </a>
                        </>
                      ) : null}
                    </div>
                  </div>
                </footer>
              </blockquote>
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

      <section id="blog" className="section-block section-block--muted">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('blog.tag')}</div>
            <h2 className="section-title">{t('blog.title')}</h2>
            <p className="section-desc">{t('blog.desc')}</p>
          </div>
          <div className="blog-grid">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} className={`reveal-delay-${(i % 3) + 1}`} />
            ))}
          </div>
          <div className="blog-section-more reveal">
            <Link to="/blog" className="btn btn--secondary">
              {t('blog.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="section-block">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('team.tag')}</div>
            <h2 className="section-title">{t('team.title')}</h2>
            <p className="section-desc">{t('team.desc')}</p>
          </div>
          <FounderCard />
          <div style={{ textAlign: 'center', marginTop: 40 }} className="reveal">
            <Link to="/about" className="btn btn--secondary">
              {t('footer.links.about')} →
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="section-block section-block--muted">
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
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 24 }}>
                {t('contact.responseTime')}
              </p>
              <Link to="/contact" className="btn btn--secondary" style={{ marginBottom: 24 }}>
                {t('booking.calendlyLabel')} →
              </Link>
              <div className="contact-aside__item" style={{ marginTop: 24 }}>
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

      <SiteFooter />
    </>
  )
}
