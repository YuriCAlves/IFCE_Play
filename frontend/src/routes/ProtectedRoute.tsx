import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { Perfil } from '../data/mockData'

interface ProtectedRouteProps {
  /** Lista de perfis permitidos. Se omitido, qualquer perfil autenticado acessa. */
  perfis?: Perfil[]
}

export default function ProtectedRoute({ perfis }: ProtectedRouteProps) {
  const { isAuthenticated, perfil } = useAuth()

  // Não autenticado → redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Perfil não permitido → redireciona para dashboard
  if (perfis && perfil && !perfis.includes(perfil)) {
    return <Navigate to="/espacos" replace />
  }

  return <Outlet />
}
