export type ContactPayload = {
  name: string
  email: string
  company: string
  service: string
  budget: string
  message: string
}

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const url = import.meta.env.VITE_GOOGLE_SHEET_URL as string | undefined

  if (!url) {
    throw new Error(
      'Contact form is not configured yet. Email hello@icodo.io or book a call via Calendly.',
    )
  }

  const res = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  })

  // no-cors returns opaque response; treat as success if no network throw
  if (res.type === 'opaque') return

  if (!res.ok) {
    throw new Error('Unable to send your inquiry. Please try again or email hello@icodo.io.')
  }
}
