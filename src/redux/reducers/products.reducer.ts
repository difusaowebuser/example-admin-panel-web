import { GET_PRODUCTS, ProductsActionTypes, ProductsState } from '../types'

const initialState: ProductsState = {
  productsList: null
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
    default:
      return state
  }
}
