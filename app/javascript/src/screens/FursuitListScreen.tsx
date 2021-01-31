import * as React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import FursuitListHeaderIcon from '../assets/FursuitListScreenHeaderIcon.png'
import { FursuitCard } from '../components/fursuits/FursuitCard'
import ScreenContainer from '../components/ScreenContainer'
import ScreenHeader from '../components/ScreenHeader'
import { ErrorDisplay } from '../components/utils/ErrorDisplay'
import ScritchProgress from '../components/utils/ScritchProgress'
import useGetFursuits from '../hooks/useGetFursuits'
import { Fursuit } from '../types'

export const FursuitListScreen: React.FC = () => {
    const { data, loading, error } = useGetFursuits()
    const history = useHistory()

    const fursuits = data?.fursuits?.nodes
    return (
        <>
            <ScreenHeader
                image={FursuitListHeaderIcon}
                title='Fursuits'
                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                actions={[]}
            />
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
