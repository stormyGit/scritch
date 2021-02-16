import * as React from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import Button from "../../wombat-ui/Button"
import FursuitListHeaderIcon from "../assets/FursuitListScreenHeaderIcon.png"
import { FursuitCard } from "../components/fursuits/FursuitCard"
import ScreenContainer from "../components/ScreenContainer"
import ScreenHeader from "../components/ScreenHeader"
import { ErrorDisplay } from "../components/utils/ErrorDisplay"
import ScritchProgress from "../components/utils/ScritchProgress"
import useGetFursuits from "../hooks/useGetFursuits"
import useTranslations from "../hooks/useTranslations"
import { Fursuit } from "../types"
import { StringParam, useQueryParam } from "use-query-params"
import { Pagination } from "../components/pagination/Pagination"
import { PAGE_SIZE } from "../components/pagination/consts"

const defaultFilters = {}

export const FursuitListScreen: React.FC = () => {
  const [page, setPage] = useQueryParam("page", StringParam)
  const [filtersModal, setFiltersModal] = React.useState(false)
  const [filters, setFilters] = React.useState(defaultFilters)
  const [pageData, setPageData] = React.useState({
    offset: ((page ? parseInt(page) -1  : 0)) * PAGE_SIZE,
    limit: PAGE_SIZE
  })
  const t = useTranslations()

  const { data, loading, error } = useGetFursuits({
    variables: {
      ...filters,
      ...pageData
    }
  })

  React.useEffect(() => {
    setPageData({ offset: ((page ? parseInt(page) - 1 : 0)) * PAGE_SIZE, limit: PAGE_SIZE })
  }, [page])
  const fursuits = data?.fursuits?.nodes

  React.useEffect(() => {
      if (parseInt(page) > data?.fursuits?.totalPageCount)
        setPage(String(data?.fursuits?.totalPageCount))
  }, [fursuits])
  
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
        image={FursuitListHeaderIcon}
        title={t("fursuits.title") as string}
        description={t("fursuits.description") as string}
        actions={actions}
      />
      <ScreenContainer>
        {loading && <ScritchProgress size={96} />}
        {error && <ErrorDisplay />}
        {fursuits && (
          <>
            <Pagination
              pageNumber={data?.fursuits.pageNumber}
              totalPageCount={data?.fursuits.totalPageCount}
              totalCount={data?.fursuits.totalCount}
              setPage={setPage}
            />
            <div className="flex flex-wrap">
              {fursuits.map((fursuit: Fursuit) => {
                return (
                  <div className="w-1/6 px-3 py-3" key={fursuit.id}>
                    <Link to={`/fursuits/${fursuit.slug}`}>
                      <FursuitCard fursuit={fursuit} />
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
