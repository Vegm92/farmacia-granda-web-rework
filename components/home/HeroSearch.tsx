'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function HeroSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/buscar${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center max-w-[520px] mx-auto mb-5 bg-white border-2 border-primary rounded-md overflow-hidden shadow-sm"
    >
      <div className="flex items-center px-3 text-fg-muted">
        <Search size={16} strokeWidth={2} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busca un producto, marca o síntoma..."
        className="flex-1 py-3 px-1 text-sm outline-none bg-transparent placeholder:text-fg-muted"
      />
      <button
        type="submit"
        className="bg-primary text-white text-[13px] font-semibold px-6 py-3 hover:bg-primary-mid transition-colors"
      >
        Buscar
      </button>
    </form>
  )
}
