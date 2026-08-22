import React from 'react'
import { Check, Calendar, MapPin, Phone, Mail, CreditCard } from 'lucide-react'

export default function Step9Confirmation({ data, registrationId }) {
  const programmeLabels = {
    'weekend_robotics': 'Weekend Robotics & Coding Class',
    'saturday_online': 'Saturday Online Class',
    'holiday_intensive': 'Holiday / Intensive STEM Programme',
    'other': data.programmeOther || 'Other',
  }

  const programmeLabel = programmeLabels[data.programmeType] || data.programmeType

  return (
    <div className="animate-fade-in space-y-5">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-800">Registration Successful!</h3>
        <p className="mt-2 text-sm text-stone-600">
          {data.paymentOption === 'pay_now' 
            ? 'Payment confirmed. Your child is enrolled.'
            : 'Registration submitted. Please pay GHS 500 in person at BTL office.'}
        </p>
      </div>

      <div className="mt-5 w-full rounded-lg border border-blue-300 bg-blue-50 p-4 sm:p-5">
        <div className="flex flex-col gap-3 border-b border-blue-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-blue-600">Registration ID</p>
            <p className="font-mono text-lg font-bold text-blue-900">{registrationId}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-600">Status</p>
            <p className="font-semibold text-green-700">
              {data.paymentOption === 'pay_now' ? 'Paid' : 'Pending Payment'}
            </p>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 text-sm">
            <Calendar className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
            <div className="min-w-0">
              <p className="text-blue-600 text-xs">Student Name</p>
              <p className="font-semibold text-blue-900 break-words">{data.studentFullName}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Phone className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
            <div className="min-w-0">
              <p className="text-blue-600 text-xs">Parent Phone</p>
              <p className="font-semibold text-blue-900 break-words">{data.primaryPhone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Mail className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
            <div className="min-w-0">
              <p className="text-blue-600 text-xs">Parent Email</p>
              <p className="font-semibold text-blue-900 break-all">{data.parentEmail}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <CreditCard className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
            <div className="min-w-0">
              <p className="text-blue-600 text-xs">Programme</p>
              <p className="font-semibold text-blue-900 break-words">{programmeLabel}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 bg-white p-4 text-sm">
        <h4 className="mb-2 font-bold text-blue-900">What's Next?</h4>
        <ul className="space-y-1.5 text-stone-600">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
            <span>You'll receive a confirmation email at {data.parentEmail}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
            <span>Bring your Registration ID on the first day of class</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
            <span>
              {data.paymentOption === 'pay_now' 
                ? 'Payment confirmed. All set!'
                : 'Please pay GHS 500 at BTL office: Spintex Road, Rainbow'}
            </span>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-bold text-blue-900">Contact Information</h4>
        <div className="space-y-1 text-sm text-stone-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span>Spintex Road, Rainbow, Accra</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-blue-600" />
            <span>059 197 2399</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-600" />
            <span>www.bonwiretechlab.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}
