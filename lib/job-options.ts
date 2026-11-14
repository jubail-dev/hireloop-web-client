export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
] as const

export const SORT_OPTIONS = [
  { label: "Most Recent", value: "recent" },
  { label: "Salary: High to Low", value: "salary-desc" },
  { label: "Salary: Low to High", value: "salary-asc" },
] as const

export type SortValue = (typeof SORT_OPTIONS)[number]["value"]

export type JobFilterGroup = "jobTypes" | "categories" | "workModes"

export type JobFilterState = Record<JobFilterGroup, string | null>

export type JobFilterOption = {
  label: string
  value: string
  count: number
}
