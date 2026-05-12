import { Menu, LogOut, Bell } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

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
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-neutral-200 flex items-center justify-between px-4 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors lg:hidden cursor-pointer"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-semibold text-neutral-800">
            Bem-vindo, {usuario?.nome.split(' ')[0]} 👋
          </h2>
          <p className="text-xs text-neutral-400">
            {perfilLabel[usuario?.perfil || 'ALUNO']} — Campus Fortaleza
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Notificações */}
        <button className="relative p-2 rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors cursor-pointer">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full" />
        </button>

        {/* Avatar + Info */}
        <div className="flex items-center gap-3 pl-3 border-l border-neutral-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-neutral-700 leading-tight">
              {usuario?.nome}
            </p>
            <p className="text-xs text-neutral-400">{usuario?.email}</p>
          </div>
          <img
            src={usuario?.avatar}
            alt={usuario?.nome}
            className="w-9 h-9 rounded-full ring-2 ring-ifce-100 object-cover"
          />
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-neutral-400 hover:bg-danger-50 hover:text-danger-600 transition-colors cursor-pointer"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
