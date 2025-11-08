"use client"

import ProductCard from "./product-card"

const bestsellers = [
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

export default function Bestsellers() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 relative bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Background blur elements */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 sm:w-96 sm:h-96 bg-accent/10 rounded-full filter blur-3xl -z-10" />

        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
            <span className="neon-accent">Bestsellers</span> This Season
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg px-2">Most loved by our community</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
