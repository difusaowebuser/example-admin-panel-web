import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  GetProductsSuccessReturnActionInterface,
  ProductsActionTypes,
  GET_PRODUCTS
} from '../types'
import { productsService } from '../../services'
import { RootState } from '../store'

const getProductsSuccess: ActionCreator<ProductsActionTypes> = (
  success: GetProductsSuccessReturnActionInterface
) => {
  return { type: GET_PRODUCTS, payload: { success, failure: null } }
}

export function getProducts() {
  return async dispatch => {
    try {
      console.log('getProducts')
      const data = await productsService.getProducts()
      console.log(data)

      dispatch(getProductsSuccess(data))
    } catch (err) {
      console.log(err)
    }
  }
}
