export function SelectField({
  label,
  value,
  options,
  onChange,
  disabled = false,
  helperText,
}: {
  label: string
  value: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
  disabled?: boolean
  helperText?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && <span className="text-[11px] text-gray-500">{helperText}</span>}
    </div>
  )
}
