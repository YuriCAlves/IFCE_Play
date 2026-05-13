import { useState, useRef, useEffect } from 'react'
import { Bell, Check, Clock, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function NotificationPanel() {
  const { perfil } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const unreadCount = perfil === 'GESTOR' ? 1 : 0

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors cursor-pointer"
        aria-label="Notificações"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full border-2 border-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden z-50 animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
            <h3 className="font-semibold text-neutral-800 text-sm">Notificações</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {perfil === 'GESTOR' ? (
              <div className="px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100 cursor-pointer transition-colors relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500" />
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-warning-50 text-warning-600 rounded-lg shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800 leading-tight">
                      Nova solicitação de reserva
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Carlos Silva solicitou o Auditório Principal para 15/05/2026.
                    </p>
                    <span className="text-[10px] font-medium text-neutral-400 mt-2 block">
                      Há 5 minutos
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-neutral-500">
                <Bell size={24} className="mx-auto mb-2 text-neutral-300" />
                <p className="text-sm">Nenhuma notificação</p>
              </div>
            )}
          </div>
          
          {perfil === 'GESTOR' && (
            <div className="p-2 border-t border-neutral-100 bg-neutral-50">
              <button className="w-full py-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer flex items-center justify-center gap-1">
                <Check size={14} /> Marcar como lida
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
