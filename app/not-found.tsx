import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-8xl font-bold text-primary-subtle select-none">404</span>
      <h1 className="mt-4 text-2xl font-semibold text-fg-primary">
        Página no encontrada
      </h1>
      <p className="mt-2 text-fg-body max-w-sm">
        Lo sentimos, esta página no existe o ha sido movida. Vuelve al inicio para continuar comprando.
      </p>
      <Link
        href="/"
        className="mt-8 bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary-mid transition-colors"
      >
        Volver al inicio
      </Link>
    </main>
  )
}
