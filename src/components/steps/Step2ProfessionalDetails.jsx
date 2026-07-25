import React from 'react'
import FormField from '../ui/FormField'
import RadioGroup from '../ui/RadioGroup'

export default function Step2ProfessionalDetails({ data, errors, onChange }) {
  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-stone-800">Professional / Organisation Details</h3>
        <p className="text-sm text-stone-500 mt-1">Tell us about your professional background.</p>
      </div>

      <FormField
        label="Organisation / School / Institution"
        name="organisation"
        value={data.organisation}
        onChange={onChange}
        placeholder="e.g. Accra Technical Institute"
        required
        error={errors.organisation}
      />

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <FormField
          label="Region / City"
          name="regionCity"
          value={data.regionCity}
          onChange={onChange}
          placeholder="e.g. Greater Accra"
          required
          error={errors.regionCity}
        />
        <FormField
          label="Years of Experience in Education / STEM"
          name="yearsOfExperience"
          type="select"
          value={data.yearsOfExperience}
          onChange={onChange}
          required
          error={errors.yearsOfExperience}
          options={[
            { value: '0-2', label: '0 – 2 years' },
            { value: '3-5', label: '3 – 5 years' },
            { value: '6-10', label: '6 – 10 years' },
            { value: '11-15', label: '11 – 15 years' },
            { value: '16+', label: '16+ years' },
          ]}
        />
      </div>

      <FormField
        label="Website or Social Media"
        name="websiteSocial"
        value={data.websiteSocial}
        onChange={onChange}
        placeholder="e.g. www.yourschool.edu.gh  (optional)"
        hint="Optional"
      />

      <RadioGroup
        label="Participant Category"
        name="participantCategory"
        value={data.participantCategory}
        onChange={onChange}
        required
        error={errors.participantCategory}
        columns={2}
        options={[
          { value: 'ict-teacher', label: 'ICT Teacher' },
          { value: 'stem-instructor', label: 'STEM Instructor' },
          { value: 'school-leader', label: 'School Leader / Proprietor' },
          { value: 'govt-official', label: 'Government Education Official' },
          { value: 'curriculum-developer', label: 'Curriculum Developer' },
          { value: 'stem-coordinator', label: 'STEM Coordinator' },
          { value: 'robotics-rep', label: 'Robotics / STEM Centre Representative' },
          { value: 'other', label: 'Other' },
        ]}
      />

      {data.participantCategory === 'other' && (
        <FormField
          label="Please specify"
          name="otherCategory"
          value={data.otherCategory}
          onChange={onChange}
          placeholder="Describe your category"
          required
          error={errors.otherCategory}
        />
      )}
    </div>
  )
}
