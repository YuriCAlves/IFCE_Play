import { RouterProvider } from 'react-router-dom'
import { router } from './routes/AppRouter'

/**
 * App raiz do IFCE Play.
 *
 * O AuthProvider está dentro do roteador (RootLayout no AppRouter)
 * para que useAuth() esteja disponível em todas as rotas.
 */
export default function App() {
  return <RouterProvider router={router} />
}
