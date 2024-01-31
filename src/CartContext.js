import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  cartItemCount: 0, // Add cartItemCount to the initial context value
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
