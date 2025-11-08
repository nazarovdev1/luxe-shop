"use client"

import { useState, useEffect, useRef } from "react"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import CartDropdown from "./cart-dropdown"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
  const { getTotalItems } = useCart()
  const cartCount = getTotalItems()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCartDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      })
    }
    setMobileMenuOpen(false) // Close mobile menu after navigation
  }

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCartDropdownOpen(!cartDropdownOpen)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glassmorphism-nav" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection("hero")}
            className="text-xl sm:text-2xl font-bold tracking-wider hover:text-accent transition-colors"
          >
            <span className="neon-accent">LUXE</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button 
              onClick={() => scrollToSection("new-collection")}
              className="hover:text-accent transition-colors text-sm uppercase tracking-wide"
            >
              Collection
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="hover:text-accent transition-colors text-sm uppercase tracking-wide"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="hover:text-accent transition-colors text-sm uppercase tracking-wide"
            >
              Contact
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4 relative" ref={dropdownRef}>
            <button className="hidden sm:block p-2 sm:p-3 hover:bg-white/10 rounded-lg transition-all min-w-[44px] min-h-[44px] sm:min-w-[40px] sm:min-h-[40px]">
              <Search size={20} />
            </button>
            
            {/* Cart Button with Dropdown */}
            <div className="relative">
              <button 
                onClick={handleCartClick}
                className="relative p-2 sm:p-3 hover:bg-white/10 rounded-lg transition-all group min-w-[44px] min-h-[44px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold glow-button">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
              
              {/* Cart Dropdown */}
              <CartDropdown 
                isOpen={cartDropdownOpen}
                onClose={() => setCartDropdownOpen(false)}
              />
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 sm:p-3 hover:bg-white/10 rounded-lg transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 sm:mt-4 pb-3 sm:pb-4 space-y-3 sm:space-y-4 animate-in slide-in-from-top">
            <button 
              onClick={() => scrollToSection("new-collection")}
              className="block hover:text-accent transition-colors text-sm uppercase tracking-wide py-2 min-h-[44px] flex items-center w-full text-left"
            >
              Collection
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="block hover:text-accent transition-colors text-sm uppercase tracking-wide py-2 min-h-[44px] flex items-center w-full text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block hover:text-accent transition-colors text-sm uppercase tracking-wide py-2 min-h-[44px] flex items-center w-full text-left"
            >
              Contact
            </button>
            <div className="pt-2 border-t border-white/10">
              <button className="flex items-center gap-2 hover:text-accent transition-colors text-sm uppercase tracking-wide py-2 min-h-[44px] w-full">
                <Search size={16} />
                <span>Search</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
