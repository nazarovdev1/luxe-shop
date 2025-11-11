"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Sparkles } from "lucide-react"

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-background to-background" />

      {/* Parallax effect */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offsetY * 0.5}px)` }}>
        <div className="absolute top-20 left-2 sm:left-4 md:left-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-accent/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-2 sm:right-4 md:right-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/5 rounded-full filter blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-left max-w-4xl px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 glassmorphism animate-fade-in-up animate-stagger-1">
          <Sparkles size={14} className="text-accent sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm tracking-wide">YANGI KOLLEKTSIYA 2025</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-balance neon-accent animate-fade-in-up animate-stagger-2">
          O'z Uslubingizni Qayta Aniqlang
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 text-balance max-w-2xl text-white animate-fade-in-up animate-stagger-3">
          Futuristik dizayn bilan zamonaviy hashamatni bosing. Farq qilishga jur'at etganlar uchun yaratilgan.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start animate-fade-in-up animate-stagger-4">
          <button className="glow-button group px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all text-sm sm:text-base">
            Hozir Sotib Oling
            <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </button>
          <button className="px-6 py-3 sm:px-8 sm:py-4 glassmorphism hover:bg-white/10 transition-all font-semibold text-sm sm:text-base">
            Kolleksiyani Ko'rish
          </button>
        </div>
      </div>

      {/* Hero Image - Full Screen with animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-full h-full animate-fade-in-scale animate-stagger-5"
          style={{
            transform: `translateY(${offsetY * 0.3}px)`,
          }}
        >
          <img 
            src="/349345-4k-wallpaper.jpg" 
            alt="Hashtag modellas" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </section>
  )
}
