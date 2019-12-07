import Po from 'path-operation'
import { Config, PathStaticInterface } from 'path-operation/lib/types'
import {
  Action,
  MiddlewareAPI,
  AnyAction,
  Dispatch
} from 'redux'

interface PoAction extends Action {
  path: string[]
}

export interface PoDispatch extends MiddlewareAPI {}

export default (config: Config) => (
  dispatch: PoDispatch,
) => (next: Dispatch<AnyAction>) => {
  const statePo = Po(dispatch.getState(), config)
  return (action: PoAction) => {
    const pathOpera: PathStaticInterface = statePo(action.path)
    const pathAction = {
      ...action,
      path: pathOpera,
      value: pathOpera.getValue()
    }
    return next(pathAction)
  }
}

