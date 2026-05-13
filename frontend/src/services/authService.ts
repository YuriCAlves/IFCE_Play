/**
 * authService.ts — Serviço de autenticação mock.
 *
 * Simula login/logout contra dados locais e persiste sessão no localStorage.
 * Na integração com o backend, basta trocar as implementações internas
 * por chamadas Axios sem alterar a interface.
 */

import { usuarios, type Usuario } from '../data/mockData'

const STORAGE_KEY = 'ifce_play_user'

export interface AuthResult {
  user: Omit<Usuario, 'senha'>
  token: string
}

/**
 * Autentica o usuário contra os dados mock.
 * Simula delay de rede de ~500ms.
 */
export async function login(email: string, senha: string): Promise<AuthResult> {
  // Simula latência de rede
  await new Promise(r => setTimeout(r, 500))

  const found = usuarios.find(u => u.email === email && u.senha === senha)

  if (!found) {
    throw new Error('E-mail ou senha incorretos.')
  }

  // Não persiste a senha
  const { senha: _, ...userSafe } = found
  const result: AuthResult = {
    user: userSafe,
    token: `mock-token-${found.id}-${Date.now()}`,
  }

  // Persiste no localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result))

  return result
}

/**
 * Remove a sessão do localStorage.
 */
export function logout(): void {
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Retorna o usuário salvo no localStorage, ou null.
 */
export function me(): AuthResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthResult
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}
