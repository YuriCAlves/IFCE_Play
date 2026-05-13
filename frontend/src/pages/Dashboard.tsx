import { Building2, CalendarCheck, AlertTriangle, TrendingUp } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import {
  espacos,
  reservas,
  usuarios,
  statusReservaLabels,
  tipoEspacoLabels,
} from '../data/mockData'
import { getStatusReservaVariant } from '../components/ui/Badge'

export default function Dashboard() {
  const { usuario } = useAuth()

  const totalEspacos = espacos.filter(e => e.ativo).length
  const espacosOcupados = espacos.filter(e => e.statusAtual === 'OCUPADO').length
  const reservasPendentes = reservas.filter(r => r.status === 'PENDENTE').length
  const reservasAprovadas = reservas.filter(r => r.status === 'APROVADA').length

  const proximasReservas = reservas
    .filter(r => r.status === 'APROVADA')
    .slice(0, 4)

  const getUsuarioNome = (id: number) =>
    usuarios.find(u => u.id === id)?.nome ?? 'Desconhecido'

  const getEspacoNome = (id: number) =>
    espacos.find(e => e.id === id)?.nome ?? 'Desconhecido'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">Dashboard</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Visão geral do sistema de espaços acadêmicos
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-ifce-100/50 rounded-bl-[40px]" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-ifce-100 flex items-center justify-center mb-3">
              <Building2 size={20} className="text-ifce-900" />
            </div>
            <p className="text-sm text-neutral-500">Total de Espaços</p>
            <p className="text-3xl font-bold text-neutral-800 mt-1">{totalEspacos}</p>
            <p className="text-xs text-neutral-400 mt-1">
              {espacosOcupados} em uso agora
            </p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-success-50 rounded-bl-[40px]" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center mb-3">
              <CalendarCheck size={20} className="text-success-600" />
            </div>
            <p className="text-sm text-neutral-500">Reservas Aprovadas</p>
            <p className="text-3xl font-bold text-neutral-800 mt-1">{reservasAprovadas}</p>
            <p className="text-xs text-success-600 mt-1">
              ↑ Confirmadas esta semana
            </p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-[40px]" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-3">
              <AlertTriangle size={20} className="text-purple-600" />
            </div>
            <p className="text-sm text-neutral-500">Pendentes</p>
            <p className="text-3xl font-bold text-neutral-800 mt-1">{reservasPendentes}</p>
            <p className="text-xs text-purple-600 mt-1">
              Aguardando aprovação
            </p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-info-50 rounded-bl-[40px]" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-info-50 flex items-center justify-center mb-3">
              <TrendingUp size={20} className="text-info-600" />
            </div>
            <p className="text-sm text-neutral-500">Taxa de Ocupação</p>
            <p className="text-3xl font-bold text-neutral-800 mt-1">
              {Math.round((espacosOcupados / totalEspacos) * 100)}%
            </p>
            <p className="text-xs text-info-600 mt-1">
              Eficiência de uso
            </p>
          </div>
        </Card>
      </div>

      {/* Próximas reservas */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-neutral-800">Próximas Reservas</h3>
          <Badge variant="info" size="sm">{proximasReservas.length} confirmadas</Badge>
        </div>
        <div className="space-y-3">
          {proximasReservas.map(r => (
            <div
              key={r.id}
              className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-ifce-100 flex items-center justify-center">
                  <CalendarCheck size={18} className="text-ifce-800" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">
                    {getEspacoNome(r.espacoId)}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {getUsuarioNome(r.usuarioId)} — {r.finalidade}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-neutral-700">
                  {r.horaInicio} — {r.horaFim}
                </p>
                <p className="text-xs text-neutral-400">{r.data}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
