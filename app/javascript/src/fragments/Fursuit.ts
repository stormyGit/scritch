import gql from 'graphql-tag'
import { Fragment, Fursuit } from '../types'

export const FURSUIT_FRAGMENT = gql`
    fragment FursuitFragment on Fursuit {
        id
        name
        creationYear
        avatar
        slug
        makers {
            name
        }
        isHybrid
        species {
            id
            name
        }
    }
`

export type FursuitFragment = Fragment<Fursuit, {}>
