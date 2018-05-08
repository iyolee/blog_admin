import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { reducers } from '../reducers/reducers'

const middleware = [thunkMiddleware]

const storeEnhancers = compose(
  applyMiddleware(...middleware),
  window && window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(reducers, {}, storeEnhancers)

export default store
