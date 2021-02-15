import gql from "graphql-tag"
import { QueryHookOptions, useQuery } from "@apollo/client"

import { FursuitFragment, FURSUIT_FRAGMENT } from "../fragments"
import { FursuitQueryVariables } from "../types"

export const LOAD_FURSUIT = gql`
  query Fursuit($id: ID!) {
    fursuit(id: $id) {
      ...FursuitFragment
    }
  }
  ${FURSUIT_FRAGMENT}
`
export type FursuitData = {
  fursuit: FursuitFragment
}

export default (
  options?: QueryHookOptions<FursuitData, FursuitQueryVariables>
) => {
  return useQuery<FursuitData, FursuitQueryVariables>(LOAD_FURSUIT, options)
}
