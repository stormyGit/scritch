import gql from 'graphql-tag'
import { Fragment, Event } from '../types'

export const EVENT_FRAGMENT = gql`
    fragment EventFragment on Event {
        id
        slug
        name
        country
        avatar
    }
`

export type EventFragment = Fragment<Event, {}>
