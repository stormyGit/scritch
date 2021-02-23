import { Fursuit, Maker, Event, Medium } from "."

export type Edge<T> = {
  /**
   * A cursor for use in pagination
   */
  cursor: string
  /**
   * The item at the end of the edge.
   */
  node: T | null
}

export type PageInfo = {
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null
}

export type Connection<T> = {
  edges: Edge<T>[]
  nodes: T[]
  pageInfo: PageInfo
  totalCount: number
}

export type PaginatedVariables = {
  limit: number
  offset: number
  /**
   * Returns the elements in the list that come after the specified cursor.
   */
  after?: string
  /**
   * Returns the elements in the list that come before the specified cursor.
   */
  before?: string
  /**
   * Returns the first n elements from the list.
   */
  first?: number
  /**
   * Returns the last n elements from the list.
   */
  last?: number
}

export type SearchableVariables = {
  q?: string
}

export type TimestampFilterableVariables = {
  createdAfter?: string
  createdAfterIncluding?: string
  createdBefore?: string
  createdBeforeIncluding?: string
  updatedAfter?: string
  updatedAfterIncluding?: string
  updatedBefore?: string
  updatedBeforeIncluding?: string
}

export type FursuitQuery = Fursuit
export type FursuitQueryVariables = { id: string }

export type FursuitsQuery = Connection<Fursuit>
export type FursuitsQueryVariables = {
  name?: string[]
  speciesIds?: string[]
  hybridSearch?: boolean
  isModerator?: boolean
  uuid?: string
  filter?: string
  fursuitLegType?: string
  fursuitStyle?: string
  fursuitBuild?: string
  fursuitPadding?: string
  fursuitFinger?: string
  fursuitGender?: string
  fursuitColor?: string
  fursuitEyes?: string
  maker?: string
  exclude?: string
  userId?: string
} & PaginatedVariables &
  TimestampFilterableVariables

export type MakerQuery = Maker
export type MakerQueryVariables = { id: string }

export type MakersQuery = Connection<Maker>
export type MakersQueryVariables = {
  name?: string[]
  country?: string[]
  region?: string[]
} & PaginatedVariables &
  TimestampFilterableVariables

export type EventQuery = Maker
export type EventQueryVariables = { id: string }

export type EventsQuery = Connection<Event>
export type EventsQueryVariables = {
  name?: string[]
  country?: string[]
} & PaginatedVariables &
  TimestampFilterableVariables

export type MediaQuery = Maker
export type MediaQueryVariables = { id: string }

export type MediasQuery = Connection<Medium>
export type MediasQueryVariables = {
  name?: string[]
  country?: string[]
} & PaginatedVariables &
  TimestampFilterableVariables
