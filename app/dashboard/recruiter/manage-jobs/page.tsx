"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Code,
  Palette,
  Cpu,
  Megaphone,
  CheckCircle,
  Globe,
  MapPin,
  Users,
  Edit3,
  Trash2,
  Plus,
  Search,
  BriefcaseBusiness,
  CalendarDays,
  TrendingUp,
  Clock3,
  ArrowUpDown,
  X,
  Building2,
  CircleDollarSign,
  RefreshCw,
  BrainCircuit,
} from "lucide-react"
import { getJobs } from "@/lib/api/jobs"
import { DeleteJobDialog } from "@/components/shared/DeleteJobDialog"

export type JobDataType = {
  _id: string
  title: string
  company: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: number | null
  maxSalary: number | null
  frequency: string
  responsibilities: string
  qualifications: string
  applicantsCount?: number
  status?: "Active" | "Expired"
}

type FilterType = "All" | "Active" | "Expired"

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "engineering":
      return <Code className="h-5 w-5 text-indigo-600" />

    case "design":
    case "ui/ux design":
      return <Palette className="h-5 w-5 text-orange-500" />

    case "infrastructure":
      return <Cpu className="h-5 w-5 text-sky-600" />

    case "marketing":
    case "digital marketing":
      return <Megaphone className="h-5 w-5 text-purple-600" />

    case "artificial intelligence & ml":
    case "artificial intelligence":
      return <BrainCircuit className="h-5 w-5 text-indigo-600" />

    case "quality":
      return <CheckCircle className="h-5 w-5 text-blue-600" />

    default:
      return <BriefcaseBusiness className="h-5 w-5 text-slate-500" />
  }
}

// Date Helpers
const parseLocalDate = (date: string) => {
  const [year, month, day] = date.slice(0, 10).split("-").map(Number)

  if (!year || !month || !day) return null

  const parsed = new Date(year, month - 1, day)

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null
  }

  return parsed
}

// Job Status
const getJobStatus = (deadline: string): "Active" | "Expired" => {
  const deadlineDate = parseLocalDate(deadline)

  if (!deadlineDate) return "Expired"

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  deadlineDate.setHours(0, 0, 0, 0)

  return deadlineDate >= today ? "Active" : "Expired"
}

// Format Date
const formatDate = (date: string) => {
  const parsed = parseLocalDate(date)

  if (!parsed) return "Invalid date"

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed)
}

// Remaining Days
const getRemainingDays = (deadline: string) => {
  const deadlineDate = parseLocalDate(deadline)

  if (!deadlineDate) return "Invalid deadline"

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  deadlineDate.setHours(0, 0, 0, 0)

  const difference = Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / 86400000
  )

  if (difference < 0) return `Expired ${Math.abs(difference)}d ago`

  if (difference === 0) return "Last day to apply"

  return `${difference} days left`
}

// Salary Formatter
const formatSalary = (
  min: number | null,
  max: number | null,
  frequency: string
) => {
  if (min === null && max === null) return "Negotiable"

  const formatter = new Intl.NumberFormat("en-US")

  const formatValue = (value: number) => formatter.format(value)

  const salary =
    min !== null && max !== null
      ? `${formatValue(min)} - ${formatValue(max)}`
      : formatValue(min ?? max ?? 0)

  return `${salary} / ${frequency}`
}

const ManageJobsPage = () => {
  // API Data
  const [jobs, setJobs] = useState<JobDataType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleJobDeleted = (jobId: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId))
  }

  // Fetch Jobs From API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await getJobs()

        setJobs(response)
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
        setError("Failed to load job listings. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterType>("All")
  const [sortOrder, setSortOrder] = useState("newest")

  // Add Automatic Status
  const jobsWithStatus = useMemo(() => {
    return jobs.map((job) => ({
      ...job,
      status: getJobStatus(job.deadline),
    }))
  }, [jobs])

  // Statistics
  const stats = useMemo(() => {
    const active = jobsWithStatus.filter((job) => job.status === "Active")

    const expired = jobsWithStatus.filter((job) => job.status === "Expired")

    return {
      total: jobs.length,
      active: active.length,
      expired: expired.length,
      applicants: jobs.reduce(
        (total, job) => total + (job.applicantsCount ?? 0),
        0
      ),
    }
  }, [jobs, jobsWithStatus])

  // Search, Filter & Sort
  const filteredJobs = useMemo(() => {
    const filtered = jobsWithStatus.filter((job) => {
      const matchesSearch = [job.title, job.company, job.category, job.location]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesFilter =
        activeFilter === "All" || job.status === activeFilter

      return matchesSearch && matchesFilter
    })

    return [...filtered].sort((a, b) => {
      const dateA = parseLocalDate(a.deadline)?.getTime() ?? 0
      const dateB = parseLocalDate(b.deadline)?.getTime() ?? 0

      if (sortOrder === "newest") return dateB - dateA

      if (sortOrder === "oldest") return dateA - dateB

      return a.title.localeCompare(b.title)
    })
  }, [jobsWithStatus, searchTerm, activeFilter, sortOrder])

  // Statistics Cards
  const statsCards = [
    {
      title: "Total Jobs",
      value: stats.total,
      description: "All published listings",
      icon: BriefcaseBusiness,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Active Jobs",
      value: stats.active,
      description: "Currently accepting applications",
      icon: TrendingUp,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Expired Jobs",
      value: stats.expired,
      description: "Application period ended",
      icon: Clock3,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      title: "Total Applicants",
      value: stats.applicants,
      description: "Across all job listings",
      icon: Users,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 font-sans text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
              <span>Dashboard</span>
              <span>/</span>
              <span className="font-semibold text-indigo-600">Manage Jobs</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Manage Job Posts
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Manage your job listings, track applicants, and monitor
              application deadlines from one place.
            </p>
          </div>

          <Link
            href="/dashboard/recruiter/add-jobs"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/15 transition-all hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            New Job Post
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900 tabular-nums">
                      {stat.value.toLocaleString()}
                    </h2>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
                  >
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>

                <p className="text-xs text-slate-400">{stat.description}</p>
              </div>
            )
          })}
        </div>

        {/* Main Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Job Listings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage all your posted jobs.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full xl:max-w-xs">
                <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search jobs, companies..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 pl-10 text-sm transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 overflow-x-auto">
                {(["All", "Active", "Expired"] as FilterType[]).map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all ${
                        activeFilter === filter
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15"
                          : "border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {filter}

                      <span className="ml-2 text-xs opacity-80">
                        {filter === "All"
                          ? stats.total
                          : filter === "Active"
                            ? stats.active
                            : stats.expired}
                      </span>
                    </button>
                  )
                )}
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-2 text-sm">
                <ArrowUpDown className="h-4 w-4 text-slate-400" />

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-indigo-500"
                >
                  <option value="newest">Deadline: Latest first</option>
                  <option value="oldest">Deadline: Earliest first</option>
                  <option value="title">Job title: A - Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="h-9 w-9 animate-spin text-indigo-600" />

              <p className="mt-4 text-sm font-semibold text-slate-600">
                Loading job listings...
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Please wait while we fetch your jobs.
              </p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="px-5 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50">
                <X className="h-7 w-7 text-rose-500" />
              </div>

              <h3 className="text-lg font-bold text-slate-800">
                Something went wrong
              </h3>

              <p className="mt-2 text-sm text-rose-500">{error}</p>

              <button
                onClick={() => {
                  const fetchAgain = async () => {
                    try {
                      setLoading(true)
                      setError(null)

                      const response = await getJobs()
                      setJobs(response)
                    } catch (error) {
                      console.error("Failed to fetch jobs:", error)
                      setError("Failed to load job listings. Please try again.")
                    } finally {
                      setLoading(false)
                    }
                  }

                  fetchAgain()
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-700"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                      <th className="px-6 py-4">Job Title & Category</th>
                      <th className="px-6 py-4">Company & Location</th>
                      <th className="px-6 py-4">Job Type</th>
                      <th className="px-6 py-4">Salary</th>
                      <th className="px-6 py-4">Applicants</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Deadline</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredJobs.map((job) => (
                      <tr
                        key={job._id}
                        className="group transition-colors hover:bg-indigo-50/30"
                      >
                        {/* Job Title */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                              {getCategoryIcon(job.category)}
                            </div>

                            <div>
                              <h3 className="font-semibold text-slate-800 transition-colors group-hover:text-indigo-600">
                                {job.title}
                              </h3>

                              <p className="mt-1 text-xs text-slate-400">
                                {job.category}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Company */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            {job.company}
                          </div>

                          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                            {job.isRemote ? (
                              <Globe className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <MapPin className="h-3.5 w-3.5" />
                            )}

                            <span>
                              {job.isRemote
                                ? `Remote · ${job.location}`
                                : job.location}
                            </span>
                          </div>
                        </td>

                        {/* Job Type */}
                        <td className="px-6 py-5">
                          <span className="inline-flex rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                            {job.jobType}
                          </span>
                        </td>

                        {/* Salary */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1.5 text-sm font-bold whitespace-nowrap text-slate-700">
                            <CircleDollarSign className="h-4 w-4 text-emerald-500" />

                            {formatSalary(
                              job.minSalary,
                              job.maxSalary,
                              job.frequency
                            )}
                          </div>
                        </td>

                        {/* Applicants */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Users className="h-4 w-4 text-indigo-500" />
                            {job.applicantsCount ?? 0}
                          </div>

                          <p className="mt-1 text-[11px] text-slate-400">
                            Candidates
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          {job.status === "Active" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                              Expired
                            </span>
                          )}
                        </td>

                        {/* Deadline */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-slate-700">
                            <CalendarDays className="h-4 w-4 text-slate-400" />
                            {formatDate(job.deadline)}
                          </div>

                          <p
                            className={`mt-1.5 text-xs font-medium ${
                              job.status === "Expired"
                                ? "text-rose-500"
                                : getRemainingDays(job.deadline) ===
                                    "Last day to apply"
                                  ? "text-amber-600"
                                  : "text-emerald-600"
                            }`}
                          >
                            {getRemainingDays(job.deadline)}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              title="Update job"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 transition-all hover:bg-indigo-100"
                            >
                              <Edit3 className="h-4 w-4" />
                              Update
                            </button>

                            <DeleteJobDialog
                              job={job}
                              onDeleted={handleJobDeleted}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredJobs.length === 0 && (
                <div className="px-5 py-16 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                    <BriefcaseBusiness className="h-7 w-7 text-indigo-500" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-800">
                    No jobs found
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Try changing your search or filter to find job listings.
                  </p>

                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setActiveFilter("All")
                    }}
                    className="mt-5 text-sm font-semibold text-indigo-600 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {/* Footer */}
              <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                <p className="text-xs text-slate-400">
                  Showing{" "}
                  <span className="font-bold text-slate-700">
                    {filteredJobs.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-700">
                    {jobs.length}
                  </span>{" "}
                  job listings
                </p>

                <button
                  onClick={() => {
                    setSearchTerm("")
                    setActiveFilter("All")
                    setSortOrder("newest")
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-indigo-600"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reset filters
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageJobsPage
