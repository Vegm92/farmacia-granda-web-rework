import { Search } from 'lucide-react'

interface HeroProps {
  pills: string[]
}

export default function Hero({ pills }: HeroProps) {
  return (
    <section className="bg-primary-light border-b border-primary-subtle py-[52px] px-8 text-center">
      <h1 className="text-[30px] font-bold text-primary tracking-[-0.5px] mb-2">
        Encuentra lo que necesitas
      </h1>
      <p className="text-sm text-fg-body mb-7">
        5.000+ productos seleccionados · Farmacéuticos expertos · Envío en 24-48h
      </p>

      <div className="flex items-center max-w-[520px] mx-auto mb-5 bg-white border-2 border-primary rounded-md overflow-hidden shadow-sm">
        <div className="flex items-center px-3 text-fg-muted">
          <Search size={16} strokeWidth={2} />
        </div>
        <input
          type="text"
          placeholder="Busca un producto, marca o síntoma..."
          className="flex-1 py-3 px-1 text-sm outline-none bg-transparent placeholder:text-fg-muted"
        />
        <button className="bg-primary text-white text-[13px] font-semibold px-6 py-3 hover:bg-primary-mid transition-colors">
          Buscar
        </button>
      </div>

      <div className="flex gap-2 justify-center flex-wrap">
        {pills.map((pill) => (
          <button
            key={pill}
            className="bg-white border border-primary-subtle rounded-full text-xs text-primary font-medium px-[14px] py-1.5 hover:bg-primary hover:text-white transition-colors"
          >
            {pill}
          </button>
        ))}
      </div>
    </section>
  )
}
