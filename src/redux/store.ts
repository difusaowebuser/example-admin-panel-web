import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import thunk from 'redux-thunk'

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = typeof store.getState