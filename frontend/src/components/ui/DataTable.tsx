import { type ReactNode } from 'react'

interface Column<T> {
  key: string // Identificador único da coluna
  label: string // Texto exibido no cabeçalho
  render?: (item: T) => ReactNode // Função opcional para customizar a célula
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T) => string | number // Função para definir a chave única de cada linha
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (item: T) => void
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr className="animate-pulse-soft">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <div className="h-4 bg-gray-200 rounded-md w-3/4" />
        </td>
      ))}
    </tr>
  )
}

export default function DataTable<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  emptyMessage = 'Nenhum dado encontrado.',
  onRowClick,
}: DataTableProps<T>) {
  // Mostra linhas de carregamento (skeleton) enquanto os dados não chegam
  if (loading) {
    return (
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${col.className || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} cols={columns.length} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Feedback visual caso não existam dados para exibir
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map(col => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${col.className || ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, idx) => (
            <tr
              key={keyExtractor(item)}
              className={`
                transition-colors duration-150
                ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                ${onRowClick ? 'hover:bg-primary-50 cursor-pointer' : 'hover:bg-gray-50'}
              `}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map(col => (
                <td key={col.key} className={`px-4 py-3.5 text-gray-700 ${col.className || ''}`}>
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key] ?? '')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
