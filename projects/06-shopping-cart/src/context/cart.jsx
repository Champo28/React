/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    // setCart([...cart, product])

    // Check if the product is already in the cart
    const productInCartIndex = cart.findIndex(item => item.id === product.id)

    if (productInCartIndex >= 0) {
      // Usando structuredClone
      const newCart = structuredClone(cart)
      newCart[productInCartIndex].quantity += 1
      return setCart(newCart)
    }

    setCart(prevState => ([
      ...prevState,
      {
        ...product,
        quantity: 1
      }
    ]))
  }

  const removeFromCart = (product) => {
    // set tiene como parametro el estado previo por eso se usa prevState
    setCart(prevState => prevState.filter(item => item.id !== product.id))

    // tambien se puede usar, aunque puede ocurrir una race condition
    // setCart(cart.filter(item => item.id !== product.id))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
