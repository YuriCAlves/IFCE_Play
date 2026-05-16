// import { useState } from 'react'  // removed unused import
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Building2,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Plus,
  Settings,
  LogOut,
  ChevronLeft
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { menuItemsGestor, menuItemsUsuario } from '../../data/mockData'
import Button from '../ui/Button'

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 size={20} />,
  CalendarDays: <CalendarDays size={20} />,
  ClipboardList: <ClipboardList size={20} />,
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { perfil, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const menuItems = perfil === 'GESTOR' ? menuItemsGestor : menuItemsUsuario

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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
          fixed top-0 left-0 h-full z-50 bg-white border-r border-neutral-200 shadow-sm
          flex flex-col transition-all duration-300 ease-out
          ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-20 lg:translate-x-0'}
        `}
      >
        {/* Logo Academica IFCE */}
        <div className="flex items-center gap-3 px-5 h-20 border-b border-neutral-100 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shrink-0 shadow-sm">
            <GraduationCap size={22} className="text-white" />
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 lg:w-0 lg:opacity-0'}`}>
            <h1 className="text-base font-extrabold text-neutral-800 tracking-tight whitespace-nowrap">Academica IFCE</h1>
            <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider whitespace-nowrap">Gestão de Espaços</p>
          </div>
        </div>

        {/* Botão Nova Reserva */}
        <div className={`px-4 pt-6 pb-2 transition-all duration-300 ${isOpen ? 'opacity-100 block' : 'opacity-0 lg:opacity-0 lg:hidden'}`}>
          <Button 
            className="w-full shadow-md shadow-primary-600/20" 
            onClick={() => navigate(perfil === 'GESTOR' ? '/solicitacao' : '/ja-reservados')}
          >
            <Plus size={18} className="mr-2" />
            Nova Reserva
          </Button>
        </div>

        <div className={`px-4 pt-6 pb-2 hidden lg:flex justify-center transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}>
          <button 
            className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 shadow-sm"
            onClick={() => navigate(perfil === 'GESTOR' ? '/solicitacao' : '/ja-reservados')}
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Links de navegação baseados no perfil do usuário */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          {menuItems.map(item => {
            const isActive = location.pathname.startsWith(item.rota)
            return (
              <NavLink
                key={item.id}
                to={item.rota}
                onClick={() => { if (window.innerWidth < 1024) onToggle() }}
                className={`
                  group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold
                  transition-all duration-200
                  ${isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800'
                  }
                `}
              >
                <span className={`shrink-0 ${isActive ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-600'}`}>
                  {iconMap[item.icone]}
                </span>
                <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 lg:w-0 lg:opacity-0'}`}>
                  {item.label}
                </span>
              </NavLink>
            )
          })}
        </nav>

        {/* Rodapé da Sidebar: Configurações e Sair */}
        <div className="border-t border-neutral-100 p-3 space-y-1">
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            <Settings size={20} className="shrink-0 text-neutral-400" />
            <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 lg:w-0 lg:opacity-0'}`}>
              Configurações
            </span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-danger-600 hover:bg-danger-50 transition-colors cursor-pointer"
          >
            <LogOut size={20} className="shrink-0 text-danger-500" />
            <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 lg:w-0 lg:opacity-0'}`}>
              Sair
            </span>
          </button>
          
          {/* Botão para recolher a barra lateral (apenas visível em desktop) */}
          <button
            onClick={onToggle}
            className="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2 mt-2 rounded-lg text-neutral-400 hover:bg-neutral-50 transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            <ChevronLeft
              size={16}
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
