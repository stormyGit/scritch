import gql from "graphql-tag"
import { QueryHookOptions, useQuery } from "@apollo/client"

import { MakerFragment, MAKER_FRAGMENT } from "../fragments"
import { MakersQueryVariables } from "../types"

export const LOAD_MAKERS = gql`
  query Makers(
    $name: [String!]
    $country: [String!]
    $region: [String!]
    $limit: Int!
    $offset: Int!
  ) {
    makers(
      name: $name
      country: $country
      region: $region
      limit: $limit
      offset: $offset
    ) {
      nodes {
        ...MakerFragment
      }
      totalCount
      pageNumber
      totalPageCount
    }
  }
  ${MAKER_FRAGMENT}
`
export type MakersData = {
  makers: {
    nodes: MakerFragment[]
    totalCount: number
    totalPageCount: number
    pageNumber: number
  }
}

export default (
  options?: QueryHookOptions<MakersData, MakersQueryVariables>
) => {
  return useQuery<MakersData, MakersQueryVariables>(LOAD_MAKERS, options)
}
