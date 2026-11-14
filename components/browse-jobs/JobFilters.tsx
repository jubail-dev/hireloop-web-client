import { SlidersHorizontal } from "lucide-react"

import { formatCompactNumber } from "@/lib/format"
import type {
  JobFilterGroup,
  JobFilterOption,
  JobFilterState,
} from "@/lib/job-options"

type FilterOptionRowProps = {
  option: JobFilterOption
  name: string
  checked: boolean
  onChange: () => void
}

const FilterOptionRow = ({
  option,
  name,
  checked,
  onChange,
}: FilterOptionRowProps) => (
  <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-200">
    <span className="flex items-center gap-2.5">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        // Clicking the active option again clears the selection.
        onClick={() => {
          if (checked) onChange()
        }}
        className="size-4 cursor-pointer accent-indigo-500"
      />
      {option.label}
    </span>

    <span aria-hidden="true" className="text-xs text-zinc-600">
      {formatCompactNumber(option.count)}
    </span>
  </label>
)

type FilterGroupProps = {
  name: string
  title: string
  options: JobFilterOption[]
  selected: string | null
  onSelect: (value: string) => void
  scrollable?: boolean
}

const FilterGroup = ({
  name,
  title,
  options,
  selected,
  onSelect,
  scrollable = false,
}: FilterGroupProps) => {
  if (options.length === 0) return null

  return (
    <fieldset>
      <legend className="px-2 pb-2 text-[11px] font-semibold tracking-[0.12em] text-zinc-500 uppercase">
        {title}
      </legend>

      <div
        className={
          scrollable
            ? "max-h-56 space-y-0.5 overflow-y-auto pr-1"
            : "space-y-0.5"
        }
      >
        {options.map((option) => (
          <FilterOptionRow
            key={option.value}
            option={option}
            name={name}
            checked={selected === option.value}
            onChange={() => onSelect(option.value)}
          />
        ))}
      </div>
    </fieldset>
  )
}

type JobFiltersProps = {
  filters: JobFilterState
  jobTypeOptions: JobFilterOption[]
  categoryOptions: JobFilterOption[]
  workModeOptions: JobFilterOption[]
  onChange: (group: JobFilterGroup, value: string) => void
  onClear: () => void
}

const JobFilters = ({
  filters,
  jobTypeOptions,
  categoryOptions,
  workModeOptions,
  onChange,
  onClear,
}: JobFiltersProps) => {
  const selectedCount = Object.values(filters).filter(Boolean).length

  return (
    <aside className="rounded-2xl border border-white/10 bg-[#0d0d11] p-4 lg:sticky lg:top-24">
      <div className="flex items-center justify-between px-2 pb-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
          <SlidersHorizontal
            aria-hidden="true"
            className="size-4 text-indigo-400"
          />
          Filters
        </h2>

        {selectedCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-md px-1.5 py-0.5 text-xs font-medium text-zinc-500 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:outline-none"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-5">
        <FilterGroup
          name="jobTypes"
          title="Job Type"
          options={jobTypeOptions}
          selected={filters.jobTypes}
          onSelect={(value) => onChange("jobTypes", value)}
        />

        <FilterGroup
          name="workModes"
          title="Work Mode"
          options={workModeOptions}
          selected={filters.workModes}
          onSelect={(value) => onChange("workModes", value)}
        />

        <FilterGroup
          name="categories"
          title="Category"
          options={categoryOptions}
          selected={filters.categories}
          onSelect={(value) => onChange("categories", value)}
          scrollable
        />
      </div>
    </aside>
  )
}

export default JobFilters
