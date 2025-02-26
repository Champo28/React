import { useState, useEffect } from 'react'

export function useProducts () {
  const API_URL = 'https://dummyjson.com/products'

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts () {
      const res = await fetch(API_URL)
      const data = await res.json()
      const { products } = data
      setProducts(products)
    }

    getProducts()
  }, [])

  return { products }
}
