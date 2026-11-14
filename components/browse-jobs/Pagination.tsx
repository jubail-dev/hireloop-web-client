import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "cn"

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const getPageItems = (
  page: number,
  totalPages: number
): (number | "ellipsis")[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const start = Math.max(1, Math.min(page - 2, totalPages - 4))
  const end = Math.min(totalPages, start + 4)
  const pages = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  )

  return [
    ...(start > 1 ? [1, "ellipsis" as const] : []),
    ...pages,
    ...(end < totalPages ? ["ellipsis" as const, totalPages] : []),
  ]
}

const buttonClass =
  "flex size-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40"

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 pt-2"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={cn(
          buttonClass,
          "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
        )}
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
      </button>

      {getPageItems(page, totalPages).map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-sm text-zinc-600"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className={cn(
              buttonClass,
              item === page
                ? "bg-white text-black"
                : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            )}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={cn(
          buttonClass,
          "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
        )}
      >
        <ChevronRight aria-hidden="true" className="size-4" />
      </button>
    </nav>
  )
}

export default Pagination
