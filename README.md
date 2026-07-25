# Appipa Solutions — STEM Leadership Masterclass Registration

An online registration form built with **React + Vite + TailwindCSS** for the Appipa Solutions Africa STEM Tour 2026.

## Features

- **6-step wizard form** with progress indicator
  1. Participant Information (name, gender, DOB, contact, address)
  2. Professional / Organisation Details (school, role, category)
  3. STEM Experience & Expectations
  4. Slot Booking (date selection with live seat availability + declaration/consent)
  5. Payment (card form with validation + Mobile Money option)
  6. Confirmation (registration ID, event details, print/download)
- **Slot booking** for 17 August, 18 August, or both days with pricing
- **Payment to confirm booking** — card payment form with formatting & validation, plus Mobile Money options (MTN, Telecel, AirtelTigo)
- **Form validation** at each step with inline error messages
- **Responsive design** — works on mobile, tablet, and desktop
- **Modern UI** with TailwindCSS, Lucide icons, and smooth animations

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173`.

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| TailwindCSS 3 | Styling |
| Lucide React | Icons |

## Pricing Structure

| Option | Price (GHS) |
|--------|-------------|
| Day 1 — 17 August only | 150 |
| Day 2 — 18 August only | 150 |
| Both Days (Best Value) | 250 |
| Processing fee | 5 |

## Notes

- Payment is currently a **mock/simulated** flow (2.5s processing delay → success). To integrate real payments, replace the `handlePay` function in `RegistrationForm.jsx` with a call to your payment gateway (e.g., Stripe, Paystack, Flutterwave).
- Seat availability numbers are hardcoded for demo. Connect to a backend API to track real bookings.
