"use client"

import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              <span className="neon-accent">LUXE</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Redefining luxury fashion with futuristic design and cutting-edge technology.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Shop</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors block py-1">
                  New Collection
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors block py-1">
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors block py-1">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors block py-1">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">About</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors block py-1">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors block py-1">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors block py-1">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors block py-1">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-accent mt-0.5 sm:w-4 sm:h-4" />
                <a href="mailto:hello@luxe.com" className="hover:text-accent transition-colors break-all">
                  hello@luxe.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-accent mt-0.5 sm:w-4 sm:h-4" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors break-all">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-accent mt-0.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="leading-relaxed">123 Fashion Ave, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="border-t border-border/50 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center sm:text-left">© 2025 LUXE Fashion. All rights reserved.</p>
          <div className="flex gap-3 sm:gap-4">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <button 
                key={i} 
                className="p-2 hover:bg-white/10 rounded-lg transition-all group min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                <Icon size={18} className="text-muted-foreground group-hover:text-accent transition-colors sm:w-5 sm:h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
