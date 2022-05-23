export interface ProductData {
  id: number
  image: string
  name: string
  sku: number
  stock: boolean
  category: number
  created_at: string
  updated_at: string
  price: number
}

export interface GetProductsSuccessReturnActionInterface {
  products: ProductData[]
}

export const GET_PRODUCTS = 'GET_PRODUCTS'

interface GetProductsAction {
  type: typeof GET_PRODUCTS
  payload: {
    success: GetProductsSuccessReturnActionInterface | null
  }
}

export interface ProductsState {
  products: ProductData[] | null
}

export type ProductsActionTypes = GetProductsAction
