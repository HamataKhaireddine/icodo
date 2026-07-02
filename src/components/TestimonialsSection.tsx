import { useTranslation } from 'react-i18next'
import { testimonials } from '../data/testimonials'

function TestimonialAvatar({ photo, name, initials }: { photo: string; name: string; initials: string }) {
  return (
    <>
      <img
        src={photo}
        alt={name}
        className="testimonial-card__avatar testimonial-card__avatar--photo"
        width={56}
        height={56}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const el = e.currentTarget
          el.style.display = 'none'
          const fallback = el.nextElementSibling as HTMLElement | null
          if (fallback) fallback.hidden = false
        }}
      />
      <span className="testimonial-card__avatar testimonial-card__avatar--fallback" hidden aria-hidden>
        {initials}
      </span>
    </>
  )
}

function TestimonialCard({ item, className = '' }: { item: (typeof testimonials)[0]; className?: string }) {
  return (
    <article className={`testimonial-card ${className}`.trim()}>
      <p className="testimonial-card__quote">&ldquo;{item.quote}&rdquo;</p>
      <footer className="testimonial-card__author">
        <div className="testimonial-card__avatar-wrap">
          <TestimonialAvatar photo={item.photo} name={item.name} initials={item.initials} />
        </div>
        <div className="testimonial-card__meta">
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
          </div>
          {item.linkedIn ? (
            <a
              className="testimonial-card__linkedin"
              href={item.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          ) : null}
        </div>
      </footer>
    </article>
  )
}

export function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <section id="testimonials" className="section-block section-block--muted">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-tag">{t('testimonials.tag')}</div>
          <h2 className="section-title">{t('testimonials.title')}</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((item, i) => (
            <TestimonialCard
              key={item.id}
              item={item}
              className={`reveal reveal-delay-${(i % 3) + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
