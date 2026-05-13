import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import { AuthProvider } from '../context/AuthContext'
import Layout from '../components/layout/Layout'
import ProtectedRoute from './ProtectedRoute'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Espacos from '../pages/Espacos'
import Reservas from '../pages/Reservas'
import MinhasReservas from '../pages/MinhasReservas'
import Solicitacoes from '../pages/Solicitacoes'

/**
 * Componente raiz que fornece o AuthProvider
 * a todas as rotas do roteador.
 */
function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

/**
 * Roteador principal do IFCE Play.
 *
 * Estrutura:
 *   RootLayout (AuthProvider)
 *   ├── /login → Login (pública)
 *   ├── ProtectedRoute (autenticado)
 *   │   └── Layout (Sidebar + Topbar)
 *   │       ├── /dashboard → Dashboard
 *   │       ├── /espacos → Espacos
 *   │       ├── /reservas → Reservas
 *   │       ├── ProtectedRoute (PROFESSOR, ALUNO)
 *   │       │   └── /minhas-reservas → MinhasReservas
 *   │       └── ProtectedRoute (GESTOR)
 *   │           └── /solicitacoes → Solicitacoes
 *   ├── / → redirect /dashboard
 *   └── * → redirect /dashboard
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // ── Rota pública ──────────────────────────────────
      {
        path: '/login',
        element: <Login />,
      },

      // ── Rotas protegidas (autenticado) ────────────────
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              // Todos os perfis
              { path: '/dashboard', element: <Dashboard /> },
              { path: '/espacos', element: <Espacos /> },
              { path: '/reservas', element: <Reservas /> },

              // PROFESSOR e ALUNO apenas
              {
                element: <ProtectedRoute perfis={['PROFESSOR', 'ALUNO']} />,
                children: [
                  { path: '/minhas-reservas', element: <MinhasReservas /> },
                ],
              },

              // GESTOR apenas
              {
                element: <ProtectedRoute perfis={['GESTOR']} />,
                children: [
                  { path: '/solicitacoes', element: <Solicitacoes /> },
                ],
              },
            ],
          },
        ],
      },

      // ── Redirects ─────────────────────────────────────
      { path: '/', element: <Navigate to="/espacos" replace /> },
      { path: '*', element: <Navigate to="/espacos" replace /> },
    ],
  },
])
