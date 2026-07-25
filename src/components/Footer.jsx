import React from 'react'
import { Cpu } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-8">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Cpu className="h-5 w-5 text-brand-700" />
          <span className="font-bold text-slate-700">APPIPA SOLUTIONS</span>
        </div>
        <p className="text-sm text-slate-500">
          In partnership with Avishkaar Robotics, India — Africa STEM Tour 2026
        </p>
        <p className="mt-2 text-xs text-slate-400">
          © 2026 Appipa Solutions. All rights reserved. ·
          <a href="#" className="ml-1 text-brand-600 hover:underline">Terms</a> ·
          <a href="#" className="ml-1 text-brand-600 hover:underline">Privacy</a> ·
          <a href="#" className="ml-1 text-brand-600 hover:underline">Refund Policy</a>
        </p>
      </div>
    </footer>
  )
}
