/**
 * OcupacaoCard.jsx — Card de Ocupação em Tempo Real
 * Exibe gráfico donut com percentual de salas ocupadas
 */

import Card from '../ui/Card';
import Badge from '../ui/Badge';
import DonutChart from '../ui/DonutChart';
import { dadosOcupacao } from '../../data/mockData';

export default function OcupacaoCard() {
  return (
    <Card className="flex flex-col">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-primary">Ocupação em Tempo Real</h3>
        <Badge variant="live">LIVE</Badge>
      </div>

      {/* Gráfico */}
      <div className="flex justify-center mb-6">
        <DonutChart percentage={dadosOcupacao.percentual} size={200} strokeWidth={18} />
      </div>

      {/* Legenda */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-text-secondary">Em uso</span>
          </div>
          <span className="text-sm font-bold text-text-primary">{dadosOcupacao.emUso} Salas</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-200" />
            <span className="text-sm text-text-secondary">Disponíveis</span>
          </div>
          <span className="text-sm font-bold text-text-primary">{dadosOcupacao.disponiveis} Salas</span>
        </div>
      </div>
    </Card>
  );
}
