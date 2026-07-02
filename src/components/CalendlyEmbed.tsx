const CALENDLY_URL = 'https://calendly.com/ahmadhassankhan701/30min'

export function CalendlyEmbed({ label }: { label?: string }) {
  const src = `${CALENDLY_URL}?hide_gesture=modals&hide_landing_page_details=1&primary_color=fcba27`

  return (
    <div className="calendly-embed">
      {label ? <p className="calendly-embed__label">{label}</p> : null}
      <iframe
        title="Book a discovery call with ICODO"
        src={src}
        className="calendly-embed__frame"
        loading="lazy"
      />
      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="calendly-embed__fallback">
        Open scheduling page →
      </a>
    </div>
  )
}
