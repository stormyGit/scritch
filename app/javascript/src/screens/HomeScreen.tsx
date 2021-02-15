import * as React from 'react'
import ScreenContainer from '../components/ScreenContainer'
import ScritchVerboseLogo from '../assets/ScritchVerboseLogo.png'
import { H1 } from '../../wombat-ui'
import useTranslations from '../hooks/useTranslations'
import Button from '../../wombat-ui/Button'

export const HomeScreen: React.FC = () => {
    const t = useTranslations()

    return (
        <ScreenContainer>
            <div className='flex justify-center'>
                <div className='max-w-6xl px-16 py-12 rounded bg-primary-900'>
                    <div className='flex items-center '>
                        <div className='max-w-sm p-12'>
                            <img src={ScritchVerboseLogo} />
                        </div>
                        <div className='max-w-xl p-12'>
                            <H1 className='pb-6 font-cute'>{t('landing.welcome')}</H1>
                            <p className='pb-6 text-lg'>{t('landing.welcomeDescription1')}</p>
                            <p className='pb-6 text-lg'>
                                {t('landing.welcomeDescription2', { br: <br /> })}
                            </p>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <Button id='newsButton' variant='subtle' className='mx-4' scale='lg'>
                            News
                        </Button>
                        <Button id='newsButton' variant='subtle' className='mx-4' scale='lg'>
                            Video
                        </Button>
                        <Button id='newsButton' variant='subtle' className='mx-4' scale='lg'>
                            About
                        </Button>
                    </div>
                </div>
            </div>
        </ScreenContainer>
    )
}
