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
      
      {/* Modal Content - True Full Screen Modal Window */}
      <div className="relative bg-background border border-border rounded-2xl w-screen h-screen max-w-none max-h-none overflow-hidden">
        {/* Close Button - Much Larger */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-4 bg-black/70 hover:bg-black/90 rounded-full transition-colors text-white cursor-pointer shadow-xl"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Product Image - Full Height */}
          <div className="flex items-center justify-center p-8 lg:p-12">
            <div className="relative w-full max-w-xl aspect-square overflow-hidden rounded-2xl shadow-2xl">
              {product.badge && (
                <div className="absolute top-6 left-6 z-20 bg-accent text-accent-foreground px-4 py-2 rounded-full text-lg font-bold uppercase tracking-wide">
                  {product.badge}
                </div>
              )}
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details - Full Height */}
          <div className="flex flex-col justify-center p-8 lg:p-12 space-y-8">
            <div>
              <p className="text-base text-muted-foreground uppercase tracking-wider mb-3">
                {product.category}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {product.name}
              </h1>
              <div className="text-4xl font-bold text-accent mb-8">
                {product.price}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {new Array(5).fill(null).map((_, i) => (
                  <Star key={i} size={20} className="fill-accent text-accent cursor-pointer" />
                ))}
              </div>
              <span className="text-lg text-muted-foreground cursor-pointer">(4.9/5 - 127 reviews)</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Experience the future of fashion with this revolutionary piece. 
                Crafted with premium materials and innovative design, this item represents 
                the pinnacle of luxury and comfort. Perfect for those who dare to stand out.
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2 text-lg text-muted-foreground">
                <li className="cursor-pointer">• Premium sustainable materials</li>
                <li className="cursor-pointer">• AI-optimized fit technology</li>
                <li className="cursor-pointer">• Temperature-regulating fabric</li>
                <li className="cursor-pointer">• Lifetime warranty included</li>
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Select Size</h3>
              <div className="grid grid-cols-3 gap-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 border-2 rounded-xl transition-all text-lg font-semibold cursor-pointer ${
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
              <h3 className="text-xl font-semibold mb-4">Select Color</h3>
              <div className="flex gap-4">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-12 h-12 rounded-full transition-all cursor-pointer ${
                      color.class
                    } ${selectedColor === index ? "ring-4 ring-accent ring-offset-4 ring-offset-background" : ""}`}
                    title={color.name}
                  />
                ))}
              </div>
              {selectedColor !== null && (
                <p className="text-lg text-muted-foreground mt-3 cursor-pointer">
                  Selected: {colors[selectedColor].name}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-6 pt-6">
              <button 
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
                className="flex-1 glow-button px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
              >
                <ShoppingBag size={22} />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>
              <button className="p-4 glassmorphism hover:bg-white/10 rounded-xl transition-all cursor-pointer">
                <Heart size={24} />
              </button>
            </div>

            {/* Size Alert */}
            {!selectedSize && (
              <p className="text-lg text-yellow-500 cursor-pointer">
                Please select a size to add to cart
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
