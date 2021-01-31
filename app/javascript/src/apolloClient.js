import { ApolloClient, createHttpLink } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import Cookies from 'universal-cookie'
import { setContext } from '@apollo/client/link/context'

const cookies = new Cookies()
const httpLink = createHttpLink({
    uri: '/graphql',
})
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: `Scritch ${cookies.get('csrf-token')}`,
            'X-CSRF-Token': cookies.get('csrf-token'),
        },
    }
})

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
})

export default apolloClient
