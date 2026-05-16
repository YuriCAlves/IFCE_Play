import { useState } from 'react'
import { Building2, Search, Plus, MapPin, Users, Edit, CheckCircle, XCircle, Download, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { espacos as mockEspacos, tipoEspacoLabels, blocos } from '../data/mockData'
import type { TipoEspaco, Espaco } from '../data/mockData'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import { exportarEspacosCSV } from '../services/espacoService'

export default function Espacos() {
  const { perfil } = useAuth()

  const [data, setData] = useState<Espaco[]>(mockEspacos)
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [filtroBloco, setFiltroBloco] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [espacoEditando, setEspacoEditando] = useState<Espaco | null>(null)
  const [showPolitica, setShowPolitica] = useState(false)
  
  // States for form
  const [formData, setFormData] = useState<Partial<Espaco>>({
    nome: '',
    tipo: 'SALA_AULA',
    bloco: '',
    capacidade: 30,
    descricao: '',
  })

  // Handlers
  const handleOpenModal = (espaco?: Espaco) => {
    if (espaco) {
      setEspacoEditando(espaco)
      setFormData(espaco)
    } else {
      setEspacoEditando(null)
      setFormData({
        nome: '',
        tipo: 'SALA_AULA',
        bloco: '',
        capacidade: 30,
        descricao: '',
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEspacoEditando(null)
  }

  const handleSave = () => {
    // Basic validation
    if (!formData.nome || !formData.bloco) return

    if (espacoEditando) {
      setData(prev => prev.map(e => e.id === espacoEditando.id ? { ...e, ...formData } as Espaco : e))
    } else {
      const novo: Espaco = {
        ...formData,
        id: Math.max(...data.map(e => e.id), 0) + 1,
        ativo: true,
        statusAtual: 'DISPONIVEL',
        horarioFuncionamento: '07:00 — 22:00',
        recursos: [],
      } as Espaco
      setData(prev => [...prev, novo])
    }
    handleCloseModal()
  }

  const handleToggleAtivo = (id: number) => {
    setData(prev => prev.map(e => e.id === id ? { ...e, ativo: !e.ativo } : e))
  }

  // Filtragem
  const filteredData = data.filter(e => {
    const matchBusca = e.nome.toLowerCase().includes(busca.toLowerCase()) || e.descricao.toLowerCase().includes(busca.toLowerCase())
    const matchTipo = filtroTipo ? e.tipo === filtroTipo : true
    const matchBloco = filtroBloco ? e.bloco === filtroBloco : true
    return matchBusca && matchTipo && matchBloco
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Espaços</h1>
          <p className="text-sm text-gray-400 mt-1">
            Catálogo de salas, laboratórios e auditórios do campus
          </p>
        </div>
        <div className="flex gap-2">
          {perfil === 'GESTOR' && (
            <>
              <Button variant="secondary" onClick={() => exportarEspacosCSV(filteredData)}>
                <Download size={18} />
                Exportar
              </Button>
              <Button onClick={() => handleOpenModal()}>
                <Plus size={18} />
                Novo Espaço
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <Input
          placeholder="Buscar espaço..."
          icon={<Search size={18} />}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <Select
          options={Object.entries(tipoEspacoLabels).map(([val, label]) => ({ value: val, label }))}
          placeholder="Todos os tipos"
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        />
        <Select
          options={blocos.map(b => ({ value: b, label: b }))}
          placeholder="Todos os blocos"
          value={filtroBloco}
          onChange={(e) => setFiltroBloco(e.target.value)}
        />
      </div>

      {/* Política de Uso */}
      <div className="bg-primary-50 border border-primary-100 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowPolitica(!showPolitica)}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-primary-100/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
              <Info size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-primary-800">Política de Uso dos Espaços</h3>
              <p className="text-sm text-primary-600">Regras e diretrizes para reserva de espaços</p>
            </div>
          </div>
          {showPolitica ? <ChevronUp size={20} className="text-primary-600" /> : <ChevronDown size={20} className="text-primary-600" />}
        </button>
        {showPolitica && (
          <div className="px-5 pb-5 pt-2 border-t border-primary-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primary-700">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold mb-1">📅 Prazo de Solicitação</p>
                  <p className="text-primary-600">Reservas devem ser solicitadas com no mínimo 24h de antecedência.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">⏱️ Duração Máxima</p>
                  <p className="text-primary-600">Reservas de até 4 horas por período. Extensões sujeitas a disponibilidade.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">🧹 Responsabilidade</p>
                  <p className="text-primary-600">O solicitante é responsável pela limpeza e organização do espaço após o uso.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold mb-1">✅ Aprovação</p>
                  <p className="text-primary-600">Reservas de alunos e professores requerem aprovação do gestor.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">❌ Cancelamento</p>
                  <p className="text-primary-600">Cancelamentos devem ser feitos com pelo menos 2h de antecedência.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">📦 Equipamentos</p>
                  <p className="text-primary-600">Não remova equipamentos fixos (projetores, computadores, etc.) do espaço.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid de Cards */}
      {filteredData.length === 0 ? (
        <EmptyState 
          icon={<Building2 size={40} />} 
          title="Nenhum espaço encontrado" 
          description="Tente ajustar os filtros da sua busca." 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filteredData.map(espaco => (
            <Card key={espaco.id} className="flex flex-col h-full hover:shadow-card-hover transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{espaco.nome}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                    <MapPin size={14} />
                    <span>{espaco.bloco}</span>
                  </div>
                </div>
                <Badge variant={espaco.ativo ? 'success' : 'neutral'} size="sm">
                  {espaco.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>

              <div className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1 min-h-[40px]">
                {espaco.descricao}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <div className="flex items-center gap-1.5">
                  <Building2 size={16} className="text-gray-400" />
                  <span>{tipoEspacoLabels[espaco.tipo]}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={16} className="text-gray-400" />
                  <span>{espaco.capacidade} lugares</span>
                </div>
              </div>

              {perfil === 'GESTOR' && (
                <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                  <Button variant="ghost" size="sm" onClick={() => handleToggleAtivo(espaco.id)}>
                    {espaco.ativo ? <XCircle size={16} className="text-danger-500" /> : <CheckCircle size={16} className="text-success-500" />}
                    <span className={espaco.ativo ? "text-danger-600" : "text-success-600"}>
                      {espaco.ativo ? 'Desativar' : 'Ativar'}
                    </span>
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleOpenModal(espaco)}>
                    <Edit size={16} />
                    Editar
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={espacoEditando ? 'Editar Espaço' : 'Novo Espaço'}
        footer={
          <>
            <Button variant="ghost" onClick={handleCloseModal}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input 
            label="Nome do Espaço" 
            placeholder="Ex: Laboratório de Informática 1"
            value={formData.nome}
            onChange={e => setFormData({ ...formData, nome: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="Tipo"
              options={Object.entries(tipoEspacoLabels).map(([val, label]) => ({ value: val, label }))}
              value={formData.tipo}
              onChange={e => setFormData({ ...formData, tipo: e.target.value as TipoEspaco })}
            />
            <Input 
              label="Capacidade" 
              type="number"
              placeholder="Ex: 30"
              value={formData.capacidade || ''}
              onChange={e => setFormData({ ...formData, capacidade: Number(e.target.value) })}
            />
          </div>
          <Input 
            label="Bloco" 
            placeholder="Ex: Bloco A"
            value={formData.bloco}
            onChange={e => setFormData({ ...formData, bloco: e.target.value })}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all duration-200 outline-none resize-none"
              rows={3}
              placeholder="Descreva os equipamentos e recursos deste espaço..."
              value={formData.descricao}
              onChange={e => setFormData({ ...formData, descricao: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
