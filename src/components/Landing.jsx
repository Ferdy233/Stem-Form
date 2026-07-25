import React from 'react'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function Landing({ onRegister }) {
  return (
    <div>
      {/* Top bar */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/Appipa_logo.png" alt="Appipa Solutions" className="h-10 w-auto" />
          </div>
          <div className="hidden items-center gap-6 text-sm text-stone-500 sm:flex">
            <span>17–18 August 2026</span>
            <span className="h-4 w-px bg-stone-300" />
            <span>Accra, Ghana</span>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold tracking-wide text-amber-700 uppercase">
              Africa STEM Tour 2026
            </span>
            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-stone-900">
              STEM Leadership Masterclass<br />
              <span className="text-stone-500">& Implementation Workshop</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-stone-600">
              A two-day intensive programme for educators, school leaders, and STEM coordinators.
              Gain hands-on robotics experience, leadership strategies, and a STEM.org certificate.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-stone-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-stone-400" />
                17–18 August 2026
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-stone-400" />
                Kofi Annan Centre of Excellence in ICT, Accra
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-stone-400" />
                9:00 AM – 12:00 PM or 1:00 PM – 3:00 PM
              </span>
            </div>

            <button
              onClick={onRegister}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-stone-800"
            >
              Register Now
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2 text-xs text-stone-400">
              Limited seats · GHS 200 per session · Registration confirms your slot
            </p>
          </div>
        </div>
      </div>

      {/* Partners section */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-stone-400">
            Organised by
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            <img src="/Appipa_logo.png" alt="Appipa Solutions" className="h-10 sm:h-14 w-auto opacity-80" />
            <div className="h-10 sm:h-12 w-px bg-stone-200" />
            <img src="/BTL_Logo.png" alt="BTL" className="h-10 sm:h-14 w-auto opacity-80" />
            <div className="h-10 sm:h-12 w-px bg-stone-200" />
            <img src="/avishkaar_logo.png" alt="Avishkaar Robotics" className="h-10 sm:h-14 w-auto opacity-80" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <img src="/Appipa_logo.png" alt="Appipa Solutions" className="h-8 w-auto" />
              <span className="text-sm text-stone-500">Appipa Solutions</span>
            </div>
            <p className="text-xs text-stone-400">
              © 2026 Appipa Solutions · Africa STEM Tour
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
