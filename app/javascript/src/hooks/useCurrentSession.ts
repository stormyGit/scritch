import { useQuery } from '@apollo/client'
import * as Sentry from '@sentry/react'
import { GET_CURRENT_USER } from '../queries/globalQueries'

export default () => {
    const { data, loading, error } = useQuery(GET_CURRENT_USER, { variables: { id: '123' } })

    if (loading || !data) return null
    if (data.user) {
        const user = data.user
        Sentry.configureScope(function (scope) {
            scope.setUser({
                id: user.id,
                username: user.telegramUsername,
                telegramId: user.telegramId,
            })
        })
    }
    return data.user
}
