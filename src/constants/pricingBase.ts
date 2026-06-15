/** Monthly plan prices in QAR (source of truth for conversion). */
export const PLAN_PRICES_QAR = {
  silver: 1500,
  gold: 3500,
  platinum: 7000,
} as const

export const BUDGET_THRESHOLDS_QAR = [5000, 15000, 50000] as const
