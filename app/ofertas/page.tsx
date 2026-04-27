import Link from 'next/link'
import { Tag } from 'lucide-react'

export default function OfertasPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-brand-amber-bg flex items-center justify-center">
          <Tag size={28} className="text-brand-amber" />
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-fg-primary mb-3">
        Ofertas y promociones
      </h1>
      <p className="text-fg-body max-w-sm mx-auto mb-8">
        Actualmente no hay ofertas activas. Vuelve pronto — publicamos nuevas promociones cada semana.
      </p>

      <div className="flex gap-3 justify-center flex-wrap">
        <Link
          href="/categoria/destacados"
          className="bg-primary text-white font-medium px-5 py-2.5 rounded-lg hover:bg-primary-mid transition-colors text-sm"
        >
          Ver productos destacados
        </Link>
        <Link
          href="/"
          className="border border-border text-fg-primary font-medium px-5 py-2.5 rounded-lg hover:bg-primary-light transition-colors text-sm"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
