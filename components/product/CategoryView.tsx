'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/product/ProductCard'
import ProductFilters from '@/components/product/ProductFilters'
import type { Product } from '@/types'

interface Props {
  products: Product[]
  title: string
}

function sortProducts(products: Product[], sort: string): Product[] {
  const copy = [...products]
  switch (sort) {
    case 'price_asc':
      return copy.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    case 'price_desc':
      return copy.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    default:
      return copy
  }
}

export default function CategoryView({ products, title }: Props) {
  const [sort, setSort] = useState('default')
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort])

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-fg-primary">{title}</h1>
        <ProductFilters currentSort={sort} onSort={setSort} />
      </div>
      {sorted.length === 0 ? (
        <p className="text-fg-muted text-center py-16">
          No se encontraron productos en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}
