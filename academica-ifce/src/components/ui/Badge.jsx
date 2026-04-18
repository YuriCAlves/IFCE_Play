/**
 * Badge.jsx — Componente de badge reutilizável
 * Usado para status (CONFIRMADO, PENDENTE, LIVE, etc.)
 */

const variantStyles = {
  confirmado: 'bg-primary-bg-light text-primary font-semibold',
  pendente: 'bg-gray-100 text-pending font-semibold',
  live: 'bg-primary text-white font-bold animate-pulse-live',
  alerta: 'bg-alert-red-bg text-alert-red font-semibold',
};

export default function Badge({ children, variant = 'confirmado', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs tracking-wide ${variantStyles[variant] || variantStyles.confirmado} ${className}`}
    >
      {children}
    </span>
  );
}
