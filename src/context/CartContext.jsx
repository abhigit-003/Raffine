import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem('raffine_cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        localStorage.removeItem('raffine_cart')
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('raffine_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (service) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === service.id)
      if (exists) {
        return prev.map(item => 
          item.id === service.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...service, quantity: 1 }]
    })
  }

  const removeFromCart = (serviceId) => {
    setCartItems(prev => prev.filter(item => item.id !== serviceId))
  }

  const updateQuantity = (serviceId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(serviceId)
      return
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === serviceId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

