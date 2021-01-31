import * as React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../wombat-ui/Button'
import FursuitListHeaderIcon from '../assets/FursuitListScreenHeaderIcon.png'
import { FursuitCard } from '../components/fursuits/FursuitCard'
import ScreenContainer from '../components/ScreenContainer'
import ScreenHeader from '../components/ScreenHeader'
import { ErrorDisplay } from '../components/utils/ErrorDisplay'
import ScritchProgress from '../components/utils/ScritchProgress'
import useGetFursuits from '../hooks/useGetFursuits'
import useTranslations from '../hooks/useTranslations'
import { Fursuit } from '../types'
import { useQueryParams } from '../hooks/useQueryParams'

const defaultFilters = {}

export const FursuitListScreen: React.FC = () => {
    const [filtersModal, setFiltersModal] = React.useState(false)
    const [filters, setFilters] = React.useState(defaultFilters)
    const [pageData, setPageData] = React.useState({ first: 24 })
    const t = useTranslations()
    const { data, loading, error } = useGetFursuits({
        variables: {
            ...filters,
            ...pageData,
        },
    })

    console.log(data?.fursuits?.pageInfo)

    const fursuits = data?.fursuits?.nodes

    const filtersButton = (
        <Button key='filtersAction' onClick={() => setFiltersModal(true)} variant='subtle'>
            {t('actions.filters')}
        </Button>
    )
    const actions = [filtersButton]

    return (
        <>
            <ScreenHeader
                image={FursuitListHeaderIcon}
                title='Fursuits'
                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                actions={actions}
            />
            <Button
                onClick={() => {
                    setPageData({ first: 24, after: data?.fursuits?.pageInfo?.endCursor })
                }}
            >
                Next page
            </Button>
            <Button
                onClick={() => {
                    setPageData({
                        last: 24,
                        before: data?.fursuits?.pageInfo?.startCursor,
                    })
                }}
            >
                prev page
            </Button>
            <ScreenContainer>
                {loading && <ScritchProgress size={96} />}
                {error && <ErrorDisplay />}
                {fursuits && (
                    <div className='flex flex-wrap'>
                        {fursuits.map((fursuit: Fursuit) => {
                            return (
                                <div className='w-1/6 px-6 py-4' key={fursuit.id}>
                                    <Link to={`/fursuits/${fursuit.slug}`}>
                                        <FursuitCard fursuit={fursuit} />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )}
            </ScreenContainer>
        </>
    )
}
