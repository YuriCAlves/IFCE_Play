import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string // Mensagem de validação exibida abaixo do campo
  icon?: ReactNode // Ícone opcional exibido no início do input
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', id, disabled, ...props }, ref) => {
    // Gera um ID amigável baseado no label se nenhum for fornecido
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
className={`
                w-full px-4 py-3 text-sm rounded-lg border
                transition-all duration-200 outline-none
                bg-white text-gray-800 placeholder:text-gray-400
                ${icon ? 'pl-10' : ''}
                ${error
                  ? 'border-danger-500 focus:ring-2 focus:ring-danger-500/20 focus:border-danger-500'
                  : 'border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600'
                }
                disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                ${className}
              `}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs text-danger-600 animate-fade-in" role="alert">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
