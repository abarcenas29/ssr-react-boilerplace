import { createInjectStore } from 'redux-injector'
import { applyMiddleware } from 'redux'
import reducers from './reducers'
import logger from 'redux-logger'


const createReduxStore = (initalState) => {
  const middlewares = []
  
  
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }
  
  const reduxMiddlewares = applyMiddleware(...middlewares)
  const store = createInjectStore(
    reducers,
    initalState,
    reduxMiddlewares
  )
  
  if (module.hot) {
    module.hot.accept(
      './reducers',
      () => store.replaceReducer(require('./reducers').default)
    )
  }

  return store
}


export default createReduxStore
