const curry = (fn: (...a: any[]) => any) => {
  const limit = fn.length
  return function subCurry (...args: any[]) {
    if (args.length >= limit) {
          return fn(...args)
      } else {
          return (...args2: any[]) => {
              return subCurry(...args,...args2)                                     
          }
      }
  }
}

export interface SubPathOperator {
  <State>(paths: string[], mapFn: (a: any) => any | any): State
}
export interface CurrySubPathOperator<State> {
  <State>(paths: string[]): CurrySubPathOperator2<State>
}
export interface CurrySubPathOperator2<State> {
  <State>(mapFn: (a: any) => any | any): State
}
export function pathOperator <State = any>(obj: State): CurrySubPathOperator<State>
export function pathOperator <State = any>(obj: State): SubPathOperator
export function pathOperator <State = any>(obj: State) {
  let innerObj = obj
  return curry((paths: string[], mapFn: (a: any) => any | any) => {
    if (paths.length < 1) {
      throw new Error('paths length must be over 1')
    }
    const subPathOperator = <T>(loopObj: T, paths: string[], mapFn: (a: any) => any | any): T => {
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
    const newObj = subPathOperator(innerObj, paths, mapFn)
    innerObj = newObj
    return innerObj
  })
}

export default pathOperator