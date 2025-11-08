"use client"

import { X, Heart, ShoppingBag, Star } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: number
    name: string
    category: string
    price: string
    image: string
    badge?: string
  } | null
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<number>(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addToCart } = useCart()

  if (!isOpen || !product) return null

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = [
    { name: "Black", class: "bg-black border-2 border-accent" },
    { name: "White", class: "bg-white border border-border" },
    { name: "Gray", class: "bg-gray-600 border border-border" },
    { name: "Blue", class: "bg-blue-600 border border-border" },
    { name: "Red", class: "bg-red-600 border border-border" },
  ]

  const handleAddToCart = async () => {
    if (!selectedSize) return
    
    setIsAddingToCart(true)
    try {
      addToCart(product, selectedSize, colors[selectedColor]?.name)
      // Optional: Show success notification
      setTimeout(() => {
        setIsAddingToCart(false)
        onClose() // Close modal after adding to cart
      }, 1000)
    } catch (error) {
      setIsAddingToCart(false)
    }
  }

  const isAddToCartDisabled = !selectedSize || isAddingToCart

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors text-white cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              {product.badge && (
                <div className="absolute top-4 left-4 z-20 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  {product.badge}
                </div>
              )}
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-accent mb-6">
                {product.price}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent cursor-pointer" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground cursor-pointer">(4.9/5 - 127 reviews)</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience the future of fashion with this revolutionary piece. 
                Crafted with premium materials and innovative design, this item represents 
                the pinnacle of luxury and comfort. Perfect for those who dare to stand out.
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li className="cursor-pointer">• Premium sustainable materials</li>
                <li className="cursor-pointer">• AI-optimized fit technology</li>
                <li className="cursor-pointer">• Temperature-regulating fabric</li>
                <li className="cursor-pointer">• Lifetime warranty included</li>
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Select Size</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border rounded-lg transition-all text-sm font-medium cursor-pointer ${
                      selectedSize === size
                        ? "border-accent bg-accent/20 text-accent"
                        : "border-border hover:border-accent hover:bg-accent/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Select Color</h3>
              <div className="flex gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 rounded-full transition-all cursor-pointer ${
                      color.class
                    } ${selectedColor === index ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""}`}
                    title={color.name}
                  />
                ))}
              </div>
              {selectedColor !== null && (
                <p className="text-sm text-muted-foreground mt-2 cursor-pointer">
                  Selected: {colors[selectedColor].name}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
                className="flex-1 glow-button px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <ShoppingBag size={18} />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>
              <button className="p-3 glassmorphism hover:bg-white/10 rounded-lg transition-all cursor-pointer">
                <Heart size={20} />
              </button>
            </div>

            {/* Size Alert */}
            {!selectedSize && (
              <p className="text-sm text-yellow-500 cursor-pointer">
                Please select a size to add to cart
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
