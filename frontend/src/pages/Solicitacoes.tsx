import { ClipboardList } from 'lucide-react'

export default function Solicitacoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Solicitações</h1>
        <p className="text-sm text-gray-400 mt-1">
          Aprovação e rejeição de reservas pendentes
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-warning-50 flex items-center justify-center mb-4">
          <ClipboardList size={32} className="text-warning-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Em construção</h3>
        <p className="text-sm text-gray-400 max-w-sm">
          O painel de aprovação de solicitações será implementado em breve.
        </p>
      </div>
    </div>
  )
}
