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

const PROGRAMME_LABELS = {
  'weekend_robotics': 'Weekend Robotics & Coding Class',
  'saturday_online': 'Saturday Online Class',
  'holiday_intensive': 'Holiday / Intensive STEM Programme',
  'other': 'Other',
}

export async function sendConfirmationEmail(registration) {
  const programmeLabel = PROGRAMME_LABELS[registration.programme_type] || registration.programme_type
  const studentName = registration.student_full_name

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #1c1917;">
    <div style="background: #2563eb; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 20px; margin: 0;">BONWIRE TECH LAB</h1>
      <p style="color: #bfdbfe; font-size: 13px; margin: 4px 0 0;">Student Admission & Enrolment</p>
    </div>

    <div style="padding: 32px 24px;">
      <h2 style="font-size: 18px; margin: 0 0 8px;">Registration Confirmed</h2>
      <p style="color: #57534e; font-size: 14px; margin: 0 0 24px;">
        Thank you for enrolling ${studentName} at Bonwire Tech Lab. Your registration and payment have been confirmed.
      </p>

      <div style="background: #f5f5f4; border: 1px solid #e7e5e4; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr>
            <td style="color: #78716c; padding: 6px 0; width: 40%;">Registration ID</td>
            <td style="font-weight: bold; padding: 6px 0;">${registration.registration_id}</td>
          </tr>
          <tr>
            <td style="color: #78716c; padding: 6px 0;">Student Name</td>
            <td style="font-weight: bold; padding: 6px 0;">${registration.student_full_name}</td>
          </tr>
          <tr>
            <td style="color: #78716c; padding: 6px 0;">Parent Email</td>
            <td style="padding: 6px 0;">${registration.parent_email}</td>
          </tr>
          <tr>
            <td style="color: #78716c; padding: 6px 0;">Programme</td>
            <td style="font-weight: bold; padding: 6px 0;">${programmeLabel}</td>
          </tr>
          <tr>
            <td style="color: #78716c; padding: 6px 0;">Mode</td>
            <td style="padding: 6px 0;">${registration.preferred_mode === 'on-site' ? 'On-site' : 'Online'}</td>
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
          <li>Bring your Registration ID on the first day of class</li>
          <li>Arrive 10 minutes before the session starts</li>
          <li>All materials and equipment will be provided</li>
          <li>Contact us at 059 197 2399 for any questions</li>
        </ul>
      </div>

      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="color: #1e40af; font-size: 13px; margin: 0;">
          <strong>Location:</strong> Spintex Road, Rainbow, Accra<br>
          <strong>Website:</strong> <a href="https://www.bonwiretechlab.com" style="color: #2563eb;">www.bonwiretechlab.com</a><br>
          <strong>Phone:</strong> 059 197 2399
        </p>
      </div>

      <p style="color: #a8a29e; font-size: 12px; text-align: center; margin: 0;">
        This is an automated email from Bonwire Tech Lab. If you did not register for this programme, please ignore this email.
      </p>
    </div>
  </div>`

  const text = `BONWIRE TECH LAB — Student Admission & Enrolment

Registration Confirmed!

Registration ID: ${registration.registration_id}
Student Name: ${registration.student_full_name}
Parent Email: ${registration.parent_email}
Programme: ${programmeLabel}
Mode: ${registration.preferred_mode === 'on-site' ? 'On-site' : 'Online'}
Amount Paid: GHS ${registration.amount_paid}
Status: Confirmed & Paid

What to do next:
- Bring your Registration ID on the first day of class
- Arrive 10 minutes before the session starts
- All materials and equipment will be provided
- Contact us at 059 197 2399 for any questions

Location: Spintex Road, Rainbow, Accra
Website: www.bonwiretechlab.com
Phone: 059 197 2399

This is an automated email from Bonwire Tech Lab.`

  await getTransporter().sendMail({
    from: `"Bonwire Tech Lab" <${process.env.FROM_EMAIL}>`,
    to: registration.parent_email,
    subject: `Registration Confirmed — ${registration.registration_id} | BTL Student Admission`,
    text,
    html,
  })
}
