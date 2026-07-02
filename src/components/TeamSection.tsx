import { useTranslation } from 'react-i18next'
import { team } from '../data/team'
import { TeamMemberCard } from './TeamMemberCard'

export function TeamSection({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation()

  return (
    <div className={`team-section${compact ? ' team-section--compact' : ''}`}>
      {!compact ? (
        <div className="section-header reveal">
          <div className="section-tag">{t('team.tag')}</div>
          <h2 className="section-title">{t('team.title')}</h2>
          <p className="section-desc">{t('team.desc')}</p>
        </div>
      ) : null}
      <div className="team-grid">
        {team.map((member, i) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            className={`reveal reveal-delay-${(i % 2) + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
