"use client"

import { CartProvider } from "@/contexts/cart-context"
import { SearchProvider } from "@/contexts/search-context"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import NewCollection from "@/components/new-collection"
import Bestsellers from "@/components/bestsellers"
import About from "@/components/about"
import Footer from "@/components/footer"
import SearchModal from "@/components/search-modal"

export default function Home() {
  return (
    <SearchProvider>
      <CartProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <Hero />
          <NewCollection />
          <Bestsellers />
          <About />
          <Footer />
          <SearchModal />
        </div>
      </CartProvider>
    </SearchProvider>
  )
}
