"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { SearchX } from "lucide-react"

import type { JobDataType } from "@/app/types/jobdata.types"
import { JOB_TYPES } from "@/lib/job-options"
import type {
  JobFilterGroup,
  JobFilterState,
  SortValue,
} from "@/lib/job-options"

import JobCard from "./JobCard"
import JobFilters from "./JobFilters"
import JobResultsHeader from "./JobResultsHeader"
import Pagination from "./Pagination"
import SearchBar from "./SearchBar"

const PAGE_SIZE = 6

const EMPTY_FILTERS: JobFilterState = {
  jobTypes: null,
  categories: null,
  workModes: null,
}

type BrowseJobsProps = {
  jobs: JobDataType[]
}

const countBy = (values: string[]) =>
  values.reduce<Record<string, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1
    return counts
  }, {})

const NoJobsFound = () => (
  <div className="rounded-2xl border border-dashed border-white/10 bg-[#0d0d11] px-6 py-16 text-center">
    <SearchX aria-hidden="true" className="mx-auto size-8 text-zinc-600" />

    <h3 className="mt-4 text-base font-semibold text-white">No jobs found</h3>

    <p className="mt-1 text-sm text-zinc-500">
      Try a different search term or clear your filters.
    </p>
  </div>
)

const BrowseJobs = ({ jobs }: BrowseJobsProps) => {
  const [search, setSearch] = useState("")
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<JobFilterState>(() => ({
    jobTypes: searchParams.get("jobType"),
    categories: searchParams.get("category"),
    workModes:
      searchParams.get("isRemote") === "true"
        ? "remote"
        : searchParams.get("isRemote") === "false"
          ? "onsite"
          : null,
  }))
  const [sort, setSort] = useState<SortValue>("recent")
  const [page, setPage] = useState(1)
  const router = useRouter()
  

  const jobTypeOptions = useMemo(() => {
    const counts = countBy(jobs.map((job) => job.jobType))

    return JOB_TYPES.map((jobType) => ({
      label: jobType,
      value: jobType,
      count: counts[jobType] ?? 0,
    }))
  }, [jobs])

  const workModeOptions = useMemo(() => {
    const remoteCount = jobs.filter((job) => job.isRemote).length

    return [
      { label: "Remote", value: "remote", count: remoteCount },
      { label: "On-site", value: "onsite", count: jobs.length - remoteCount },
    ]
  }, [jobs])

  const categoryOptions = useMemo(() => {
    const counts = countBy(jobs.map((job) => job.category))

    return Object.entries(counts)
      .filter(([category]) => category)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, count]) => ({
        label: category,
        value: category,
        count,
      }))
  }, [jobs])

  const visibleJobs = useMemo(() => {
    const filteredJobs = jobs.filter((job) => {
      // Job Type Filter
      const matchesJobType =
        !filters.jobTypes || job.jobType === filters.jobTypes

      // Category Filter
      const matchesCategory =
        !filters.categories || job.category === filters.categories

      // Work Mode Filter
      const matchesWorkMode =
        !filters.workModes ||
        (filters.workModes === "remote" && job.isRemote) ||
        (filters.workModes === "onsite" && !job.isRemote)

      return matchesJobType && matchesCategory && matchesWorkMode
    })

    const sortedJobs = [...filteredJobs]

    if (sort === "salary-desc") {
      sortedJobs.sort(
        (a, b) =>
          (b.maxSalary ?? b.minSalary ?? 0) - (a.maxSalary ?? a.minSalary ?? 0)
      )
    }

    if (sort === "salary-asc") {
      sortedJobs.sort(
        (a, b) =>
          (a.minSalary ?? a.maxSalary ?? 0) - (b.minSalary ?? b.maxSalary ?? 0)
      )
    }

    return sortedJobs
  }, [jobs, filters, sort])

  const totalPages = Math.max(1, Math.ceil(visibleJobs.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginatedJobs = visibleJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleSearch = () => {
    // TODO: write `search` to the URL query (implemented later).
  }

  const handleFilterChange = (group: JobFilterGroup, value: string) => {
    const nextValue = filters[group] === value ? null : value

    setFilters((current) => ({
      ...current,
      [group]: nextValue,
    }))

    setPage(1)

    const params = new URLSearchParams(searchParams.toString())

    // Map filter groups to API query parameter names.
    const queryKey = {
      jobTypes: "jobType",
      categories: "category",
      workModes: "isRemote",
    }[group]

    if (nextValue === null) {
      params.delete(queryKey)
    } else if (group === "workModes") {
      params.set("isRemote", nextValue === "remote" ? "true" : "false")
    } else {
      params.set(queryKey, nextValue)
    }

    const queryString = params.toString()

    router.push(queryString ? `/browse-jobs?${queryString}` : "/browse-jobs", {
      scroll: false,
    })
  }

  const handleClearFilters = () => {
    setFilters(EMPTY_FILTERS)
    setPage(1)

    // TODO: remove the filter params from the URL query (implemented later).
  }

  const handleSortChange = (value: SortValue) => {
    setSort(value)
    setPage(1)
  }

  return (
    <main className="min-h-screen bg-[#08080b] pt-8 pb-20 text-white">
      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 sm:px-6">
        <SearchBar
          value={search}
          onValueChange={setSearch}
          onSubmit={handleSearch}
        />

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
          <JobFilters
            filters={filters}
            jobTypeOptions={jobTypeOptions}
            categoryOptions={categoryOptions}
            workModeOptions={workModeOptions}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
          />

          <section aria-label="Job results" className="min-w-0 space-y-4">
            <JobResultsHeader
              count={visibleJobs.length}
              sort={sort}
              onSortChange={handleSortChange}
            />

            {paginatedJobs.length > 0 ? (
              <div className="space-y-3">
                {paginatedJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <NoJobsFound />
            )}

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </section>
        </div>
      </div>
    </main>
  )
}

export default BrowseJobs
