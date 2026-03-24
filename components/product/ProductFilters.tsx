'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface Props {
  currentSort: string
}

const SORT_OPTIONS = [
  { value: 'default',    label: 'Orden por defecto' },
  { value: 'price_asc',  label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'newest',     label: 'Más recientes' },
]

export default function ProductFilters({ currentSort }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'default') {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }
    router.push(params.toString() ? `${pathname}?${params.toString()}` : pathname)
  }

  return (
    <select
      value={currentSort}
      onChange={(e) => handleSort(e.target.value)}
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
