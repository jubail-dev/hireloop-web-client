import { notFound } from "next/navigation"
import { getJobById } from "@/lib/api/jobs"
import { formatSalaryRange } from "@/lib/format"
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Banknote, 
  Calendar, 
  CheckCircle2, 
  Bookmark, 
  ExternalLink 
} from "lucide-react"

type JobDetailsPageProps = {
  params: Promise<{
    id: string
  }>
}

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#0f1117] px-4 py-10 text-gray-100">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Top Header Card */}
        <section className="relative overflow-hidden rounded-2xl border border-gray-800 bg-[#161922] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              {/* Company Logo / Initial Placeholder */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-indigo-600/25 border border-indigo-500/30 text-2xl font-bold text-indigo-400">
                {job.company.charAt(0)}
              </div>
              
              <div>
                <p className="text-sm font-medium text-indigo-400">{job.category}</p>
                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{job.title}</h1>
                
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <span className="font-medium text-gray-200">{job.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Verified Employer
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center justify-center rounded-xl border border-gray-700 bg-gray-800 p-3 text-gray-300 transition hover:bg-gray-700 hover:text-white"
                title="Bookmark Job"
              >
                <Bookmark className="h-5 w-5" />
              </button>
              
              <button
                type="button"
                className="flex-1 sm:flex-none rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
              >
                Apply Now
              </button>
            </div>
          </div>
        </section>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Left 2 Columns: Job Overview, Description, Responsibilities & Qualifications */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-800 bg-[#161922] p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <Banknote className="h-4 w-4 text-indigo-400" /> Salary Range
                </div>
                <p className="mt-2 text-base font-bold text-white">
                  {job.minSalary && job.maxSalary 
                    ? formatSalaryRange(job.minSalary, job.maxSalary, job.frequency)
                    : "Negotiable"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-[#161922] p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <MapPin className="h-4 w-4 text-indigo-400" /> Location
                </div>
                <p className="mt-2 text-base font-bold text-white">
                  {job.isRemote ? "Remote" : job.location}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-[#161922] p-5 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <Briefcase className="h-4 w-4 text-indigo-400" /> Job Type
                </div>
                <p className="mt-2 text-base font-bold text-white">
                  {job.jobType}
                </p>
              </div>
            </div>

            {/* Job Responsibilities */}
            <section className="rounded-2xl border border-gray-800 bg-[#161922] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">Job Responsibilities</h2>
              <div className="mt-4 leading-8 whitespace-pre-line text-gray-300">
                {job.responsibilities}
              </div>
            </section>

            {/* Qualifications / Requirements */}
            <section className="rounded-2xl border border-gray-800 bg-[#161922] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">Qualifications & Requirements</h2>
              <div className="mt-4 leading-8 whitespace-pre-line text-gray-300">
                {job.qualifications}
              </div>
            </section>

          </div>

          {/* Right Column: Company Overview & Application Deadline */}
          <div className="space-y-8">
            
            {/* Company Overview Card */}
            <section className="rounded-2xl border border-gray-800 bg-[#161922] p-6 space-y-6">
              <h2 className="text-lg font-bold text-white">Company Overview</h2>
              
              <div className="overflow-hidden rounded-xl bg-gray-900 border border-gray-800 h-40 flex items-center justify-center text-gray-500">
                <Building2 className="h-12 w-12 text-gray-600" />
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">Company Name</p>
                  <p className="mt-1 font-semibold text-white text-base">{job.company}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">Industry</p>
                  <p className="mt-1 font-semibold text-white">{job.category}</p>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Visit Website <ExternalLink className="h-4 w-4" />
              </button>
            </section>

            {/* Deadline Card */}
            <section className="rounded-2xl border border-gray-800 bg-[#161922] p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-600/20 p-3 text-indigo-400">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Application Deadline</h2>
                  <p className="mt-1 text-base font-bold text-white">
                    {new Date(job.deadline).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </section>

          </div>

        </div>
      </div>
    </main>
  )
}

export default JobDetailsPage