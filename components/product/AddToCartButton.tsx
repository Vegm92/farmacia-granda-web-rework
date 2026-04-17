'use client'

import { useState } from 'react'
import { addToWooCart } from '@/lib/woo-cart'
import { useCart } from '@/lib/cart-context'

interface AddToCartButtonProps {
  productId: number
  label?: string
}

export default function AddToCartButton({ productId, label = '+ Añadir' }: AddToCartButtonProps) {
  const { refresh } = useCart()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      await addToWooCart(productId, 1)
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
