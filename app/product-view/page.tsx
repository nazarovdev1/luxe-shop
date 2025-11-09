"use client"

import { useState, useEffect } from "react"
import { X, Heart, ShoppingBag, Star } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: number
  name: string
  category: string
  price: string
  image: string
  badge?: string
}

export default function ProductView() {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<number>(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    // Get product data from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const dataParam = urlParams.get('data')
    
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam))
        setProduct(decodedData)
      } catch (error) {
        console.error('Error parsing product data:', error)
      }
    }
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = [
    { name: "Black", class: "bg-black" },
    { name: "White", class: "bg-white border-2 border-gray-300" },
    { name: "Gray", class: "bg-gray-500" },
    { name: "Blue", class: "bg-blue-600" },
    { name: "Red", class: "bg-red-600" },
  ]

  const handleAddToCart = async () => {
    if (!selectedSize) return
    
    setIsAddingToCart(true)
    try {
      addToCart(product, selectedSize, colors[selectedColor]?.name)
      setTimeout(() => {
        setIsAddingToCart(false)
        window.close()
      }, 1000)
    } catch (error) {
      setIsAddingToCart(false)
    }
  }

  const isAddToCartDisabled = !selectedSize || isAddingToCart

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
        <button
          onClick={() => window.close()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Product Image */}
          <div className="space-y-6">
            <div className="relative">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.badge}
                </div>
              )}
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Category */}
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-blue-600">
              {product.price}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">(4.9/5 - 127 reviews)</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience the future of fashion with this revolutionary piece. 
                Crafted with premium materials and innovative design, this item represents 
                the pinnacle of luxury and comfort. Perfect for those who dare to stand out.
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Color</h3>
              <div className="flex space-x-4">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      color.class
                    } ${
                      selectedColor === index 
                        ? "border-blue-500 ring-2 ring-blue-200" 
                        : "border-gray-300"
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
              {selectedColor !== null && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {colors[selectedColor].name}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={20} />
                <span>{isAddingToCart ? "Adding..." : "Add to Cart"}</span>
              </button>
              <button className="p-4 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition-colors">
                <Heart size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Size Alert */}
            {!selectedSize && (
              <p className="text-sm text-orange-600">
                Please select a size to add to cart
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
