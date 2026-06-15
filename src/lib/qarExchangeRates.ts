/**
 * QAR-based FX snapshots for converting list prices to the visitor’s currency.
 * Primary: open.er-api.com v6 (ExchangeRate-API, daily refresh, broad currency list).
 * Fallback: v4 endpoint if v6 is unavailable.
 *
 * Rates are “1 QAR = rate[CUR]” in the target currency (same convention worldwide).
 */

export type QarRates = Record<string, number>

export type QarFxSnapshot = {
  rates: QarRates
  /** ISO 8601 / RFC3339 from API (UTC) */
  lastUpdateUtc: string | null
  nextUpdateUtc: string | null
  /** Short label for UI disclaimer */
  source: 'exchangerate-api'
}

function parseV6(data: unknown): QarFxSnapshot | null {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  if (d.result !== 'success') return null
  const rates = d.rates
  if (!rates || typeof rates !== 'object') return null
  return {
    rates: rates as QarRates,
    lastUpdateUtc: typeof d.time_last_update_utc === 'string' ? d.time_last_update_utc : null,
    nextUpdateUtc: typeof d.time_next_update_utc === 'string' ? d.time_next_update_utc : null,
    source: 'exchangerate-api',
  }
}

async function fetchV6(signal?: AbortSignal): Promise<QarFxSnapshot | null> {
  const r = await fetch('https://open.er-api.com/v6/latest/QAR', { signal })
  if (!r.ok) return null
  return parseV6(await r.json())
}

async function fetchV4Fallback(signal?: AbortSignal): Promise<QarFxSnapshot | null> {
  const r = await fetch('https://api.exchangerate-api.com/v4/latest/QAR', { signal })
  if (!r.ok) return null
  const data = (await r.json()) as { rates?: Record<string, number> }
  if (!data.rates || typeof data.rates !== 'object') return null
  return {
    rates: data.rates,
    lastUpdateUtc: null,
    nextUpdateUtc: null,
    source: 'exchangerate-api',
  }
}

export async function fetchQarFxSnapshot(signal?: AbortSignal): Promise<QarFxSnapshot | null> {
  try {
    const v6 = await fetchV6(signal)
    if (v6) return v6
  } catch {
    /* try v4 */
  }
  try {
    return await fetchV4Fallback(signal)
  } catch {
    return null
  }
}

export function convertQarTo(qar: number, targetCurrency: string, rates: QarRates | null): number {
  const cur = targetCurrency.toUpperCase()
  if (cur === 'QAR' || !rates) return qar
  const rate = rates[cur]
  if (typeof rate !== 'number' || !Number.isFinite(rate)) return qar
  return qar * rate
}
