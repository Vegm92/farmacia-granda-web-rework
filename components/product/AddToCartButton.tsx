'use client'

import { useState } from 'react'
import { addToWooCart } from '@/lib/woo-cart'
import { addMockCartItem } from '@/lib/mock-cart'
import { useCart } from '@/lib/cart-context'
import { IS_MOCK_MODE } from '@/lib/cart-mode'
import type { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product
  label?: string
}

export default function AddToCartButton({ product, label = '+ Añadir' }: AddToCartButtonProps) {
  const { refresh } = useCart()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      if (IS_MOCK_MODE) {
        addMockCartItem(product.id, product.name, product.price, product.images)
      } else {
        await addToWooCart(product.id, 1)
      }
      await refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-primary text-white rounded text-xs font-semibold py-2 hover:bg-primary-mid transition-colors disabled:opacity-60"
    >
      {loading ? 'Añadiendo…' : label}
    </button>
  )
}
