import * as React from 'react'

import { productsService } from '../services'

export interface ProductData {
  id: number
  name: string
  seconds: number
}

interface ProductsContextData {
  loading: boolean
  products: ProductData[] | null
  getProducts(): Promise<void>
}

const ProductsContext = React.createContext<ProductsContextData>(
  {} as ProductsContextData
)

const ProductsProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(true)
  const [products, setProducts] = React.useState<ProductData[] | null>(null)

  async function getProducts() {
    // const { data } = await productsService.getProducts()
    const data = await productsService.getProducts()
    console.log(data)
    // setProducts(data)
  }

  return (
    <ProductsContext.Provider value={{ products, loading, getProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

function useProducts() {
  const context = React.useContext(ProductsContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { ProductsProvider, useProducts }
