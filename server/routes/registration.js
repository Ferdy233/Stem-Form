import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

const MONTHLY_FEE = 50000 // 500 GHS in kobo

function generateRegId() {
  const ts = Date.now().toString().slice(-6)
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `BTL-${ts}-${rand}`
}

router.post('/', async (req, res) => {
  try {
    const d = req.body
    const regId = generateRegId()
    
    // If paying now, amount is 500 GHS, otherwise 0
    const amount = d.paymentOption === 'pay_now' ? MONTHLY_FEE : 0
    const paymentStatus = d.paymentOption === 'pay_now' ? 'pending' : 'pending_later'

    const result = await query(
      `INSERT INTO registrations (
        registration_id,
        student_full_name, date_of_birth, age, gender, school, class_grade, nationality, home_address,
        parent_full_name, parent_relationship, primary_phone, alternative_phone, parent_email, parent_address,
        emergency_name, emergency_phone, emergency_relationship, medical_notes,
        programme_type, programme_other, preferred_start_date, preferred_mode, previous_experience,
        interests, student_goals, learning_preferences,
        pickup_person_1, pickup_phone_1, pickup_person_2, pickup_phone_2, may_leave_alone,
        consent_declaration, consent_media, consent_communication,
        payment_option, payment_status, amount_paid
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38)
      RETURNING id, registration_id`,
      [
        regId,
        d.studentFullName, d.dateOfBirth, d.age, d.gender, d.school, d.classGrade, d.nationality, d.homeAddress,
        d.parentFullName, d.parentRelationship, d.primaryPhone, d.alternativePhone || null, d.parentEmail, d.parentAddress,
        d.emergencyName, d.emergencyPhone, d.emergencyRelationship, d.medicalNotes || null,
        d.programmeType, d.programmeOther || null, d.preferredStartDate || null, d.preferredMode, d.previousExperience,
        d.interests || [], d.studentGoals || null, d.learningPreferences || null,
        d.pickupPerson1, d.pickupPhone1, d.pickupPerson2 || null, d.pickupPhone2 || null, d.mayLeaveAlone || false,
        d.consentDeclaration || false, d.consentMedia || false, d.consentCommunication || false,
        d.paymentOption, paymentStatus, amount / 100,
      ]
    )

    res.json({
      success: true,
      registrationId: result.rows[0].registration_id,
      amount,
      email: d.parentEmail,
      paymentOption: d.paymentOption,
    })
  } catch (err) {
    console.error('Registration error:', err)
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
