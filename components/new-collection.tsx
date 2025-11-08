"use client"
import ProductCard from "./product-card"

const products = [
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
]

export default function NewCollection() {
  return (
    <section id="new-collection" className="py-12 sm:py-16 md:py-20 lg:py-32 relative cursor-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Background blur elements */}
        <div className="absolute -top-40 -left-40 w-80 h-80 sm:w-96 sm:h-96 bg-primary/10 rounded-full filter blur-3xl -z-10" />

        <div className="mb-8 sm:mb-12 md:mb-16 animate-fade-in-up animate-stagger-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
            Yangi <span className="neon-accent">Kolleksiya</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg px-2">Eng so'ngi futuristik dizaynlarimizni o'rganing</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <div key={product.id} className="w-full animate-fade-in-up animate-stagger-2" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
