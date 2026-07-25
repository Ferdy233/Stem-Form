import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

const SLOT_LABELS = {
  '17-aug-morning': '17 Aug — Morning (9:00 AM – 12:00 PM)',
  '17-aug-afternoon': '17 Aug — Afternoon (1:00 PM – 3:00 PM)',
  '18-aug-morning': '18 Aug — Morning (9:00 AM – 12:00 PM)',
  '18-aug-afternoon': '18 Aug — Afternoon (1:00 PM – 3:00 PM)',
}

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'appipa-admin-2026'

router.get('/export', async (req, res) => {
  try {
    const token = req.query.token || req.headers.authorization?.replace('Bearer ', '')
    if (token !== ADMIN_TOKEN) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }

    const result = await query(
      `SELECT * FROM registrations ORDER BY created_at ASC`
    )

    const rows = result.rows

    const headers = [
      'Registration ID',
      'Full Name',
      'Preferred Name',
      'Gender',
      'Date of Birth',
      'Mobile Number',
      'Email',
      'Residential Address',
      'Organisation',
      'Region/City',
      'Years of Experience',
      'Website/Social',
      'Participant Category',
      'Other Category',
      'Previous STEM',
      'Experience Level',
      'Current Programmes',
      'Expected Outcomes',
      'Application Plan',
      'Attendance Days',
      'Confirm Accurate',
      'Understand Not Guaranteed',
      'Agree Participate',
      'Consent Photo',
      'Payment Status',
      'Payment Reference',
      'Amount Paid (GHS)',
      'Registered At',
    ]

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return ''
      const str = String(val)
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }

    const csvLines = [headers.join(',')]

    rows.forEach((row) => {
      const attendanceLabel = SLOT_LABELS[row.attendance_days] || row.attendance_days
      const csvRow = [
        row.registration_id,
        row.full_name,
        row.preferred_name,
        row.gender,
        row.date_of_birth ? new Date(row.date_of_birth).toISOString().split('T')[0] : '',
        row.mobile_number,
        row.email,
        row.residential_address,
        row.organisation,
        row.region_city,
        row.years_of_experience,
        row.website_social,
        row.participant_category,
        row.other_category,
        row.previous_stem,
        row.experience_level,
        row.current_programmes,
        row.expected_outcomes,
        row.application_plan,
        attendanceLabel,
        row.confirm_accurate ? 'Yes' : 'No',
        row.understand_not_guaranteed ? 'Yes' : 'No',
        row.agree_participate ? 'Yes' : 'No',
        row.consent_photo ? 'Yes' : 'No',
        row.payment_status,
        row.payment_reference,
        row.amount_paid,
        row.created_at ? new Date(row.created_at).toISOString() : '',
      ].map(escapeCSV).join(',')
      csvLines.push(csvRow)
    })

    const csv = csvLines.join('\n')
    const dateStr = new Date().toISOString().split('T')[0]

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="registrations-${dateStr}.csv"`)
    res.send(csv)
  } catch (err) {
    console.error('Export error:', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

router.get('/stats', async (req, res) => {
  try {
    const token = req.query.token || req.headers.authorization?.replace('Bearer ', '')
    if (token !== ADMIN_TOKEN) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }

    const totalResult = await query(`SELECT COUNT(*) as total FROM registrations`)
    const paidResult = await query(`SELECT COUNT(*) as paid FROM registrations WHERE payment_status = 'paid'`)
    const slotResult = await query(
      `SELECT attendance_days, COUNT(*) as count FROM registrations WHERE payment_status = 'paid' GROUP BY attendance_days`
    )

    const slots = {}
    slotResult.rows.forEach((r) => {
      slots[r.attendance_days] = parseInt(r.count)
    })

    res.json({
      success: true,
      total: parseInt(totalResult.rows[0].total),
      paid: parseInt(paidResult.rows[0].paid),
      slots,
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

export default router
