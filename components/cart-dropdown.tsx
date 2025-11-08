"use client"

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface CartDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Dropdown Content */}
      <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-background border border-border rounded-2xl shadow-2xl z-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag size={20} />
            Shopping Cart ({items.length})
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="max-h-64 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
              <p className="text-sm mt-1">Add some products to get started</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div key={item.key} className="flex items-center gap-3 p-3 glassmorphism rounded-lg">
                  {/* Product Image */}
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.size && (
                        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                          {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="text-xs text-muted-foreground">{item.color}</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-accent mt-1">{item.price}</p>
                  </div>

                  {/* Quantity Controls - Centered */}
                  <div className="flex flex-col items-center justify-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="p-1 hover:bg-white/10 rounded transition-colors flex items-center justify-center"
                    >
                      <Plus size={14} />
                    </button>
                    <span className="text-sm font-medium w-8 text-center leading-none">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, Math.max(0, item.quantity - 1))}
                      className="p-1 hover:bg-white/10 rounded transition-colors flex items-center justify-center"
                    >
                      <Minus size={14} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <div className="flex items-center">
                    <button
                      onClick={() => removeFromCart(item.key)}
                      className="p-1 hover:bg-red-500/20 text-red-500 rounded transition-colors flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Always Visible */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-3 bg-background">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total:</span>
              <span className="text-lg font-bold text-accent">{getTotalPrice()}</span>
            </div>
            <button className="w-full glow-button px-4 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all">
              Checkout
            </button>
            <button 
              onClick={onClose}
              className="w-full px-4 py-2 glassmorphism hover:bg-white/10 transition-all font-medium"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
