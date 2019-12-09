# Redux Po
[path-operation](https://github.com/panzer-vor/path-operation) middleware for redux

# Usage
```js
npm install redux-po path-operation redux
```

# Demo
```js
import reduxPo from 'redux-po'
import {createStore, applyMiddleware} from 'redux'
  const testState = {
    app: {
      user: {
        age: 17,
      }
    },
  }
  const reducer = (state = testState, action) => {
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
    applyMiddleware(poMiddleware)
  )
  const incAction = {type: 'INCREMENT', path: ['age']}
  const decAction = {type: 'DECREMENT', path: ['age']}

  store.dispatch(incAction)   // app: {user: {age: 18}}
  store.dispatch(decAction)   // app: {user: {age: 17}}
```
use with [redux-thunk](https://github.com/reduxjs/redux-thunk)
```js
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
// ...some js code like ↑
const poMiddleware = reduxPo({defaultPath: ['app', 'user']})
const store = createStore(
  reducer,
  applyMiddleware(thunk, poMiddleware)
)
const thunkAction = () => {
  return (dispatch) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dispatch(decAction))
      }, 3000);
    })
  }
}
store.dispatch(decAction)  // 3 second after...  app: {user: {age: 16}}
```