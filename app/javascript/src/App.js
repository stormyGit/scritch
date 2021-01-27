import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { WombatThemeProvider } from '../wombat-ui'
import apolloClient from './apolloClient'
import { AppRouter } from './routing/AppRouter'

export const App = () => {
    return (
        <ApolloProvider client={apolloClient}>
            <WombatThemeProvider>
                <AppRouter />
            </WombatThemeProvider>
        </ApolloProvider>
    )
}
