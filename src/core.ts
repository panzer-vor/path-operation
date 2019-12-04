import { Config, MapFn } from './types'

export class PathOperator<State> {
  state: State
  config: Config = {
    mutable: true,
    defaultPath: []
  }
  constructor(state: State, config?: Config) {
    this.state = state
    this.config = {
      ...this.config,
      ...config
    }
  }
  createPath(path: string[]) {
    const paths = [...this.config.defaultPath!, ...path]
    const pathInstance = (mapFn: MapFn) => {
      const subPathOperator = (loopObj: any, paths: string[], mapFn: MapFn): any => {
        const currentPath = paths.shift() as string
        const newValue = loopObj[currentPath]
        if (paths.length) {
          return {
            ...loopObj,
            [currentPath]: subPathOperator(newValue, paths, mapFn),
          }
        } else {
          return typeof mapFn === "function" ? {...loopObj, [currentPath]: mapFn(newValue)} : {...loopObj, [currentPath]: mapFn}
        }
      }
      const newObj = subPathOperator(this.state, paths, mapFn)
      this.config.mutable && (this.state = newObj)
      return newObj
    }
    pathInstance.getValue = this.getPathValue(path)
    return pathInstance
  }
  getPathValue(path: string[]) {
    return () => {
      const paths = [...this.config.defaultPath!, ...path]
      const subPathOperator = (loopObj: any, paths: string[]): any => {
        const currentPath = paths.shift() as string
        const newValue = loopObj[currentPath] 
        if (paths.length) {
          return subPathOperator(newValue, paths)
        } else {
          return newValue
        }
      }
      return subPathOperator(this.state, paths)
    }
  }
}

