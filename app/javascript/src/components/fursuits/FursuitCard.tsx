import * as React from 'react'
import { Fursuit } from '../../types'
import DefaultFursuitAvatar from '../../assets/FursuitPlaceholder.jpg'
import { H5 } from '../../../wombat-ui'

type FursuitCardProps = {
    fursuit: Fursuit
    onClick?: (e: any) => VoidFunction
}

export const FursuitCard: React.FC<FursuitCardProps> = ({ fursuit, onClick }) => {
    return (
        <div
            className='text-center border-2 border-gray-900 rounded cursor-pointer hover:bg-gray-700'
            onClick={onClick}
        >
            <img src={DefaultFursuitAvatar} />
            <H5 className='pb-2'>{fursuit.name}</H5>
        </div>
    )
}
