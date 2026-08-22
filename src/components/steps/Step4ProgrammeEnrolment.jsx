import React from 'react'
import FormField from '../ui/FormField'
import RadioGroup from '../ui/RadioGroup'

export default function Step4ProgrammeEnrolment({ data, errors, onChange }) {
  const programmeOptions = [
    { value: 'weekend_robotics', label: 'Weekend Robotics & Coding Class' },
    { value: 'saturday_online', label: 'Saturday Online Class' },
    { value: 'holiday_intensive', label: 'Holiday / Intensive STEM Programme' },
    { value: 'other', label: 'Other' },
  ]

  const modeOptions = [
    { value: 'on-site', label: 'On-site' },
    { value: 'online', label: 'Online' },
  ]

  const experienceOptions = [
    { value: 'none', label: 'None' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ]

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-blue-900">4. Programme Enrolment</h3>
        <p className="text-sm text-stone-500 mt-1">Select the programme and learning preferences.</p>
      </div>

      <div className="space-y-5">
        <RadioGroup
          label="Programme Type"
          name="programmeType"
          options={programmeOptions}
          value={data.programmeType}
          onChange={onChange}
          error={errors.programmeType}
          required
          columns={1}
        />

        {data.programmeType === 'other' && (
          <FormField
            label="Please specify"
            name="programmeOther"
            value={data.programmeOther}
            onChange={onChange}
            error={errors.programmeOther}
            placeholder="Describe the programme"
          />
        )}

        <FormField
          label="Preferred Start Date (Optional)"
          name="preferredStartDate"
          type="date"
          value={data.preferredStartDate}
          onChange={onChange}
          error={errors.preferredStartDate}
        />

        <RadioGroup
          label="Preferred Mode"
          name="preferredMode"
          options={modeOptions}
          value={data.preferredMode}
          onChange={onChange}
          error={errors.preferredMode}
          required
          columns={2}
        />

        <RadioGroup
          label="Previous Robotics / Coding Experience"
          name="previousExperience"
          options={experienceOptions}
          value={data.previousExperience}
          onChange={onChange}
          error={errors.previousExperience}
          required
          columns={2}
        />
      </div>
    </div>
  )
}
