import React, { useContext, useMemo, useState, useEffect } from 'react'
import { compact } from 'lodash'

import { Link, useLocation, matchPath } from 'react-router-dom'
import useTranslations from '../hooks/useTranslations'
import Avatar from './Avatar'

import {
    DashboardIcon,
    MadIcon,
    IconProps,
    BuildingIcon,
    AnalyticsIcon,
    SettingsIcon,
} from '../icons'
import useCurrentSession from '../hooks/useCurrentSession'
import Logo from '../assets/logo_medium_no_py.png'
import NotificationsIcon from '../icons/NotificationsIcon'

const ProfileLink = () => {
    // const user = useCurrentSession()?.user

    const user = null
    if (!user) return null
    return (
        <Link
            to='/profile'
            className='items-center px-4 py-4 text-light-900 focus:outline-none focus:bg-gray-100 focus:text-light-100'
        >
            <div className='flex items-center'>
                <Avatar size={8} type='user' src={user.avatar} alt={`${user.name}-avatar`} />
                <span className='ml-3 text-sm font-medium text-light-100'>{user.name}</span>
            </div>
        </Link>
    )
}

type SidebarLinkProps = {
    id: string
    to?: string
    icon: React.FC<IconProps>
    label: React.ReactNode
    items: SidebarLinkProps[]
}

const SidebarLink: React.FC<SidebarLinkProps> = React.memo(
    ({ id, to, icon: Icon, label, items = [] }) => {
        const location = useLocation()

        const isActive = (to) =>
            !!matchPath(location.pathname, { path: to, exact: true, strict: true })

        const isActiveDeep = (items) =>
            items.some(({ to, items = [] }) => isActive(to) || isActiveDeep(items))

        const [active, setActive] = useState(false)
        useEffect(() => {
            setActive(isActive(to) || isActiveDeep(items))
        }, [location.pathname, to, items])

        const className = active
            ? 'px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md'
            : 'px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white'

        return (
            <Link id={id} to={to} className={className}>
                {label}
            </Link>
        )
    }
)

type SidebarProps = { stripped: boolean; visible: boolean; onHide: () => void }

const NavBar: React.FC<SidebarProps> = ({ stripped, visible, onHide }) => {
    const session = useCurrentSession()
    const t = useTranslations()

    const user = session?.user
    const schema = useMemo(
        () =>
            compact([
                {
                    to: '/',
                    icon: MadIcon,
                    label: t('navbar.home'),
                },
                {
                    to: '/fursuits',
                    icon: MadIcon,
                    label: t('navbar.fursuits'),
                },
                {
                    to: '/makers',
                    icon: AnalyticsIcon,
                    label: t('navbar.makers'),
                },
                {
                    to: '/events',
                    icon: SettingsIcon,
                    label: t('navbar.events'),
                },
            ]).map(({ ...props }) => <SidebarLink {...props} key={`${props.label}-${props.to}`} />),
        [user]
    )

    return (
        <nav className='bg-gray-800 border-b border-gray-200'>
            <div className='px-2 mx-auto sm:px-6 lg:px-8'>
                <div className='relative flex items-center justify-between h-16'>
                    <div className='flex items-center justify-center flex-1 sm:items-stretch sm:justify-start'>
                        <div className='flex items-center flex-shrink-0'>
                            <img src={Logo} className='h-10' />
                        </div>
                        <div className='hidden sm:block sm:ml-6'>
                            <div className='flex space-x-4'>{schema}</div>
                        </div>
                    </div>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                        <button className='w-8 h-8 p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                            <NotificationsIcon iconClassName='text-light-0 w-8 h-8' />
                        </button>

                        <div className='relative ml-3'>
                            <div>
                                <button
                                    className='flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                                    id='user-menu'
                                    aria-haspopup='true'
                                >
                                    <span className='sr-only'>Open user menu</span>
                                    <img
                                        className='w-8 h-8 rounded-full'
                                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                        alt=''
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='hidden sm:hidden'>
                <div className='px-2 pt-2 pb-3 space-y-1'>
                    <a
                        href='#'
                        className='block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md'
                    >
                        Dashboard
                    </a>
                    <a
                        href='#'
                        className='block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white'
                    >
                        Team
                    </a>
                    <a
                        href='#'
                        className='block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white'
                    >
                        Projects
                    </a>
                    <a
                        href='#'
                        className='block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white'
                    >
                        Calendar
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
