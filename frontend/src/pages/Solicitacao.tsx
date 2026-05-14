import { useState } from 'react'
import { Calendar, CheckCircle2, ChevronRight, Clock, MapPin, User, AlertCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import { espacos, tipoEspacoLabels } from '../data/mockData'
import { solicitarReserva } from '../services/reservaService'

interface FormData {
  espacoId: string
  finalidade: string
  solicitante: string
  tipoAtividade: string
  data: string
  horaInicio: string
  horaFim: string
}

export default function Solicitacao() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    espacoId: '',
    finalidade: '',
    solicitante: '',
    tipoAtividade: '',
    data: '',
    horaInicio: '',
    horaFim: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  return (
    <div className="space-y-6 max-w-5xl pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">Nova Solicitação</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Crie uma nova reserva de espaço manualmente.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 relative">
        {[
          { num: 1, title: 'Espaço' },
          { num: 2, title: 'Detalhes' },
          { num: 3, title: 'Horários' },
          { num: 4, title: 'Confirmação' },
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center relative z-10 flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= s.num
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                  : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              {step > s.num ? <CheckCircle2 size={20} /> : s.num}
            </div>
            <span className={`text-xs mt-2 font-medium ${step >= s.num ? 'text-primary-700' : 'text-neutral-400'}`}>
              {s.title}
            </span>
          </div>
        ))}
        {/* Progress Line */}
        <div className="absolute left-0 top-5 w-full h-0.5 bg-neutral-100 -z-10" />
        <div
          className="absolute left-0 top-5 h-0.5 bg-primary-600 -z-10 transition-all duration-300"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />
      </div>

      <Card className="p-6 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-danger-50 border border-danger-100 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-danger-600 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm font-semibold text-danger-800">Erro</p>
              <p className="text-sm text-danger-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Selecione o Espaço</h2>

            <Select
              label="Espaço"
              options={espacos.map(e => ({ value: e.id.toString(), label: e.nome }))}
              placeholder="Selecione um espaço"
              value={formData.espacoId}
              onChange={(e) => setFormData({ ...formData, espacoId: e.target.value })}
              required
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Detalhes da Reserva</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Finalidade da Reserva"
                placeholder="Ex: Aula prática de Redes II"
                value={formData.finalidade}
                onChange={(e) => setFormData({ ...formData, finalidade: e.target.value })}
                required
              />
              <Input
                label="Solicitante (Opcional)"
                placeholder="Nome do professor ou aluno"
                value={formData.solicitante}
                onChange={(e) => setFormData({ ...formData, solicitante: e.target.value })}
              />
              <Select
                label="Tipo de Atividade"
                options={[
                  { value: 'aula', label: 'Aula Regular' },
                  { value: 'evento', label: 'Evento/Palestra' },
                  { value: 'reuniao', label: 'Reunião' },
                  { value: 'manutencao', label: 'Manutenção' },
                ]}
                placeholder="Selecione o tipo"
                value={formData.tipoAtividade}
                onChange={(e) => setFormData({ ...formData, tipoAtividade: e.target.value })}
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Data e Horários</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="date"
                label="Data da Reserva"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="time"
                  label="Início"
                  value={formData.horaInicio}
                  onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                  required
                />
                <Input
                  type="time"
                  label="Término"
                  value={formData.horaFim}
                  onChange={(e) => setFormData({ ...formData, horaFim: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100 flex items-start gap-3">
              <Clock className="text-primary-600 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-semibold text-primary-800">Dica de Agendamento</p>
                <p className="text-sm text-primary-700 mt-1">
                  Certifique-se de que o horário de término inclui o tempo necessário para organização e limpeza do espaço.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Revise as Informações</h2>

            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 font-medium">Espaço</p>
                    <p className="text-base font-bold text-neutral-800">
                      {espacos.find(e => e.id.toString() === formData.espacoId)?.nome || 'Não selecionado'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-neutral-500 font-medium mb-1">Finalidade</p>
                  <p className="text-sm font-semibold text-neutral-800">{formData.finalidade || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium mb-1">Tipo</p>
                  <p className="text-sm font-semibold text-neutral-800">{formData.tipoAtividade || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium mb-1">Solicitante</p>
                  <p className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5">
                    <User size={14} className="text-neutral-400" /> {formData.solicitante || 'Não informado'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium mb-1">Data</p>
                  <p className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5">
                    <Calendar size={14} className="text-neutral-400" /> {formData.data || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium mb-1">Horário</p>
                  <p className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5">
                    <Clock size={14} className="text-neutral-400" /> {formData.horaInicio} às {formData.horaFim}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className={step === 1 ? 'invisible' : ''}
          >
            Voltar
          </Button>

          <Button
            variant={step === 4 ? 'primary' : 'primary'}
            onClick={async () => {
              if (step < 4) {
                // Validation before proceeding
                if (step === 1 && !formData.espacoId) {
                  setError('Selecione um espaço para continuar.')
                  return
                }
                if (step === 2 && (!formData.finalidade || !formData.tipoAtividade)) {
                  setError('Preencha a finalidade e o tipo de atividade.')
                  return
                }
                if (step === 3 && (!formData.data || !formData.horaInicio || !formData.horaFim)) {
                  setError('Preencha a data e os horários.')
                  return
                }
                setError('')
                setStep(step + 1)
              } else {
                // Submit logic
                try {
                  setIsSubmitting(true)
                  setError('')
                  await solicitarReserva({
                    espacoId: Number(formData.espacoId),
                    data: formData.data,
                    horaInicio: formData.horaInicio,
                    horaFim: formData.horaFim,
                    finalidade: formData.finalidade,
                  })
                  alert('Reserva solicitada com sucesso!')
                  // Reset form or redirect
                  setStep(1)
                  setFormData({
                    espacoId: '',
                    finalidade: '',
                    solicitante: '',
                    tipoAtividade: '',
                    data: '',
                    horaInicio: '',
                    horaFim: '',
                  })
                } catch (err) {
                  setError('Erro ao solicitar reserva. Tente novamente.')
                } finally {
                  setIsSubmitting(false)
                }
              }
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : step === 4 ? 'Confirmar Reserva' : 'Próxima Etapa'}
            {step < 4 && !isSubmitting && <ChevronRight size={16} className="ml-1.5" />}
          </Button>
        </div>
      </Card>
    </div>
  )
}
