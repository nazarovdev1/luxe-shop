"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import NewCollection from "@/components/new-collection"
import Bestsellers from "@/components/bestsellers"
import VirtualTryOn from "@/components/virtual-try-on"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import About from "@/components/about"
import Contact from "@/components/contact"
import { CartProvider } from "@/contexts/cart-context"

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <NewCollection />
        <Bestsellers />
        <VirtualTryOn />
        <Testimonials />
        <About />
        <Contact />
        <Footer />
      </div>
    </CartProvider>
  )
}
