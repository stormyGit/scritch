import React, { ReactNode } from 'react'

// TODO: import outside of wombat should be avoided
import { IconProps } from '../icons'
import { H2 } from '../../wombat-ui/components/Typography'

export type ScreenHeaderProps = {
    /**
     * Page header it describe the principal ressource / action presented in the page
     * @default undefined
     */
    title?: ReactNode
    /**
     * Helps to give context on what is suppose to happen on this page
     * @default undefined
     */
    description?: ReactNode
    /**
     * Use an icon if it serve the content of the page or as a reminder of the icon used to represent the main ressource of the page.
     * @default undefined
     */
    icon?: React.FC<IconProps>
    image?: string
    /**
     * Use it to define quick actions, modifying page content
     * @default []
     */
    actions?: React.ReactNode[] | React.ReactNodeArray[]
    /**
     * Use a narrow ScreenHeader layout when no sidebar is used and content is vertical (eg: reports)
     */
    narrow?: boolean
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
    icon: Icon,
    image,
    title = '',
    description = '',
    actions = [],
    narrow = false,
}) => {
    return (
        <section className='flex-grow h-40 border-b border-gray-200 bg-dark-500'>
            <div
                className={`${
                    narrow ? 'max-w-4xl' : 'max-w-6xl'
                } px-4 py-6 sm:py-12 mx-auto sm:flex md:items-center md:justify-between sm:px-6 lg:px-8`}
            >
                {Icon && (
                    <div className='items-center justify-center flex-shrink-0 hidden w-16 h-16 mr-8 rounded-full sm:w-24 sm:h-24 text-light-0 bg-dark-100 md:flex'>
                        <Icon iconClassName={`w-10 h-10`} />
                    </div>
                )}
                {image && (
                    <div className='items-center justify-center flex-shrink-0 hidden mr-20 sm:w-24 sm:h-24 md:flex'>
                        <img src={image} className={`h-32 max-w-none`} />
                    </div>
                )}
                {title && (
                    <div className='flex-1 min-w-0'>
                        <H2 className='font-cute' description={description}>
                            {title}
                        </H2>
                    </div>
                )}
                <div className='flex flex-shrink-0 mt-4 sm:mt-0 sm:ml-4 gap-x-2'>
                    {actions.map((action) => action)}
                </div>
            </div>
        </section>
    )
}

export default React.memo(ScreenHeader)
