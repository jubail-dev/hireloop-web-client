import type { JobDataType } from "@/app/types/jobdata.types"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000"

export const getJobs = async (query: string = ""): Promise<JobDataType[]> => {
  const response = await fetch(`${BASE_URL}/jobs?${query}`)
  return response.json()
}

export const getJobById = async (
  id: string
): Promise<JobDataType | null> => {
  const response = await fetch(`${BASE_URL}/jobs/${id}`)

  if (!response.ok) {
    return null
  }

  return response.json()
}