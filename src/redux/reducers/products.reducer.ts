import {
  GET_PRODUCTS,
  DELETE_PRODUCTS,
  ProductsActionTypes,
  ProductsState
} from '../types'

const initialState: ProductsState = {
  productsList: null,
  deletedProducts: null
}

export function productsReducer(
  state: ProductsState = initialState,
  action: ProductsActionTypes
): ProductsState {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        productsList: action.payload ?? null
      }
    }
    case DELETE_PRODUCTS: {
      return {
        ...state,
        deletedProducts: action.payload
      }
    }
    default:
      return state
  }
}
