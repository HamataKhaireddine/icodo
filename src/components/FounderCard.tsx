import { team } from '../data/team'
import { TeamMemberCard } from './TeamMemberCard'

/** @deprecated Use TeamMemberCard or TeamSection */
export function FounderCard({ className = '' }: { className?: string }) {
  return <TeamMemberCard member={team[0]} className={className} />
}
