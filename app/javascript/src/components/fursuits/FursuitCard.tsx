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
            className='relative text-center rounded cursor-pointer bg-light-300 hover:bg-gray-700'
            onClick={onClick}
        >
            {/* FIXME fursuit.avatar || Default */}
            <img src={DefaultFursuitAvatar} className='block rounded' />
            <p className='absolute bottom-0 w-full p-2 bg-dark-900 opacity-70 text-light-0'>
                {fursuit.name}
            </p>
        </div>
    )
}
