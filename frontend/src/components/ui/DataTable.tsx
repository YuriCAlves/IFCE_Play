import { type ReactNode } from 'react'

interface Column<T> {
  /** Chave para acessar o campo no objeto (ou identificador se usar render) */
  key: string
  /** Label exibido no header da tabela */
  label: string
  /** Render customizado para a célula */
  render?: (item: T) => ReactNode
  /** Classes CSS extras para header e cells desta coluna */
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  /** Extrai chave única de cada item */
  keyExtractor: (item: T) => string | number
  /** Exibe skeleton rows ao carregar */
  loading?: boolean
  /** Mensagem quando data está vazia (e não loading) */
  emptyMessage?: string
  /** Torna linhas clicáveis */
  onRowClick?: (item: T) => void
}

/** Linha skeleton para estado de carregamento */
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
  // Estado de loading: exibe 5 skeleton rows
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

  // Estado vazio
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-sm">{emptyMessage}</p>
      </div>
    )
  }

  // Tabela com dados
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
