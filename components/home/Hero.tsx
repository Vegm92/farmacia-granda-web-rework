import Link from 'next/link'
import HeroSearch from '@/components/home/HeroSearch'

interface HeroPill {
  label: string
  href: string
}

interface HeroProps {
  pills: HeroPill[]
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

      <HeroSearch />

      <div className="flex gap-2 justify-center flex-wrap">
        {pills.map((pill) => (
          <Link
            key={pill.label}
            href={pill.href}
            className="bg-white border border-primary-subtle rounded-full text-xs text-primary font-medium px-[14px] py-1.5 hover:bg-primary hover:text-white transition-colors"
          >
            {pill.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
