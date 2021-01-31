import React, { PropsWithChildren } from 'react'

type ScreenContainerProps = {
    loading?: boolean
    className?: string
    error?: React.ReactNode
    renderContext?: React.ReactNode
}

const ScreenContainer: React.FC<PropsWithChildren<ScreenContainerProps>> = ({
    renderContext = null,
    loading = false,
    error,
    className,
    children,
}) => {
    return (
        <>
            <div className='flex-grow px-24 pt-6 overflow-y-auto text-light-100'>
                <div className={`min-h-layout ${className}`}>{children}</div>
            </div>
            {renderContext && (
                <div className='flex-shrink-0 overflow-y-auto w-80'>{renderContext}</div>
            )}
        </>
    )
}

export default React.memo(ScreenContainer)
