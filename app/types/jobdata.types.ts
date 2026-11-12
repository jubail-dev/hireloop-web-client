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
}
