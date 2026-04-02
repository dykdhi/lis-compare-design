import { useState, useRef, useEffect } from 'react'

export function MultiCombobox({
  label,
  selected,
  options,
  onChange,
}: {
  label: string
  selected: number[]
  options: number[]
  onChange: (selected: number[]) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function toggle(n: number) {
    onChange(selected.includes(n) ? selected.filter((x) => x !== n) : [...selected, n].sort((a, b) => a - b))
  }

  const displayText = selected.length === 0 ? 'Select…' : selected.join(', ')

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-left text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
        >
          <span className={selected.length === 0 ? 'text-gray-400' : ''}>{displayText}</span>
          <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
        {open && (
          <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            {options.map((n) => (
              <label key={n} className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(n)}
                  onChange={() => toggle(n)}
                  className="rounded border-gray-300 text-blue-600"
                />
                {n}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
