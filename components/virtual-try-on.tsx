"use client"

import { useState } from "react"
import { Zap } from "lucide-react"

export default function VirtualTryOn() {
  const [selectedItem, setSelectedItem] = useState("jacket")

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left: Virtual Try-On Experience */}
          <div className="order-2 lg:order-1">
            <div className="glassmorphism p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
              <div className="relative z-10">
                <div className="w-full aspect-square sm:aspect-video lg:aspect-square lg:h-[400px] xl:h-[500px] rounded-xl overflow-hidden mb-4 sm:mb-6 flex items-center justify-center bg-gradient-to-b from-primary/10 to-transparent">
                  <img
                    src="/futuristic-fashion-hologram.jpg"
                    alt="Virtual try-on experience"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">AR Virtual Try-On Experience</p>
              </div>
            </div>
          </div>

          {/* Right: Options and Info */}
          <div className="order-1 lg:order-2">
            <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 glassmorphism">
              <Zap size={14} className="text-accent sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm tracking-wide">INTERACTIVE FEATURE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Experience Fashion in <span className="neon-accent">Reality</span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
              Try on any piece virtually using our AI-powered AR technology. See how it looks on you before you buy.
            </p>

            {/* Try-On Options */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {[
                { id: "jacket", name: "Premium Jacket", desc: "Classic yet futuristic" },
                { id: "dress", name: "Evening Dress", desc: "Elegant and sophisticated" },
                { id: "boots", name: "Designer Boots", desc: "Modern statement piece" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`w-full p-3 sm:p-4 rounded-lg transition-all text-left min-h-[60px] sm:min-h-[72px] ${
                    selectedItem === item.id
                      ? "glassmorphism bg-gradient-to-r from-primary/30 to-accent/30 border-primary/50"
                      : "glassmorphism hover:bg-white/10"
                  }`}
                >
                  <p className="font-semibold text-sm sm:text-base">{item.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                </button>
              ))}
            </div>

            <button className="glow-button w-full px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all text-sm sm:text-base">
              Try On Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
