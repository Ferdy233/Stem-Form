import React from 'react'
import { Check } from 'lucide-react'

const STEPS = [
  { num: 1, label: 'Student Info' },
  { num: 2, label: 'Parent Info' },
  { num: 3, label: 'Emergency' },
  { num: 4, label: 'Programme' },
  { num: 5, label: 'Interests' },
  { num: 6, label: 'Pickup' },
  { num: 7, label: 'Consent' },
  { num: 8, label: 'Payment' },
  { num: 9, label: 'Confirmation' },
]

export default function StepIndicator({ currentStep, totalSteps = 9 }) {
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
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : currentStep === step.num
                    ? 'border-blue-600 bg-white text-blue-600 ring-4 ring-blue-200'
                    : 'border-blue-200 bg-white text-stone-400')
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
                  (currentStep >= step.num ? 'text-blue-700' : 'text-stone-400')
                }
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={
                  'h-0.5 flex-1 mx-2 transition-all duration-300 ' +
                  (currentStep > step.num ? 'bg-blue-600' : 'bg-blue-200')
                }
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-blue-900">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-stone-500">{STEPS[currentStep - 1]?.label}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-blue-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
