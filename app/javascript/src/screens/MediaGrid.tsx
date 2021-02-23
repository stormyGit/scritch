import * as React from "react"
import { Link } from "react-router-dom"
import { StringParam, useQueryParam } from "use-query-params"
import Button from "../../wombat-ui/Button"
import MediaListHeaderIcon from "../assets/MakerListScreenHeaderIcon.png"
import { MediumCard } from "../components/media/MediumCard"
import { PAGE_SIZE } from "../components/pagination/consts"
import { Pagination } from "../components/pagination/Pagination"
import ScreenContainer from "../components/ScreenContainer"
import ScreenHeader from "../components/ScreenHeader"
import { EmptyDisplay } from "../components/utils/EmptyDisplay"
import { ErrorDisplay } from "../components/utils/ErrorDisplay"
import ScritchProgress from "../components/utils/ScritchProgress"
import useGetMedia from "../hooks/useGetMedia"
import useTranslations from "../hooks/useTranslations"
import { Medium } from "../types"

interface MediaGridProps {
  mediaList: any
  pageData: any
}

export const MediaGrid: React.FC<MediaGridProps> = ({ mediaList }) => {
  const [page, setPage] = useQueryParam("page", StringParam)
  const [pageData, setPageData] = React.useState({
    offset: (page ? parseInt(page) - 1 : 0) * PAGE_SIZE,
    limit: PAGE_SIZE
  })
  const t = useTranslations()

  React.useEffect(() => {
    setPageData({
      offset: (page ? parseInt(page) - 1 : 0) * PAGE_SIZE,
      limit: PAGE_SIZE
    })
  }, [page])
  const media = mediaList?.nodes

  React.useEffect(() => {
    if (parseInt(page) > mediaList?.totalPageCount)
      setPage(String(mediaList?.totalPageCount))
  }, [media])

  return (
    <>
      {media.length === 0 ? (
        <EmptyDisplay />
      ) : (
        <>
          <Pagination
            pageNumber={media.pageNumber}
            totalPageCount={media.totalPageCount}
            totalCount={media.totalCount}
            setPage={setPage}
          />
          <div className="flex flex-wrap">
            {media.map((medium: Medium) => {
              return (
                <div className="w-1/6 px-3 py-3" key={medium.id}>
                  <Link to={`/pictures/${medium.id}`}>
                    <MediumCard medium={medium} />
                  </Link>
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
