import { combineReducers } from 'redux'

// import { accessReducer } from './access.reducer'
import { productsReducer } from './products.reducer'

export const rootReducer = combineReducers({
  // access: accessReducer,
  products: productsReducer
})
