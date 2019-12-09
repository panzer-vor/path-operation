import { Config, MapFn } from './types'
import { PathCache, mergePath } from './tools'

const defaultConfig = {
  mutable: true,
  defaultPath: [],
  pathMap: null
}

export const PathOperator = <State>(obj: State, config?: Config) => {
  let state = obj
  const pathCache: any = new PathCache()

  const mergeConfig = {
    ...defaultConfig,
    ...config,
  }

  const getPathValue = (path: string[]) => {
    return () => {
      const paths = [...mergeConfig.defaultPath!, ...path]
      let pathValue = pathCache.get(path)
      if (typeof pathValue !== 'undefined') {
        return pathValue
      }

      const subPathOperator = (loopObj: any, paths: string[]): any => {
        const [mapPath, newValue] = mergePath(paths, loopObj, mergeConfig.pathMap)
        if (mapPath.length) {
          return subPathOperator(newValue, mapPath)
        } else {
          return newValue
        }
      }
      pathValue = subPathOperator(state, paths)
      pathCache.set(path, pathValue)
      return pathValue
    }
  }
  const createPath = (path: string[]) => {
    const paths = [...mergeConfig.defaultPath!, ...path]
    const pathOperator = (mapFn: MapFn) => {
      const subPathOperator = (loopObj: any, paths: string[], mapFn: MapFn): any => {
        const [mapPath, newValue, currentPath] = mergePath(paths, loopObj, mergeConfig.pathMap)
        if (mapPath.length) {
          return {
            ...loopObj,
            [currentPath]: subPathOperator(newValue, mapPath, mapFn),
          }
        } else {
          const val = typeof mapFn === 'function' ? mapFn(newValue) : mapFn
          pathCache.set(path, val)
          return {
            ...loopObj,
            [currentPath]: val
          }
        }
      }

      const newObj = subPathOperator(state, paths, mapFn)
      mergeConfig.mutable && (state = newObj)
      return newObj
    }
    pathOperator.getValue = getPathValue(path)
    return pathOperator
  }
  return createPath
}
