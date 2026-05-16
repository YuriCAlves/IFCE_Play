import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { usuarios, type Usuario, type Perfil } from '../data/mockData'

interface AuthContextType {
  usuario: Usuario | null
  isAuthenticated: boolean
  perfil: Perfil | null
  login: (email: string, senha: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)
const STORAGE_KEY = 'ifce_play_auth_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) as Usuario : null
    } catch {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
  })

  const login = useCallback((email: string, senha: string): boolean => {
    const found = usuarios.find(u => u.email === email && u.senha === senha)
    if (found) {
      const { senha: _senha, ...safeUser } = found
      setUsuario(found)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUsuario(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: !!usuario,
        perfil: usuario?.perfil ?? null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
