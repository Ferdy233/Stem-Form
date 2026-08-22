import { Router } from 'express'
import { query } from '../db.js'
import { sendConfirmationEmail } from '../mailer.js'

const router = Router()

const PAYSTACK_BASE = 'https://api.paystack.co/transaction'
function getSecretKey() { return process.env.PAYSTACK_SECRET_KEY }

const MONTHLY_FEE = 50000 // 500 GHS in kobo

router.post('/initialize', async (req, res) => {
  try {
    const { email } = req.body
    const amount = MONTHLY_FEE

    const reference = `BTL-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

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
          programme: 'btl_student_admission',
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
    const { reference, registrationId } = req.body

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

    // Payment confirmed — update existing registration to paid status
    const amountPaid = data.data.amount / 100

    const result = await query(
      `UPDATE registrations
       SET payment_status = 'paid', payment_reference = $1, amount_paid = $2, updated_at = NOW()
       WHERE registration_id = $3
       RETURNING *`,
      [reference, amountPaid, registrationId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Registration not found' })
    }

    const registration = result.rows[0]

    // Send confirmation email
    try {
      await sendConfirmationEmail({
        student_full_name: registration.student_full_name,
        parent_email: registration.parent_email,
        registration_id: registrationId,
        amount_paid: amountPaid,
        programme_type: registration.programme_type,
      })
    } catch (emailErr) {
      console.error('Email send error:', emailErr)
    }

    res.json({
      success: true,
      message: 'Payment verified and registration updated',
      registrationId,
      amount: amountPaid,
    })
  } catch (err) {
    console.error('Payment verify error:', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

export default router
