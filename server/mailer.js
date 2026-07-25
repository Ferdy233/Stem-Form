import nodemailer from 'nodemailer'

let _transporter = null

function getTransporter() {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  return _transporter
}

const SLOT_LABELS = {
  '17-aug-morning':   '17 August 2026 — Morning (9:00 AM – 12:00 PM)',
  '17-aug-afternoon': '17 August 2026 — Afternoon (1:00 PM – 3:00 PM)',
  '18-aug-morning':   '18 August 2026 — Morning (9:00 AM – 12:00 PM)',
  '18-aug-afternoon': '18 August 2026 — Afternoon (1:00 PM – 3:00 PM)',
}

export async function sendConfirmationEmail(registration) {
  const slotLabel = SLOT_LABELS[registration.attendance_days] || registration.attendance_days
  const name = registration.preferred_name || registration.full_name

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #1c1917;">
    <div style="background: #1c1917; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 20px; margin: 0;">APPIPA SOLUTIONS</h1>
      <p style="color: #a8a29e; font-size: 13px; margin: 4px 0 0;">STEM Leadership Masterclass & Implementation Workshop</p>
    </div>

    <div style="padding: 32px 24px;">
      <h2 style="font-size: 18px; margin: 0 0 8px;">Booking Confirmed</h2>
      <p style="color: #57534e; font-size: 14px; margin: 0 0 24px;">
        Thank you, ${name}. Your registration and payment have been confirmed.
      </p>

      <div style="background: #f5f5f4; border: 1px solid #e7e5e4; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr>
            <td style="color: #78716c; padding: 6px 0; width: 40%;">Registration ID</td>
            <td style="font-weight: bold; padding: 6px 0;">${registration.registration_id}</td>
          </tr>
          <tr>
            <td style="color: #78716c; padding: 6px 0;">Participant</td>
            <td style="font-weight: bold; padding: 6px 0;">${registration.full_name}</td>
          </tr>
          <tr>
            <td style="color: #78716c; padding: 6px 0;">Email</td>
            <td style="padding: 6px 0;">${registration.email}</td>
          </tr>
          <tr>
            <td style="color: #78716c; padding: 6px 0;">Mobile</td>
            <td style="padding: 6px 0;">${registration.mobile_number}</td>
          </tr>
          <tr>
            <td style="color: #78716c; padding: 6px 0;">Session</td>
            <td style="font-weight: bold; padding: 6px 0;">${slotLabel}</td>
          </tr>
          <tr>
            <td style="color: #78716c; padding: 6px 0;">Venue</td>
            <td style="padding: 6px 0;">Kofi Annan Centre of Excellence in ICT, Accra</td>
          </tr>
          <tr>
            <td style="color: #78716c; padding: 6px 0;">Amount Paid</td>
            <td style="font-weight: bold; padding: 6px 0;">GHS ${registration.amount_paid}</td>
          </tr>
          <tr>
            <td style="color: #78716c; padding: 6px 0;">Status</td>
            <td style="font-weight: bold; color: #16a34a; padding: 6px 0;">Confirmed & Paid</td>
          </tr>
        </table>
      </div>

      <div style="background: #fff; border: 1px solid #e7e5e4; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h3 style="font-size: 14px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #78716c;">What to do next</h3>
        <ul style="color: #57534e; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;">
          <li>Bring your Registration ID and a valid ID on the event day</li>
          <li>Arrive 15 minutes before your session starts</li>
          <li>A robotics kit will be provided at the venue for practical sessions</li>
          <li>A STEM.org certificate will be issued upon successful completion</li>
        </ul>
      </div>

      <p style="color: #a8a29e; font-size: 12px; text-align: center; margin: 0;">
        This is an automated email from Appipa Solutions. If you did not register for this event, please ignore this email.
      </p>
    </div>
  </div>`

  const text = `APPIPA SOLUTIONS — STEM Leadership Masterclass

Booking Confirmed!

Registration ID: ${registration.registration_id}
Name: ${registration.full_name}
Email: ${registration.email}
Session: ${slotLabel}
Venue: Kofi Annan Centre of Excellence in ICT, Accra
Amount Paid: GHS ${registration.amount_paid}
Status: Confirmed & Paid

What to do next:
- Bring your Registration ID and a valid ID on the event day
- Arrive 15 minutes before your session starts
- A robotics kit will be provided at the venue
- A STEM.org certificate will be issued upon completion

This is an automated email from Appipa Solutions.`

  await getTransporter().sendMail({
    from: `"Appipa Solutions" <${process.env.FROM_EMAIL}>`,
    to: registration.email,
    subject: `Booking Confirmed — ${registration.registration_id} | STEM Masterclass`,
    text,
    html,
  })
}
