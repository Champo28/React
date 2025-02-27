export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

export const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload
    // Check if the product is already in the cart
    const productInCartIndex = state.findIndex(item => item.id === id)

    // setCart([...cart, product])
    if (productInCartIndex >= 0) {
      // Usando structuredClone
      const newState = structuredClone(state)
      newState[productInCartIndex].quantity += 1
      updateLocalStorage(newState)
      return newState

      // usando el map
      // const newState = state.map(item => {
      //   if(item.id === id){
      //     return {
      //       ...item,
      //       quantity: item.quantity + 1
      //     }
      //   }

      //   return item
      // })

      // usando el spread operator y slice
      // const newState = [
      //   ...state.slice(0, productInCartIndex),
      //   {...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1},
      //   ...state.slice(productInCartIndex + 1)
      // ]
    }

    const newState = [
      ...state,
      {
        ...action.payload,
        quantity: 1
      }
    ]

    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload
    // set tiene como parametro el estado previo por eso se usa prevState
    const newState = state.filter(item => item.id !== id)

    // tambien se puede usar, aunque puede ocurrir una race condition
    // setCart(cart.filter(item => item.id !== product.id))

    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([])
    return []
  }
}

export const cartReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}
