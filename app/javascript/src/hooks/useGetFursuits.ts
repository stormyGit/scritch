import gql from 'graphql-tag'
import { QueryHookOptions, useQuery } from '@apollo/client'

import { FursuitFragment, FURSUIT_FRAGMENT } from '../fragments'
import { FursuitsQueryVariables } from '../types'

export const LOAD_FURSUITS = gql`
    query Fursuits(
        $name: [String!]
        $fursuitLegTypeId: ID
        $fursuitStyleId: ID
        $fursuitBuildId: ID
        $fursuitPaddingId: ID
        $fursuitFingerId: ID
        $fursuitGenderId: ID
        $baseColor: [String!]
        $eyesColor: [String!]
        $offset: Int
        $limit: Int
    ) {
        fursuits(
            name: $name
            fursuitLegTypeId: $fursuitLegTypeId
            fursuitStyleId: $fursuitStyleId
            fursuitBuildId: $fursuitBuildId
            fursuitPaddingId: $fursuitPaddingId
            fursuitFingerId: $fursuitFingerId
            fursuitGenderId: $fursuitGenderId
            baseColor: $baseColor
            eyesColor: $eyesColor
            offset: $offset
            limit: $limit
        ) {
            nodes {
                ...FursuitFragment
            }
            totalCount
            pageNumber
            totalPageCount
        }
    }
    ${FURSUIT_FRAGMENT}
`
export type FursuitsData = {
    fursuits: { nodes: FursuitFragment[]; totalCount: number; endCursor: string }
}

export default (options?: QueryHookOptions<FursuitsData, FursuitsQueryVariables>) => {
    return useQuery<FursuitsData, FursuitsQueryVariables>(LOAD_FURSUITS, options)
}
