import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

const PRICING = {
  '17-aug-morning': 10000,
  '17-aug-afternoon': 10000,
  '18-aug-morning': 10000,
  '18-aug-afternoon': 10000,
}

function generateRegId() {
  const ts = Date.now().toString().slice(-6)
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `APP-${ts}-${rand}`
}

router.post('/', async (req, res) => {
  try {
    const d = req.body
    const regId = generateRegId()
    const amount = PRICING[d.attendanceDays] || 0

    const result = await query(
      `INSERT INTO registrations (
        registration_id, full_name, preferred_name, gender, date_of_birth,
        mobile_number, email, residential_address, organisation,
        region_city, years_of_experience, website_social, participant_category, other_category,
        previous_stem, experience_level, current_programmes, expected_outcomes, application_plan,
        attendance_days, confirm_accurate, understand_not_guaranteed, agree_participate, consent_photo,
        payment_status, amount_paid
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)
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
        'pending', amount / 100,
      ]
    )

    res.json({
      success: true,
      registrationId: result.rows[0].registration_id,
      amount,
      email: d.email,
    })
  } catch (err) {
    console.error('Registration error:', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

router.get('/slots', async (req, res) => {
  try {
    const result = await query(
      `SELECT attendance_days, COUNT(*) as booked
       FROM registrations
       WHERE payment_status = 'paid'
       GROUP BY attendance_days`
    )

    const counts = {
      '17-aug-morning': 0,
      '17-aug-afternoon': 0,
      '18-aug-morning': 0,
      '18-aug-afternoon': 0,
    }
    result.rows.forEach((row) => {
      counts[row.attendance_days] = parseInt(row.booked)
    })

    res.json({ success: true, slots: counts, totalSeats: 50 })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

router.get('/:regId', async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM registrations WHERE registration_id = $1`,
      [req.params.regId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Registration not found' })
    }

    res.json({ success: true, registration: result.rows[0] })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

export default router
