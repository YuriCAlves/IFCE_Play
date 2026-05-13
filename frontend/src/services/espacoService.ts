/**
 * espacoService.ts — Serviço para gerenciamento de espaços.
 *
 * Fornece funções para listar, criar, editar e desativar espaços.
 * Alternar entre mock e API real através da flag useMock.
 */

import api from './api'
import { espacos as mockEspacos, type Espaco, type TipoEspaco } from '../data/mockData'

const USE_MOCK = true // Alterar para false quando o backend estiver pronto

export interface EspacoRequest {
  nome: string
  tipo: TipoEspaco
  bloco: string
  capacidade: number
  descricao: string
}

export interface EspacoResponse extends Espaco {}

/**
 * Lista todos os espaços com filtros opcionais.
 */
export async function listarEspacos(filtros?: {
  tipo?: TipoEspaco
  bloco?: string
  ativo?: boolean
}): Promise<EspacoResponse[]> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 300))
    let data = mockEspacos
    if (filtros?.tipo) data = data.filter(e => e.tipo === filtros.tipo)
    if (filtros?.bloco) data = data.filter(e => e.bloco === filtros.bloco)
    if (filtros?.ativo !== undefined) data = data.filter(e => e.ativo === filtros.ativo)
    return data
  }

  const params = new URLSearchParams()
  if (filtros?.tipo) params.append('tipo', filtros.tipo)
  if (filtros?.bloco) params.append('bloco', filtros.bloco)
  if (filtros?.ativo !== undefined) params.append('ativo', filtros.ativo.toString())

  const response = await api.get(`/espacos?${params.toString()}`)
  return response.data
}

/**
 * Busca um espaço por ID.
 */
export async function buscarEspaco(id: number): Promise<EspacoResponse> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 200))
    const espaco = mockEspacos.find(e => e.id === id)
    if (!espaco) throw new Error('Espaço não encontrado')
    return espaco
  }

  const response = await api.get(`/espacos/${id}`)
  return response.data
}

/**
 * Cria um novo espaço.
 */
export async function criarEspaco(dados: EspacoRequest): Promise<EspacoResponse> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 400))
    const novo: Espaco = {
      ...dados,
      id: Math.max(...mockEspacos.map(e => e.id), 0) + 1,
      ativo: true,
      statusAtual: 'DISPONIVEL',
      horarioFuncionamento: '07:00 — 22:00',
      recursos: [],
    }
    mockEspacos.push(novo)
    return novo
  }

  const response = await api.post('/espacos', dados)
  return response.data
}

/**
 * Edita um espaço existente.
 */
export async function editarEspaco(id: number, dados: Partial<EspacoRequest>): Promise<EspacoResponse> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 400))
    const index = mockEspacos.findIndex(e => e.id === id)
    if (index === -1) throw new Error('Espaço não encontrado')
    mockEspacos[index] = { ...mockEspacos[index], ...dados }
    return mockEspacos[index]
  }

  const response = await api.put(`/espacos/${id}`, dados)
  return response.data
}

/**
 * Desativa ou ativa um espaço.
 */
export async function toggleAtivoEspaco(id: number, ativo: boolean): Promise<EspacoResponse> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 300))
    const index = mockEspacos.findIndex(e => e.id === id)
    if (index === -1) throw new Error('Espaço não encontrado')
    mockEspacos[index].ativo = ativo
    return mockEspacos[index]
  }

  const response = await api.patch(`/espacos/${id}/ativo`, { ativo })
  return response.data
}

/**
 * Exporta lista de espaços para CSV.
 */
export function exportarEspacosCSV(espacos: Espaco[]): void {
  const headers = ['ID', 'Nome', 'Tipo', 'Bloco', 'Capacidade', 'Status', 'Descrição']
  const rows = espacos.map(e => [
    e.id,
    e.nome,
    e.tipo,
    e.bloco,
    e.capacidade,
    e.ativo ? 'Ativo' : 'Inativo',
    `"${e.descricao.replace(/"/g, '""')}"`,
  ])

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `espacos_${new Date().toISOString().split('T')[0]}.csv`
  link.click()
}
