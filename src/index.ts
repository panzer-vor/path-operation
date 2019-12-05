import { PathOperator } from './core'
import {MapFn, Config} from './types'

const createInstance = <State>(state: State, config?: Config) => {
  const context = PathOperator(state, config)
  return (path: string[], mapFn?: MapFn | any) => {
    const pathContext = context(path)
    if (typeof mapFn === 'undefined') {
      return pathContext
    }
    return pathContext(mapFn)
  }
}

export default createInstance