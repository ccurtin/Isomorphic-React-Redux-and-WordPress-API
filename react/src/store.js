import { compose, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducer'

const composedStore = compose(
  applyMiddleware(thunk),
  __CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const configureStore = (initialState: ?Object) => {
  /*
    - ./reducer.js contains the root reducer that holds the keys below
    - using the initialState here is completely optional but will take precedence
        over reducer defined states. You should be defining the state(s) if your reducers(redux.js files)
  */
  if (!initialState) {
    initialState = {
      blog: {
        article: null,
        articles: []
      }
    }
  }

  const store = composedStore(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default configureStore
