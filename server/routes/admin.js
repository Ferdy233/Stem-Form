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

    const escapeAsText = (val) => {
      if (val === null || val === undefined) return ''
      const str = String(val).replace(/"/g, '""')
      return `="${str}"`
    }

    const csvLines = [headers.join(',')]

    rows.forEach((row) => {
      const attendanceLabel = SLOT_LABELS[row.attendance_days] || row.attendance_days
      const csvRow = [
        escapeCSV(row.registration_id),
        escapeCSV(row.full_name),
        escapeCSV(row.preferred_name),
        escapeCSV(row.gender),
        escapeCSV(row.date_of_birth ? new Date(row.date_of_birth).toISOString().split('T')[0] : ''),
        escapeAsText(row.mobile_number),
        escapeCSV(row.email),
        escapeCSV(row.residential_address),
        escapeCSV(row.organisation),
        escapeCSV(row.region_city),
        escapeCSV(row.years_of_experience),
        escapeCSV(row.website_social),
        escapeCSV(row.participant_category),
        escapeCSV(row.other_category),
        escapeCSV(row.previous_stem),
        escapeCSV(row.experience_level),
        escapeCSV(row.current_programmes),
        escapeCSV(row.expected_outcomes),
        escapeCSV(row.application_plan),
        escapeCSV(attendanceLabel),
        escapeCSV(row.confirm_accurate ? 'Yes' : 'No'),
        escapeCSV(row.understand_not_guaranteed ? 'Yes' : 'No'),
        escapeCSV(row.agree_participate ? 'Yes' : 'No'),
        escapeCSV(row.consent_photo ? 'Yes' : 'No'),
        escapeCSV(row.payment_status),
        escapeCSV(row.payment_reference),
        escapeCSV(row.amount_paid),
        escapeCSV(row.created_at ? new Date(row.created_at).toISOString() : ''),
      ].join(',')
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

router.get('/today', async (req, res) => {
  try {
    const token = req.query.token || req.headers.authorization?.replace('Bearer ', '')
    if (token !== ADMIN_TOKEN) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }

    const today = new Date().toISOString().split('T')[0]
    const result = await query(
      `SELECT full_name, mobile_number, email, attendance_days, created_at
       FROM registrations
       WHERE payment_status = 'paid'
       AND DATE(created_at) = $1
       ORDER BY attendance_days, created_at ASC`,
      [today]
    )

    const grouped = {
      '17-aug-morning': [],
      '17-aug-afternoon': [],
      '18-aug-morning': [],
      '18-aug-afternoon': [],
    }

    result.rows.forEach((row) => {
      const slot = row.attendance_days
      if (grouped[slot]) {
        grouped[slot].push({
          name: row.full_name,
          phone: row.mobile_number,
          email: row.email,
          time: new Date(row.created_at).toLocaleTimeString(),
        })
      }
    })

    res.json({ success: true, date: today, grouped })
  } catch (err) {
    console.error('Today export error:', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

router.get('/contacts', async (req, res) => {
  try {
    const token = req.query.token || req.headers.authorization?.replace('Bearer ', '')
    if (token !== ADMIN_TOKEN) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }

    const slot = req.query.slot
    let queryText = `SELECT full_name, mobile_number FROM registrations WHERE payment_status = 'paid'`
    const params = []

    if (slot) {
      queryText += ` AND attendance_days = $1`
      params.push(slot)
    }

    queryText += ` ORDER BY created_at ASC`

    const result = await query(queryText, params)

    const escapeAsText = (val) => {
      if (val === null || val === undefined) return ''
      const str = String(val).replace(/"/g, '""')
      return `="${str}"`
    }

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return ''
      const str = String(val)
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }

    const headers = ['Full Name', 'Mobile Number']
    const csvLines = [headers.join(',')]

    result.rows.forEach((row) => {
      csvLines.push([
        escapeCSV(row.full_name),
        escapeAsText(row.mobile_number),
      ].join(','))
    })

    const csv = csvLines.join('\n')
    const dateStr = new Date().toISOString().split('T')[0]

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="contacts-${dateStr}.csv"`)
    res.send(csv)
  } catch (err) {
    console.error('Contacts export error:', err)
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
