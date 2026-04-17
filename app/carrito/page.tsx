'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { removeFromWooCart, updateWooCartItem } from '@/lib/woo-cart'
import type { WooCartItem } from '@/types'

function minorToDecimal(value: string, minorUnit: number): number {
  return parseInt(value, 10) / Math.pow(10, minorUnit)
}

function fmt(value: number): string {
  return '€' + value.toFixed(2).replace('.', ',')
}

export default function CarritoPage() {
  const { cart, refresh } = useCart()
  const minorUnit = cart?.totals.currency_minor_unit ?? 2

  async function handleRemove(key: string) {
    await removeFromWooCart(key)
    await refresh()
  }

  async function handleUpdate(key: string, quantity: number) {
    if (quantity <= 0) return handleRemove(key)
    await updateWooCartItem(key, quantity)
    await refresh()
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-fg-muted text-lg mb-6">Tu carrito está vacío</p>
        <Link href="/" className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary-mid transition-colors">
          Seguir comprando
        </Link>
      </main>
    )
  }

  const total = minorToDecimal(cart.totals.total_price, minorUnit)

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-fg-primary mb-8">Tu carrito</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.items.map((item: WooCartItem) => {
            const price = minorToDecimal(item.prices.price, minorUnit)
            const image = item.images[0]
            return (
              <div key={item.key} className="flex gap-4 p-4 bg-white border border-border rounded-xl">
                <div className="w-20 h-20 bg-primary-light rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                  {image ? (
                    <Image src={image.src} alt={image.alt || item.name} width={64} height={64} className="object-contain" />
                  ) : (
                    <div className="w-10 h-10 bg-primary-subtle rounded" aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-fg-primary mt-0.5 line-clamp-2">{item.name}</p>
                  <p className="text-sm font-bold text-primary mt-1">{fmt(price * item.quantity)}</p>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <button type="button" aria-label={`Eliminar ${item.name}`} onClick={() => handleRemove(item.key)} className="text-fg-muted hover:text-destructive transition-colors">
                    <Trash2 size={16} />
                  </button>
                  <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
                    <button type="button" aria-label="Reducir cantidad" onClick={() => handleUpdate(item.key, item.quantity - 1)} className="w-7 h-7 text-fg-primary hover:bg-primary-light transition-colors text-sm font-medium">−</button>
                    <span className="w-7 text-center text-sm font-medium text-fg-primary">{item.quantity}</span>
                    <button type="button" aria-label="Aumentar cantidad" onClick={() => handleUpdate(item.key, item.quantity + 1)} className="w-7 h-7 text-fg-primary hover:bg-primary-light transition-colors text-sm font-medium">+</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white border border-border rounded-xl p-6 h-fit">
          <h2 className="text-base font-semibold text-fg-primary mb-4">Resumen del pedido</h2>
          <div className="flex justify-between text-sm text-fg-body mb-2"><span>Subtotal</span><span>{fmt(total)}</span></div>
          <div className="flex justify-between text-sm text-fg-body mb-4"><span>Envío</span><span className="text-primary font-medium">Gratis</span></div>
          <div className="flex justify-between font-semibold text-fg-primary border-t border-border pt-4 mb-6"><span>Total</span><span>{fmt(total)}</span></div>
          <Link href="/checkout" className="block w-full text-center bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-mid transition-colors">
            Tramitar pedido
          </Link>
        </div>
      </div>
    </main>
  )
}
