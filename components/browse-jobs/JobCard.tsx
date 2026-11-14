
import Link from "next/link"
import type { ElementType, ReactNode } from "react"
import {
  Bookmark,
  Briefcase,
  CircleDollarSign,
  Globe2,
  MapPin,
} from "lucide-react"

import type { JobDataType } from "@/app/types/jobdata.types"
import { formatSalaryRange } from "@/lib/format"

type JobCardProps = {
  job: JobDataType
}

const getCompanyInitials = (company: string) =>
  company
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "?"

const JobBadge = ({
  icon: Icon,
  children,
}: {
  icon: ElementType
  children: ReactNode
}) => (
  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-300">
    <Icon aria-hidden="true" className="size-3.5 text-zinc-500" />
    {children}
  </span>
)

const JobCard = ({ job }: JobCardProps) => {
  const isRemoteLabelRedundant = job.location
    .toLowerCase()
    .includes("remote")

  const location = [
    job.location,
    job.isRemote && !isRemoteLabelRedundant ? "(Remote)" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className="flex gap-3 rounded-2xl border border-white/[0.08] bg-[#0d0d11] p-4 transition-colors hover:border-white/15 sm:gap-4 sm:p-5">
      <Link
        href={`/browse-jobs/${job._id}`}
        className="group flex min-w-0 flex-1 gap-4 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
      >
        <div
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm font-bold text-indigo-300 sm:size-14"
        >
          {getCompanyInitials(job.company)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white transition-colors group-hover:text-indigo-300 sm:text-lg">
              {job.title.trim()}
            </h3>

            <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-zinc-500 sm:text-sm">
              <span className="truncate font-medium text-zinc-400">
                {job.company.trim()}
              </span>

              {location && (
                <>
                  <span aria-hidden="true">•</span>

                  <span className="flex items-center gap-1">
                    <MapPin
                      aria-hidden="true"
                      className="size-3.5 shrink-0"
                    />
                    {location}
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <JobBadge icon={CircleDollarSign}>
              {formatSalaryRange(
                job.minSalary,
                job.maxSalary,
                job.frequency
              )}
            </JobBadge>

            <JobBadge icon={Briefcase}>
              {job.jobType}
            </JobBadge>

            {job.isRemote && (
              <JobBadge icon={Globe2}>Remote</JobBadge>
            )}
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={`Save ${job.title}`}
        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:outline-none"
      >
        <Bookmark aria-hidden="true" className="size-4" />
      </button>
    </article>
  )
}

export default JobCard
