import gql from 'graphql-tag'
import { QueryHookOptions, useQuery } from '@apollo/client'

import { EventFragment, EVENT_FRAGMENT } from '../fragments'
import { EventsQueryVariables } from '../types'

export const LOAD_EVENTS = gql`
    query Events(
        $name: [String!]
        $limit: Int!
        $offset: Int!
    ) {
        events(name: $name, limit: $limit, offset: $offset) {
            nodes {
                ...EventFragment
            }
        }
    }
    ${EVENT_FRAGMENT}
`
export type EventsData = {
    events: { nodes: EventFragment[]; totalCount: number; endCursor: string }
}

export default (options?: QueryHookOptions<EventsData, EventsQueryVariables>) => {
    return useQuery<EventsData, EventsQueryVariables>(LOAD_EVENTS, options)
}
