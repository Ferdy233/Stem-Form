import React from 'react'
import FormField from '../ui/FormField'

export default function Step6PickupAttendance({ data, errors, onChange }) {
  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-blue-900">6. Pickup & Attendance Authorization</h3>
        <p className="text-sm text-stone-500 mt-1">Authorized persons for student pickup and attendance rules.</p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <FormField
          label="Authorized Pickup Person 1"
          name="pickupPerson1"
          value={data.pickupPerson1}
          onChange={onChange}
          error={errors.pickupPerson1}
          required
          placeholder="Full name"
        />

        <FormField
          label="Pickup Phone 1"
          name="pickupPhone1"
          type="tel"
          value={data.pickupPhone1}
          onChange={onChange}
          error={errors.pickupPhone1}
          required
          placeholder="+233 XX XXX XXXX"
        />

        <FormField
          label="Authorized Pickup Person 2 (Optional)"
          name="pickupPerson2"
          value={data.pickupPerson2}
          onChange={onChange}
          error={errors.pickupPerson2}
          placeholder="Full name"
        />

        <FormField
          label="Pickup Phone 2 (Optional)"
          name="pickupPhone2"
          type="tel"
          value={data.pickupPhone2}
          onChange={onChange}
          error={errors.pickupPhone2}
          placeholder="+233 XX XXX XXXX"
        />

        <div className="md:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-stone-600">
            <input
              type="checkbox"
              name="mayLeaveAlone"
              checked={data.mayLeaveAlone || false}
              onChange={onChange}
              className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
            />
            <div>
              <span className="font-medium text-stone-800">Student may leave alone</span>
              <p className="text-xs text-stone-500 mt-0.5">
                Only where authorized by parent / guardian
              </p>
            </div>
          </label>
          {errors.mayLeaveAlone && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.mayLeaveAlone}</p>
          )}
        </div>
      </div>
    </div>
  )
}
