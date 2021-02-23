import gql from "graphql-tag"
import { QueryHookOptions, useQuery } from "@apollo/client"

import { MediumFragment, MEDIUM_FRAGMENT } from "../fragments"
import { MediaQueryVariables } from "../types"

export const LOAD_MEDIA = gql`
  query Media(
    $offset: Int
    $limit: Int
  ) {
    media(
      offset: $offset
      limit: $limit
    ) {
      nodes {
        ...MediumFragment
      }
      totalCount
      pageNumber
      totalPageCount
    }
  }
  ${MEDIUM_FRAGMENT}
`
export type MediaData = {
  media: {
    nodes: MediumFragment[]
    totalCount: number
    totalPageCount: number
    pageNumber: number
  }
}

export default (
  options?: QueryHookOptions<MediaData, MediaQueryVariables>
) => {
  return useQuery<MediaData, MediaQueryVariables>(LOAD_MEDIA, options)
}
