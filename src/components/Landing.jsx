import React from 'react'
import { MapPin, Phone, Globe, ArrowRight } from 'lucide-react'

export default function Landing({ onRegister }) {
  return (
    <div>
      {/* Top bar */}
      <div className="border-b border-blue-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/BTL_Logo.png" alt="Bonwire Tech Lab" className="h-10 w-auto" />
          </div>
          <div className="hidden items-center gap-6 text-sm text-stone-500 sm:flex">
            <span className="flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-stone-400" />
              059 197 2399
            </span>
            <span className="h-4 w-px bg-stone-300" />
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-stone-400" />
              Spintex Road, Rainbow
            </span>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative overflow-hidden border-b border-blue-200 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 uppercase">
              Building Innovation. Empowering Futures.
            </span>
            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-blue-900">
              Student Admission & Enrolment<br />
              <span className="text-blue-600">STEM Classes at Bonwire Tech Lab</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-stone-600">
              Enroll your child in our Weekend Robotics & Coding, Saturday Online, or Holiday Intensive STEM programmes.
              Hands-on learning with robotics kits, certified instructors, and a pathway to future innovation.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-stone-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-stone-400" />
                Spintex Road, Rainbow, Accra
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-stone-400" />
                059 197 2399
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-stone-400" />
                www.bonwiretechlab.com
              </span>
            </div>

            <button
              onClick={onRegister}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700"
            >
              Enroll Now
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2 text-xs text-stone-400">
              Monthly fee: GHS 500 per child · Pay online or in person
            </p>
          </div>
        </div>
      </div>

      {/* Programmes section */}
      <div className="border-b border-blue-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-stone-400">
            Available Programmes
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
              <h3 className="font-bold text-blue-900">Weekend Robotics & Coding</h3>
              <p className="mt-1 text-xs text-stone-600">Hands-on robotics and programming</p>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
              <h3 className="font-bold text-blue-900">Saturday Online Class</h3>
              <p className="mt-1 text-xs text-stone-600">Virtual learning from home</p>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
              <h3 className="font-bold text-blue-900">Holiday Intensive STEM</h3>
              <p className="mt-1 text-xs text-stone-600">Immersive holiday programmes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <img src="/BTL_Logo.png" alt="Bonwire Tech Lab" className="h-8 w-auto" />
              <span className="text-sm text-stone-500">Bonwire Tech Lab</span>
            </div>
            <p className="text-xs text-stone-400">
              © 2026 Bonwire Tech Lab · Building Innovation. Empowering Futures.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
