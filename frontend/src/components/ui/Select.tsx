import { type SelectHTMLAttributes } from 'react'

interface Option {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[] // Lista de opções a serem exibidas no dropdown
  placeholder?: string // Texto padrão quando nada foi selecionado
  error?: string
}

export default function Select({
  label,
  options,
  placeholder = 'Selecione...',
  error,
  className = '',
  id,
  disabled,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 text-sm rounded-lg border appearance-none
          bg-white text-gray-800 cursor-pointer
          transition-all duration-200 outline-none
          bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')]
          bg-no-repeat bg-[right_12px_center]
          pr-10
          ${error
            ? 'border-danger-500 focus:ring-2 focus:ring-danger-500/20'
            : 'border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600'
          }
          disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60
          ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-danger-600 animate-fade-in" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
