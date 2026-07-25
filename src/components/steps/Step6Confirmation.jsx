import React from 'react'
import { CheckCircle, Calendar, MapPin, Download, Home, Mail } from 'lucide-react'

export default function Step6Confirmation({ data, registrationId, onReset, onClose }) {
  const slotLabels = {
    '17-aug-morning': '17 August 2026 — Morning (9:00 AM – 12:00 PM)',
    '17-aug-afternoon': '17 August 2026 — Afternoon (1:00 PM – 3:00 PM)',
    '18-aug-morning': '18 August 2026 — Morning (9:00 AM – 12:00 PM)',
    '18-aug-afternoon': '18 August 2026 — Afternoon (1:00 PM – 3:00 PM)',
  }

  return (
    <div className="animate-slide-up flex flex-col items-center py-6 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>

      <h3 className="text-xl font-bold text-stone-800">Registration Confirmed!</h3>
      <p className="mt-2 max-w-md text-sm text-stone-500">
        Thank you, <span className="font-semibold text-stone-700">{data.preferredName || data.fullName}</span>.
        Your booking for the STEM Leadership Masterclass & Implementation Workshop has been confirmed.
        A confirmation email has been sent to <span className="font-semibold text-stone-900">{data.email}</span>.
      </p>

      {/* Registration ID Card */}
      <div className="mt-5 w-full rounded-lg border border-stone-300 bg-stone-50 p-4 sm:p-5">
        <div className="flex flex-col gap-3 border-b border-stone-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400">Registration ID</p>
            <p className="text-lg font-bold text-stone-900">{registrationId}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-stone-400">Status</p>
            <p className="text-sm font-bold text-green-600">Confirmed & Paid</p>
          </div>
        </div>

        <div className="mt-3 space-y-2.5 text-left">
          <div className="flex items-start sm:items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 shrink-0 text-stone-500 mt-0.5 sm:mt-0" />
            <div className="min-w-0">
              <p className="text-stone-400 text-xs">Event Date(s)</p>
              <p className="font-semibold text-stone-700 break-words">{slotLabels[data.attendanceDays]}</p>
            </div>
          </div>
          <div className="flex items-start sm:items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 shrink-0 text-stone-500 mt-0.5 sm:mt-0" />
            <div className="min-w-0">
              <p className="text-stone-400 text-xs">Venue</p>
              <p className="font-semibold text-stone-700">Kofi Annan Centre of Excellence in ICT, Accra</p>
            </div>
          </div>
          <div className="flex items-start sm:items-center gap-3 text-sm">
            <Mail className="h-4 w-4 shrink-0 text-stone-500 mt-0.5 sm:mt-0" />
            <div className="min-w-0">
              <p className="text-stone-400 text-xs">Participant</p>
              <p className="font-semibold text-stone-700 break-words">{data.fullName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="mt-5 w-full rounded-lg border border-stone-200 bg-white p-4 text-left">
        <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-500">What happens next?</h4>
        <ul className="space-y-1.5 text-sm text-stone-600">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-stone-400">•</span>
            You'll receive a detailed email with the full programme schedule and joining instructions.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-stone-400">•</span>
            Bring your registration ID and a valid ID on the event day.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-stone-400">•</span>
            A free robotics kit will be provided at the venue for practical sessions.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-stone-400">•</span>
            STEM.org certificate will be issued upon successful completion.
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-all hover:bg-stone-50"
        >
          <Download className="h-4 w-4" />
          Print Confirmation
        </button>
        <button
          type="button"
          onClick={onClose || onReset}
          className="flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-stone-800"
        >
          <Home className="h-4 w-4" />
          Close
        </button>
      </div>
    </div>
  )
}
