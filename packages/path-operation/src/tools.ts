import { PathMap } from './types'

export class PathCache {
  data: {[key: string]: any} = {}

  get(key: string[]) {
    return this.data[this.getKey(key)]
  }
  set(key: string[], value: any) {
    this.data[JSON.stringify(key)] = value
  }
  getKey(key: string[]) {
    return JSON.stringify(key)
  }
}

export const mergePath = (paths: string[], obj: any, pathMap: PathMap | null): [string[], any, string] => {
  let currentPath = paths.shift() as string
  let newValue = obj[currentPath]
  let mapPath = paths
  if (typeof newValue === 'undefined' && pathMap && pathMap[currentPath]) {
    mapPath = [...paths, ...pathMap[currentPath]]
    currentPath = mapPath.shift() as string
    newValue = obj[currentPath]
  }
  return [mapPath, newValue, currentPath]
}