export type Maybe<T> = T | null

export interface BaseType {}

export interface Fursuit extends BaseType {
    id: string
    name: string
    slug: string
    creationYear: number
    avatar: string
    /* makers type */
    makers: any
    isHybrid: boolean
    /* species type */
    species: any
}
