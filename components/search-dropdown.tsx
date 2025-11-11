"use client"

import React, { useEffect, useRef } from "react"
import { X, Search } from "lucide-react"
import { useSearch } from "@/contexts/search-context"

interface SearchDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchDropdown({ isOpen, onClose }: SearchDropdownProps) {
  const { searchQuery, setSearchQuery } = useSearch()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("")
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }
  }, [isOpen, setSearchQuery])

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
            <Search size={20} className="text-accent" />
            Qidirish
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Qidiruv so'zini yozing..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Empty Content Area */}
        <div className="p-8 text-center text-muted-foreground">
          <Search size={32} className="mx-auto mb-2 opacity-50" />
          <p>Qidirish funksiyasi faqat matn kiritish uchun</p>
          <p className="text-xs mt-1">Mahsulotlar ko'rsatilmaydi</p>
        </div>

        {/* Footer - Always Visible */}
        <div className="border-t border-border p-4 text-center">
          <p className="text-xs text-muted-foreground">
            Mahsulotlar ko'rsatilmaydi
          </p>
        </div>
      </div>
    </>
  )
}
