import BrowseJobs from "@/components/browse-jobs/BrowseJobs"
import { getJobs } from "@/lib/api/jobs"

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      query.set(key, value)
    } else if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item))
    }
  }

  const jobs = await getJobs(query.toString())

  return <BrowseJobs jobs={jobs} />
}

export default BrowseJobsPage
