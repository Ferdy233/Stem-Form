import React from 'react'
import FormField from '../ui/FormField'
import RadioGroup from '../ui/RadioGroup'

export default function Step1ParticipantInfo({ data, errors, onChange }) {
  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-stone-800">Participant Information</h3>
        <p className="text-sm text-stone-500 mt-1">Tell us about yourself. Fields marked * are required.</p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <FormField
          label="Full Name"
          name="fullName"
          value={data.fullName}
          onChange={onChange}
          placeholder="e.g. Kwame Mensah"
          required
          error={errors.fullName}
        />
        <FormField
          label="Preferred Name for Certificate"
          name="preferredName"
          value={data.preferredName}
          onChange={onChange}
          placeholder="e.g. Kwame"
          required
          error={errors.preferredName}
        />
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <RadioGroup
          label="Gender"
          name="gender"
          value={data.gender}
          onChange={onChange}
          required
          error={errors.gender}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          columns={2}
        />
        <FormField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={data.dateOfBirth}
          onChange={onChange}
          required
          error={errors.dateOfBirth}
        />
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <FormField
          label="Mobile / WhatsApp Number"
          name="mobileNumber"
          type="tel"
          value={data.mobileNumber}
          onChange={onChange}
          placeholder="e.g. +233 24 123 4567"
          required
          error={errors.mobileNumber}
        />
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={data.email}
          onChange={onChange}
          placeholder="e.g. kwame@example.com"
          required
          error={errors.email}
        />
      </div>

      <FormField
        label="Residential Address"
        name="residentialAddress"
        value={data.residentialAddress}
        onChange={onChange}
        placeholder="House number, street, area, city"
        required
        error={errors.residentialAddress}
      />
    </div>
  )
}
