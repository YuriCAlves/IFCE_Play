import { useState } from 'react'
import { XCircle, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { reservas as mockReservas, espacos, statusReservaLabels, type Reserva, type StatusReserva } from '../data/mockData'
import DataTable from '../components/ui/DataTable'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Select from '../components/ui/Select'
import Input from '../components/ui/Input'

export default function MinhasReservas() {
  const { usuario } = useAuth()
  const [data, setData] = useState<Reserva[]>(mockReservas)
  const [filtroStatus, setFiltroStatus] = useState<string>('')
  const [busca, setBusca] = useState('')

  // Apenas as reservas do usuário logado
  const minhasReservas = data.filter(r => r.usuarioId === usuario?.id)

  const filteredData = minhasReservas.filter(r => {
    const espaco = espacos.find(e => e.id === r.espacoId)
    const matchBusca = r.finalidade.toLowerCase().includes(busca.toLowerCase()) ||
      espaco?.nome.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus ? r.status === filtroStatus : true

    return matchBusca && matchStatus
  })

  const handleCancelar = (id: number) => {
    if (window.confirm('Tem certeza que deseja cancelar esta reserva?')) {
      setData(prev => prev.map(r => r.id === id ? { ...r, status: 'CANCELADA' as StatusReserva } : r))
    }
  }

  const columns = [
    {
      key: 'espaco',
      label: 'Espaço',
      render: (r: Reserva) => {
        const espaco = espacos.find(e => e.id === r.espacoId)
        return (
          <div>
            <div className="font-medium text-gray-800">{espaco?.nome}</div>
            <div className="text-xs text-gray-500">{espaco?.bloco}</div>
          </div>
        )
      }
    },
    {
      key: 'data',
      label: 'Data e Hora',
      render: (r: Reserva) => (
        <div>
          <div className="text-gray-800">{r.data.split('-').reverse().join('/')}</div>
          <div className="text-xs text-gray-500">{r.horaInicio} às {r.horaFim}</div>
        </div>
      )
    },
    {
      key: 'finalidade',
      label: 'Finalidade',
      render: (r: Reserva) => <span className="text-gray-600 line-clamp-2" title={r.finalidade}>{r.finalidade}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (r: Reserva) => (
        <Badge status={r.status} size="sm">
          {statusReservaLabels[r.status]}
        </Badge>
      )
    },
    {
      key: 'acoes',
      label: 'Ações',
      className: 'text-right',
      render: (r: Reserva) => (
        r.status === 'PENDENTE' ? (
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => handleCancelar(r.id)} className="text-danger-600 hover:text-danger-700 hover:bg-danger-50">
              <XCircle size={16} />
              Cancelar
            </Button>
          </div>
        ) : null
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Minhas Reservas</h1>
          <p className="text-sm text-gray-400 mt-1">
            Acompanhe suas solicitações de reserva, {usuario?.nome.split(' ')[0]}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <Input
          placeholder="Buscar por finalidade ou espaço..."
          icon={<Search size={18} />}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <Select
          options={Object.entries(statusReservaLabels).map(([val, label]) => ({ value: val, label }))}
          placeholder="Todos os status"
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable
          columns={columns}
          data={filteredData}
          keyExtractor={(r) => r.id}
          emptyMessage="Você ainda não possui nenhuma reserva ou nenhuma corresponde aos filtros."
        />
      </div>
    </div>
  )
}
