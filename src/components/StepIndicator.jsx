import React from 'react'
import { Check } from 'lucide-react'

const STEPS = [
  { num: 1, label: 'Participant Info' },
  { num: 2, label: 'Professional Details' },
  { num: 3, label: 'STEM Experience' },
  { num: 4, label: 'Slot Booking' },
  { num: 5, label: 'Payment' },
  { num: 6, label: 'Confirmation' },
]

export default function StepIndicator({ currentStep }) {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between">
        {STEPS.map((step, idx) => (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ' +
                  (currentStep > step.num
                    ? 'border-stone-800 bg-stone-800 text-white'
                    : currentStep === step.num
                    ? 'border-stone-800 bg-white text-stone-800 ring-4 ring-stone-200'
                    : 'border-stone-300 bg-white text-stone-400')
                }
              >
                {currentStep > step.num ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.num
                )}
              </div>
              <span
                className={
                  'text-xs font-medium ' +
                  (currentStep >= step.num ? 'text-stone-700' : 'text-stone-400')
                }
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={
                  'h-0.5 flex-1 mx-2 transition-all duration-300 ' +
                  (currentStep > step.num ? 'bg-stone-800' : 'bg-stone-200')
                }
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-stone-800">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="text-sm text-stone-500">{STEPS[currentStep - 1]?.label}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-stone-800 transition-all duration-500"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
