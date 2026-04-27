import Link from 'next/link'
import { Search, Package } from 'lucide-react'
import { MOCK_USER, MOCK_RECENT_SEARCHES, MOCK_RECENT_ORDERS } from '@/lib/mocks'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

export default function MiCuentaPage() {
  const user = MOCK_USER

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">

      {/* Profile header */}
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-xl">{initials(user.name)}</span>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-fg-primary">{user.name}</h1>
          <p className="text-sm text-fg-muted">{user.email}</p>
          <p className="text-xs text-fg-muted mt-0.5">
            Cliente desde {formatDate(user.memberSince)}
          </p>
        </div>
        <div className="ml-auto text-right">
          <span className="inline-block bg-brand-amber-bg text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full">
            {user.loyaltyPoints} puntos
          </span>
        </div>
      </div>

      <hr className="border-border" />

      {/* Recent searches */}
      <section>
        <h2 className="text-lg font-semibold text-fg-primary mb-4">Últimas búsquedas</h2>
        <ul className="flex flex-wrap gap-2">
          {MOCK_RECENT_SEARCHES.map((term) => (
            <li key={term}>
              <Link
                href="/buscar"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-fg-body hover:border-primary hover:text-primary transition-colors"
              >
                <Search size={12} />
                {term}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-border" />

      {/* Recent orders */}
      <section>
        <h2 className="text-lg font-semibold text-fg-primary mb-4">Pedidos recientes</h2>
        <div className="space-y-4">
          {MOCK_RECENT_ORDERS.map((order) => (
            <div key={order.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-fg-muted" />
                  <span className="text-sm font-medium text-fg-primary">{order.id}</span>
                  <span className="text-xs text-fg-muted">{formatDate(order.date)}</span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-new-bg text-brand-new-text">
                  {order.status}
                </span>
              </div>

              <ul className="space-y-1 mb-3">
                {order.items.map((item) => (
                  <li key={item.slug} className="flex justify-between text-sm">
                    <Link
                      href={`/producto/${item.slug}`}
                      className="text-fg-body hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <span className="text-fg-muted">€{parseFloat(item.price).toFixed(2).replace('.', ',')}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end border-t border-border pt-2">
                <span className="text-sm font-semibold text-fg-primary">
                  Total: €{parseFloat(order.total).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
