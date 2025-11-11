"use client"

import ProductCard from "./product-card"
import { bestsellerProducts } from "@/data/products"

export default function Bestsellers() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 relative bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Background blur elements */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 sm:w-96 sm:h-96 bg-accent/10 rounded-full filter blur-3xl -z-10" />

        <div className="mb-8 sm:mb-12 md:mb-16 animate-fade-in-up animate-stagger-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-left">
            <span className="neon-accent">Bestseller</span> Mahsulotlar
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg text-left">Bizning jamiyat tomonidan eng sevilgan</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {bestsellerProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              className="animate-fade-in-up animate-stagger-2"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
