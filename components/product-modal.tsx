"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/data/products"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  if (!product || !isOpen) return null

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Iltimos, o'lchamni tanlang")
      return
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Iltimos, rangni tanlang")
      return
    }

    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        badge: product.badge
      }, selectedSize, selectedColor)
    }

    // Reset and close modal
    setSelectedSize("")
    setSelectedColor("")
    setQuantity(1)
    onClose()
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-lg max-w-4xl max-h-[90vh] overflow-y-auto m-4 w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-[3/4] object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.jpg"
              }}
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {product.rating && (
                <div className="flex items-center">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
                </div>
              )}
              <span className="text-sm text-muted-foreground">{product.category}</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold">{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-muted-foreground">{product.description}</p>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Rang tanlang:</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        selectedColor === color
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">O'lcham tanlang:</label>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-sm rounded border transition-colors ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Miqdor:</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-1 rounded-full border border-border hover:border-primary transition-colors"
                >
                  −
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-1 rounded-full border border-border hover:border-primary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg rounded-md transition-colors"
            >
              🛒 Savatga qo'shish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
