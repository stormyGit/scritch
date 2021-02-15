import gql from "graphql-tag"
import { MakerFragment } from "."
import { Fragment, Fursuit } from "../types"

export const FURSUIT_FRAGMENT = gql`
  fragment FursuitFragment on Fursuit {
    id
    name
    creationYear
    avatar
    slug
    makers {
      id
      name
    }
    isHybrid
    species {
      id
      name
    }
    users {
        id
        name
        slug
    }
  }
`

export type FursuitFragment = Fragment<
  Fursuit,
  Pick<
    Fursuit,
    "id" | "name" | "creationYear" | "avatar" | "slug" | "species" | "makers" | "users"
  >
>
