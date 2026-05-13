import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import { AuthProvider } from '../context/AuthContext'
import Layout from '../components/layout/Layout'
import ProtectedRoute from './ProtectedRoute'

import Login from '../pages/Login'
import Espacos from '../pages/Espacos'
import Solicitacao from '../pages/Solicitacao'
import JaReservados from '../pages/JaReservados'

function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              { path: '/espacos', element: <Espacos /> },
              { path: '/ja-reservados', element: <JaReservados /> },
              {
                element: <ProtectedRoute perfis={['GESTOR']} />,
                children: [
                  { path: '/solicitacao', element: <Solicitacao /> },
                ],
              },
            ],
          },
        ],
      },
      { path: '/', element: <Navigate to="/espacos" replace /> },
      { path: '*', element: <Navigate to="/espacos" replace /> },
    ],
  },
])
