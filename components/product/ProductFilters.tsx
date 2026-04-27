'use client'

interface Props {
  currentSort: string
  onSort: (value: string) => void
}

const SORT_OPTIONS = [
  { value: 'default',    label: 'Orden por defecto' },
  { value: 'price_asc',  label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'newest',     label: 'Más recientes' },
]

export default function ProductFilters({ currentSort, onSort }: Props) {
  return (
    <select
      value={currentSort}
      onChange={(e) => onSort(e.target.value)}
      className="text-sm border border-border rounded-md px-3 py-2 text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Ordenar productos"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
