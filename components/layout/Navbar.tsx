import Link from 'next/link'
import { Search, User } from 'lucide-react'
import CartBadge from '@/components/layout/CartBadge'
import MobileMenu from './MobileMenu'
import type { NavLink } from '@/types'

interface NavbarProps {
  links: NavLink[]
}

export default function Navbar({ links }: NavbarProps) {
  return (
    <nav className="bg-primary h-14 flex items-center px-4 lg:px-8 gap-0 sticky top-0 z-40">
      <div className="lg:hidden flex items-center gap-2">
        <MobileMenu links={links} />
        <Link href="/" className="shrink-0">
          <span className="block text-white font-bold text-lg leading-tight tracking-tight">
            Farmacia Granda
          </span>
        </Link>
      </div>

      <Link href="/" className="mr-8 shrink-0 hidden lg:block">
        <span className="block text-white font-bold text-[15px] leading-tight tracking-tight">
          Farmacia Granda
        </span>
        <span className="block text-white/55 text-[9px] uppercase tracking-[2px] font-normal">
          Farmacia · Bienestar
        </span>
      </Link>

      <ul className="hidden lg:flex gap-0.5 flex-1">
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

      <div className="hidden lg:flex items-center gap-[18px] ml-5">
        <Link href="/buscar" aria-label="Buscar" className="text-white/80 hover:text-white transition-colors">
          <Search size={20} strokeWidth={1.8} />
        </Link>
        <Link href="/mi-cuenta" aria-label="Mi cuenta" className="text-white/80 hover:text-white transition-colors">
          <User size={20} strokeWidth={1.8} />
        </Link>
        <CartBadge />
      </div>
    </nav>
  )
}
