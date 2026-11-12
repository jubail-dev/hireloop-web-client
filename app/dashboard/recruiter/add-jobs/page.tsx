
"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Building2,
  MapPin,
  CalendarDays,
  Globe2,
  ArrowRight,
  ChevronDown,
  BriefcaseBusiness,
  FileText,
  Sparkles,
  CheckCircle2,
  CircleDollarSign,
  Send,
} from "lucide-react"
import { JobDataType } from "@/app/types/jobdata.types"
import { createJob } from "@/lib/actions/jobs"

const categories = [
  "Engineering & Technology",
  "Software Development",
  "Web Development",
  "Mobile App Development",
  "Data Science & Analytics",
  "Artificial Intelligence & ML",
  "UI/UX & Product Design",
  "Graphic Design & Creative",
  "Digital Marketing",
  "Marketing & Communications",
  "Sales & Business Development",
  "Product Management",
  "Project Management",
  "Human Resources",
  "Finance & Accounting",
  "Customer Support",
  "Business & Consulting",
  "Education & Training",
  "Healthcare",
  "Content Writing",
  "Other",
]

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
]

const inputClass =
  "w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"

const labelClass =
  "mb-2 block text-[13px] font-semibold text-slate-700"

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

// Section Heading
const SectionHeading = ({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string
  icon: React.ElementType
  title: string
  description: string
}) => {
  return (
    <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon size={21} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-bold tracking-widest text-indigo-500">
          STEP {number}
        </span>

        <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          {description}
        </p>
      </div>
    </div>
  )
}

export default function AddJobsPage() {
  const router = useRouter()

  const initialFormData = {
    title: "",
    company: "",
    category: "",
    jobType: "",
    isRemote: false,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    frequency: "",
    responsibilities: "",
    qualifications: "",
  }

  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle Input Change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle Form Submit
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (isSubmitting) return

    const form = e.currentTarget

    // Validate Employment Type
    if (!formData.jobType) {
      toast.error("Please select an employment type.")
      return
    }

    // Validate Salary
    if (
      formData.minSalary &&
      formData.maxSalary &&
      Number(formData.minSalary) > Number(formData.maxSalary)
    ) {
      toast.error(
        "Maximum salary must be greater than or equal to minimum salary."
      )
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare Job Data
      const jobData: JobDataType = {
        ...formData,
        minSalary: formData.minSalary
          ? Number(formData.minSalary)
          : null,
        maxSalary: formData.maxSalary
          ? Number(formData.maxSalary)
          : null,
      }

      // Create Job
      const result = await createJob(jobData)

      console.log("Create Job Result:", result)

      // Check API Response
      if (!result || result.acknowledged !== true) {
        toast.error(
          result?.message || "Failed to publish job. Please try again."
        )
        return
      }

      // Success Toast
      toast.success("Job published successfully!")

      // Redirect to Manage Jobs
      router.push("/dashboard/recruiter/manage-jobs")

    } catch (error) {
      console.error("Create Job Error:", error)

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Clear Form
  const handleClearForm = () => {
    setFormData(initialFormData)
    toast.info("Form cleared successfully.")
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Recruiter Dashboard</span>
            <span>/</span>
            <span className="text-indigo-600">Create Job</span>
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[11px] font-semibold text-indigo-600">
                <Sparkles size={13} />
                RECRUITMENT MANAGEMENT
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Create a <span className="text-indigo-600">New Job</span>
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Find your next great hire. Create a compelling job listing and
                connect with talented professionals.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              All changes are ready to publish
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* SECTION 01: BASIC INFORMATION */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_15px_rgba(15,23,42,0.025)] sm:p-7"
          >
            <SectionHeading
              number="01"
              icon={BriefcaseBusiness}
              title="Basic Information"
              description="Start with the essential details about the position."
            />

            <div className="mt-6 space-y-5">

              {/* Job Title */}
              <div>
                <label className={labelClass}>
                  Job Title <span className="text-rose-500">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Senior Frontend Developer"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Company Name */}
                <div>
                  <label className={labelClass}>
                    Company Name <span className="text-rose-500">*</span>
                  </label>

                  <div className="relative">
                    <Building2
                      size={17}
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter company name"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Job Category */}
                <div>
                  <label className={labelClass}>
                    Job Category <span className="text-rose-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>

                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Employment Type */}
              <div>
                <label className={labelClass}>
                  Employment Type <span className="text-rose-500">*</span>
                </label>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={formData.jobType === type}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          jobType: type,
                        }))
                      }}
                      className={`rounded-xl border px-3 py-3 text-xs font-semibold transition-all duration-200 ${
                        formData.jobType === type
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* SECTION 02: LOCATION & COMPENSATION */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_15px_rgba(15,23,42,0.025)] sm:p-7"
          >
            <SectionHeading
              number="02"
              icon={MapPin}
              title="Location & Compensation"
              description="Define where the role is based and what you offer."
            />

            <div className="mt-6 space-y-5">

              {/* Remote Work */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <Globe2 size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Remote Work Available
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Allow candidates to work remotely
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={formData.isRemote}
                  aria-label="Remote work available"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isRemote: !prev.isRemote,
                    }))
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    formData.isRemote
                      ? "bg-indigo-600"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                      formData.isRemote
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Job Location */}
                <div>
                  <label className={labelClass}>
                    Job Location <span className="text-rose-500">*</span>
                  </label>

                  <div className="relative">
                    <MapPin
                      size={17}
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Dhaka, Bangladesh"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Application Deadline */}
                <div>
                  <label className={labelClass}>
                    Application Deadline{" "}
                    <span className="text-rose-500">*</span>
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <CircleDollarSign size={17} className="text-indigo-600" />

                  <p className="text-sm font-semibold text-slate-800">
                    Salary & Compensation
                  </p>

                  <span className="text-[10px] text-slate-400">
                    (Optional)
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                  {/* Minimum Salary */}
                  <div>
                    <label className={labelClass}>Minimum Salary</label>

                    <input
                      type="number"
                      name="minSalary"
                      value={formData.minSalary}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="e.g. 25000"
                      className={inputClass}
                    />
                  </div>

                  {/* Maximum Salary */}
                  <div>
                    <label className={labelClass}>Maximum Salary</label>

                    <input
                      type="number"
                      name="maxSalary"
                      value={formData.maxSalary}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="e.g. 40000"
                      className={inputClass}
                    />
                  </div>

                  {/* Payment Frequency */}
                  <div>
                    <label className={labelClass}>Payment Frequency</label>

                    <div className="relative">
                      <select
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="">Select frequency</option>
                        <option value="per hour">Per Hour</option>
                        <option value="per month">Per Month</option>
                        <option value="per year">Per Year</option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-slate-400">
                  Leave salary fields empty if compensation is negotiable.
                </p>
              </div>
            </div>
          </motion.section>

          {/* SECTION 03: RESPONSIBILITIES & REQUIREMENTS */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_15px_rgba(15,23,42,0.025)] sm:p-7"
          >
            <SectionHeading
              number="03"
              icon={FileText}
              title="Responsibilities & Requirements"
              description="Help candidates understand the role and what you expect."
            />

            <div className="mt-6 space-y-5">

              {/* Responsibilities */}
              <div>
                <label className={labelClass}>
                  Key Responsibilities{" "}
                  <span className="text-rose-500">*</span>
                </label>

                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Describe the main responsibilities of this position..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-800 transition-all outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />

                <p className="mt-2 text-[11px] text-slate-400">
                  Explain the day-to-day tasks and responsibilities.
                </p>
              </div>

              {/* Qualifications */}
              <div>
                <label className={labelClass}>
                  Qualifications & Requirements{" "}
                  <span className="text-rose-500">*</span>
                </label>

                <textarea
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="List required skills, experience, education and qualifications..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-800 transition-all outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />

                <p className="mt-2 text-[11px] text-slate-400">
                  Mention technical skills, experience and educational
                  qualifications.
                </p>
              </div>
            </div>
          </motion.section>

          {/* PUBLISH SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-[0_4px_20px_rgba(79,70,229,0.04)] sm:p-7"
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Ready to publish your job?
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Review all information before publishing your job listing.
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">

                {/* Clear Form */}
                <button
                  type="button"
                  onClick={handleClearForm}
                  disabled={isSubmitting}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Clear Form
                </button>

                {/* Publish Job */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <Send size={16} />
                  {isSubmitting ? "Publishing..." : "Publish Job"}
                  {!isSubmitting && <ArrowRight size={16} />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <p className="pb-4 text-center text-[11px] text-slate-400">
            © {new Date().getFullYear()} HireLoop Network. All rights reserved.
          </p>

        </form>
      </div>
    </div>
  )
}
