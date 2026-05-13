import { Menu, LogOut, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import NotificationPanel from './NotificationPanel'

interface TopbarProps {
  onMenuToggle: () => void
}

export default function Topbar({ onMenuToggle }: TopbarProps) {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const perfilLabel = {
    GESTOR: 'Gestor',
    PROFESSOR: 'Professor',
    ALUNO: 'Aluno',
  }

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/80 backdrop-blur-md border-b border-neutral-100 flex items-center justify-between px-4 lg:px-8 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onMenuToggle}
          className="p-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer shadow-sm"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search size={18} className="text-neutral-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 bg-neutral-100/50 border border-neutral-200 rounded-full text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-neutral-700"
            placeholder="Buscar espaços..."
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notificações */}
        <NotificationPanel />

        {/* Separator */}
        <div className="w-px h-8 bg-neutral-200 hidden sm:block"></div>

        {/* Avatar + Info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-neutral-800 leading-tight">
              {usuario?.nome}
            </p>
            <p className="text-xs font-medium text-neutral-500">{perfilLabel[usuario?.perfil || 'ALUNO']}</p>
          </div>
          
          <div className="relative">
            <img
              src={usuario?.avatar}
              alt={usuario?.nome}
              className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          <button
            onClick={handleLogout}
            className="p-2 rounded-full text-neutral-400 hover:bg-danger-50 hover:text-danger-600 transition-colors cursor-pointer hidden sm:block ml-1"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
