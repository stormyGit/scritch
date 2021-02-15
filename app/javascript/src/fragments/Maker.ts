import gql from 'graphql-tag'
import { Fragment, Maker } from '../types'

export const MAKER_FRAGMENT = gql`
    fragment MakerFragment on Maker {
        id
        slug
        name
        country
        region
        avatar
    }
`

export type MakerFragment = Fragment<Maker, {}>
