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
  addToCart: (product: Omit<CartItem, 'quantity' | 'key'>, size?: string, color?: string) => void
  removeFromCart: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  getTotalItems: () => number
  getTotalPrice: () => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: Omit<CartItem, 'quantity' | 'key'>, size?: string, color?: string) => {
    setItems(currentItems => {
      // Create unique key for this product variant
      const itemKey = `${product.id}-${size || 'default'}-${color || 'default'}`
      
      const existingItemIndex = currentItems.findIndex(item => item.key === itemKey)

      if (existingItemIndex >= 0) {
        // Mahsulot allaqachon savatda bor - quantity ni oshirish
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += 1
        return updatedItems
      } else {
        // Yangi mahsulot qo'shish
        const newItem: CartItem = { 
          ...product, 
          key: itemKey,
          size, 
          color, 
          quantity: 1 
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
      getTotalPrice
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
