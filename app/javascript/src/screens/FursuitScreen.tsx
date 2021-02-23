import * as React from "react"
import { RouteComponentProps, useHistory } from "react-router"
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
import { useQueryParams } from "../hooks/useQueryParams"
import useGetFursuit from "../hooks/useGetFursuit"
import { Badge } from "../components/utils/Badge"

const defaultFilters = {}

const dotSpacer = <p>&nbsp;·&nbsp;</p>

type FursuitScreenProps = RouteComponentProps<{ fursuitId: string }>

export const FursuitScreen: React.FC<FursuitScreenProps> = ({ match }) => {
  const t = useTranslations()
  const { data, loading, error } = useGetFursuit({
    variables: {
      id: match.params.fursuitId
    }
  })

  const fursuit = data?.fursuit
  console.log(fursuit)

  const actions = []
  let details = undefined

  if (fursuit) {
    details = (
      <div className="pt-2">
        <div className="flex pb-2 space-x-2 text-gray-300">
         <Badge label="Scritches" value="X" />
         <Badge label="Media" value="X" />
         <Badge label="Followers" value="X" />
        </div>
        <div className="flex justify-between space-x-6 text-gray-300">
          <div>{fursuit.species?.[0]?.name}</div>
          <div>
            Made by{" "}
            <Link
              className="text-accent-400"
              to={`/makers/${fursuit.makers?.[0]?.slug}`}
            >
              {fursuit.makers?.[0]?.name}
            </Link>{" "}
            in {fursuit.creationYear}
          </div>
          {fursuit.users?.length > 0 && (
            <div>
              Owned by{" "}
              <Link
                className="text-accent-400"
                to={`/users/${fursuit.users?.[0]?.slug}`}
              >
                {fursuit.users?.[0].name}
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <ScreenHeader
        image={fursuit?.avatar}
        title={fursuit?.name}
        details={details}
        actions={actions}
      />
      {/* <Button
                onClick={() => {
                    setPageData({ offset: 10, limit: 10 })
                }}
            >
                Next page
            </Button>
            <Button
                onClick={() => {
                    setPageData({ offset: 0, limit: 10 })
                }}
            >
                prev page
            </Button> */}
      <ScreenContainer>
        {loading && <ScritchProgress size={96} />}
        {error && <ErrorDisplay />}
      </ScreenContainer>
    </>
  )
}
