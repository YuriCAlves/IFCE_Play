import { CalendarDays } from 'lucide-react'

export default function Reservas() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Reservas</h1>
        <p className="text-sm text-gray-400 mt-1">
          Grade de horários e calendário de ocupação dos espaços
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
          <CalendarDays size={32} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Em construção</h3>
        <p className="text-sm text-gray-400 max-w-sm">
          O calendário interativo de reservas será implementado em breve.
        </p>
      </div>
    </div>
  )
}
