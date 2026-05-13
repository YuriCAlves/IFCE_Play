import { type ReactNode, type KeyboardEvent } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  /** Ativa hover effect (elevação + leve translate) */
  hover?: boolean
  /** Padding interno */
  padding?: 'sm' | 'md' | 'lg'
  /** Torna o card clicável com hover visual e acessibilidade */
  onClick?: () => void
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  onClick,
}: CardProps) {
  const isClickable = !!onClick || hover

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-200 shadow-card
        transition-all duration-300
        ${isClickable
          ? 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer active:translate-y-0'
          : ''
        }
        ${paddingClasses[padding]}
        ${className}
      `}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}
