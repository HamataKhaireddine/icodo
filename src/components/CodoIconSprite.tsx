import raw from '../icon-sprite-raw.svg?raw'

/** Inline SVG sprite so `<use href="#icon-…">` resolves (same as original HTML). */
export function CodoIconSprite() {
  return <span dangerouslySetInnerHTML={{ __html: raw }} />
}
