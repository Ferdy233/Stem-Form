import React, { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, AlertCircle, Loader2 } from 'lucide-react'
import StepIndicator from './StepIndicator'
import Step1StudentInfo from './steps/Step1StudentInfo'
import Step2ParentInfo from './steps/Step2ParentInfo'
import Step3EmergencyContact from './steps/Step3EmergencyContact'
import Step4ProgrammeEnrolment from './steps/Step4ProgrammeEnrolment'
import Step5LearningInterests from './steps/Step5LearningInterests'
import Step6PickupAttendance from './steps/Step6PickupAttendance'
import Step7Consent from './steps/Step7Consent'
import Step8Payment from './steps/Step8Payment'
import Step9Confirmation from './steps/Step9Confirmation'

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_aa6b6763d1c6dfe3e812692236a89386ee97cf3c'

const INITIAL_DATA = {
  // Student Info
  studentFullName: '',
  dateOfBirth: '',
  age: '',
  gender: '',
  school: '',
  classGrade: '',
  nationality: '',
  homeAddress: '',
  // Parent Info
  parentFullName: '',
  parentRelationship: '',
  primaryPhone: '',
  alternativePhone: '',
  parentEmail: '',
  parentAddress: '',
  // Emergency
  emergencyName: '',
  emergencyPhone: '',
  emergencyRelationship: '',
  medicalNotes: '',
  // Programme
  programmeType: '',
  programmeOther: '',
  preferredStartDate: '',
  preferredMode: '',
  previousExperience: '',
  // Interests
  interests: [],
  studentGoals: '',
  learningPreferences: '',
  // Pickup
  pickupPerson1: '',
  pickupPhone1: '',
  pickupPerson2: '',
  pickupPhone2: '',
  mayLeaveAlone: false,
  // Consent
  consentDeclaration: false,
  consentMedia: false,
  consentCommunication: false,
  // Payment
  paymentOption: '',
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
      if (!d.studentFullName.trim()) errs.studentFullName = 'Full name is required'
      if (!d.dateOfBirth) errs.dateOfBirth = 'Date of birth is required'
      if (!d.age) errs.age = 'Age is required'
      if (!d.gender) errs.gender = 'Please select gender'
      if (!d.school.trim()) errs.school = 'School is required'
      if (!d.classGrade.trim()) errs.classGrade = 'Class/grade is required'
      if (!d.nationality.trim()) errs.nationality = 'Nationality is required'
      if (!d.homeAddress.trim()) errs.homeAddress = 'Home address is required'
    }

    if (stepNum === 2) {
      if (!d.parentFullName.trim()) errs.parentFullName = 'Parent name is required'
      if (!d.parentRelationship.trim()) errs.parentRelationship = 'Relationship is required'
      if (!d.primaryPhone.trim()) errs.primaryPhone = 'Primary phone is required'
      if (d.parentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.parentEmail)) {
        errs.parentEmail = 'Enter a valid email'
      }
      if (!d.parentAddress.trim()) errs.parentAddress = 'Address is required'
    }

    if (stepNum === 3) {
      if (!d.emergencyName.trim()) errs.emergencyName = 'Emergency name is required'
      if (!d.emergencyPhone.trim()) errs.emergencyPhone = 'Emergency phone is required'
      if (!d.emergencyRelationship.trim()) errs.emergencyRelationship = 'Relationship is required'
    }

    if (stepNum === 4) {
      if (!d.programmeType) errs.programmeType = 'Please select a programme'
      if (d.programmeType === 'other' && !d.programmeOther.trim()) {
        errs.programmeOther = 'Please specify the programme'
      }
      if (!d.preferredMode) errs.preferredMode = 'Please select preferred mode'
      if (!d.previousExperience) errs.previousExperience = 'Please select experience level'
    }

    if (stepNum === 7) {
      if (!d.consentDeclaration || !d.consentMedia || !d.consentCommunication) {
        errs.declaration = 'Please accept all consent declarations'
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 9))
    }
  }

  const handlePrev = () => {
    setStep((s) => Math.max(s - 1, 1))
  }

  const handlePay = async (action, value) => {
    if (action === 'select') {
      setData((prev) => ({ ...prev, paymentOption: value }))
      return
    }

    if (action === 'submit') {
      if (!validateStep(7)) {
        setStep(7)
        return
      }

      setSubmitting(true)
      setServerError('')

      try {
        if (data.paymentOption === 'pay_now') {
          // Pay Now flow: Initialize Paystack
          const payRes = await fetch('/api/payment/initialize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: data.parentEmail,
            }),
          })
          const payData = await payRes.json()

          if (!payData.success) {
            throw new Error(payData.error || 'Failed to initialize payment')
          }

          setPaymentStatus('processing')

          const handler = window.PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email: data.parentEmail,
            amount: 50000, // 500 GHS in kobo
            currency: 'GHS',
            ref: payData.reference,
            onClose: () => {
              setPaymentStatus('idle')
              setSubmitting(false)
            },
            callback: (response) => {
              (async () => {
                try {
                  // First, save registration to DB
                  const regRes = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                  })
                  const regData = await regRes.json()

                  if (!regData.success) {
                    throw new Error(regData.error || 'Registration failed')
                  }

                  // Then verify payment
                  const verifyRes = await fetch('/api/payment/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      reference: response.reference,
                      registrationId: regData.registrationId,
                    }),
                  })
                  const verifyData = await verifyRes.json()

                  if (verifyData.success) {
                    setRegistrationId(regData.registrationId)
                    setPaymentStatus('success')
                    setTimeout(() => {
                      setStep(9)
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
        } else {
          // Pay Later flow: Save registration without payment
          const regRes = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
          const regData = await regRes.json()

          if (regData.success) {
            setRegistrationId(regData.registrationId)
            setPaymentStatus('success')
            setTimeout(() => {
              setStep(9)
            }, 1000)
          } else {
            setServerError(regData.error || 'Registration failed')
          }
          setSubmitting(false)
        }
      } catch (err) {
        setServerError(err.message)
        setPaymentStatus('idle')
        setSubmitting(false)
      }
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

  return (
    <div>
      {/* Header */}
      <div className="border-b border-blue-200 px-4 sm:px-6 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <img src="/BTL_Logo.png" alt="" className="h-7 w-auto" />
          <span className="text-sm font-bold text-blue-900">BTL Student Admission</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="border-b border-blue-100 px-4 sm:px-6 py-4">
        <StepIndicator currentStep={step} totalSteps={9} />
      </div>

      {/* Form Content */}
      <div className="max-h-[55vh] sm:max-h-[60vh] overflow-y-auto px-4 sm:px-6 py-6">
        {step === 1 && <Step1StudentInfo data={data} errors={errors} onChange={handleChange} />}
        {step === 2 && <Step2ParentInfo data={data} errors={errors} onChange={handleChange} />}
        {step === 3 && <Step3EmergencyContact data={data} errors={errors} onChange={handleChange} />}
        {step === 4 && <Step4ProgrammeEnrolment data={data} errors={errors} onChange={handleChange} />}
        {step === 5 && <Step5LearningInterests data={data} errors={errors} onChange={handleChange} />}
        {step === 6 && <Step6PickupAttendance data={data} errors={errors} onChange={handleChange} />}
        {step === 7 && <Step7Consent data={data} errors={errors} onChange={handleChange} />}
        {step === 8 && (
          <Step8Payment
            data={data}
            onPay={handlePay}
            paymentStatus={paymentStatus}
            serverError={serverError}
          />
        )}
        {step === 9 && (
          <Step9Confirmation
            data={data}
            registrationId={registrationId}
          />
        )}

        {/* Error banner */}
        {Object.values(errors).some(e => e && e !== '') && step < 8 && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Please fix the highlighted fields before continuing.
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {step < 9 && (
        <div className="flex items-center justify-between border-t border-blue-200 px-4 sm:px-6 py-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1 || submitting}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-stone-600 transition-all hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          {step < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : step === 7 ? (
            <button
              type="button"
              onClick={() => setStep(8)}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
            >
              Continue to Payment
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <span className="text-xs text-stone-400">
              {paymentStatus === 'processing' ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Processing...
                </span>
              ) : (
                'Complete registration'
              )}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
