import React from 'react'
import FormField from '../ui/FormField'

export default function Step3EmergencyContact({ data, errors, onChange }) {
  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-blue-900">3. Emergency Contact & Important Notes</h3>
        <p className="text-sm text-stone-500 mt-1">Emergency contact person and any medical information.</p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <FormField
          label="Emergency Contact Name"
          name="emergencyName"
          value={data.emergencyName}
          onChange={onChange}
          error={errors.emergencyName}
          required
          placeholder="Emergency contact name"
        />

        <FormField
          label="Emergency Phone"
          name="emergencyPhone"
          type="tel"
          value={data.emergencyPhone}
          onChange={onChange}
          error={errors.emergencyPhone}
          required
          placeholder="+233 XX XXX XXXX"
        />

        <FormField
          label="Relationship to Student"
          name="emergencyRelationship"
          value={data.emergencyRelationship}
          onChange={onChange}
          error={errors.emergencyRelationship}
          required
          placeholder="e.g., Aunt, Uncle, Grandparent"
        />

        <div className="md:col-span-2">
          <FormField
            label="Medical Notes (Optional)"
            name="medicalNotes"
            type="textarea"
            value={data.medicalNotes}
            onChange={onChange}
            error={errors.medicalNotes}
            placeholder="Allergies, medical conditions, learning support needs (if any)"
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
