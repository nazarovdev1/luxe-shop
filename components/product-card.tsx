"use client"

import { useState } from "react"
import { Heart, Eye } from "lucide-react"
import ProductModal from "./product-modal"
import { useCart } from "@/contexts/cart-context"

interface ProductCardProps {
  id: number
  name: string
  category: string
  price: string
  image: string
  badge?: string
}

export default function ProductCard({ id, name, category, price, image, badge }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useCart()

  const product = {
    id,
    name,
    category,
    price,
    image,
    badge
  }

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
    // Optional: Show success notification
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="group relative w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* Card Container */}
        <div
          className="relative rounded-xl overflow-hidden glassmorphism p-3 sm:p-4 transition-all duration-500 hover:shadow-2xl w-full h-full animate-fade-in-up"
          style={{
            boxShadow: isHovered ? "0 0 40px rgba(147, 112, 219, 0.4)" : "0 0 20px rgba(147, 112, 219, 0.1)",
          }}
        >
          {/* Badge */}
          {badge && (
            <div className="absolute top-3 left-3 z-20 bg-accent text-accent-foreground px-2 py-1 sm:px-3 rounded-full text-xs font-bold uppercase tracking-wide animate-fade-in-scale">
              {badge}
            </div>
          )}

          {/* Image Container */}
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-lg mb-3 sm:mb-4">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay Actions - Only Eye Icon */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-in fade-in">
                <button 
                  onClick={handleViewClick}
                  className="glow-button p-3 sm:p-4 bg-primary hover:bg-accent text-white rounded-full transition-all hover:scale-110 min-w-[48px] min-h-[48px] sm:min-w-[56px] sm:min-h-[56px] flex items-center justify-center"
                >
                  <Eye size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-2 sm:space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide leading-relaxed animate-fade-in-left">{category}</p>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold group-hover:text-accent transition-colors leading-tight animate-fade-in-left" style={{ animationDelay: "0.1s" }}>
              {name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-xl font-bold text-accent animate-fade-in-left" style={{ animationDelay: "0.2s" }}>{price}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all min-w-[36px] min-h-[36px] flex items-center justify-center animate-fade-in-right"
                >
                  <Heart
                    size={16}
                    className={`transition-all sm:w-5 sm:h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={product}
      />
    </>
  )
}
