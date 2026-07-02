import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import { UiIcon } from './UiIcon'

export function ProjectsSection() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="section-block section-block--muted">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-tag">{t('projects.tag')}</div>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-desc">{t('projects.desc')}</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => {
            const inner = (
              <>
                <div className="projects-grid__thumb" style={{ background: project.thumb }}>
                  <UiIcon id={project.icon} className="projects-grid__icon" />
                </div>
                <div className="projects-grid__body">
                  <div className="projects-grid__meta">
                    <span className="projects-grid__tag">{project.tag}</span>
                    {project.year ? <span className="projects-grid__year">{project.year}</span> : null}
                  </div>
                  <h3 className="projects-grid__name">{project.name}</h3>
                  <p className="projects-grid__desc">{project.desc}</p>
                  {project.href ? (
                    <span className="projects-grid__link">{t('projects.viewLive')} →</span>
                  ) : null}
                </div>
              </>
            )

            return project.href ? (
              <a
                key={project.id}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`projects-grid__card reveal reveal-delay-${(i % 3) + 1}`}
              >
                {inner}
              </a>
            ) : (
              <article key={project.id} className={`projects-grid__card projects-grid__card--static reveal reveal-delay-${(i % 3) + 1}`}>
                {inner}
              </article>
            )
          })}
        </div>
        <p className="projects-grid__more reveal">
          {t('projects.more')}{' '}
          <a href="https://ahk-portfolio.vercel.app/portfolio" target="_blank" rel="noopener noreferrer">
            {t('projects.portfolioLink')}
          </a>
        </p>
      </div>
    </section>
  )
}
