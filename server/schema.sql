CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  registration_id VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  preferred_name VARCHAR(255) NOT NULL,
  gender VARCHAR(20) NOT NULL,
  date_of_birth DATE NOT NULL,
  mobile_number VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL,
  residential_address TEXT NOT NULL,
  organisation VARCHAR(255) NOT NULL,
  region_city VARCHAR(255) NOT NULL,
  years_of_experience VARCHAR(20) NOT NULL,
  website_social VARCHAR(255),
  participant_category VARCHAR(50) NOT NULL,
  other_category VARCHAR(255),
  previous_stem VARCHAR(10) NOT NULL,
  experience_level VARCHAR(20) NOT NULL,
  current_programmes TEXT,
  expected_outcomes TEXT,
  application_plan TEXT,
  attendance_days VARCHAR(20) NOT NULL,
  confirm_accurate BOOLEAN DEFAULT FALSE,
  understand_not_guaranteed BOOLEAN DEFAULT FALSE,
  agree_participate BOOLEAN DEFAULT FALSE,
  consent_photo BOOLEAN DEFAULT FALSE,
  payment_status VARCHAR(20) DEFAULT 'pending',
  payment_reference VARCHAR(100),
  amount_paid NUMERIC(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_registration_id ON registrations(registration_id);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON registrations(payment_status);
