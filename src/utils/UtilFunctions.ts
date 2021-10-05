import { FunctionWithNoParamButReturn } from './main'

const generateUniqueID: FunctionWithNoParamButReturn<string> = () => {
	return '_' + Math.random().toString(36).substr(2, 9)
}

export { generateUniqueID }
