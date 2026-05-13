/**
 * reservaService.ts — Serviço para gerenciamento de reservas.
 *
 * Fornece funções para listar, solicitar, aprovar, rejeitar e cancelar reservas.
 * Alternar entre mock e API real através da flag useMock.
 */

import api from './api'
import { reservas as mockReservas, type Reserva, type StatusReserva } from '../data/mockData'

const USE_MOCK = true // Alterar para false quando o backend estiver pronto

export interface ReservaRequest {
  espacoId: number
  data: string
  horaInicio: string
  horaFim: string
  finalidade: string
}

export interface ReservaResponse extends Reserva {}

/**
 * Lista todas as reservas com filtros opcionais.
 */
export async function listarReservas(filtros?: {
  espacoId?: number
  data?: string
  status?: StatusReserva
  usuarioId?: number
}): Promise<ReservaResponse[]> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 300))
    let data = mockReservas
    if (filtros?.espacoId) data = data.filter(r => r.espacoId === filtros.espacoId)
    if (filtros?.data) data = data.filter(r => r.data === filtros.data)
    if (filtros?.status) data = data.filter(r => r.status === filtros.status)
    if (filtros?.usuarioId) data = data.filter(r => r.usuarioId === filtros.usuarioId)
    return data
  }

  const params = new URLSearchParams()
  if (filtros?.espacoId) params.append('espacoId', filtros.espacoId.toString())
  if (filtros?.data) params.append('data', filtros.data)
  if (filtros?.status) params.append('status', filtros.status)
  if (filtros?.usuarioId) params.append('usuarioId', filtros.usuarioId.toString())

  const response = await api.get(`/reservas?${params.toString()}`)
  return response.data
}

/**
 * Lista as reservas do usuário logado.
 */
export async function minhasReservas(usuarioId: number): Promise<ReservaResponse[]> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 300))
    return mockReservas.filter(r => r.usuarioId === usuarioId)
  }

  const response = await api.get('/reservas/minhas')
  return response.data
}

/**
 * Lista reservas pendentes (para aprovação do gestor).
 */
export async function listarPendentes(): Promise<ReservaResponse[]> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 300))
    return mockReservas.filter(r => r.status === 'PENDENTE')
  }

  const response = await api.get('/reservas/pendentes')
  return response.data
}

/**
 * Busca uma reserva por ID.
 */
export async function buscarReserva(id: number): Promise<ReservaResponse> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 200))
    const reserva = mockReservas.find(r => r.id === id)
    if (!reserva) throw new Error('Reserva não encontrada')
    return reserva
  }

  const response = await api.get(`/reservas/${id}`)
  return response.data
}

/**
 * Solicita uma nova reserva.
 */
export async function solicitarReserva(dados: ReservaRequest): Promise<ReservaResponse> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 400))
    const nova: Reserva = {
      ...dados,
      id: Math.max(...mockReservas.map(r => r.id), 0) + 1,
      usuarioId: 1, // Mock: assume usuário logado
      status: 'PENDENTE',
      aprovadoPor: null,
      createdAt: new Date().toISOString(),
    }
    mockReservas.push(nova)
    return nova
  }

  const response = await api.post('/reservas', dados)
  return response.data
}

/**
 * Aprova uma reserva.
 */
export async function aprovarReserva(id: number, gestorId: number): Promise<ReservaResponse> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 400))
    const index = mockReservas.findIndex(r => r.id === id)
    if (index === -1) throw new Error('Reserva não encontrada')
    mockReservas[index].status = 'APROVADA'
    mockReservas[index].aprovadoPor = gestorId
    return mockReservas[index]
  }

  const response = await api.put(`/reservas/${id}/aprovar`)
  return response.data
}

/**
 * Rejeita uma reserva.
 */
export async function rejeitarReserva(id: number, gestorId: number): Promise<ReservaResponse> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 400))
    const index = mockReservas.findIndex(r => r.id === id)
    if (index === -1) throw new Error('Reserva não encontrada')
    mockReservas[index].status = 'REJEITADA'
    mockReservas[index].aprovadoPor = gestorId
    return mockReservas[index]
  }

  const response = await api.put(`/reservas/${id}/rejeitar`)
  return response.data
}

/**
 * Cancela uma reserva.
 */
export async function cancelarReserva(id: number): Promise<ReservaResponse> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 400))
    const index = mockReservas.findIndex(r => r.id === id)
    if (index === -1) throw new Error('Reserva não encontrada')
    mockReservas[index].status = 'CANCELADA'
    return mockReservas[index]
  }

  const response = await api.delete(`/reservas/${id}`)
  return response.data
}

/**
 * Verifica conflito de horário para um espaço.
 */
export async function verificarConflito(
  espacoId: number,
  data: string,
  horaInicio: string,
  horaFim: string
): Promise<boolean> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 200))
    const conflito = mockReservas.some(r => {
      if (r.espacoId !== espacoId || r.data !== data) return false
      if (r.status !== 'PENDENTE' && r.status !== 'APROVADA') return false
      // Verifica sobreposição de horários
      return !(r.horaFim <= horaInicio || r.horaInicio >= horaFim)
    })
    return conflito
  }

  const response = await api.post('/reservas/verificar-conflito', {
    espacoId,
    data,
    horaInicio,
    horaFim,
  })
  return response.data.conflito
}
