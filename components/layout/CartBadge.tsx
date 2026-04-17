'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CartBadge() {
  const { cart } = useCart()
  const count = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  return (
    <Link href="/carrito" aria-label={`Carrito (${count} artículos)`} className="relative text-white/80 hover:text-white transition-colors">
      <ShoppingCart size={20} strokeWidth={1.8} />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-brand-amber text-[9px] font-bold text-amber-900 rounded-full w-4 h-4 flex items-center justify-center leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}
