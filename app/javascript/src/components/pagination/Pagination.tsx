import * as React from "react"
import Button from "../../../wombat-ui/Button"
import { ChevronDownIcon } from "../../icons"
import ChevronLeftDoubleIcon from "../../icons/ChevronLeftDoubleIcon"
import ChevronLeftIcon from "../../icons/ChevronLeftIcon"
import ChevronRightDoubleIcon from "../../icons/ChevronRightDoubleIcon"
import ChevronRightIcon from "../../icons/ChevronRightIcon"
import { PAGE_SIZE } from "./consts"

interface PaginationProps {
  pageNumber: number
  totalPageCount: number
  totalCount: number
  setPage: (a: number) => void
}

function paginator(arr, perPage) {
  if (perPage < 1 || !arr) return () => []

  return function (page) {
    const basePage = page * perPage

    return page < 0 || basePage >= arr.length
      ? []
      : arr.slice(basePage, basePage + perPage)
  }
}

export const Pagination: React.FC<PaginationProps> = ({
  pageNumber,
  totalPageCount,
  totalCount,
  setPage
}) => {
  let pageArray = []
  if (totalPageCount <= 9)
    pageArray = Array.from({ length: totalPageCount }, (_, i) => i + 1)
  else {
    if (pageNumber > totalPageCount - 9)
      pageArray = Array.from({ length: 9 }, (_, i) => i + totalPageCount - 8)
    else {
      pageArray = Array.from(
        { length: 9 },
        (_, i) => i + (9 * Math.floor((pageNumber - 1) / 9) + 1)
      )
    }
  }
  return (
    <>
      <div className="flex items-center justify-center flex-grow space-x-2">
        <Button
          variant="subtle"
          disabled={pageNumber === 1}
          onClick={() => setPage(1)}
          icon={ChevronLeftDoubleIcon}
        />
        <Button
          variant="subtle"
          disabled={pageNumber === 1}
          onClick={() => setPage(pageNumber - 1)}
          icon={ChevronLeftIcon}
        />
        <div className="p-1" />
        {pageArray.map((pageIndication) => {
          return (
            <Button
              variant="subtle"
              key={pageIndication}
              className={
                pageIndication === pageNumber ? "border-accent-400" : ""
              }
              onClick={() => setPage(pageIndication)}
            >
              <p
                className={
                  pageIndication === pageNumber
                    ? "text-accent-400 font-bold"
                    : undefined
                }
              >
                {pageIndication}
              </p>
            </Button>
          )
        })}
        <div className="p-1" />
        <Button
          variant="subtle"
          disabled={pageNumber === totalPageCount}
          onClick={() => setPage(pageNumber + 1)}
          icon={ChevronRightIcon}
        />
        <Button
          variant="subtle"
          disabled={pageNumber === totalPageCount}
          onClick={() => setPage(totalPageCount)}
          icon={ChevronRightDoubleIcon}
        />
      </div>
      <div className="flex items-center justify-center flex-grow pt-2 space-x-2 ">
        <p>
          Showing items {(pageNumber - 1) * PAGE_SIZE + 1} -{" "}
          {(pageNumber - 1) * PAGE_SIZE + PAGE_SIZE > totalCount
            ? totalCount
            : (pageNumber - 1) * PAGE_SIZE + PAGE_SIZE}{" "}
          of {totalCount} total
        </p>
      </div>
    </>
  )
}
