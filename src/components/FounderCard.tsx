import { founder } from '../data/founder'

export function FounderCard({ className = '' }: { className?: string }) {
  return (
    <article className={`founder-card reveal ${className}`.trim()}>
      <img
        src={founder.photo}
        alt={founder.name}
        className="founder-card__photo"
        width={120}
        height={120}
        loading="lazy"
      />
      <div className="founder-card__body">
        <p className="founder-card__eyebrow">Leadership</p>
        <h3 className="founder-card__name">{founder.name}</h3>
        <p className="founder-card__role">{founder.role}</p>
        <p className="founder-card__bio">{founder.bio}</p>
        <a
          href={founder.linkedIn}
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
