"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface Product {
  id: number
  name: string
  category: string
  price: string
  image: string
  badge?: string
}

interface SearchContextType {
  products: Product[]
  isSearchOpen: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  setIsSearchOpen: (open: boolean) => void
  filteredProducts: Product[]
  openSearch: () => void
  closeSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

// All products combined from both sections
const allProducts: Product[] = [
  // New Collection
  {
    id: 1,
    name: "Quantum Jacket",
    category: "Outerwear",
    price: "$1,299",
    image: "/luxury-black-jacket.jpg",
    badge: "NEW",
  },
  {
    id: 2,
    name: "Nexus Boots",
    category: "Footwear", 
    price: "$899",
    image: "/luxury-futuristic-boots.jpg",
    badge: "TRENDING",
  },
  {
    id: 3,
    name: "Prism Dress",
    category: "Dresses",
    price: "$1,599", 
    image: "/luxury-elegant-dress.jpg",
  },
  {
    id: 4,
    name: "Vortex Pants",
    category: "Bottoms",
    price: "$599",
    image: "/luxury-modern-pants.jpg",
    badge: "EXCLUSIVE",
  },
  // Bestsellers
  {
    id: 5,
    name: "Stellar Sweater",
    category: "Tops",
    price: "$449",
    image: "/luxury-cozy-sweater.jpg", 
    badge: "BESTSELLER",
  },
  {
    id: 6,
    name: "Eclipse Blazer",
    category: "Outerwear",
    price: "$1,199",
    image: "/luxury-tailored-blazer.jpg",
    badge: "BESTSELLER",
  },
  {
    id: 7,
    name: "Aurora Skirt",
    category: "Bottoms",
    price: "$699",
    image: "/luxury-elegant-skirt.jpg",
    badge: "BESTSELLER",
  },
  {
    id: 8,
    name: "Zenith Coat", 
    category: "Outerwear",
    price: "$1,899",
    image: "/luxury-premium-coat.jpg",
    badge: "BESTSELLER",
  },
]

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openSearch = () => setIsSearchOpen(true)
  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  const value = {
    products: allProducts,
    isSearchOpen,
    searchQuery,
    setSearchQuery,
    setIsSearchOpen,
    filteredProducts,
    openSearch,
    closeSearch,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
