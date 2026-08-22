import React from 'react'
import FormField from '../ui/FormField'

export default function Step1StudentInfo({ data, errors, onChange }) {
  const calculateAge = (dob) => {
    if (!dob) return ''
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleDOBChange = (e) => {
    onChange(e)
    const age = calculateAge(e.target.value)
    if (age) {
      onChange({ target: { name: 'age', value: age.toString() } })
    }
  }

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-blue-900">1. Student Information</h3>
        <p className="text-sm text-stone-500 mt-1">Please provide the student's personal details.</p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <FormField
          label="Full Name"
          name="studentFullName"
          value={data.studentFullName}
          onChange={onChange}
          error={errors.studentFullName}
          required
          placeholder="Enter student's full name"
        />

        <FormField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={data.dateOfBirth}
          onChange={handleDOBChange}
          error={errors.dateOfBirth}
          required
        />

        <FormField
          label="Age"
          name="age"
          type="number"
          value={data.age}
          onChange={onChange}
          error={errors.age}
          required
          placeholder="Auto-calculated"
          readOnly
        />

        <FormField
          label="Gender"
          name="gender"
          type="select"
          value={data.gender}
          onChange={onChange}
          error={errors.gender}
          required
          options={[
            { value: '', label: 'Select gender' },
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
        />

        <FormField
          label="School"
          name="school"
          value={data.school}
          onChange={onChange}
          error={errors.school}
          required
          placeholder="Current school name"
        />

        <FormField
          label="Class / Grade"
          name="classGrade"
          value={data.classGrade}
          onChange={onChange}
          error={errors.classGrade}
          required
          placeholder="e.g., JHS 2, Grade 5"
        />

        <FormField
          label="Nationality"
          name="nationality"
          value={data.nationality}
          onChange={onChange}
          error={errors.nationality}
          required
          placeholder="e.g., Ghanaian"
        />

        <div className="md:col-span-2">
          <FormField
            label="Home Address"
            name="homeAddress"
            type="textarea"
            value={data.homeAddress}
            onChange={onChange}
            error={errors.homeAddress}
            required
            placeholder="Residential address"
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}
