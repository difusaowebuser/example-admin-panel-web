import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  ProductData,
  ProductsActionTypes,
  GET_PRODUCTS,
  DELETE_PRODUCTS
} from '../types'
import { productsService } from '../../services'
import { RootState } from '../store'

const getProductsSuccess: ActionCreator<ProductsActionTypes> = (
  success: ProductData[]
) => {
  return { type: GET_PRODUCTS, payload: success }
}
const getProductsFailure: ActionCreator<ProductsActionTypes> = () => {
  return { type: GET_PRODUCTS, payload: null }
}

const deleteProductsSuccess: ActionCreator<ProductsActionTypes> = () => {
  return { type: DELETE_PRODUCTS, payload: true }
}
const deleteProductsFailure: ActionCreator<ProductsActionTypes> = () => {
  return { type: DELETE_PRODUCTS, payload: null }
}

export function getProducts() {
  return async dispatch => {
    try {
      const { data } = await productsService.getProducts()
      dispatch(getProductsSuccess(data?.success))
    } catch (err) {
      console.log(err)
      getProductsFailure()
    }
  }
}

export function deleteProducts(ids: number[]) {
  return async dispatch => {
    try {
      console.log('ids')
      console.log(ids)
      const { data } = await productsService.deleteProducts(ids)
      console.log(data)
      dispatch(deleteProductsSuccess())
    } catch (err) {
      console.log(err)
      deleteProductsFailure()
    }
  }
}
