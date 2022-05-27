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
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS'

interface GetProductsAction {
  type: typeof GET_PRODUCTS
  payload: ProductData[] | null
}

interface DeleteProductsAction {
  type: typeof DELETE_PRODUCTS
  payload: true | null
}

export interface ProductsState {
  productsList: ProductData[] | null
  deletedProducts: true | null
}

export type ProductsActionTypes = GetProductsAction | DeleteProductsAction
