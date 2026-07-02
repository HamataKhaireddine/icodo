import type { TeamMember } from '../data/team'

export function TeamMemberCard({ member, className = '' }: { member: TeamMember; className?: string }) {
  return (
    <article className={`founder-card reveal ${className}`.trim()}>
      <img
        src={member.photo}
        alt={member.name}
        className="founder-card__photo"
        width={120}
        height={120}
        loading="lazy"
      />
      <div className="founder-card__body">
        <p className="founder-card__eyebrow">Leadership</p>
        <h3 className="founder-card__name">{member.name}</h3>
        <p className="founder-card__role">{member.role}</p>
        <p className="founder-card__bio">{member.bio}</p>
        <a
          href={member.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--secondary founder-card__linkedin"
        >
          LinkedIn →
        </a>
      </div>
    </article>
  )
}
