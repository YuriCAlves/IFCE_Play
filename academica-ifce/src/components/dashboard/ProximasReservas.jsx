/**
 * ProximasReservas.jsx — Card de próximas reservas do dia
 * Lista as reservas mais próximas com status e detalhes
 */

import { FlaskConical, Users, Presentation } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { proximasReservas } from '../../data/mockData';

// Ícone baseado no tipo de espaço
const tipoIconMap = {
  laboratorio: FlaskConical,
  auditorio: Presentation,
  reuniao: Users,
};

// Cor de fundo do ícone baseado no tipo
const tipoBgMap = {
  laboratorio: 'bg-primary-bg-light text-primary',
  auditorio: 'bg-primary-bg-light text-primary',
  reuniao: 'bg-gray-100 text-text-secondary',
};

export default function ProximasReservas() {
  return (
    <Card className="flex flex-col">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-text-primary">Próximas Reservas</h3>
        <a href="#" className="text-sm font-medium text-primary hover:text-primary-light transition-colors">
          Ver todas
        </a>
      </div>

      {/* Lista de reservas */}
      <div className="flex flex-col gap-3">
        {proximasReservas.map((reserva) => {
          const Icon = tipoIconMap[reserva.tipo] || FlaskConical;
          const iconBg = tipoBgMap[reserva.tipo] || tipoBgMap.laboratorio;

          return (
            <div
              key={reserva.id}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {/* Ícone do tipo */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Informações */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-text-primary truncate">{reserva.espaco}</p>
                <p className="text-xs text-text-secondary truncate">
                  {reserva.responsavel} • {reserva.finalidade}
                </p>
              </div>

              {/* Horário e status */}
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-text-primary">
                  {reserva.horarioInicio} - {reserva.horarioFim}
                </p>
                <Badge variant={reserva.status === 'confirmado' ? 'confirmado' : 'pendente'}>
                  {reserva.status === 'confirmado' ? 'CONFIRMADO' : 'PENDENTE'}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
