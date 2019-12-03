# Usage
- Common
```javascript
import po from 'path-operation'

const obj = {
  a: {
    b: 2,
    c: {
      d: 4
    }
  }
}

const lensObj = po(obj)

const bPath = lensObj(['a', 'b'])
const cPath = lensObj(['a', 'c'])
const dPath = lensObj(['a', 'c', 'd'])

bLens(v => v + 1) // { a: { b: 3, c: { d: 4 } } }
cLens(v => ({...v, f: 8})) // { a: { b: 3, c: { d: 4, f: 8 } } }
dLens(10) // { a: { b: 3, c: { d: 10, f: 8 } } }
```
- Redux
```javascript
const state = {
  app: {
    name: 'puppy',
    age: 18
  }
}

const lensState(state)
const lensName = lensState(['app', 'name'])
const lensAge = lensState(['app', 'age'])

// reducer
(state, {lens, payload}) => lens(payload)

dispatch({
  lens: lensName,
  payload: 'jack'
})
/**
state = {
  app: {
    name: 'jack',
    age: 18
  } 
}
*/
dispatch({
  lens: lensName,
  payload: state.app.age + 1
})
/**
state = {
  app: {
    name: 'jack',
    age: 19
  } 
}
*/
```
# API
```javascript
// type 1
<State = any>(obj: State): (paths: string[]): (mapFn: (a: any) => any | any): State
// type 2
<State = any>(obj: State): (paths: string[], mapFn: (a: any) => any | any): State
```