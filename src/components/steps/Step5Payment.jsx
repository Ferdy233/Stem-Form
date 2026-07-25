import React from 'react'
import { Lock, Loader2, Check, Shield, CreditCard, Smartphone } from 'lucide-react'

export default function Step5Payment({ data, slot, onPay, paymentStatus, serverError }) {
  const total = slot.price

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-stone-800">Payment to Confirm Booking</h3>
        <p className="mt-1 text-sm text-stone-500">
          You'll be redirected to Paystack's secure payment page to complete your transaction.
        </p>
      </div>

      {/* Order Summary */}
      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-500">Order Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-600">{slot.label}</span>
            <span className="font-semibold text-stone-800">GHS {slot.price.toFixed(2)}</span>
          </div>
          <div className="border-t border-stone-300 pt-2 flex justify-between">
            <span className="font-bold text-stone-800">Total Due</span>
            <span className="text-lg font-bold text-stone-900">GHS {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Registration recap */}
      <div className="rounded-lg border border-stone-200 p-4 text-sm">
        <div className="grid gap-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
            <span className="text-stone-500">Name</span>
            <span className="font-medium text-stone-800 break-words">{data.fullName}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
            <span className="text-stone-500">Email</span>
            <span className="font-medium text-stone-800 break-all">{data.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
            <span className="text-stone-500">Mobile</span>
            <span className="font-medium text-stone-800">{data.mobileNumber}</span>
          </div>
        </div>
      </div>

      {/* Payment methods info */}
      <div className="rounded-lg border border-stone-200 bg-white p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-500">Accepted Payment Methods</p>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="flex flex-col items-center gap-1.5 rounded-lg border border-stone-200 p-2 sm:p-3">
            <CreditCard className="h-5 w-5 text-stone-600" />
            <span className="text-xs font-medium text-stone-600">Card</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 rounded-lg border border-stone-200 p-2 sm:p-3">
            <Smartphone className="h-5 w-5 text-stone-600" />
            <span className="text-xs font-medium text-stone-600">MoMo</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 rounded-lg border border-stone-200 p-2 sm:p-3">
            <Shield className="h-5 w-5 text-stone-600" />
            <span className="text-xs font-medium text-stone-600">Bank</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-stone-400">
          Paystack supports Visa, Mastercard, MTN MoMo, Telecel Cash, AirtelTigo Money, and bank transfers.
        </p>
      </div>

      {/* Server error */}
      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      {/* Pay Button */}
      <button
        type="button"
        onClick={onPay}
        disabled={paymentStatus === 'processing' || paymentStatus === 'success'}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 px-6 py-3.5 font-semibold text-white transition-all hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {paymentStatus === 'processing' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Opening Payment...
          </>
        ) : paymentStatus === 'success' ? (
          <>
            <Check className="h-5 w-5" />
            Payment Successful
          </>
        ) : (
          <>
            <Lock className="h-5 w-5" />
            Pay GHS {total.toFixed(2)} with Paystack
          </>
        )}
      </button>

      <p className="text-center text-xs text-stone-400">
        Secured by Paystack · By proceeding, you agree to Appipa Solutions' terms and refund policy.
      </p>
    </div>
  )
}
