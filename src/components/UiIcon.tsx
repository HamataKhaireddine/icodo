export function UiIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className ? `ui-icon ${className}` : 'ui-icon'} aria-hidden>
      <use href={`#${id}`} />
    </svg>
  )
}
