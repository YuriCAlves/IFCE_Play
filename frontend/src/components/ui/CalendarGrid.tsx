/**
 * CalendarGrid.tsx — Componente de grade de calendário semanal.
 *
 * Exibe horários e dias da semana com visualização de ocupação.
 * Suporta clique em slots vazios para criar reservas.
 */

import { Clock } from 'lucide-react'
import type { Reserva } from '../../data/mockData'

interface CalendarGridProps {
  diasSemana: string[]
  datasSemana: string[]
  horarios: string[]
  reservas: Reserva[]
  onSlotClick?: (data: string, hora: string) => void
  readonly?: boolean
  espacoId?: number
}

export default function CalendarGrid({
  diasSemana,
  datasSemana,
  horarios,
  reservas,
  onSlotClick,
  readonly = false,
  espacoId,
}: CalendarGridProps) {
  /**
   * Verifica se um slot está ocupado
   */
  const isSlotOccupied = (data: string, hora: string): boolean => {
    return reservas.some(r => {
      if (espacoId && r.espacoId !== espacoId) return false
      if (r.data !== data) return false
      if (r.status !== 'APROVADA' && r.status !== 'PENDENTE') return false
      return r.horaInicio <= hora && r.horaFim > hora
    })
  }

  /**
   * Obtém a reserva de um slot ocupado
   */
  const getSlotReserva = (dataStr: string, hora: string): Reserva | null => {
    return reservas.find(r => {
      if (espacoId && r.espacoId !== espacoId) return false
      if (r.data !== dataStr) return false
      if (r.status !== 'APROVADA' && r.status !== 'PENDENTE') return false
      return r.horaInicio <= hora && r.horaFim > hora
    }) || null
  }

  /**
   * Calcula a duração em horas de um slot
   */
  const getSlotDuration = (data: string, hora: string, reserva: Reserva): number => {
    const inicio = parseInt(reserva.horaInicio.split(':')[0])
    const fim = parseInt(reserva.horaFim.split(':')[0])
    const slotHora = parseInt(hora.split(':')[0])
    
    if (slotHora === inicio) {
      return fim - inicio
    }
    return 1
  }

  /**
   * Formata a data para exibição
   */
  const formatData = (dataStr: string): string => {
    const [, mes, dia] = dataStr.split('-')
    return `${dia}/${mes}`
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden overflow-x-auto">
      <table className="w-full text-sm text-center min-w-[800px]">
        <thead>
          <tr className="bg-neutral-50/50 border-b border-neutral-100">
            <th className="w-24 px-4 py-4 text-neutral-400 font-semibold border-r border-neutral-100 uppercase tracking-wider text-xs">
              Horário
            </th>
            {diasSemana.map((dia, idx) => (
              <th key={dia} className="px-4 py-4 font-semibold text-neutral-700">
                <div>{dia}</div>
                <div className="text-[11px] text-neutral-400 font-medium mt-1">
                  {formatData(datasSemana[idx])}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-50">
          {horarios.map((hora) => (
            <tr key={hora} className="hover:bg-neutral-50/50 transition-colors">
              <td className="px-4 py-3 font-medium text-neutral-400 border-r border-neutral-100 bg-neutral-50/30 text-xs">
                {hora}
              </td>
              {diasSemana.map((dia, diaIdx) => {
                const isOccupied = isSlotOccupied(datasSemana[diaIdx], hora)
                const reserva = getSlotReserva(datasSemana[diaIdx], hora)
                
                // Se já foi renderizado como parte de um bloco maior, pula
                if (isOccupied && reserva && reserva.horaInicio !== hora) {
                  return null
                }

                const duration = isOccupied && reserva ? getSlotDuration(datasSemana[diaIdx], hora, reserva) : 1

                return (
                  <td
                    key={`${dia}-${hora}`}
                    className={`p-1.5 border-r border-neutral-50 last:border-r-0 transition-all ${
                      isOccupied
                        ? 'bg-neutral-50'
                        : !readonly
                        ? 'cursor-pointer hover:bg-primary-50 group'
                        : ''
                    }`}
                    rowSpan={duration}
                    onClick={() => !isOccupied && !readonly && onSlotClick?.(datasSemana[diaIdx], hora)}
                  >
                    {isOccupied && reserva ? (
                      <div className="h-full w-full bg-danger-50 border border-danger-100 rounded-lg flex flex-col items-center justify-center text-danger-700 relative overflow-hidden">
                        <Clock size={14} className="mb-1" />
                        <span className="text-[10px] font-bold">
                          {reserva.horaInicio} - {reserva.horaFim}
                        </span>
                        <span className="text-[9px] text-danger-600 mt-0.5 line-clamp-1 max-w-[80px]">
                          {reserva.finalidade}
                        </span>
                        <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                          reserva.status === 'APROVADA' ? 'bg-success-500' : 'bg-warning-500'
                        }`} />
                      </div>
                    ) : (
                      <div className={`h-10 w-full rounded-lg flex items-center justify-center ${
                        !readonly ? 'group-hover:bg-primary-100' : ''
                      } transition-colors`}>
                        {!readonly && (
                          <span className="text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium">
                            +
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
