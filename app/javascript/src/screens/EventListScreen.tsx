import * as React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../wombat-ui/Button'
import EventListHeaderIcon from '../assets/EventListScreenHeaderIcon.png'
import { EventCard } from '../components/events/EventCard'
import ScreenContainer from '../components/ScreenContainer'
import ScreenHeader from '../components/ScreenHeader'
import { ErrorDisplay } from '../components/utils/ErrorDisplay'
import ScritchProgress from '../components/utils/ScritchProgress'
import useGetEvents from '../hooks/useGetEvents'
import useTranslations from '../hooks/useTranslations'
import { Event } from '../types'

const defaultFilters = {}

export const EventListScreen: React.FC = () => {
    const [filtersModal, setFiltersModal] = React.useState(false)
    const [filters, setFilters] = React.useState(defaultFilters)
    const [pageData, setPageData] = React.useState({ offset: 0, limit: 24 })
    const t = useTranslations()
    const { data, loading, error } = useGetEvents({
        variables: {
            // ...filters,
            ...pageData,
        },
    })

    console.log(data?.events, error)

    const events = data?.events?.nodes

    const filtersButton = (
        <Button key='filtersAction' onClick={() => setFiltersModal(true)} variant='subtle'>
            {t('actions.filters')}
        </Button>
    )
    const actions = [filtersButton]

    return (
        <>
            <ScreenHeader
                image={EventListHeaderIcon}
                title={t('events.title') as string}
                description={t('events.description') as string}
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
                {events && (
                    <div className='flex flex-wrap'>
                        {events.map((event: Event) => {
                            return (
                                <div className='w-1/6 px-3 py-3' key={event.id}>
                                    <Link to={`/events/${event.slug}`}>
                                        <EventCard event={event} />
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
