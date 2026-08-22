import React from 'react'
import FormField from '../ui/FormField'

export default function Step2ParentInfo({ data, errors, onChange }) {
  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-blue-900">2. Parent / Guardian Information</h3>
        <p className="text-sm text-stone-500 mt-1">Please provide parent or guardian contact details.</p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <FormField
          label="Parent / Guardian Full Name"
          name="parentFullName"
          value={data.parentFullName}
          onChange={onChange}
          error={errors.parentFullName}
          required
          placeholder="Parent's full name"
        />

        <FormField
          label="Relationship to Student"
          name="parentRelationship"
          value={data.parentRelationship}
          onChange={onChange}
          error={errors.parentRelationship}
          required
          placeholder="e.g., Father, Mother, Guardian"
        />

        <FormField
          label="Primary Phone"
          name="primaryPhone"
          type="tel"
          value={data.primaryPhone}
          onChange={onChange}
          error={errors.primaryPhone}
          required
          placeholder="+233 XX XXX XXXX"
        />

        <FormField
          label="Alternative Phone (Optional)"
          name="alternativePhone"
          type="tel"
          value={data.alternativePhone}
          onChange={onChange}
          error={errors.alternativePhone}
          placeholder="+233 XX XXX XXXX"
        />

        <FormField
          label="Email Address (Optional)"
          name="parentEmail"
          type="email"
          value={data.parentEmail}
          onChange={onChange}
          error={errors.parentEmail}
          placeholder="parent@email.com"
        />

        <div className="md:col-span-2">
          <FormField
            label="Residential Address"
            name="parentAddress"
            type="textarea"
            value={data.parentAddress}
            onChange={onChange}
            error={errors.parentAddress}
            required
            placeholder="Parent's residential address"
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}
