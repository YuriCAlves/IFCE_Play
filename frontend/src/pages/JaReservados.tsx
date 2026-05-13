import { useState } from 'react'
import { CalendarDays, Clock, MapPin, Plus, Filter, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { espacos, reservas as mockReservas, diasSemana, horariosGrade, blocos, statusReservaLabels, type StatusReserva } from '../data/mockData'
import type { Reserva } from '../data/mockData'
import Button from '../components/ui/Button'
import Select from '../components/ui/Select'
import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import Badge from '../components/ui/Badge'

const weekDates = [
  '2026-05-11',
  '2026-05-12',
  '2026-05-13',
  '2026-05-14',
  '2026-05-15',
]

export default function JaReservados() {
  const { usuario, perfil } = useAuth()
  const [data, setData] = useState<Reserva[]>(mockReservas)
  const [selectedEspaco, setSelectedEspaco] = useState<string>(espacos[0]?.id.toString() || '')

  // Advanced filters for Gestor
  const [filtroBloco, setFiltroBloco] = useState<string>('')
  const [filtroStatus, setFiltroStatus] = useState<StatusReserva | ''>('')
  const [showFilters, setShowFilters] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    data: '',
    horaInicio: '',
    horaFim: '',
    finalidade: '',
  })

  const espacoAtivo = espacos.find(e => e.id.toString() === selectedEspaco)

  // Filter spaces based on advanced filters (Gestor only)
  const espacosFiltrados = espacos.filter(e => {
    if (filtroBloco && e.bloco !== filtroBloco) return false
    return true
  })

  const reservasDoEspaco = data.filter(r =>
    r.espacoId.toString() === selectedEspaco &&
    (r.status === 'APROVADA' || r.status === 'PENDENTE')
  )

  const checkOccupied = (dateStr: string, timeStr: string) => {
    return reservasDoEspaco.some(r => {
      if (r.data !== dateStr) return false
      return r.horaInicio <= timeStr && r.horaFim > timeStr
    })
  }

  const getNextHour = (timeStr: string) => {
    const [h] = timeStr.split(':')
    return `${(parseInt(h) + 1).toString().padStart(2, '0')}:00`
  }

  const handleSlotClick = (dateStr: string, timeStr: string) => {
    const isOccupied = checkOccupied(dateStr, timeStr)
    if (isOccupied) return

    if (perfil !== 'GESTOR') {
      setFormData({
        data: dateStr,
        horaInicio: timeStr,
        horaFim: getNextHour(timeStr),
        finalidade: '',
      })
      setIsModalOpen(true)
    }
  }

  const handleSave = () => {
    if (!formData.finalidade || !formData.horaFim) return

    const novaReserva: Reserva = {
      id: Math.max(...data.map(r => r.id), 0) + 1,
      usuarioId: usuario?.id || 0,
      espacoId: Number(selectedEspaco),
      data: formData.data,
      horaInicio: formData.horaInicio,
      horaFim: formData.horaFim,
      finalidade: formData.finalidade,
      status: 'PENDENTE',
      aprovadoPor: null,
      createdAt: new Date().toISOString(),
    }

    setData([...data, novaReserva])
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col xl:flex-row gap-6 pb-10">
      {/* Calendar Area */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Já Reservados</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Grade de horários e calendário de ocupação dos espaços
          </p>
        </div>

        {/* Advanced Filters for Gestor */}
        {perfil === 'GESTOR' && (
          <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
              >
                <Filter size={16} />
                Filtros Avançados
              </button>
              {(filtroBloco || filtroStatus) && (
                <button
                  onClick={() => { setFiltroBloco(''); setFiltroStatus(''); }}
                  className="text-xs text-neutral-500 hover:text-danger-600 transition-colors flex items-center gap-1"
                >
                  <X size={14} />
                  Limpar filtros
                </button>
              )}
            </div>
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
                <Select
                  label="Filtrar por Bloco"
                  options={[{ value: '', label: 'Todos os blocos' }, ...blocos.map(b => ({ value: b, label: b }))]}
                  value={filtroBloco}
                  onChange={(e) => setFiltroBloco(e.target.value)}
                />
                <Select
                  label="Filtrar por Status"
                  options={[{ value: '', label: 'Todos os status' }, ...Object.entries(statusReservaLabels).map(([val, label]) => ({ value: val, label }))]}
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value as StatusReserva | '')}
                />
              </div>
            )}
          </div>
        )}

        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm flex flex-col sm:flex-row gap-5 items-center">
          <div className="w-full sm:w-1/3">
            <Select
              label="Selecione o Espaço"
              options={(perfil === 'GESTOR' ? espacosFiltrados : espacos).map(e => ({ value: e.id.toString(), label: e.nome }))}
              value={selectedEspaco}
              onChange={(e) => setSelectedEspaco(e.target.value)}
            />
          </div>
          {espacoAtivo && (
            <div className="flex flex-col flex-1 mt-2 sm:mt-0 pt-2 sm:pt-6 border-t sm:border-t-0 sm:border-l border-neutral-100 sm:pl-5">
              <h2 className="text-lg font-bold text-neutral-800">{espacoAtivo.nome}</h2>
              <div className="flex items-center gap-4 text-sm text-neutral-500 mt-2">
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-neutral-400" /> {espacoAtivo.bloco}</span>
                <span className="flex items-center gap-1.5"><Clock size={16} className="text-neutral-400" /> {espacoAtivo.horarioFuncionamento}</span>
              </div>
            </div>
          )}
        </div>

        {!selectedEspaco ? (
          <EmptyState 
            icon={<CalendarDays size={40} />} 
            title="Nenhum espaço selecionado" 
            description="Selecione um espaço no menu acima para ver a disponibilidade." 
          />
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-sm text-center min-w-[800px]">
              <thead>
                <tr className="bg-neutral-50/50 border-b border-neutral-100">
                  <th className="w-24 px-4 py-4 text-neutral-400 font-semibold border-r border-neutral-100 uppercase tracking-wider text-xs">Horário</th>
                  {diasSemana.map((dia, idx) => (
                    <th key={dia} className="px-4 py-4 font-semibold text-neutral-700">
                      <div>{dia}</div>
                      <div className="text-[11px] text-neutral-400 font-medium mt-1">
                        {weekDates[idx].split('-').reverse().slice(0, 2).join('/')}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {horariosGrade.map(hora => (
                  <tr key={hora} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-neutral-400 border-r border-neutral-100 bg-neutral-50/30 text-xs">
                      {hora}
                    </td>
                    {diasSemana.map((dia, idx) => {
                      const isOccupied = checkOccupied(weekDates[idx], hora)
                      
                      return (
                        <td 
                          key={`${dia}-${hora}`} 
                          className={`p-1.5 border-r border-neutral-50 last:border-r-0 transition-all ${
                            isOccupied 
                              ? 'bg-neutral-50' 
                              : perfil !== 'GESTOR' 
                                ? 'cursor-pointer hover:bg-primary-50 group' 
                                : ''
                          }`}
                          onClick={() => handleSlotClick(weekDates[idx], hora)}
                        >
                          {isOccupied ? (
                            <div className="h-10 w-full bg-danger-50 border border-danger-100 rounded-lg flex flex-col items-center justify-center text-danger-700 relative overflow-hidden">
                              <span className="text-[10px] font-bold">Ocupado</span>
                            </div>
                          ) : (
                            <div className={`h-10 w-full rounded-lg flex items-center justify-center ${perfil !== 'GESTOR' ? 'group-hover:bg-primary-100' : ''} transition-colors`}>
                              {perfil !== 'GESTOR' && (
                                <Plus size={16} className="text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
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
        )}
      </div>

      {/* Widget Agendamento Rápido (Apenas para Aluno/Prof) */}
      {perfil !== 'GESTOR' && (
        <div className="w-full xl:w-80 shrink-0">
          <div className="sticky top-28 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
            <h3 className="font-bold text-neutral-800 flex items-center gap-2 mb-1">
              Agendamento Rápido
            </h3>
            <p className="text-xs text-neutral-500 mb-6">Selecione na grade ou crie por aqui.</p>
            
            <div className="space-y-4">
              <Select
                label="Espaço"
                options={espacos.map(e => ({ value: e.id.toString(), label: e.nome }))}
                value={selectedEspaco}
                onChange={(e) => setSelectedEspaco(e.target.value)}
              />
              <Input
                type="date"
                label="Data"
                value={formData.data}
                onChange={(e) => setFormData({...formData, data: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="time"
                  label="Início"
                  value={formData.horaInicio}
                  onChange={(e) => setFormData({...formData, horaInicio: e.target.value})}
                />
                <Input
                  type="time"
                  label="Término"
                  value={formData.horaFim}
                  onChange={(e) => setFormData({...formData, horaFim: e.target.value})}
                />
              </div>
              <Input
                label="Finalidade"
                placeholder="Ex: Aula prática"
                value={formData.finalidade}
                onChange={(e) => setFormData({...formData, finalidade: e.target.value})}
              />
              
              <Button 
                className="w-full mt-2" 
                onClick={handleSave}
              >
                Solicitar Reserva
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Solicitação via Grade (Apenas para Aluno/Prof) */}
      {perfil !== 'GESTOR' && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Solicitar Reserva"
        >
          <div className="space-y-4 pt-2">
            <Input
              label="Data da Reserva"
              type="date"
              value={formData.data}
              onChange={e => setFormData({ ...formData, data: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Hora Início"
                type="time"
                value={formData.horaInicio}
                onChange={e => setFormData({ ...formData, horaInicio: e.target.value })}
              />
              <Input
                label="Hora Fim"
                type="time"
                value={formData.horaFim}
                onChange={e => setFormData({ ...formData, horaFim: e.target.value })}
              />
            </div>
            <Input
              label="Finalidade da Reserva"
              placeholder="Ex: Monitoria de Programação"
              value={formData.finalidade}
              onChange={e => setFormData({ ...formData, finalidade: e.target.value })}
              autoFocus
            />
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleSave}>Confirmar Solicitação</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
