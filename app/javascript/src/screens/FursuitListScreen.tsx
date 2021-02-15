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
    const [pageData, setPageData] = React.useState({ offset: 0, limit: 24 })
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
                title={t('fursuits.title') as string}
                description={t('fursuits.description') as string}
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
                {fursuits && (
                    <div className='flex flex-wrap'>
                        {fursuits.map((fursuit: Fursuit) => {
                            return (
                                <div className='w-1/6 px-3 py-3' key={fursuit.id}>
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
