import type { StatusReserva, StatusEspaco } from '../../data/mockData'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'

interface BadgeProps {
  variant?: BadgeVariant
  status?: StatusReserva // O badge pode mapear o status automaticamente
  children?: React.ReactNode
  size?: 'sm' | 'md'
  dot?: boolean // Bolinha colorida lateral
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-success-50 text-success-700 border-success-500/20',
  warning: 'bg-warning-50 text-warning-600 border-warning-500/20',
  danger: 'bg-danger-50 text-danger-700 border-danger-500/20',
  info: 'bg-info-50 text-info-600 border-info-500/20',
  neutral: 'bg-gray-100 text-gray-600 border-gray-300/30',
  purple: 'bg-[#faf5ff] text-[#7e22ce] border-[#a855f7]/20',
}

const dotColors: Record<BadgeVariant, string> = {
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-600',
  info: 'bg-info-500',
  neutral: 'bg-gray-400',
  purple: 'bg-[#a855f7]',
}

const statusReservaMap: Record<StatusReserva, BadgeVariant> = {
  PENDENTE: 'warning',
  APROVADA: 'success',
  REJEITADA: 'danger',
  CANCELADA: 'neutral',
}

const statusReservaLabels: Record<StatusReserva, string> = {
  PENDENTE: 'Pendente',
  APROVADA: 'Aprovada',
  REJEITADA: 'Rejeitada',
  CANCELADA: 'Cancelada',
}

export default function Badge({
  variant,
  status,
  children,
  size = 'sm',
  dot = false,
}: BadgeProps) {
  // Define a aparência baseada na variante escolhida ou no status da reserva
  const resolvedVariant = variant || (status ? statusReservaMap[status] : 'neutral')
  const resolvedChildren = children || (status ? statusReservaLabels[status] : '')

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full border
        ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
        ${variantClasses[resolvedVariant]}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[resolvedVariant]}`}
          aria-hidden="true"
        />
      )}
      {resolvedChildren}
    </span>
  )
}

// Funções para ajudar a definir as cores em outros componentes
export function getStatusReservaVariant(status: StatusReserva): BadgeVariant {
  return statusReservaMap[status]
}

export function getStatusEspacoVariant(status: StatusEspaco): BadgeVariant {
  const map: Record<StatusEspaco, BadgeVariant> = {
    DISPONIVEL: 'success',
    OCUPADO: 'warning',
    MANUTENCAO: 'danger',
  }
  return map[status]
}
