import { Router } from 'express'
import { query } from '../db.js'
import { sendConfirmationEmail } from '../mailer.js'

const router = Router()

const PAYSTACK_BASE = 'https://api.paystack.co/transaction'
function getSecretKey() { return process.env.PAYSTACK_SECRET_KEY }

const PRICING = {
  '17-aug-morning': 20000,
  '17-aug-afternoon': 20000,
  '18-aug-morning': 20000,
  '18-aug-afternoon': 20000,
}

router.post('/initialize', async (req, res) => {
  try {
    const { email, attendanceDays } = req.body
    const amount = PRICING[attendanceDays] || 0

    if (amount === 0) {
      return res.status(400).json({ success: false, error: 'Invalid attendance option' })
    }

    const reference = `APP-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    const response = await fetch(`${PAYSTACK_BASE}/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getSecretKey()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount,
        currency: 'GHS',
        reference,
        callback_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify`,
        metadata: {
          attendance_days: attendanceDays,
        },
      }),
    })

    const data = await response.json()

    if (!data.status) {
      return res.status(400).json({ success: false, error: data.message })
    }

    res.json({
      success: true,
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
      accessCode: data.data.access_code,
    })
  } catch (err) {
    console.error('Payment init error:', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

router.post('/verify', async (req, res) => {
  try {
    const { reference, registrationData } = req.body

    const response = await fetch(`${PAYSTACK_BASE}/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getSecretKey()}`,
      },
    })

    const data = await response.json()

    console.log('Paystack verify response:', JSON.stringify(data))
    console.log('Secret key present:', !!getSecretKey())

    if (!data.status || data.data.status !== 'success') {
      return res.status(400).json({
        success: false,
        error: 'Payment verification failed',
        status: data.data?.status || data.message || 'unknown',
      })
    }

    // Payment confirmed — now save registration to DB with paid status
    const d = registrationData
    const regId = reference
    const amountPaid = data.data.amount / 100

    console.log('Inserting registration:', {
      regId,
      regIdLength: regId?.length,
      gender: d.gender,
      genderLength: d.gender?.length,
      previousSTEM: d.previousSTEM,
      previousSTEMLength: d.previousSTEM?.length,
      experienceLevel: d.experienceLevel,
      experienceLevelLength: d.experienceLevel?.length,
      attendanceDays: d.attendanceDays,
      attendanceDaysLength: d.attendanceDays?.length,
      yearsOfExperience: d.yearsOfExperience,
      yearsOfExperienceLength: d.yearsOfExperience?.length,
      participantCategory: d.participantCategory,
      participantCategoryLength: d.participantCategory?.length,
    })

    const result = await query(
      `INSERT INTO registrations (
        registration_id, full_name, preferred_name, gender, date_of_birth,
        mobile_number, email, residential_address, organisation,
        region_city, years_of_experience, website_social, participant_category, other_category,
        previous_stem, experience_level, current_programmes, expected_outcomes, application_plan,
        attendance_days, confirm_accurate, understand_not_guaranteed, agree_participate, consent_photo,
        payment_status, payment_reference, amount_paid
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)
      RETURNING id, registration_id`,
      [
        regId,
        d.fullName, d.preferredName, d.gender, d.dateOfBirth,
        d.mobileNumber, d.email, d.residentialAddress,
        d.organisation, d.regionCity,
        d.yearsOfExperience, d.websiteSocial || null,
        d.participantCategory, d.otherCategory || null,
        d.previousSTEM, d.experienceLevel,
        d.currentProgrammes || null, d.expectedOutcomes, d.applicationPlan,
        d.attendanceDays,
        d.confirmAccurate || false, d.understandNotGuaranteed || false,
        d.agreeParticipate || false, d.consentPhoto || false,
        'paid', reference, amountPaid,
      ]
    )

    // Send confirmation email
    try {
      await sendConfirmationEmail({
        ...d,
        registration_id: regId,
        amount_paid: amountPaid,
        attendance_days: d.attendanceDays,
      })
    } catch (emailErr) {
      console.error('Email send error:', emailErr)
    }

    res.json({
      success: true,
      message: 'Payment verified and registration saved',
      registrationId: regId,
      amount: amountPaid,
    })
  } catch (err) {
    console.error('Payment verify error:', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

export default router
