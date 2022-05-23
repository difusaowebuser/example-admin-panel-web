import { AxiosResponse } from 'axios'

import { api } from './api'

export const productsService = { getProducts }

async function getProducts(): Promise<AxiosResponse> {
  return await api.get('/products')
}
