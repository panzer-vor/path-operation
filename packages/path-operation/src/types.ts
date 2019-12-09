export interface Config {
  mutable?: boolean
  defaultPath?: string[]
  pathMap?: PathMap
}

export interface PathMap {
  [mapKey: string]: string[]
}

export interface MapFn {
  <T, U>(fn: (x: T) => U): U;
}

export interface PathInterface {
  (mapFn: MapFn | any): any
}

export interface PathStaticInterface extends PathInterface {
  getValue<T = any>(): T
}

export interface PathOperatorInterface<State> {
  state: State
  config: Config
  createPath(path: string): PathStaticInterface
  getPathValue<T>(path: string): () => T
}
