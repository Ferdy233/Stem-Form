import React, { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, AlertCircle, Loader2 } from 'lucide-react'
import StepIndicator from './StepIndicator'
import Step1ParticipantInfo from './steps/Step1ParticipantInfo'
import Step2ProfessionalDetails from './steps/Step2ProfessionalDetails'
import Step3STEMExperience from './steps/Step3STEMExperience'
import Step4SlotBooking from './steps/Step4SlotBooking'
import Step5Payment from './steps/Step5Payment'
import Step6Confirmation from './steps/Step6Confirmation'

const PAYSTACK_PUBLIC_KEY = 'pk_test_aa6b6763d1c6dfe3e812692236a89386ee97cf3c'

const PRICING = {
  '17-aug-morning':   { label: '17 Aug — Morning (9:00 AM – 12:00 PM)',   price: 100, kobo: 10000 },
  '17-aug-afternoon': { label: '17 Aug — Afternoon (1:00 PM – 3:00 PM)',  price: 100, kobo: 10000 },
  '18-aug-morning':   { label: '18 Aug — Morning (9:00 AM – 12:00 PM)',   price: 100, kobo: 10000 },
  '18-aug-afternoon': { label: '18 Aug — Afternoon (1:00 PM – 3:00 PM)',  price: 100, kobo: 10000 },
}

const INITIAL_DATA = {
  fullName: '',
  preferredName: '',
  gender: '',
  dateOfBirth: '',
  mobileNumber: '',
  email: '',
  residentialAddress: '',
  organisation: '',
  regionCity: '',
  yearsOfExperience: '',
  websiteSocial: '',
  participantCategory: '',
  otherCategory: '',
  previousSTEM: '',
  experienceLevel: '',
  currentProgrammes: '',
  expectedOutcomes: '',
  applicationPlan: '',
  attendanceDays: '',
  confirmAccurate: false,
  understandNotGuaranteed: false,
  agreeParticipate: false,
  consentPhoto: false,
}

export default function RegistrationForm({ onClose }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState(INITIAL_DATA)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('idle')
  const [registrationId, setRegistrationId] = useState('')
  const [serverError, setServerError] = useState('')

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }, [])

  const validateStep = (stepNum) => {
    const errs = {}
    const d = data

    if (stepNum === 1) {
      if (!d.fullName.trim()) errs.fullName = 'Full name is required'
      if (!d.preferredName.trim()) errs.preferredName = 'Preferred name is required'
      if (!d.gender) errs.gender = 'Please select gender'
      if (!d.dateOfBirth) errs.dateOfBirth = 'Date of birth is required'
      if (!d.mobileNumber.trim()) errs.mobileNumber = 'Mobile number is required'
      if (!d.email.trim()) errs.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errs.email = 'Enter a valid email'
      if (!d.residentialAddress.trim()) errs.residentialAddress = 'Residential address is required'
    }

    if (stepNum === 2) {
      if (!d.organisation.trim()) errs.organisation = 'Organisation is required'
      if (!d.regionCity.trim()) errs.regionCity = 'Region / city is required'
      if (!d.yearsOfExperience) errs.yearsOfExperience = 'Please select years of experience'
      if (!d.participantCategory) errs.participantCategory = 'Please select a category'
      if (d.participantCategory === 'other' && !d.otherCategory.trim()) {
        errs.otherCategory = 'Please specify your category'
      }
    }

    if (stepNum === 3) {
      if (!d.previousSTEM) errs.previousSTEM = 'Please select Yes or No'
      if (!d.experienceLevel) errs.experienceLevel = 'Please select your experience level'
      if (!d.expectedOutcomes.trim()) errs.expectedOutcomes = 'Please tell us your expected outcomes'
      if (!d.applicationPlan.trim()) errs.applicationPlan = 'Please describe how you intend to apply the knowledge'
    }

    if (stepNum === 4) {
      if (!d.attendanceDays) errs.attendanceDays = 'Please select an attendance option'
      if (!d.confirmAccurate || !d.understandNotGuaranteed || !d.agreeParticipate || !d.consentPhoto) {
        errs.declaration = 'Please check all declaration boxes to proceed'
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 6))
    }
  }

  const handlePrev = () => {
    setStep((s) => Math.max(s - 1, 1))
  }

  const handlePay = async () => {
    setSubmitting(true)
    setServerError('')

    try {
      // 1. Initialize Paystack payment (no DB save yet)
      const payRes = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          attendanceDays: data.attendanceDays,
        }),
      })
      const payData = await payRes.json()

      if (!payData.success) {
        throw new Error(payData.error || 'Failed to initialize payment')
      }

      // 2. Open Paystack inline popup
      setPaymentStatus('processing')

      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: data.email,
        amount: PRICING[data.attendanceDays].kobo,
        currency: 'GHS',
        ref: payData.reference,
        onClose: () => {
          setPaymentStatus('idle')
          setSubmitting(false)
        },
        callback: (response) => {
          // 3. Verify payment + save registration to DB
          (async () => {
            try {
              const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  reference: response.reference,
                  registrationData: data,
                }),
              })
              const verifyData = await verifyRes.json()

              if (verifyData.success) {
                setRegistrationId(verifyData.registrationId)
                setPaymentStatus('success')
                setTimeout(() => {
                  setStep(6)
                }, 1000)
              } else {
                setServerError('Payment verification failed. Please contact support.')
                setPaymentStatus('idle')
              }
            } catch (err) {
              setServerError('Payment verification error: ' + err.message)
              setPaymentStatus('idle')
            }
            setSubmitting(false)
          })()
        },
      })

      handler.openIframe()
    } catch (err) {
      setServerError(err.message)
      setPaymentStatus('idle')
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setData(INITIAL_DATA)
    setErrors({})
    setStep(1)
    setPaymentStatus('idle')
    setRegistrationId('')
    setServerError('')
    setSubmitting(false)
  }

  const slot = PRICING[data.attendanceDays] || { label: '', price: 0 }

  return (
    <div>
      {/* Header */}
      <div className="border-b border-stone-200 px-4 sm:px-6 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <img src="/Appipa_logo.png" alt="" className="h-7 w-auto" />
          <span className="text-sm font-bold text-stone-800">STEM Masterclass Registration</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="border-b border-stone-100 px-4 sm:px-6 py-4">
        <StepIndicator currentStep={step} />
      </div>

      {/* Form Content */}
      <div className="max-h-[55vh] sm:max-h-[60vh] overflow-y-auto px-4 sm:px-6 py-6">
        {step === 1 && <Step1ParticipantInfo data={data} errors={errors} onChange={handleChange} />}
        {step === 2 && <Step2ProfessionalDetails data={data} errors={errors} onChange={handleChange} />}
        {step === 3 && <Step3STEMExperience data={data} errors={errors} onChange={handleChange} />}
        {step === 4 && <Step4SlotBooking data={data} errors={errors} onChange={handleChange} />}
        {step === 5 && (
          <Step5Payment
            data={data}
            slot={slot}
            onPay={handlePay}
            paymentStatus={paymentStatus}
            serverError={serverError}
          />
        )}
        {step === 6 && (
          <Step6Confirmation
            data={data}
            registrationId={registrationId}
            onReset={handleReset}
            onClose={onClose}
          />
        )}

        {/* Error banner */}
        {Object.values(errors).some(e => e && e !== '') && step < 5 && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Please fix the highlighted fields before continuing.
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {step < 6 && (
        <div className="flex items-center justify-between border-t border-stone-200 px-4 sm:px-6 py-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1 || submitting}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-stone-600 transition-all hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-stone-800"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <span className="text-xs text-stone-400">
              {paymentStatus === 'processing' ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Processing payment...
                </span>
              ) : (
                'Complete payment to confirm your booking'
              )}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
