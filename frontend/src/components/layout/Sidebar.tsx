import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  ClipboardList,
  BookOpen,
  ChevronLeft,
  GraduationCap,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { menuItemsGestor, menuItemsUsuario } from '../../data/mockData'

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  Building2: <Building2 size={20} />,
  CalendarDays: <CalendarDays size={20} />,
  ClipboardList: <ClipboardList size={20} />,
  BookOpen: <BookOpen size={20} />,
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { perfil } = useAuth()
  const location = useLocation()
  const menuItems = perfil === 'GESTOR' ? menuItemsGestor : menuItemsUsuario

  return (
    <>
      {/* Overlay escuro que aparece no mobile ao abrir o menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden animate-fade-in"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50 bg-white border-r border-neutral-200 shadow-sidebar
          flex flex-col transition-all duration-300 ease-out
          ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-20 lg:translate-x-0'}
        `}
      >
        {/* Identidade do sistema */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-neutral-200 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-ifce-900 flex items-center justify-center shrink-0">
            <GraduationCap size={20} className="text-white" />
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 lg:w-0 lg:opacity-0'}`}>
            <h1 className="text-sm font-bold text-neutral-800 whitespace-nowrap">IFCE Play</h1>
            <p className="text-[10px] text-neutral-400 whitespace-nowrap">Gestão de Espaços</p>
          </div>
        </div>

        {/* Links de navegação baseados no perfil do usuário */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map(item => {
            const isActive = location.pathname === item.rota
            return (
              <NavLink
                key={item.id}
                to={item.rota}
                onClick={() => { if (window.innerWidth < 1024) onToggle() }}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-ifce-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800'
                  }
                `}
              >
                <span className="shrink-0">
                  {iconMap[item.icone] || <LayoutDashboard size={20} />}
                </span>
                <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 lg:w-0 lg:opacity-0'}`}>
                  {item.label}
                </span>
                {'badge' in item && item.badge && (
                  <span className={`
                    ml-auto shrink-0 min-w-[20px] h-5 flex items-center justify-center text-xs font-bold rounded-full
                    ${isActive ? 'bg-white/20 text-white' : 'bg-danger-500 text-white'}
                    ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'}
                    transition-opacity duration-300
                  `}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Botão para recolher a barra lateral (apenas visível em desktop) */}
        <div className="hidden lg:block border-t border-neutral-200 p-3">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors text-sm cursor-pointer"
          >
            <ChevronLeft
              size={18}
              className={`transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
            />
            <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
              Recolher
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}
