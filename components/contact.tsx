"use client"

import React, { useState } from "react"
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@luxe.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (234) 567-890",
      description: "Mon-Fri from 8am to 5pm EST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Fashion Ave, New York, NY 10001",
      description: "Showroom open by appointment",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri: 8am-6pm EST",
      description: "Weekend: 10am-4pm EST",
    },
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Background blur elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 sm:w-96 sm:h-96 bg-accent/10 rounded-full filter blur-3xl -z-10" />

        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Get In <span className="neon-accent">Touch</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4">
            Have questions about our collections? Want to collaborate? We'd love to hear from you. 
            Reach out and let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="glassmorphism p-6 sm:p-8 rounded-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
                <MessageCircle className="text-accent" size={24} />
                Contact Information
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                      {React.createElement(info.icon, { size: 20, className: "text-white" })}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base mb-1">{info.title}</h4>
                      <p className="text-accent font-medium text-sm sm:text-base mb-1">{info.content}</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glassmorphism p-6 sm:p-8 rounded-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="orders">Orders & Shipping</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="press">Press & Media</option>
                  <option value="support">Customer Support</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full glow-button px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
