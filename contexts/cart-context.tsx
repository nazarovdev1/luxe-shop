"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface CartItem {
  key: string // Unique key: id-size-color
  id: number
  name: string
  category: string
  price: string
  image: string
  badge?: string
  size?: string
  color?: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity' | 'key'>, size?: string, color?: string, quantity?: number) => void
  removeFromCart: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  getTotalItems: () => number
  getTotalPrice: () => string
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: Omit<CartItem, 'quantity' | 'key'>, size?: string, color?: string, quantity: number = 1) => {
    setItems(currentItems => {
      // Create unique key for this product variant
      const itemKey = `${product.id}-${size || 'default'}-${color || 'default'}`
      
      const existingItemIndex = currentItems.findIndex(item => item.key === itemKey)

      if (existingItemIndex >= 0) {
        // Item already exists in cart - increase quantity by the specified amount
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item
        const newItem: CartItem = { 
          ...product, 
          key: itemKey,
          size, 
          color, 
          quantity: quantity
        }
        return [...currentItems, newItem]
      }
    })
  }

  const removeFromCart = (key: string) => {
    setItems(currentItems => currentItems.filter(item => item.key !== key))
  }

  const updateQuantity = (key: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(key)
      return
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.key === key ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    const total = items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '').replace(',', ''))
      return total + (price * item.quantity)
    }, 0)
    return `$${total.toLocaleString()}`
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
