export interface ProductData {
  id: number
  image: string
  name: string
  sku: number
  stock: boolean
  created_at: string
  price: string
  category: string
}

export const GET_PRODUCTS = 'GET_PRODUCTS'

interface GetProductsAction {
  type: typeof GET_PRODUCTS
  payload: ProductData[] | null
}

export interface ProductsState {
  productsList: ProductData[] | null
}

export type ProductsActionTypes = GetProductsAction
