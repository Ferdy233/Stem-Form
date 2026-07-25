import React from 'react'
import { Calendar, MapPin, Gift, Award, Users, Clock } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white">
      {/* Decorative shapes */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-700/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Logo / Brand */}
        <div className="mb-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-2xl font-extrabold text-brand-900 shadow-lg">
            A
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">APPIPA SOLUTIONS</h1>
            <p className="text-sm text-brand-200">In partnership with Avishkaar Robotics, India</p>
          </div>
        </div>

        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/20 border border-gold-500/30 px-4 py-1.5 text-sm font-semibold text-gold-400">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            AFRICA STEM TOUR 2026
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          STEM Leadership Masterclass<br />
          <span className="text-gold-400">& Implementation Workshop</span>
        </h2>

        {/* Event details */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          <span className="flex items-center gap-2 text-brand-100">
            <Calendar className="h-4 w-4 text-gold-400" />
            17–18 August 2026
          </span>
          <span className="flex items-center gap-2 text-brand-100">
            <MapPin className="h-4 w-4 text-gold-400" />
            Kofi Annan Centre of Excellence in ICT, Accra
          </span>
        </div>

        {/* Feature highlights */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { icon: Users, label: 'Invitation Only', sub: 'Limited seats' },
            { icon: Gift, label: 'Free Robotics Kit', sub: 'Provided at venue' },
            { icon: Award, label: 'STEM.org Certificate', sub: 'Upon completion' },
            { icon: Clock, label: '2 Full Days', sub: '9 AM – 4 PM' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 p-4 text-center backdrop-blur-sm"
            >
              <item.icon className="h-6 w-6 text-gold-400" />
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-xs text-brand-200">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
