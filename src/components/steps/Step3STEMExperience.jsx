import React from 'react'
import FormField from '../ui/FormField'
import RadioGroup from '../ui/RadioGroup'

export default function Step3STEMExperience({ data, errors, onChange }) {
  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-stone-800">STEM Experience & Expectations</h3>
        <p className="text-sm text-stone-500 mt-1">Help us understand your background and goals.</p>
      </div>

      <RadioGroup
        label="Have you previously implemented robotics or STEM activities?"
        name="previousSTEM"
        value={data.previousSTEM}
        onChange={onChange}
        required
        error={errors.previousSTEM}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
        columns={2}
      />

      <RadioGroup
        label="Current level of robotics / STEM experience"
        name="experienceLevel"
        value={data.experienceLevel}
        onChange={onChange}
        required
        error={errors.experienceLevel}
        options={[
          { value: 'beginner', label: 'Beginner' },
          { value: 'intermediate', label: 'Intermediate' },
          { value: 'advanced', label: 'Advanced' },
        ]}
        columns={3}
      />

      <FormField
        label="Briefly describe any STEM, robotics, coding or innovation programme currently running in your organisation"
        name="currentProgrammes"
        type="textarea"
        value={data.currentProgrammes}
        onChange={onChange}
        placeholder="Describe ongoing programmes, clubs, competitions, etc."
        rows={4}
        maxLength={500}
        hint="Max 500 characters"
      />

      <FormField
        label="What are the three main outcomes you expect from this masterclass?"
        name="expectedOutcomes"
        type="textarea"
        value={data.expectedOutcomes}
        onChange={onChange}
        placeholder="1. ... 2. ... 3. ..."
        rows={4}
        maxLength={500}
        required
        error={errors.expectedOutcomes}
        hint="Max 500 characters"
      />

      <FormField
        label="How do you intend to apply the knowledge gained after the programme?"
        name="applicationPlan"
        type="textarea"
        value={data.applicationPlan}
        onChange={onChange}
        placeholder="Describe your implementation plan..."
        rows={4}
        maxLength={500}
        required
        error={errors.applicationPlan}
        hint="Max 500 characters"
      />
    </div>
  )
}
