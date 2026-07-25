import React, { useState, useEffect } from 'react'
import { Users, Check, Clock, Calendar } from 'lucide-react'

const SLOTS = [
  { value: '17-aug-morning',   day: 'Day 1 — 17 August 2026', time: '9:00 AM – 12:00 PM',  period: 'Morning',   price: 100 },
  { value: '17-aug-afternoon', day: 'Day 1 — 17 August 2026', time: '1:00 PM – 3:00 PM',   period: 'Afternoon', price: 100 },
  { value: '18-aug-morning',   day: 'Day 2 — 18 August 2026', time: '9:00 AM – 12:00 PM',  period: 'Morning',   price: 100 },
  { value: '18-aug-afternoon', day: 'Day 2 — 18 August 2026', time: '1:00 PM – 3:00 PM',   period: 'Afternoon', price: 100 },
]

const TOTAL_SEATS = 50

export default function Step4SlotBooking({ data, errors, onChange }) {
  const [bookedCounts, setBookedCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/register/slots')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setBookedCounts(d.slots)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-stone-800">Slot Booking</h3>
        <p className="text-sm text-stone-500 mt-1">
          Select one session to attend. Each session has 50 seats. Booking is confirmed upon payment.
        </p>
      </div>

      <div className="grid gap-3">
        {SLOTS.map((slot) => {
          const booked = bookedCounts[slot.value] || 0
          const seatsLeft = TOTAL_SEATS - booked
          const fillPercent = (booked / TOTAL_SEATS) * 100
          const isSelected = data.attendanceDays === slot.value
          const isFull = seatsLeft <= 0

          return (
            <label
              key={slot.value}
              className={
                'relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ' +
                (isSelected
                  ? 'border-stone-900 bg-stone-50'
                  : isFull
                  ? 'border-stone-200 bg-stone-100 opacity-60 cursor-not-allowed'
                  : 'border-stone-200 bg-white hover:border-stone-400')
              }
            >
              <div className="flex items-start justify-between gap-2 sm:gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ' +
                      (isSelected
                        ? 'border-stone-900 bg-stone-900'
                        : 'border-stone-300 bg-white')
                    }
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                      <h4 className="font-bold text-stone-800 text-sm sm:text-base">{slot.day}</h4>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                      <span className="text-xs sm:text-sm font-medium text-stone-600">{slot.period} — {slot.time}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-stone-500">
                      <Users className="h-3.5 w-3.5 shrink-0" />
                      {isFull ? (
                        <span className="font-semibold text-red-500">Fully booked</span>
                      ) : (
                        <span>{seatsLeft} seat{seatsLeft !== 1 ? 's' : ''} left</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg sm:text-xl font-bold text-stone-900">GHS {slot.price}</p>
                </div>
              </div>

              {!isFull && (
                <input
                  type="radio"
                  name="attendanceDays"
                  value={slot.value}
                  checked={isSelected}
                  onChange={onChange}
                  className="sr-only"
                  disabled={isFull}
                />
              )}

              {/* Seat availability bar */}
              <div className="mt-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
                  <div
                    className={
                      'h-full rounded-full transition-all ' +
                      (fillPercent >= 100 ? 'bg-red-500' : fillPercent > 80 ? 'bg-amber-500' : 'bg-green-600')
                    }
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-stone-400">
                  {booked} / {TOTAL_SEATS} booked
                </p>
              </div>
            </label>
          )
        })}
      </div>

      {errors.attendanceDays && (
        <p className="text-xs text-red-500 font-medium">{errors.attendanceDays}</p>
      )}

      {/* Declaration checkboxes */}
      <div className="mt-6 rounded-lg bg-stone-50 p-4">
        <h4 className="mb-3 text-sm font-bold text-stone-700">Declaration & Consent</h4>
        <div className="space-y-3">
          {[
            { key: 'confirmAccurate', text: 'I confirm that the information provided in this form is accurate.' },
            { key: 'understandNotGuaranteed', text: 'I understand that registration does not guarantee a seat until officially confirmed by Appipa Solutions.' },
            { key: 'agreeParticipate', text: 'I agree to participate fully in the practical sessions and complete the programme requirements for certification.' },
            { key: 'consentPhoto', text: 'I consent to photographs and videos taken during the event being used for programme reporting and promotion.' },
          ].map((item) => (
            <label
              key={item.key}
              className="flex cursor-pointer items-start gap-3 text-sm text-stone-600"
            >
              <input
                type="checkbox"
                name={item.key}
                checked={data[item.key] || false}
                onChange={onChange}
                className="mt-0.5 h-4 w-4 shrink-0 accent-stone-800"
              />
              {item.text}
            </label>
          ))}
        </div>
        {errors.declaration && (
          <p className="mt-2 text-xs text-red-500 font-medium">{errors.declaration}</p>
        )}
      </div>
    </div>
  )
}
