import { combineReducers } from 'redux'

const reducers = asyncReducers => combineReducers({
  ...asyncReducers
})

export default reducers
