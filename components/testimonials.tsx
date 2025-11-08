"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Alexandra Chen",
    role: "Fashion Influencer",
    text: "The designs are absolutely breathtaking. Every piece feels like wearable art.",
    rating: 5,
    image: "/professional-woman-portrait.png",
  },
  {
    name: "Marcus Johnson",
    role: "CEO & Entrepreneur",
    text: "LUXE redefines what luxury fashion means. The attention to detail is unmatched.",
    rating: 5,
    image: "/professional-man-portrait.png",
  },
  {
    name: "Sofia Rodriguez",
    role: "Artist & Creator",
    text: "Finally, fashion that matches my vision. The futuristic aesthetic is perfect.",
    rating: 5,
    image: "/professional-woman-artist.jpg",
  },
]

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Background blur elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 sm:w-96 sm:h-96 bg-accent/10 rounded-full filter blur-3xl -z-10" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 sm:w-96 sm:h-96 bg-primary/10 rounded-full filter blur-3xl -z-10" />

        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
            Loved by <span className="neon-accent">Tastemakers</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg px-2">Join thousands of satisfied customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="glassmorphism p-6 sm:p-8 rounded-xl hover:bg-white/10 transition-all hover:shadow-2xl w-full"
              style={{
                boxShadow: "0 0 20px rgba(147, 112, 219, 0.1)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base sm:text-lg mb-4 sm:mb-6 text-foreground">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
