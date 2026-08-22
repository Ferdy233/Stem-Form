import React from 'react'

export default function Step7Consent({ data, errors, onChange }) {
  const consentItems = [
    {
      key: 'consentDeclaration',
      text: 'I confirm that the information provided is accurate and understand that students must follow BTL safety instructions, respect equipment and maintain appropriate conduct during sessions.',
    },
    {
      key: 'consentMedia',
      text: 'Media Consent: Permission for photographs/videos to be used for educational, programme documentation and promotional purposes.',
    },
    {
      key: 'consentCommunication',
      text: 'Communication Consent: Permission to receive class updates and programme information by phone, SMS, WhatsApp or email.',
    },
  ]

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h3 className="text-lg font-bold text-blue-900">7. Consent & Declaration</h3>
        <p className="text-sm text-stone-500 mt-1">Please review and accept the terms below.</p>
      </div>

      <div className="rounded-lg bg-blue-50 p-4">
        <h4 className="mb-3 text-sm font-bold text-blue-800">Declaration & Consent</h4>
        <div className="space-y-3">
          {consentItems.map((item) => (
            <label
              key={item.key}
              className="flex cursor-pointer items-start gap-3 text-sm text-stone-600"
            >
              <input
                type="checkbox"
                name={item.key}
                checked={data[item.key] || false}
                onChange={onChange}
                className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
              />
              {item.text}
            </label>
          ))}
        </div>
        {errors.declaration && (
          <p className="mt-2 text-xs text-red-500 font-medium">{errors.declaration}</p>
        )}
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-xs text-amber-800">
          <strong>Monthly Fee:</strong> GHS 500 per child
        </p>
      </div>
    </div>
  )
}
