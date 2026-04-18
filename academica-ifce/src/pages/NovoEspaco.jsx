/**
 * NovoEspaco.jsx — Página de criação/solicitação de novo espaço virtual
 * Formulário multi-etapas com stepper lateral
 */

import { useState } from 'react';
import {
  CalendarRange,
  User,
  Monitor,
  Search,
  Lightbulb,
  Info,
  CheckSquare,
  Square,
  Clock,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import { espacosDisponiveis, recursosEquipamentos } from '../data/mockData';
import { useMobile } from '../hooks/useMobile';

// Etapas do stepper
const etapas = [
  { numero: 1, titulo: 'Identificação' },
  { numero: 2, titulo: 'Agendamento' },
  { numero: 3, titulo: 'Responsabilidade' },
  { numero: 4, titulo: 'Finalização' },
];

export default function NovoEspaco() {
  const isMobile = useMobile();
  const [etapaAtiva] = useState(1);

  // Estados do formulário
  const [espacoDesejado, setEspacoDesejado] = useState('');
  const [dataReserva, setDataReserva] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaTermino, setHoraTermino] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [servidor, setServidor] = useState('');
  const [recursos, setRecursos] = useState(
    recursosEquipamentos.map((r) => ({ ...r }))
  );

  // Toggle de recurso
  const toggleRecurso = (id) => {
    setRecursos((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selecionado: !r.selecionado } : r))
    );
  };

  // Limpar formulário
  const limparCampos = () => {
    setEspacoDesejado('');
    setDataReserva('');
    setHoraInicio('');
    setHoraTermino('');
    setJustificativa('');
    setServidor('');
    setRecursos(recursosEquipamentos.map((r) => ({ ...r })));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">
          Processo de Solicitação
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Solicitar Novo Espaço</h2>
        <p className="text-sm text-text-secondary mt-1 max-w-2xl">
          Utilize este formulário para reservar salas de estudo, auditórios ou laboratórios. Sua
          solicitação será encaminhada para validação do servidor responsável.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* ========================================
            STEPPER (ESQUERDA)
            ======================================== */}
        <div className="w-full lg:w-[280px] flex-shrink-0 space-y-5">
          {/* Etapas */}
          <div className="space-y-0">
            {etapas.map((etapa, index) => (
              <div key={etapa.numero} className="flex items-start gap-3">
                {/* Indicador + linha */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors
                      ${
                        etapa.numero === etapaAtiva
                          ? 'bg-primary text-white'
                          : etapa.numero < etapaAtiva
                          ? 'bg-primary text-white'
                          : 'bg-white border-2 border-gray-300 text-text-secondary'
                      }`}
                  >
                    {etapa.numero}
                  </div>
                  {/* Linha vertical entre etapas */}
                  {index < etapas.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 my-1" />
                  )}
                </div>

                {/* Título da etapa */}
                <p
                  className={`text-sm font-medium pt-1.5
                    ${etapa.numero === etapaAtiva ? 'text-text-primary font-bold' : 'text-text-secondary'}`}
                >
                  {etapa.titulo}
                </p>
              </div>
            ))}
          </div>

          {/* Card Dica Acadêmica */}
          <div className="bg-primary-bg rounded-xl p-4 border border-[#C8E6C9]">
            <div className="flex items-start gap-2.5">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-primary mb-1">Dica Acadêmica</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Solicitações feitas com 48h de antecedência têm maior taxa de aprovação pelos
                  coordenadores.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            FORMULÁRIO (DIREITA)
            ======================================== */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Seção — Onde e Quando? */}
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-text-primary">Onde e Quando?</h3>
              <CalendarRange className="w-5 h-5 text-text-secondary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Espaço Desejado"
                value={espacoDesejado}
                onChange={(e) => setEspacoDesejado(e.target.value)}
                options={espacosDisponiveis.map((e) => ({ value: String(e.id), label: e.nome }))}
                placeholder="Selecione um laboratório ou sala"
              />
              <Input
                label="Data da Reserva"
                type="date"
                value={dataReserva}
                onChange={(e) => setDataReserva(e.target.value)}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
                  Horário de Início
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
                  Horário de Término
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={horaTermino}
                    onChange={(e) => setHoraTermino(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                </div>
              </div>
            </div>
          </Card>

          {/* Seção — Justificativa e Responsável */}
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-text-primary">Justificativa e Responsável</h3>
              <User className="w-5 h-5 text-text-secondary" />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
                  Justificativa de Uso
                </label>
                <textarea
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                  placeholder="Descreva brevemente a finalidade acadêmica desta reserva..."
                  rows={4}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y"
                />
              </div>

              <Input
                label="Servidor Responsável (Nome ou SIAPE)"
                value={servidor}
                onChange={(e) => setServidor(e.target.value)}
                placeholder="Ex: Maria Oliveira ou 1234567"
                icon={Search}
                helperText="O servidor receberá um e-mail para confirmar a supervisão."
              />
            </div>
          </Card>

          {/* Seção — Recursos e Equipamentos */}
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-text-primary">Recursos e Equipamentos</h3>
              <Monitor className="w-5 h-5 text-text-secondary" />
            </div>

            <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {recursos.map((recurso) => (
                <button
                  key={recurso.id}
                  onClick={() => toggleRecurso(recurso.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border transition-all cursor-pointer text-left
                    ${
                      recurso.selecionado
                        ? 'border-primary bg-primary-bg-light'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                >
                  {recurso.selecionado ? (
                    <CheckSquare className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-300 flex-shrink-0" />
                  )}
                  <span className="text-sm text-text-primary">{recurso.nome}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Rodapé do formulário */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <Button variant="ghost" onClick={limparCampos}>
              Limpar campos
            </Button>
            <Button variant="outline-primary">
              Salvar Rascunho
            </Button>
            <Button>
              Enviar Solicitação
            </Button>
          </div>

          {/* Aviso legal */}
          <div className="flex items-start gap-2 text-xs text-text-secondary pb-4">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Ao enviar, você declara estar ciente das normas de uso dos espaços acadêmicos
              conforme o regimento interno do IFCE.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
