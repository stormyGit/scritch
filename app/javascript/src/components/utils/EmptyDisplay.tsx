import * as React from 'react'
import { H3 } from '../../../wombat-ui'
// EMPTY DISPLAY IMAGE
import errorImage from '../../assets/errorImage.png'

type EmptyDisplayProps = {
    message?: string
}

export const EmptyDisplay: React.FC<EmptyDisplayProps> = ({
    message = [
        'Nothing to show here :o',
        <br key='br' />,
        'Try changing some filters to get more results',
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
