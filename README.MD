# About Path Operation
path-operation is a tool for operating object

# Why use Path Operation
path-operation makes complex object easier to operating

# Usage
## install
```js
npm install path-operation
```

- Common Usage
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

const pathObj = po(obj)

const bPath = pathObj(['a', 'b'])
const cPath = pathObj(['a', 'c'])
const dPath = pathObj(['a', 'c', 'd'])

bPath(v => v + 1) // { a: { b: 3, c: { d: 4 } } }
cPath(v => ({...v, f: 8})) // { a: { b: 3, c: { d: 4, f: 8 } } }
dPath(10) // { a: { b: 3, c: { d: 10, f: 8 } } }
```
- Redux Usage
```javascript
const state = {
  app: {
    name: 'puppy',
    age: 18
  }
}

const pathState(state)
const pathName = pathState(['app', 'name'])
const pathAge = pathState(['app', 'age'])

// reducer
(state, {path, payload}) => path(payload)

dispatch({
  path: pathName,
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
  path: pathAge,
  payload: pathAge.getValue() + 1
})
/**
state = {
  app: {
    name: 'jack',
    age: 19
  } 
}
*/
dispatch({
  path: pathAge,
  payload: pathAge.getValue() + 1
})
/**
state = {
  app: {
    name: 'jack',
    age: 20
  } 
}
*/
```
- Redux Middleware
[redux-po](https://github.com/panzer-vor/path-operation/tree/master/packages/redux-path-operation)

# API
```javascript
// - Config default: {defaultPath: [], mutable: true}
const state = {
  app: {
    name: 'puppy',
    age: 18
  }
}
const path = Po(state, {defaultPath: ['app'], mutable: false})
// if not set default path, equal path(['app', 'age']) 👇
const pathAge = path(['age'])
// if config mutable is false, inner state is immutable
pathAge(
  pathAge.getValue() + 1 // path can use path.getValue to get path current value
)
// {...xxx, age: 19}
pathAge(pathAge.getValue() + 1) // {...xxx, age: 19}
```
# More Usage
[Test Use Case Link](https://github.com/panzer-vor/path-operation/blob/master/packages/path-operation/test/index.spec.ts)