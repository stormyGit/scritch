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
import { MediaGrid } from "./MediaGrid"

const defaultFilters = {}

export const MediaListScreen: React.FC = () => {
  const [page, setPage] = useQueryParam("page", StringParam)
  const [filtersModal, setFiltersModal] = React.useState(false)
  const [filters, setFilters] = React.useState(defaultFilters)
  const [pageData, setPageData] = React.useState({
    offset: (page ? parseInt(page) - 1 : 0) * PAGE_SIZE,
    limit: PAGE_SIZE
  })
  const t = useTranslations()

  const { data, loading, error } = useGetMedia({
    variables: {
      ...filters,
      ...pageData
    }
  })

  React.useEffect(() => {
    setPageData({
      offset: (page ? parseInt(page) - 1 : 0) * PAGE_SIZE,
      limit: PAGE_SIZE
    })
  }, [page])
  const media = data?.media?.nodes

  React.useEffect(() => {
    if (parseInt(page) > data?.media?.totalPageCount)
      setPage(String(data?.media?.totalPageCount))
  }, [media])

  const filtersButton = (
    <Button
      key="filtersAction"
      onClick={() => setFiltersModal(true)}
      variant="subtle"
    >
      {t("actions.filters")}
    </Button>
  )
  const actions = [filtersButton]

  return (
    <>
      <ScreenHeader
        image={MediaListHeaderIcon}
        title={t("media.title") as string}
        description={t("media.description") as string}
        actions={actions}
      />
      <ScreenContainer>
        {loading && <ScritchProgress size={96} />}
        {error && <ErrorDisplay />}
        {media && <MediaGrid mediaList={data?.media} pageData={pageData} />}
      </ScreenContainer>
    </>
  )
}
