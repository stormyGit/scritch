export type Maybe<T> = T | null

export interface BaseType {}

export interface Fursuit extends BaseType {
    id: string
    slug: string
    name: string
    creationYear: number
    avatar: string
    /* makers type */
    makers: any
    isHybrid: boolean
    /* species type */
    species: any
}

export interface Maker extends BaseType {
    id: string
    slug: string
    name: string
    country: string
    avatar: string
}
