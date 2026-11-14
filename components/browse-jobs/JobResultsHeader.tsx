import { ChevronDown } from "lucide-react"

import { formatNumber } from "@/lib/format"
import { SORT_OPTIONS } from "@/lib/job-options"
import type { SortValue } from "@/lib/job-options"

type JobResultsHeaderProps = {
  count: number
  sort: SortValue
  onSortChange: (value: SortValue) => void
}

const JobResultsHeader = ({
  count,
  sort,
  onSortChange,
}: JobResultsHeaderProps) => (
  <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
    <h2 className="text-base font-semibold text-white">
      Found {formatNumber(count)} Professional {count === 1 ? "Job" : "Jobs"}
    </h2>

    <label className="flex items-center gap-2 text-xs text-zinc-500">
      Sort by:
      <span className="relative">
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortValue)}
          className="appearance-none rounded-lg border border-white/10 bg-[#0d0d11] py-2 pr-8 pl-3 text-xs font-medium text-zinc-200 transition-colors outline-none hover:border-white/20 focus:border-indigo-500/60"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-zinc-500"
        />
      </span>
    </label>
  </div>
)

export default JobResultsHeader
