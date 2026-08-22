import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

const PROGRAMME_LABELS = {
  'weekend_robotics': 'Weekend Robotics & Coding Class',
  'saturday_online': 'Saturday Online Class',
  'holiday_intensive': 'Holiday / Intensive STEM Programme',
  'other': 'Other',
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
      'Student Full Name',
      'Date of Birth',
      'Age',
      'Gender',
      'School',
      'Class/Grade',
      'Nationality',
      'Home Address',
      'Parent Full Name',
      'Parent Relationship',
      'Primary Phone',
      'Alternative Phone',
      'Parent Email',
      'Parent Address',
      'Emergency Name',
      'Emergency Phone',
      'Emergency Relationship',
      'Medical Notes',
      'Programme Type',
      'Programme Other',
      'Preferred Start Date',
      'Preferred Mode',
      'Previous Experience',
      'Interests',
      'Student Goals',
      'Learning Preferences',
      'Pickup Person 1',
      'Pickup Phone 1',
      'Pickup Person 2',
      'Pickup Phone 2',
      'May Leave Alone',
      'Consent Declaration',
      'Consent Media',
      'Consent Communication',
      'Payment Option',
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
      const programmeLabel = PROGRAMME_LABELS[row.programme_type] || row.programme_type
      const csvRow = [
        escapeCSV(row.registration_id),
        escapeCSV(row.student_full_name),
        escapeCSV(row.date_of_birth ? new Date(row.date_of_birth).toISOString().split('T')[0] : ''),
        escapeCSV(row.age),
        escapeCSV(row.gender),
        escapeCSV(row.school),
        escapeCSV(row.class_grade),
        escapeCSV(row.nationality),
        escapeCSV(row.home_address),
        escapeCSV(row.parent_full_name),
        escapeCSV(row.parent_relationship),
        escapeAsText(row.primary_phone),
        escapeAsText(row.alternative_phone),
        escapeCSV(row.parent_email),
        escapeCSV(row.parent_address),
        escapeCSV(row.emergency_name),
        escapeAsText(row.emergency_phone),
        escapeCSV(row.emergency_relationship),
        escapeCSV(row.medical_notes),
        escapeCSV(programmeLabel),
        escapeCSV(row.programme_other),
        escapeCSV(row.preferred_start_date ? new Date(row.preferred_start_date).toISOString().split('T')[0] : ''),
        escapeCSV(row.preferred_mode === 'on-site' ? 'On-site' : 'Online'),
        escapeCSV(row.previous_experience),
        escapeCSV(row.interests ? row.interests.join(', ') : ''),
        escapeCSV(row.student_goals),
        escapeCSV(row.learning_preferences),
        escapeCSV(row.pickup_person_1),
        escapeAsText(row.pickup_phone_1),
        escapeCSV(row.pickup_person_2),
        escapeAsText(row.pickup_phone_2),
        escapeCSV(row.may_leave_alone ? 'Yes' : 'No'),
        escapeCSV(row.consent_declaration ? 'Yes' : 'No'),
        escapeCSV(row.consent_media ? 'Yes' : 'No'),
        escapeCSV(row.consent_communication ? 'Yes' : 'No'),
        escapeCSV(row.payment_option === 'pay_now' ? 'Pay Now' : 'Pay Later'),
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
    const programmeResult = await query(
      `SELECT programme_type, COUNT(*) as count FROM registrations WHERE payment_status = 'paid' GROUP BY programme_type`
    )

    const programmes = {}
    programmeResult.rows.forEach((r) => {
      programmes[r.programme_type] = parseInt(r.count)
    })

    res.json({
      success: true,
      total: parseInt(totalResult.rows[0].total),
      paid: parseInt(paidResult.rows[0].paid),
      programmes,
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

export default router
