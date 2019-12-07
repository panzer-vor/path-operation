import reduxPo from '../src/index'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
describe('redux path-opreation testing', () => {
  const testState = {
    app: {
      user: {
        age: 17,
      }
    },
  }
  const reducer = (state = testState, action: any) => {
    switch(action.type) {
      case 'INCREMENT':
        return action.path(action.value + 1)
      case 'DECREMENT':
        return action.path(action.value - 1)
      default:
        return state
    }
  }
  const poMiddleware = reduxPo({defaultPath: ['app', 'user']})
  const store = createStore(
    reducer,
    applyMiddleware(thunk, poMiddleware)
  )
  const incAction = {type: 'INCREMENT', path: ['age']}
  const decAction = {type: 'DECREMENT', path: ['age']}
  const thunkAction = () => {
    return (dispatch: any) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(dispatch(decAction))
        }, 1000);
      })
    }
  }

  test('age change', () => {
    store.dispatch(incAction)
    expect(store.getState()).toEqual({
      app: {
        user: {
          age: 18,
        }
      },
    })
    store.dispatch(decAction)
    expect(store.getState()).toEqual({
      app: {
        user: {
          age: 17,
        }
      },
    })
  })
  test('should sync change age', done => {
    store.dispatch(thunkAction())
    setTimeout(() => {
      expect(store.getState()).toEqual({
        app: {
          user: {
            age: 16,
          }
        },
      })
      done()
    }, 1000)
 })
})
