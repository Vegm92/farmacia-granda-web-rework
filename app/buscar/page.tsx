'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { MOCK_PRODUCTS } from '@/lib/mocks'

function BuscarContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return MOCK_PRODUCTS
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-fg-primary mb-6">Buscar productos</h1>

      <div className="relative mb-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none"
        />
        <input
          autoFocus
          type="search"
          placeholder="Busca por producto o marca..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-border text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
        />
      </div>

      {query.trim() && (
        <p className="text-sm text-fg-muted mb-6">
          {results.length > 0
            ? `${results.length} producto${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`
            : `Sin resultados para "${query}"`}
        </p>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-fg-primary font-medium mb-2">
            No encontramos resultados para &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm text-fg-muted">
            Prueba con otro término o{' '}
            <a href="/categoria/dermofarmacia" className="text-primary underline">
              explora nuestras categorías
            </a>
            .
          </p>
        </div>
      )}
    </main>
  )
}

export default function BuscarPage() {
  return (
    <Suspense>
      <BuscarContent />
    </Suspense>
  )
}
