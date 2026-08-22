import React from 'react'
import FormField from '../ui/FormField'
import CheckboxGroup from '../ui/CheckboxGroup'

export default function Step5LearningInterests({ data, errors, onChange }) {
  const interestOptions = [
    { value: 'robotics', label: 'Robotics' },
    { value: 'coding', label: 'Coding' },
    { value: 'ai', label: 'AI' },
    { value: 'iot', label: 'IoT' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'game_design', label: 'Game Design' },
    { value: '3d_printing', label: '3D Printing' },
    { value: 'drone_piloting', label: 'Drone Piloting' },
  ]

  const handleToggleInterest = (value) => {
    const current = data.interests || []
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ target: { name: 'interests', value: updated } })
  }

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-blue-900">5. Student Learning Interests</h3>
        <p className="text-sm text-stone-500 mt-1">Help us understand what the student is interested in.</p>
      </div>

      <div className="space-y-5">
        <CheckboxGroup
          label="Areas of Interest (Select all that apply)"
          name="interests"
          values={data.interests || []}
          onToggle={handleToggleInterest}
          options={interestOptions}
          error={errors.interests}
          columns={2}
        />

        <FormField
          label="What would you like your child to achieve from the programme?"
          name="studentGoals"
          type="textarea"
          value={data.studentGoals}
          onChange={onChange}
          error={errors.studentGoals}
          placeholder="e.g., Learn to code, Build a robot, Understand AI basics"
          rows={3}
        />

        <FormField
          label="Any relevant learning preferences or support needs? (Optional)"
          name="learningPreferences"
          type="textarea"
          value={data.learningPreferences}
          onChange={onChange}
          error={errors.learningPreferences}
          placeholder="e.g., Visual learner, Needs extra support with math"
          rows={2}
        />
      </div>
    </div>
  )
}
