import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import { ProductData, ProductsActionTypes, GET_PRODUCTS } from '../types'
import { productsService } from '../../services'
import { RootState } from '../store'

const getProductsSuccess: ActionCreator<ProductsActionTypes> = (
  success: ProductData[]
) => {
  return { type: GET_PRODUCTS, payload: success }
}

export function getProducts() {
  return async dispatch => {
    try {
      console.log('getProducts')
      const { data } = await productsService.getProducts()

      dispatch(getProductsSuccess(data?.success))
    } catch (err) {
      console.log(err)
    }
  }
}
