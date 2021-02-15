import * as React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../wombat-ui/Button'
import MakerListHeaderIcon from '../assets/MakerListScreenHeaderIcon.png'
import { MakerCard } from '../components/makers/MakerCard'
import ScreenContainer from '../components/ScreenContainer'
import ScreenHeader from '../components/ScreenHeader'
import { ErrorDisplay } from '../components/utils/ErrorDisplay'
import ScritchProgress from '../components/utils/ScritchProgress'
import useGetMakers from '../hooks/useGetMakers'
import useTranslations from '../hooks/useTranslations'
import { Maker } from '../types'

const defaultFilters = {}

export const MakerListScreen: React.FC = () => {
    const [filtersModal, setFiltersModal] = React.useState(false)
    const [filters, setFilters] = React.useState(defaultFilters)
    const [pageData, setPageData] = React.useState({ offset: 0, limit: 24 })
    const t = useTranslations()
    const { data, loading, error } = useGetMakers({
        variables: {
            // ...filters,
            ...pageData,
        },
    })

    console.log(data?.makers, error)

    const makers = data?.makers?.nodes

    const filtersButton = (
        <Button key='filtersAction' onClick={() => setFiltersModal(true)} variant='subtle'>
            {t('actions.filters')}
        </Button>
    )
    const actions = [filtersButton]

    return (
        <>
            <ScreenHeader
                image={MakerListHeaderIcon}
                title={t('makers.title') as string}
                description={t('makers.description') as string}
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
                {makers && (
                    <div className='flex flex-wrap'>
                        {makers.map((maker: Maker) => {
                            return (
                                <div className='w-1/6 px-3 py-3' key={maker.id}>
                                    <Link to={`/makers/${maker.slug}`}>
                                        <MakerCard maker={maker} />
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
