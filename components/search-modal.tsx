"use client"

import React, { useEffect, useRef } from "react"
import { X, Search } from "lucide-react"
import { useSearch } from "@/contexts/search-context"
import { useCart } from "@/contexts/cart-context"

export default function SearchModal() {
  const { isSearchOpen, searchQuery, setSearchQuery, closeSearch, filteredProducts } = useSearch()
  const { addToCart } = useCart()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  if (!isSearchOpen) return null

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      badge: product.badge,
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={closeSearch}
      />
      
      {/* Search Modal */}
      <div className="fixed inset-x-4 top-4 bottom-4 sm:inset-x-auto sm:top-20 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-full sm:max-w-2xl bg-background border border-border rounded-2xl shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Search size={20} className="text-accent" />
            Mahsulot Qidirish
          </h3>
          <button
            onClick={closeSearch}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mahsulot nomini yoki kategoriyasini yozing..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {searchQuery === "" ? (
            <div className="text-center text-muted-foreground py-8">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>Qidirish uchun mahsulot nomi yozing</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>Hech qanday mahsulot topilmadi</p>
              <p className="text-sm mt-1">Boshqa so'z bilan qidirib ko'ring</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} ta mahsulot topildi
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="glassmorphism p-3 rounded-lg">
                    <div className="flex gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{product.name}</h4>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                        <p className="text-sm font-semibold text-accent mt-1">{product.price}</p>
                        <div className="flex items-center justify-between mt-2">
                          {product.badge && (
                            <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                              {product.badge}
                            </span>
                          )}
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="text-xs bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded hover:scale-105 transition-all"
                          >
                            Savatga Qo'sh
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Tez qidirish uchun mahsulot nomini yozing: "jacket", "dress", "boots"
          </p>
        </div>
      </div>
    </>
  )
}
