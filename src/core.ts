import { Config, MapFn } from './types'

const defaultConfig = {
  mutable: true,
  defaultPath: []
}

export const PathOperator = <State>(obj: State, config?: Config) => {
  let state = obj
  const mergeConfig = {
    ...defaultConfig,
    ...config,
  }
  const getPathValue = (path: string[]) => {
    return () => {
      const paths = [...mergeConfig.defaultPath!, ...path]
      const subPathOperator = (loopObj: any, paths: string[]): any => {
        const currentPath = paths.shift() as string
        const newValue = loopObj[currentPath] 
        if (paths.length) {
          return subPathOperator(newValue, paths)
        } else {
          return newValue
        }
      }
      return subPathOperator(state, paths)
    }
  }
  const createPath = (path: string[]) => {
    const paths = [...mergeConfig.defaultPath!, ...path]
    const pathOperator = (mapFn: MapFn) => {
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
      const newObj = subPathOperator(state, paths, mapFn)
      mergeConfig.mutable && (state = newObj)
      return newObj
    }
    pathOperator.getValue = getPathValue(path)
    return pathOperator
  }
  return createPath
}

// export class PathOperator<State> {
//   state: State
//   config: Config = {
//     mutable: true,
//     defaultPath: []
//   }
//   constructor(state: State, config?: Config) {
//     this.state = state
//     this.config = {
//       ...this.config,
//       ...config
//     }
//   }
//   createPath(path: string[]) {
//     const paths = [...this.config.defaultPath!, ...path]
//     const pathInstance = (mapFn: MapFn) => {
//       const subPathOperator = (loopObj: any, paths: string[], mapFn: MapFn): any => {
//         const currentPath = paths.shift() as string
//         const newValue = loopObj[currentPath]
//         if (paths.length) {
//           return {
//             ...loopObj,
//             [currentPath]: subPathOperator(newValue, paths, mapFn),
//           }
//         } else {
//           return typeof mapFn === "function" ? {...loopObj, [currentPath]: mapFn(newValue)} : {...loopObj, [currentPath]: mapFn}
//         }
//       }
//       const newObj = subPathOperator(this.state, paths, mapFn)
//       this.config.mutable && (this.state = newObj)
//       return newObj
//     }
//     pathInstance.getValue = this.getPathValue(path)
//     return pathInstance
//   }
//   getPathValue(path: string[]) {
//     return () => {
//       const paths = [...this.config.defaultPath!, ...path]
//       const subPathOperator = (loopObj: any, paths: string[]): any => {
//         const currentPath = paths.shift() as string
//         const newValue = loopObj[currentPath] 
//         if (paths.length) {
//           return subPathOperator(newValue, paths)
//         } else {
//           return newValue
//         }
//       }
//       return subPathOperator(this.state, paths)
//     }
//   }
// }
