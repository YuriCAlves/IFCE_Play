import { Building2 } from 'lucide-react'

export default function Espacos() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Espaços</h1>
        <p className="text-sm text-gray-400 mt-1">
          Catálogo de salas, laboratórios e auditórios do campus
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
          <Building2 size={32} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Em construção</h3>
        <p className="text-sm text-gray-400 max-w-sm">
          A gestão completa de espaços será implementada em breve.
        </p>
      </div>
    </div>
  )
}
