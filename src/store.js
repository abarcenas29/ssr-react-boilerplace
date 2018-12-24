import { createStore } from 'redux'
import { applyMiddleware } from 'redux'
import createReducers from './reducers'


const createReduxStore = (initalState) => {
  const middlewares = []
  const reduxMiddlewares = applyMiddleware(...middlewares)

  const store = createStore(createReducers(), initalState)
  store.injectReducers = aysncReducers => {
    return store.replaceReducer(
      createReducers(aysncReducers)
    )
  }

  if (module.hot) {
    module.hot.accept(
      './reducers',
      () => store.replaceReducer(require('./reducers').default)
    )
  }

  return store
}


export default createReduxStore
