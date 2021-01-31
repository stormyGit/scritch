import * as React from 'react'
import { H3 } from '../../../wombat-ui'
import errorImage from '../../assets/errorImage.png'

type ErrorDisplayProps = {
    message?: string
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
    message = [
        'Something went wrong :(',
        <br key='br' />,
        'Try reloading the page or contact us if you still have issues',
    ],
}) => {
    return (
        <div className='flex flex-col items-center pt-24 text-center'>
            <div className='w-72'>
                <img src={errorImage} className='w-full ' />
            </div>
            <div className='pt-12'>
                <H3>{message}</H3>
            </div>
        </div>
    )
}
