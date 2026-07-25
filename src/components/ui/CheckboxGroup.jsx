import React from 'react'

export default function CheckboxGroup({
  label,
  name,
  values = [],
  onToggle,
  options,
  required = false,
  error = '',
  columns = 2,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-stone-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={
              'flex cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 ' +
              (values.includes(opt.value)
                ? 'border-stone-800 bg-stone-100 text-stone-900 font-semibold'
                : 'border-stone-300 bg-white text-stone-600 hover:border-stone-500')
            }
          >
            <input
              type="checkbox"
              name={name}
              value={opt.value}
              checked={values.includes(opt.value)}
              onChange={() => onToggle(opt.value)}
              className="h-4 w-4 accent-stone-800"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}
