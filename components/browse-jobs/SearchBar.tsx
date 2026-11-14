import type { FormEvent } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

type SearchBarProps = {
  value: string
  onValueChange: (value: string) => void
  onSubmit: () => void
}

const SearchBar = ({ value, onValueChange, onSubmit }: SearchBarProps) => {

  const searchParams = useSearchParams()
  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  const searchFieldValue = String(formData.get("searchField") ?? "").trim()

  // Keep existing filter parameters
  const params = new URLSearchParams(searchParams.toString())

  // Update or remove search parameter
  if (searchFieldValue) {
    params.set("search", searchFieldValue)
  } else {
    params.delete("search")
  }

  const queryString = params.toString()

  router.push(
    queryString ? `/browse-jobs?${queryString}` : "/browse-jobs",
    { scroll: false }
  )

  onSubmit()
}

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="job-search" className="sr-only">
        Search jobs
      </label>

      <div className="relative flex-1">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-zinc-500"
        />

        <input
          id="job-search"
          name="searchField"
          type="search"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder="Search by job title, keywords..."
          className="h-12 w-full rounded-xl border border-white/10 bg-[#0d0d11] pr-4 pl-11 text-sm text-white transition-colors outline-none placeholder:text-zinc-500 hover:border-white/20 focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      <button
        type="submit"
        className="h-12 shrink-0 rounded-xl bg-white px-7 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:outline-none"
      >
        Search Jobs
      </button>
    </form>
  )
}

export default SearchBar
