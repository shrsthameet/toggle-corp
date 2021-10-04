type GenericObject<T = unknown> = { [key: string]: T }

/** Generic type to allow null. */
type Nullable<T> = T | null

export type { GenericObject, Nullable }
