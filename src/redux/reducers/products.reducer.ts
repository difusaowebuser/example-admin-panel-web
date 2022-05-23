import { GET_PRODUCTS, ProductsActionTypes, ProductsState } from '../types'

const initialState: ProductsState = {
  products: null
}

export function productsReducer(
  state: ProductsState = initialState,
  action: ProductsActionTypes
): ProductsState {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload.success?.products ?? null
      }
    }
    default:
      return state
  }
}
