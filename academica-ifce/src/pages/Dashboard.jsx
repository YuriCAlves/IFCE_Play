/**
 * Dashboard.jsx — Página principal do sistema
 * Exibe visão geral com ocupação, reservas, alertas e estatísticas
 */

import { CalendarDays } from 'lucide-react';
import OcupacaoCard from '../components/dashboard/OcupacaoCard';
import ProximasReservas from '../components/dashboard/ProximasReservas';
import AlertasConflitos from '../components/dashboard/AlertasConflitos';
import {
  ManutencaoCard,
  EficienciaCard,
  GestoresOnlineCard,
} from '../components/dashboard/EstatisticasCards';

export default function Dashboard() {
  // Data atual formatada em português
  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Cabeçalho da página */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-2">
        <div>
          <p className="text-xs font-semibold text-text-secondary tracking-widest uppercase mb-1">
            Visão Geral
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Dashboard Principal</h2>
          <p className="text-sm text-text-secondary mt-1">
            Gerencie o uso dos espaços acadêmicos de forma inteligente.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-100 text-sm text-text-primary font-medium whitespace-nowrap mt-2 md:mt-0">
          <CalendarDays className="w-4 h-4 text-primary" />
          Hoje, {dataAtual}
        </div>
      </div>

      {/* Grid principal — Ocupação + Próximas Reservas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <OcupacaoCard />
        <ProximasReservas />
      </div>

      {/* Seção inferior — Alertas + Estatísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Alertas — ocupa 2 colunas no desktop */}
        <div className="lg:col-span-2">
          <AlertasConflitos />
        </div>

        {/* Cards de estatísticas — 1 coluna */}
        <div className="flex flex-col gap-5">
          <ManutencaoCard />
          <EficienciaCard />
        </div>
      </div>

      {/* Rodapé — Gestores Online */}
      <GestoresOnlineCard />
    </div>
  );
}
