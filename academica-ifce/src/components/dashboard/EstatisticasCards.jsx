/**
 * EstatisticasCards.jsx — Cards de estatísticas (Manutenções e Eficiência)
 * Inclui card de gestores online
 */

import { Clock, TrendingUp } from 'lucide-react';
import { manutencoesHoje, eficienciaUso, gestoresOnline } from '../../data/mockData';

export function ManutencaoCard() {
  return (
    <div className="bg-primary rounded-xl p-5 text-white flex flex-col justify-between min-h-[160px]">
      <p className="text-sm font-medium opacity-90">Manutenções Hoje</p>
      <div>
        <p className="text-5xl font-bold mt-2">{String(manutencoesHoje.total).padStart(2, '0')}</p>
        <div className="flex items-center gap-1.5 mt-3 bg-white/15 text-white text-xs font-semibold rounded-full px-2.5 py-1 w-fit">
          <Clock className="w-3 h-3" />
          PRÓX: {manutencoesHoje.proximaHora}
        </div>
      </div>
    </div>
  );
}

export function EficienciaCard() {
  return (
    <div className="bg-primary-bg rounded-xl p-5 flex flex-col justify-between min-h-[160px]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-primary">Eficiência de Uso</p>
        <TrendingUp className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-5xl font-bold text-primary mt-2">{eficienciaUso.percentual}%</p>
        <div className="mt-3 h-2 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${eficienciaUso.percentual}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function GestoresOnlineCard() {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
      {/* Avatares empilhados */}
      <div className="flex -space-x-2">
        {gestoresOnline.avatares.map((avatar, i) => (
          <img
            key={i}
            src={avatar}
            alt="Gestor"
            className="w-8 h-8 rounded-full border-2 border-white object-cover"
          />
        ))}
        <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center border-2 border-white">
          +{gestoresOnline.extras}
        </div>
      </div>

      {/* Texto */}
      <div className="min-w-0">
        <p className="text-sm font-bold text-text-primary">Gestores Online</p>
        <p className="text-xs text-text-secondary">{gestoresOnline.mensagem}</p>
      </div>
    </div>
  );
}
