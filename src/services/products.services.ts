import { AxiosResponse } from 'axios'

import { api } from './api'

export const productsService = { getProducts, deleteProducts }

async function getProducts(): Promise<AxiosResponse> {
  return await api.get('/products/list')
}

async function deleteProducts(ids: number[]): Promise<AxiosResponse> {
  return await api.get('/products/delete', { params: { product_ids: ids } })
}
