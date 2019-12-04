import { PathOperator } from './core'
import {MapFn, Config} from './types'

const createInstance = <State>(state: State, config?: Config) => {
  const context = new PathOperator(state, config)
  return (path: string[], mapFn?: MapFn | any) => {
    const pathContext = context.createPath(path)
    if (typeof mapFn === 'undefined') {
      return pathContext
    }
    return pathContext(mapFn)
  }
}

export default createInstance