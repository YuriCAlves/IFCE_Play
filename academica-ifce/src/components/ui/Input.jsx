/**
 * Input.jsx — Componente de input reutilizável
 */

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  helperText,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
            Icon ? 'pl-10' : ''
          }`}
          {...props}
        />
      </div>
      {helperText && (
        <p className="text-xs text-text-secondary mt-0.5">{helperText}</p>
      )}
    </div>
  );
}
