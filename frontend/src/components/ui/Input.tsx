import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-2.5 text-sm rounded-lg border
              transition-all duration-200 outline-none
              bg-white text-neutral-800 placeholder:text-neutral-400
              ${icon ? 'pl-10' : ''}
              ${error
                ? 'border-danger-500 focus:ring-2 focus:ring-danger-500/20 focus:border-danger-500'
                : 'border-neutral-300 focus:ring-2 focus:ring-ifce-500/20 focus:border-ifce-600'
              }
              disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs text-danger-600 animate-fade-in">{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
