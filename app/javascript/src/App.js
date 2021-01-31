import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { WombatThemeProvider } from '../wombat-ui'
import apolloClient from './apolloClient'
import { AppRouter } from './routing/AppRouter'
import flatten from 'flat'
import { IntlProvider } from 'react-intl'
import English from './locales/en-US.json'
import useCurrentSession from './hooks/useCurrentSession'

const TRANSLATIONS = [{ language: 'en', translations: English }]

const LocalizedApp = () => {
    const user = useCurrentSession()

    const locale = user ? user.locale : navigator.language || 'en-US'
    const language = locale.split('-')[0]

    const translations =
        TRANSLATIONS.find((translation) => translation.language === language)?.translations ||
        English

    return (
        <IntlProvider locale={locale} messages={flatten(translations, { safe: true })}>
            <AppRouter />
        </IntlProvider>
    )
}

export const App = () => {
    return (
        <ApolloProvider client={apolloClient}>
            <LocalizedApp>
                <WombatThemeProvider>
                    <AppRouter />
                </WombatThemeProvider>
            </LocalizedApp>
        </ApolloProvider>
    )
}
