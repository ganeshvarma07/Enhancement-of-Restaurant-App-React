import React, {Component} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Cart from './Cart'
import CartContext from './CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state

    const existingItem = cartList.find(item => item.id === product.id)

    if (existingItem) {
      this.setState({
        cartList: cartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity}
            : item,
        ),
      })
    } else {
      this.setState({
        cartList: [...cartList, product],
      })
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(item => item.id !== id)
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    this.setState({
      cartList: cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const existingItem = cartList.find(item => item.id === id)

    if (existingItem && existingItem.quantity > 1) {
      this.setState({
        cartList: cartList.map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        ),
      })
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <div className="App">
          <header>
            <Link to="/">Home</Link>
            <Link to="/cart" className="cart-link">
              <button
                type="button"
                className="cart-icon-button"
                data-testid="cart"
              >
                Cart
                {cartList.length > 0 && (
                  <span className="cart-count-badge">{cartList.length}</span>
                )}
              </button>
              {cartList.length > 0 && (
                <span className="cart-count-badge">{cartList.length}</span>
              )}
            </Link>
          </header>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </CartContext.Provider>
    )
  }
}

export default App
