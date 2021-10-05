type GenericObject<T = unknown> = { [key: string]: T }

/** Generic type to allow null. */
type Nullable<T> = T | null

/** Function with single parameter returning void*/
type FunctionWithParam<T> = (p: T) => void

/** Function with no parameter returning void*/
type FunctionWithNoParam = () => void

/** Function with parameter with returning type*/
type FunctionWithNoParamButReturn<R> = () => R

export type { GenericObject, Nullable, FunctionWithParam, FunctionWithNoParam, FunctionWithNoParamButReturn }
