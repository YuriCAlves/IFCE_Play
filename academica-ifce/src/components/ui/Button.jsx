/**
 * Button.jsx — Componente de botão reutilizável
 * Variantes: primary, outline, danger, ghost
 */

const variantStyles = {
  primary: 'bg-primary text-white hover:bg-primary-light shadow-sm',
  outline: 'border border-gray-300 text-text-secondary hover:bg-gray-50',
  'outline-primary': 'border border-primary text-primary hover:bg-primary-bg-light',
  danger: 'bg-white text-alert-red border border-red-200 hover:bg-alert-red-bg',
  ghost: 'text-text-secondary hover:bg-gray-100',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer
        ${variantStyles[variant] || variantStyles.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
