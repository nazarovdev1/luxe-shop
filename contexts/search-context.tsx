"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface SearchContextType {
  isSearchOpen: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  setIsSearchOpen: (open: boolean) => void
  openSearch: () => void
  closeSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const openSearch = () => setIsSearchOpen(true)
  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  const value = {
    isSearchOpen,
    searchQuery,
    setSearchQuery,
    setIsSearchOpen,
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
