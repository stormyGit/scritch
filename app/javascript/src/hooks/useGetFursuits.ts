import gql from 'graphql-tag'
import { QueryHookOptions, useQuery } from '@apollo/client'

import { FursuitFragment, FURSUIT_FRAGMENT } from '../fragments'
import { FursuitsQueryVariables } from '../types'

export const LOAD_FURSUITS = gql`
    query Fursuits {
        fursuits {
            nodes {
                ...FursuitFragment
            }
        }
    }
    ${FURSUIT_FRAGMENT}
`
export type FursuitsData = { fursuits: { nodes: FursuitFragment[] } }

export default (options?: QueryHookOptions<FursuitsData, FursuitsQueryVariables>) => {
    return useQuery<FursuitsData, FursuitsQueryVariables>(LOAD_FURSUITS, options)
}
