import Link from 'next/link'
import { Search, User, ShoppingCart } from 'lucide-react'
import type { NavLink } from '@/types'

interface NavbarProps {
  links: NavLink[]
}

export default function Navbar({ links }: NavbarProps) {
  return (
    <nav className="bg-primary h-14 flex items-center px-8 gap-0">
      <Link href="/" className="mr-8 shrink-0">
        <span className="block text-white font-bold text-[15px] leading-tight tracking-tight">
          Farmacia Granda
        </span>
        <span className="block text-white/55 text-[9px] uppercase tracking-[2px] font-normal">
          Farmacia · Bienestar
        </span>
      </Link>

      <ul className="flex gap-0.5 flex-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center h-14 px-3 text-[13px] transition-colors hover:text-white hover:bg-white/[0.08] ${
                link.highlight ? 'text-brand-amber font-semibold' : 'text-white/75'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-[18px] ml-5">
        <button aria-label="Buscar" className="text-white/80 hover:text-white transition-colors">
          <Search size={20} strokeWidth={1.8} />
        </button>
        <button aria-label="Mi cuenta" className="text-white/80 hover:text-white transition-colors">
          <User size={20} strokeWidth={1.8} />
        </button>
        <button aria-label="Carrito" className="text-white/80 hover:text-white transition-colors">
          <ShoppingCart size={20} strokeWidth={1.8} />
        </button>
      </div>
    </nav>
  )
}
