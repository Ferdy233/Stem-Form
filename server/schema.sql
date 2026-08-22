CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  registration_id VARCHAR(50) UNIQUE NOT NULL,
  -- Student Information
  student_full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  age INTEGER NOT NULL,
  gender VARCHAR(20) NOT NULL,
  school VARCHAR(255) NOT NULL,
  class_grade VARCHAR(100) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  home_address TEXT NOT NULL,
  -- Parent / Guardian Information
  parent_full_name VARCHAR(255) NOT NULL,
  parent_relationship VARCHAR(100) NOT NULL,
  primary_phone VARCHAR(30) NOT NULL, alternative_phone VARCHAR(30),
  parent_email VARCHAR(255) NOT NULL,
  parent_address TEXT NOT NULL,
  -- Emergency Contact
  emergency_name VARCHAR(255) NOT NULL,
  emergency_phone VARCHAR(30) NOT NULL,
  emergency_relationship VARCHAR(100) NOT NULL,
  medical_notes TEXT,
  -- Programme Enrolment
  programme_type VARCHAR(50) NOT NULL,
  programme_other VARCHAR(255),
  preferred_start_date DATE,
  preferred_mode VARCHAR(20) NOT NULL,
  previous_experience VARCHAR(20) NOT NULL,
  -- Learning Interests
  interests TEXT[],
  student_goals TEXT,
  learning_preferences TEXT,
  -- Pickup & Attendance
  pickup_person_1 VARCHAR(255) NOT NULL,
  pickup_phone_1 VARCHAR(30) NOT NULL,
  pickup_person_2 VARCHAR(255),
  pickup_phone_2 VARCHAR(30),
  may_leave_alone BOOLEAN DEFAULT FALSE,
  -- Consent
  consent_declaration BOOLEAN DEFAULT FALSE,
  consent_media BOOLEAN DEFAULT FALSE,
  consent_communication BOOLEAN DEFAULT FALSE,
  -- Payment
  payment_option VARCHAR(20) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  payment_reference VARCHAR(100),
  amount_paid NUMERIC(10, 2) DEFAULT 0,
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(parent_email);
CREATE INDEX IF NOT EXISTS idx_registrations_registration_id ON registrations(registration_id);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_registrations_programme_type ON registrations(programme_type);
