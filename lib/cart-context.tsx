'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { getWooCart } from '@/lib/woo-cart'
import type { WooCart } from '@/types'

interface CartContextValue {
  cart: WooCart | null
  refresh: () => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<WooCart | null>(null)

  const refresh = useCallback(async () => {
    try {
      const data = await getWooCart()
      setCart(data)
    } catch {
      // silently fail — cart stays as last known state
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <CartContext.Provider value={{ cart, refresh }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
