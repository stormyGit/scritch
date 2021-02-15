import * as React from "react"

interface PaginationProps {
  pageNumber: number
  totalPageCount: number
  setPage: (a: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ pageNumber, totalPageCount, setPage }) => {
  return (
    <div className="flex items-center justify-center flex-grow space-x-2">
      {[1, 2, 3, 4, 5, 6, 7].map((pageIndication) => {
        return (
          <div key={pageIndication} className={pageIndication === pageNumber ? "cursor-pointer border border-accent-400 rounded px-3 py-1.5" : "border rounded px-3 py-1.5 cursor-pointer"} onClick={() => setPage(pageIndication)}>
            <p className={pageIndication === pageNumber ? "text-accent-400 font-bold" : undefined}>{pageIndication}</p>
          </div>
        )
      })}
    </div>
  )
}
