import * as React from "react"
import { Link } from "react-router-dom"
import { StringParam, useQueryParam } from "use-query-params"
import Button from "../../wombat-ui/Button"
import MakerListHeaderIcon from "../assets/MakerListScreenHeaderIcon.png"
import { MakerCard } from "../components/makers/MakerCard"
import { Pagination } from "../components/pagination/Pagination"
import ScreenContainer from "../components/ScreenContainer"
import ScreenHeader from "../components/ScreenHeader"
import { ErrorDisplay } from "../components/utils/ErrorDisplay"
import ScritchProgress from "../components/utils/ScritchProgress"
import useGetMakers from "../hooks/useGetMakers"
import useTranslations from "../hooks/useTranslations"
import { Maker } from "../types"

const defaultFilters = {}

export const MakerListScreen: React.FC = () => {
  const [page, setPage] = useQueryParam("page", StringParam)
  const [filtersModal, setFiltersModal] = React.useState(false)
  const [filters, setFilters] = React.useState(defaultFilters)
  const [pageData, setPageData] = React.useState({
    offset: ((parseInt(page) || 0) - 1) * 24,
    limit: 24
  })
  const t = useTranslations()
  const { data, loading, error } = useGetMakers({
    variables: {
      // ...filters,
      ...pageData
    }
  })

  const makers = data?.makers?.nodes

  React.useEffect(() => {
    setPageData({ offset: ((parseInt(page) - 1 || 0)) * 24, limit: 24 })
  }, [page])
  const fursuits = data?.makers?.nodes

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
        image={MakerListHeaderIcon}
        title={t("makers.title") as string}
        description={t("makers.description") as string}
        actions={actions}
      />
      <ScreenContainer>
        {loading && <ScritchProgress size={96} />}
        {error && <ErrorDisplay />}
        {makers && (
          <>
            <Pagination
              pageNumber={data?.makers.pageNumber}
              totalPageCount={data?.makers.totalPageCount}
              totalCount={data?.makers.totalCount}
              setPage={setPage}
            />
            <div className="flex flex-wrap">
              {makers.map((maker: Maker) => {
                return (
                  <div className="w-1/6 px-3 py-3" key={maker.id}>
                    <Link to={`/makers/${maker.slug}`}>
                      <MakerCard maker={maker} />
                    </Link>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </ScreenContainer>
    </>
  )
}
