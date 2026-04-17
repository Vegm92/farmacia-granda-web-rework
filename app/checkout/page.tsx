'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { submitWooCheckout } from '@/lib/woo-cart'
import type { WooOrder } from '@/types'

function minorToDecimal(value: string, minorUnit: number): number {
  return parseInt(value, 10) / Math.pow(10, minorUnit)
}

function fmt(value: number): string {
  return '€' + value.toFixed(2).replace('.', ',')
}

interface FormState {
  nombre: string; apellidos: string; email: string
  telefono: string; direccion: string; ciudad: string; postal: string
}

const EMPTY: FormState = {
  nombre: '', apellidos: '', email: '', telefono: '', direccion: '', ciudad: '', postal: '',
}

const FIELDS = [
  { label: 'Nombre', name: 'nombre' as const, type: 'text' },
  { label: 'Apellidos', name: 'apellidos' as const, type: 'text' },
  { label: 'Email', name: 'email' as const, type: 'email' },
  { label: 'Teléfono', name: 'telefono' as const, type: 'tel' },
  { label: 'Dirección', name: 'direccion' as const, type: 'text' },
  { label: 'Ciudad', name: 'ciudad' as const, type: 'text' },
  { label: 'Código postal', name: 'postal' as const, type: 'text' },
]

export default function CheckoutPage() {
  const { cart, refresh } = useCart()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [order, setOrder] = useState<WooOrder | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const minorUnit = cart?.totals.currency_minor_unit ?? 2

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const wooOrder = await submitWooCheckout({
        billing_address: {
          first_name: form.nombre, last_name: form.apellidos,
          address_1: form.direccion, city: form.ciudad,
          postcode: form.postal, country: 'ES',
          email: form.email, phone: form.telefono,
        },
        shipping_address: {
          first_name: form.nombre, last_name: form.apellidos,
          address_1: form.direccion, city: form.ciudad,
          postcode: form.postal, country: 'ES',
        },
        payment_method: 'cod',
      })
      setOrder(wooOrder)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pedido')
    } finally {
      setSubmitting(false)
    }
  }

  if (order) {
    return (
      <main className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="w-14 h-14 bg-primary-subtle rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-primary text-2xl font-bold">✓</span>
        </div>
        <h1 className="text-2xl font-semibold text-fg-primary mb-2">Pedido confirmado</h1>
        <p className="text-fg-muted text-sm mb-2">#{order.id}</p>
        <p className="text-fg-body text-sm">
          Gracias, {form.nombre}. Recibirás la confirmación en {form.email}.
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-fg-primary mb-8">Tramitar pedido</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-base font-semibold text-fg-primary">Datos de envío</h2>
          {FIELDS.map(({ label, name, type }) => (
            <div key={name} className="flex flex-col gap-1">
              <label htmlFor={name} className="text-sm font-medium text-fg-primary">{label}</label>
              <input
                id={name} name={name} type={type} required
                value={form[name]} onChange={handleChange}
                className="border border-border rounded-lg px-3 py-2 text-sm text-fg-primary outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          ))}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit" disabled={submitting}
            className="mt-4 w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-mid transition-colors disabled:opacity-60"
          >
            {submitting ? 'Procesando...' : 'Confirmar pedido'}
          </button>
        </form>

        <div className="bg-white border border-border rounded-xl p-6 h-fit">
          <h2 className="text-base font-semibold text-fg-primary mb-4">Tu pedido</h2>
          <ul className="flex flex-col gap-3 mb-4">
            {(cart?.items ?? []).map((item) => {
              const price = minorToDecimal(item.prices.price, minorUnit)
              return (
                <li key={item.key} className="flex justify-between text-sm text-fg-body">
                  <span className="line-clamp-1 flex-1">{item.name}</span>
                  <span className="ml-3 shrink-0 font-medium text-fg-primary">
                    ×{item.quantity} {fmt(price * item.quantity)}
                  </span>
                </li>
              )
            })}
          </ul>
          <div className="flex justify-between font-semibold text-fg-primary border-t border-border pt-4">
            <span>Total</span>
            <span>{fmt(minorToDecimal(cart?.totals.total_price ?? '0', minorUnit))}</span>
          </div>
        </div>
      </div>
    </main>
  )
}
