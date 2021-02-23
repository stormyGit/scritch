import gql from 'graphql-tag'
import { Fragment, Medium } from '../types'

export const MEDIUM_FRAGMENT = gql`
    fragment MediumFragment on Medium {
        id
        picture
        thumbnail
    }
`

export type MediumFragment = Fragment<Medium, {}>
