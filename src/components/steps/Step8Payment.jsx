import React from 'react'
import { Lock, Loader2, Check, CreditCard, Smartphone, Wallet } from 'lucide-react'

export default function Step8Payment({ data, onPay, paymentStatus, serverError }) {
  const paymentOptions = [
    {
      value: 'pay_now',
      label: 'Pay Now',
      description: 'Pay GHS 500 online with Paystack (Card, MoMo, Bank)',
      icon: CreditCard,
    },
    {
      value: 'pay_later',
      label: 'Pay Later',
      description: 'Pay in person at BTL office (Spintex Road, Rainbow)',
      icon: Wallet,
    },
  ]

  const isProcessing = paymentStatus === 'processing'
  const isSuccess = paymentStatus === 'success'

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-blue-900">8. Payment</h3>
        <p className="text-sm text-stone-500 mt-1">
          Choose how you'd like to pay the monthly fee of GHS 500.
        </p>
      </div>

      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {isSuccess ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
          <Check className="mx-auto h-12 w-12 text-green-600" />
          <h4 className="mt-2 font-bold text-green-800">Registration Successful!</h4>
          <p className="mt-1 text-sm text-green-700">
            {data.paymentOption === 'pay_now' 
              ? 'Payment confirmed. Registration is complete.'
              : 'Registration submitted. Please pay GHS 500 in person at BTL office.'}
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-blue-700">
              Payment Option
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {paymentOptions.map((option) => {
                const Icon = option.icon
                const isSelected = data.paymentOption === option.value
                return (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-100'
                        : 'border-blue-200 bg-white hover:border-blue-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      value={option.value}
                      checked={isSelected}
                      onChange={(e) => onPay?.('select', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-blue-600" />
                      <div>
                        <h5 className="font-semibold text-blue-900">{option.label}</h5>
                        <p className="mt-0.5 text-xs text-stone-600">{option.description}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="absolute right-3 top-3 h-5 w-5 text-blue-600" />
                    )}
                  </label>
                )
              })}
            </div>
          </div>

          <div className="flex justify-center gap-4 text-sm text-stone-500">
            <div className="flex items-center gap-1.5">
              <CreditCard className="h-4 w-4" />
              <span>Card</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Smartphone className="h-4 w-4" />
              <span>MoMo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wallet className="h-4 w-4" />
              <span>Bank</span>
            </div>
          </div>

          <button
            onClick={() => onPay?.('submit')}
            disabled={!data.paymentOption || isProcessing}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                Complete Registration
              </span>
            )}
          </button>

          <p className="text-center text-xs text-stone-400">
            Secure payment powered by Paystack
          </p>
        </>
      )}
    </div>
  )
}
