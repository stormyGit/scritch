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
            !!matchPath(location.pathname, { path: to, exact: false, strict: false })

        const isActiveDeep = (items) =>
            items.some(({ to, items = [] }) => isActive(to) || isActiveDeep(items))

        const [active, setActive] = useState(false)
        useEffect(() => {
            setActive(isActive(to) || isActiveDeep(items))
        }, [location.pathname, to, items])

        const activeClassNames =
            'text-light-300 font-cute group-hover:text-light-300 group-hover:bg-dark-900 group-focus:text-light-300 group-focus:bg-dark-100'
        const idleClassNames =
            'text-light-500 font-cute group-hover:text-light-300 group-hover:bg-dark-100 group-focus:text-light-500 group-focus:bg-dark-100'

        const activeIconClassNames = 'text-primary-500'
        const idleIconClassNames = 'text-light-700'

        const labelNode = (
            <div
                className={`flex flex-grow items-center px-3 py-3 rounded-lg ${
                    active ? activeClassNames : idleClassNames
                }`}
            >
                {Icon ? (
                    <Icon
                        iconClassName={`w-6 h-6 mr-4 ${
                            active ? activeIconClassNames : idleIconClassNames
                        } transition duration-150 ease-in-out`}
                    />
                ) : (
                    <div className='w-6 h-6 mr-4' />
                )}
                {label}
            </div>
        )

        if (to) {
            return (
                <Link
                    id={id}
                    to={to}
                    className={`w-full flex items-center px-2 border-r-4 border-transparent text-base md:text-sm font-medium leading-6 hover:no-underline ${
                        active ? 'border-light-500' : ''
                    } transition my-1 duration-150 ease-in-out group focus:outline-none`}
                >
                    {labelNode}
                </Link>
            )
        }

        if (items.length === 0) {
            return null
        }

        return (
            <>
                <button
                    className={`w-full flex items-center px-2 border-r-2 border-transparent text-base md:text-sm font-medium leading-6 hover:no-underline transition my-1 duration-150 ease-in-out group focus:outline-none`}
                    onClick={() => setActive((active) => !active)}
                >
                    {labelNode}
                </button>
                <div className={!active ? 'hidden' : ''}>
                    {items.map(({ ...props }) => (
                        <SidebarLink {...props} key={`${props.id}-${props.to}`} />
                    ))}
                </div>
            </>
        )
    }
)

type SidebarProps = { stripped: boolean; visible: boolean; onHide: () => void }

const Sidebar: React.FC<SidebarProps> = ({ stripped, visible, onHide }) => {
    const session = useCurrentSession()
    const t = useTranslations()

    const user = session?.user
    return null
    const schema = useMemo(
        () =>
            compact([
                {
                    label: t('sidebar.item1'),
                    icon: BuildingIcon,
                    items: compact([
                        {
                            to: '/users',
                            label: t('sidebar.nestedItem2'),
                        },
                        {
                            to: '/hosting-structures',
                            label: t('sidebar.nestedItem3'),
                        },
                        {
                            to: '/templates',
                            label: t('sidebar.nestedItem4'),
                        },
                        {
                            to: '/contracts/templates',
                            label: t('sidebar.nestedItem5'),
                        },
                    ]),
                },
                {
                    to: '/mads',
                    icon: MadIcon,
                    label: t('sidebar.item6'),
                },
                {
                    to: '/statistics',
                    icon: AnalyticsIcon,
                    label: t('sidebar.item7'),
                },
                {
                    to: '/company',
                    icon: SettingsIcon,
                    label: t('sidebar.item8'),
                },
            ]).map(({ ...props }) => <SidebarLink {...props} key={`${props.label}-${props.to}`} />),
        [user]
    )

    const footerLinks = useMemo(
        () => [
            {
                label: t('footer.about'),
                to: { pathname: 'https://www.mooveo.co/societe/' },
            },
            {
                label: t('footer.blog'),
                to: { pathname: 'https://www.mooveo.co/blog/' },
            },
            {
                label: t('footer.privacyPolicy'),
                to: '/privacy-policy',
            },
            {
                label: t('footer.termsOfSale'),
                to: '/terms-of-sale',
            },
            {
                label: t('footer.termsAndConditions'),
                to: '/terms-and-conditions',
            },
            {
                label: 'Twitter',
                to: { pathname: 'https://twitter.com/MooveoC' },
            },
            {
                label: 'Facebook',
                to: { pathname: 'https://www.facebook.com/Mooveo.co/' },
            },
            {
                label: 'Linkedin',
                to: { pathname: 'https://www.linkedin.com/company/mooveo-co' },
            },
        ],
        []
    )

    return (
        <>
            {/* <!-- Off-canvas menu for mobile --> */}
            <div className={`${stripped ? 'hidden' : ''} md:hidden}`}>
                <div className={`fixed inset-0 z-40 flex ${visible ? 'visible' : 'invisible'}`}>
                    <div
                        className={`fixed inset-0 transition-opacity ease-linear duration-300 ${
                            visible ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className='absolute inset-0 bg-gray-600 opacity-75'></div>
                    </div>
                    <div
                        className={`relative transition ease-in-out duration-300 transform flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-dark-500 ${
                            visible ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        <div
                            className={`absolute top-0 right-0 p-1 -mr-14 ${
                                visible ? '' : 'hidden'
                            }`}
                        >
                            <button
                                className='flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-600'
                                aria-label='Close sidebar'
                                onClick={onHide}
                            >
                                <svg
                                    className='w-6 h-6 text-white'
                                    stroke='currentColor'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className='flex items-center justify-center flex-shrink-0 px-4'>
                            <img src={Logo} className='w-1/2' />
                        </div>
                        <div className='flex-1 h-0 mt-5 overflow-y-auto'>
                            <nav className='space-y-1'>{schema}</nav>
                        </div>
                        <ProfileLink />
                    </div>
                    <div className='flex-shrink-0 w-14'></div>
                </div>
            </div>
            {/* <!-- Static sidebar for desktop --> */}
            <div className='hidden md:flex md:flex-shrink-0'>
                <div className='flex flex-col w-64'>
                    <div className='flex flex-col flex-grow pt-5 pb-4 overflow-y-auto border-r border-gray-200 bg-dark-500'>
                        <div className='flex items-center justify-center flex-shrink-0 px-4'>
                            <img src={Logo} className='w-1/2' />
                        </div>
                        <div className='flex flex-col flex-grow mt-5'>
                            <nav className='flex-1 space-y-1'>{schema}</nav>
                        </div>
                        <ProfileLink />
                        <div className='flex flex-row flex-wrap px-4 pt-4 border-t border-gray-200'>
                            {footerLinks.map(({ label, to }, index) => (
                                <span
                                    key={index}
                                    className='text-xs text-light-900 whitespace-nowrap'
                                >
                                    <Link to={to} target='_blank'>
                                        {label}
                                    </Link>
                                    {index < footerLinks.length - 1 && (
                                        <span className='px-2'>{`·`}</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
