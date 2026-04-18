/**
 * Reservas.jsx — Página de Reservas com Calendário Semanal
 * Exibe filtros à esquerda e calendário semanal à direita
 * Inclui painel de Agendamento Rápido ao clicar em slot vazio
 */

import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Info,
  CalendarCheck,
  CheckSquare,
  Square,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import {
  campi,
  setores,
  salasFiltraveis,
  reservasCalendario,
  diasSemana,
  horariosCalendario,
  espacosDisponiveis,
} from '../data/mockData';
import { useMobile } from '../hooks/useMobile';

// Mapa de cores para os blocos de reserva
const corBlockMap = {
  medio: { bg: 'bg-[#2E7D32]', text: 'text-white' },
  escuro: { bg: 'bg-[#1B5E20]', text: 'text-white' },
  claro: { bg: 'bg-[#C8E6C9]', text: 'text-[#1B5E20]' },
  manutencao: { bg: 'bg-[#FCE4EC]', text: 'text-[#C62828]' },
};

export default function Reservas() {
  const isMobile = useMobile();
  const [campusSelecionado, setCampusSelecionado] = useState('1');
  const [setorSelecionado, setSetorSelecionado] = useState('1');
  const [salas, setSalas] = useState(salasFiltraveis.map((s) => ({ ...s })));
  const [viewMode, setViewMode] = useState('Semana');
  const [agendamentoAberto, setAgendamentoAberto] = useState(false);
  const [slotSelecionado, setSlotSelecionado] = useState(null);
  const [finalidade, setFinalidade] = useState('');
  const [salaAgendamento, setSalaAgendamento] = useState('1');

  // Toggle de seleção de sala
  const toggleSala = (id) => {
    setSalas((prev) =>
      prev.map((s) => (s.id === id ? { ...s, selecionada: !s.selecionada } : s))
    );
  };

  // Abrir agendamento rápido ao clicar em slot vazio
  const handleSlotClick = (diaIndex, hora) => {
    const dia = diasSemana[diaIndex];
    const horaFim = hora + 1.5;
    const horaFimStr = `${Math.floor(horaFim)}:${horaFim % 1 ? '30' : '00'}`;
    setSlotSelecionado({
      diaIndex,
      diaNome: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'][diaIndex],
      dia: dia.dia,
      mes: 'Out',
      horaInicio: `${String(hora).padStart(2, '0')}:00`,
      horaFim: horaFimStr,
    });
    setAgendamentoAberto(true);
  };

  // Fechar agendamento rápido
  const fecharAgendamento = () => {
    setAgendamentoAberto(false);
    setSlotSelecionado(null);
    setFinalidade('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* ========================================
            PAINEL DE FILTROS (ESQUERDA)
            ======================================== */}
        <div className="w-full lg:w-[280px] flex-shrink-0 space-y-5">
          <Card>
            <h3 className="text-xs font-bold text-text-secondary tracking-widest uppercase mb-4">
              Filtros de Espaço
            </h3>

            {/* Select Campus */}
            <Select
              label="Campus"
              value={campusSelecionado}
              onChange={(e) => setCampusSelecionado(e.target.value)}
              options={campi.map((c) => ({ value: String(c.id), label: c.nome }))}
              className="mb-4"
            />

            {/* Select Setor / Bloco */}
            <Select
              label="Setor / Bloco"
              value={setorSelecionado}
              onChange={(e) => setSetorSelecionado(e.target.value)}
              options={setores.map((s) => ({ value: String(s.id), label: s.nome }))}
              className="mb-5"
            />

            {/* Salas selecionadas */}
            <h4 className="text-xs font-bold text-text-secondary tracking-widest uppercase mb-3">
              Salas Selecionadas
            </h4>
            <div className="space-y-2.5">
              {salas.map((sala) => (
                <button
                  key={sala.id}
                  onClick={() => toggleSala(sala.id)}
                  className="flex items-center gap-2.5 w-full text-left cursor-pointer group"
                >
                  {sala.selecionada ? (
                    <CheckSquare className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-300 group-hover:text-gray-400 flex-shrink-0" />
                  )}
                  <span className="text-sm text-text-primary">{sala.nome}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Aviso Institucional */}
          <div className="bg-primary-bg rounded-xl p-4 border border-[#C8E6C9]">
            <div className="flex items-start gap-2.5">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-primary mb-1">Aviso Institucional</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  As reservas para o período de exames finais estarão abertas a partir de
                  segunda-feira às 08:00.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            CALENDÁRIO SEMANAL (DIREITA)
            ======================================== */}
        <div className="flex-1 min-w-0">
          <Card className="p-0 overflow-hidden">
            {/* Cabeçalho do calendário */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-gray-100">
              <h3 className="text-lg md:text-xl font-bold text-text-primary">
                18 – 24 Outubro, 2023
              </h3>

              <div className="flex items-center gap-3">
                {/* Botões de visualização */}
                <div className="flex bg-surface-alt rounded-lg p-0.5">
                  {['Semana', 'Dia', 'Mês'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer
                        ${viewMode === mode ? 'bg-white text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Navegação */}
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <ChevronLeft className="w-4 h-4 text-text-secondary" />
                  </button>
                  <span className="text-sm font-medium text-text-secondary px-1">Hoje</span>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <ChevronRight className="w-4 h-4 text-text-secondary" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid do calendário */}
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Cabeçalho dos dias */}
                <div className="grid grid-cols-[60px_repeat(5,1fr)] border-b border-gray-100">
                  <div /> {/* Espaço da coluna de horas */}
                  {diasSemana.map((dia) => (
                    <div
                      key={dia.abreviacao}
                      className="text-center py-3 border-l border-gray-50"
                    >
                      <p className="text-xs font-semibold text-text-secondary tracking-wide">
                        {dia.abreviacao}
                      </p>
                      <p className="text-lg font-bold text-text-primary">{dia.dia}</p>
                    </div>
                  ))}
                </div>

                {/* Linhas de horário */}
                <div className="relative">
                  {horariosCalendario.map((horario, horaIndex) => {
                    const hora = 7 + horaIndex;
                    return (
                      <div
                        key={horario}
                        className="grid grid-cols-[60px_repeat(5,1fr)] border-b border-gray-50"
                      >
                        {/* Label de hora */}
                        <div className="py-3 px-2 text-right">
                          <span className="text-xs text-text-secondary font-medium">{horario}</span>
                        </div>

                        {/* Slots dos dias */}
                        {diasSemana.map((dia, diaIndex) => {
                          // Encontrar reservas que começam neste slot
                          const reserva = reservasCalendario.find(
                            (r) => r.diaSemana === diaIndex && Math.floor(r.horaInicio) === hora
                          );

                          return (
                            <div
                              key={`${diaIndex}-${hora}`}
                              className="relative border-l border-gray-50 min-h-[60px] hover:bg-gray-50/50 cursor-pointer transition-colors"
                              onClick={() => {
                                if (!reserva) handleSlotClick(diaIndex, hora);
                              }}
                            >
                              {reserva && (
                                <div
                                  className={`reservation-block ${corBlockMap[reserva.cor]?.bg || 'bg-primary'} ${corBlockMap[reserva.cor]?.text || 'text-white'}`}
                                  style={{
                                    top: `${(reserva.horaInicio - hora) * 60}px`,
                                    height: `${(reserva.horaFim - reserva.horaInicio) * 60}px`,
                                  }}
                                >
                                  <p className="font-bold text-[11px] leading-tight truncate">
                                    {reserva.titulo}
                                  </p>
                                  <p className="text-[10px] opacity-80 truncate mt-0.5">
                                    {reserva.responsavel}
                                  </p>
                                  {reserva.sala && (
                                    <p className="text-[10px] font-bold mt-0.5">{reserva.sala}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ========================================
          PAINEL DE AGENDAMENTO RÁPIDO
          ======================================== */}
      {agendamentoAberto && slotSelecionado && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={fecharAgendamento}
          />

          {/* Painel */}
          <div
            className={`fixed z-50 bg-white shadow-2xl rounded-t-2xl md:rounded-2xl
              ${isMobile
                ? 'bottom-0 left-0 right-0 max-h-[80vh]'
                : 'bottom-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px]'
              } p-5 overflow-y-auto`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-text-primary tracking-widest uppercase">
                Agendamento Rápido
              </h3>
              <button
                onClick={fecharAgendamento}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Card de horário selecionado */}
            <div className="bg-primary rounded-xl p-4 flex items-center gap-3 mb-5">
              <CalendarCheck className="w-6 h-6 text-white flex-shrink-0" />
              <div>
                <p className="text-xs text-white/80 font-semibold uppercase tracking-wide">
                  Horário Selecionado
                </p>
                <p className="text-sm text-white font-bold">
                  {slotSelecionado.diaNome}, {slotSelecionado.dia} {slotSelecionado.mes} •{' '}
                  {slotSelecionado.horaInicio} - {slotSelecionado.horaFim}
                </p>
              </div>
            </div>

            {/* Finalidade */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-text-secondary tracking-wider uppercase block mb-1.5">
                Finalidade
              </label>
              <input
                type="text"
                value={finalidade}
                onChange={(e) => setFinalidade(e.target.value)}
                placeholder="Ex: Aula de Reforço"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            {/* Sala / Ambiente */}
            <Select
              label="Sala / Ambiente"
              value={salaAgendamento}
              onChange={(e) => setSalaAgendamento(e.target.value)}
              options={espacosDisponiveis.map((e) => ({ value: String(e.id), label: e.nome }))}
              className="mb-5"
            />

            {/* Botão confirmar */}
            <Button fullWidth onClick={fecharAgendamento}>
              Confirmar Reserva
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
