import * as React from 'react'
import NavBar from '../components/NavBar'
import Sidebar from '../components/SideBar'

type ScreenBaseProps = {}

export const ScreenBase: React.FC = ({ children }) => {
    const [visibility, setVisibility] = React.useState(false)

    const handleSidebarShow = React.useCallback(() => setVisibility(true), [])
    const handleSidebarHide = React.useCallback(() => setVisibility(false), [])

    return (
        <>
            <NavBar />
            <div className='flex h-screen overflow-hidden font-sans bg-dark-900'>
                <div className='flex flex-col flex-1 w-0 overflow-hidden'>
                    <main
                        className='relative flex flex-1 overflow-y-hidden focus:outline-none'
                        tabIndex={0}
                    >
                        <div className='w-full overflow-y-auto'>{children}</div>
                    </main>
                </div>
            </div>
        </>
    )
}
