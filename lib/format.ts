export const formatCompactNumber = (value: number) => {
  if (value < 1000) return String(value)

  const compact = (value / 1000).toFixed(1).replace(/\.0$/, "")

  return `${compact}k`
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value)

const formatAmount = (value: number) =>
  value >= 1000 ? `$${Math.round(value / 1000)}k` : `$${value}`

const FREQUENCY_SUFFIX: Record<string, string> = {
  "per hour": "/hr",
  "per month": "/mo",
  "per year": "/yr",
}

const getSalaryRange = (min: number | null, max: number | null) => {
  if (min !== null && max !== null) {
    return `${formatAmount(min)} – ${formatAmount(max)}`
  }

  if (min !== null) return `${formatAmount(min)}+`
  if (max !== null) return `Up to ${formatAmount(max)}`

  return null
}

export const formatSalaryRange = (
  min: number | null,
  max: number | null,
  frequency: string
) => {
  const range = getSalaryRange(min, max)

  if (range === null) return "Salary not disclosed"

  return `${range}${FREQUENCY_SUFFIX[frequency] ?? ""}`
}
