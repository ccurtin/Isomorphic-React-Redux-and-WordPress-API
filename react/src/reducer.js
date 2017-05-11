import { combineReducers } from 'redux'

import { reducer as blog } from './modules/Blog'

const rootReducer = combineReducers({
  blog
})

export default rootReducer
