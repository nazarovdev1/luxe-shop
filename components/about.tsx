"use client"

import { Award, Users, Zap, Globe } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Yuqori Sifat",
    description: "Har bir buyoq eng yaxshi materiallardan foydalanib, puxta e'tibor bilan tayyorlanadi.",
  },
  {
    icon: Users,
    title: "Mutaxassis Dizayn", 
    description: "Bizning vizioner dizaynerlar jamoasi kelajakni belgilaydigan modani yaratadi.",
  },
  {
    icon: Zap,
    title: "Innovatsiya",
    description: "Har bir kolleksiyada ilg'or texnologiya hashamatli moda bilan uchrashadi.",
  },
  {
    icon: Globe,
    title: "Global Ko'rinish",
    description: "Bizning futuristik estetikamiz bilan dunyo bo'ylab moda sevuvchilarni ilhomlantiramiz.",
  },
]

const stats = [
  { number: "50K+", label: "Mamnun Mijozlar" },
  { number: "500+", label: "Benzersiz Dizaynlar" },
  { number: "25+", label: "Davlatlar" },
  { number: "5★", label: "O'rtacha Reyting" },
]

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Background blur elements */}
        <div className="absolute -top-40 -left-40 w-80 h-80 sm:w-96 sm:h-96 bg-primary/10 rounded-full filter blur-3xl -z-10" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 sm:w-96 sm:h-96 bg-accent/10 rounded-full filter blur-3xl -z-10" />

        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
            <span className="neon-accent">LUXE</span> Haqida
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4">
            Innovatsion dizayn, ilg'or texnologiya va sifatga sodiq qolgan holda hashamatli modani qayta aniqlaymiz. 
            Biz trendlarga ergashamiz - biz ularni yaratamiz.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="glassmorphism p-6 sm:p-8 rounded-xl hover:bg-white/10 transition-all hover:shadow-2xl text-center"
                style={{
                  boxShadow: "0 0 20px rgba(147, 112, 219, 0.1)",
                }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary to-accent rounded-full mb-4 sm:mb-6">
                  <IconComponent 
                    size={24} 
                    className="text-white sm:w-6 sm:h-6" 
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="glassmorphism p-8 sm:p-12 rounded-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">{stat.number}</div>
                <div className="text-sm sm:text-base text-muted-foreground uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="glassmorphism p-8 sm:p-12 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Bizning <span className="neon-accent">Maqsadimiz</span>
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Hashamat, texnologiya va barqarorlikni birlashtirgan abadiy buyoqlarni yaratish orqali moda sanoatini inqilob qilish. 
              Biz moda ham chiroyli, ham mas'uliyatli bo'lishi kerak deb hisoblaymiz - bu sayohatning ishonch va sayyoramizga hurmat uyg'unlashgan bo'lishi kerak. 
              Har bir LUXE buyog'i innovatsiya, hunarmandlik va farq qilish jur'atining hikoyasini so'raydi.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
