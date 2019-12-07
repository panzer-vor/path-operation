import Po from '../src/index'
import { PathStaticInterface} from '../src/types'
describe('path-operation testing', () => {
  const testState = {
    app: {
      user: {
        name: 'jack',
        age: 17,
      }
    },
  }
  
  test('should change user age & name & path state is mutable', () => {
    const path = Po(testState)

    const pathAge: PathStaticInterface = path(['app', 'user', 'age'])
    const pathName: PathStaticInterface = path(['app', 'user', 'name'])
    expect(pathAge(18)).toEqual({
      app: {
        user: {
          name: 'jack',
          age: 18,
        }
      }
    })
    expect(pathName('jessie')).toEqual({
      app: {
        user: {
          name: 'jessie',
          age: 18,
        }
      }
    })
  })
  test('should get path value', () => {
    const path = Po(testState)
    const pathAge: PathStaticInterface = path(['app', 'user', 'age'])
    expect(pathAge.getValue()).toEqual(17)
  })
  test('should set default path and let state immutable (use config)', () => {
    const path = Po(testState, {mutable: false, defaultPath: ['app', 'user']})
    const pathAge: PathStaticInterface = path(['age'])
    const pathName: PathStaticInterface = path(['name'])
    pathAge(18)
    expect(pathName('jessie')).toEqual({
      app: {
        user: {
          name: 'jessie',
          age: 17,
        }
      }
    })
  })
  test('should map value to path', () => {
    const path = Po(testState, {mutable: false, defaultPath: ['app', 'user']})
    const pathAge: PathStaticInterface = path(['age'])
    expect(pathAge((v: number) => v + 1)).toEqual({
      app: {
        user: {
          name: 'jack',
          age: 18,
        }
      }
    })
  })
  test('path arguments set paths and mapFn at the same time', () => {
    const path = Po(testState, {mutable: false, defaultPath: ['app', 'user']})
    expect(path(['age'], 18)).toEqual({
      app: {
        user: {
          name: 'jack',
          age: 18,
        }
      }
    })
  })
  test('should set path map(use config', () => {
    const path = Po(testState, {
      mutable: false, 
      defaultPath: ['app'], 
      pathMap: {
        userAge: ['user', 'age'],
        userName: ['user', 'name'],
      },
    })
    const pathAge: PathStaticInterface = path(['userAge'])
    const pathName: PathStaticInterface = path(['userName'])
    expect(pathAge((v: number) => v + 1)).toEqual({
      app: {
        user: {
          name: 'jack',
          age: 18,
        }
      }
    })
    expect(pathName(pathName.getValue() + 'er')).toEqual({
      app: {
        user: {
          name: 'jacker',
          age: 17,
        }
      }
    })
  })
})