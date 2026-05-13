/**
 * api.ts — Instância Axios configurada para comunicação com o backend.
 *
 * Configura baseURL, withCredentials para cookies de sessão e interceptores
 * para tratamento automático de erros e redirecionamentos.
 */

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de requisição - adiciona timestamp para evitar cache
api.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      _t: Date.now(),
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor de resposta - trata erros 401 automaticamente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Sessão expirada ou não autenticado
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
