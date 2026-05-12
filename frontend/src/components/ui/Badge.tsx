import type { StatusReserva, StatusEspaco } from '../../data/mockData'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  size?: 'sm' | 'md'
  dot?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-success-50 text-success-700 border-success-500/20',
  warning: 'bg-warning-50 text-warning-600 border-warning-500/20',
  danger: 'bg-danger-50 text-danger-700 border-danger-500/20',
  info: 'bg-info-50 text-info-600 border-info-500/20',
  neutral: 'bg-neutral-100 text-neutral-600 border-neutral-300/30',
  purple: 'bg-purple-50 text-purple-700 border-purple-500/20',
}

const dotColors: Record<BadgeVariant, string> = {
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-600',
  info: 'bg-info-500',
  neutral: 'bg-neutral-400',
  purple: 'bg-purple-500',
}

export default function Badge({
  variant = 'neutral',
  children,
  size = 'sm',
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full border
        ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
        ${variantClasses[variant]}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  )
}

// Helper para mapear status de reserva para variante de badge
export function getStatusReservaVariant(status: StatusReserva): BadgeVariant {
  const map: Record<StatusReserva, BadgeVariant> = {
    PENDENTE: 'purple',
    APROVADA: 'success',
    REJEITADA: 'danger',
    CANCELADA: 'neutral',
  }
  return map[status]
}

// Helper para mapear status de espaço para variante de badge
export function getStatusEspacoVariant(status: StatusEspaco): BadgeVariant {
  const map: Record<StatusEspaco, BadgeVariant> = {
    DISPONIVEL: 'success',
    OCUPADO: 'warning',
    MANUTENCAO: 'danger',
  }
  return map[status]
}
