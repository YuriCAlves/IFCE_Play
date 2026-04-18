/**
 * AlertasConflitos.jsx — Card de alertas de conflitos
 * Exibe conflitos de reserva que precisam de atenção
 */

import { AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { alertasConflitos } from '../../data/mockData';

export default function AlertasConflitos() {
  return (
    <Card className="flex flex-col">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-alert-red" />
        <h3 className="text-lg font-bold text-text-primary">Alertas de Conflitos</h3>
      </div>

      {/* Lista de alertas */}
      <div className="flex flex-col gap-3">
        {alertasConflitos.map((alerta) => (
          <div
            key={alerta.id}
            className="flex items-start gap-3 p-4 rounded-xl bg-white border border-red-100 border-l-[3px] border-l-alert-red hover:bg-red-50/30 transition-colors cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-alert-red">{alerta.titulo}</p>
              <p className="text-xs text-text-secondary mt-1">{alerta.descricao}</p>
            </div>
            <Button variant="danger" className="flex-shrink-0 text-xs px-3 py-1.5">
              {alerta.acao}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
