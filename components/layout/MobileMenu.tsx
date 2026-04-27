'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import CartBadge from '@/components/layout/CartBadge'
import type { NavLink } from '@/types'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  links: NavLink[]
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Abrir menú"
          className="lg:hidden text-white/80 hover:text-white transition-colors p-1"
        >
          <Menu size={24} strokeWidth={1.8} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 lg:hidden data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed left-0 top-0 bottom-0 w-[280px] bg-white z-50 lg:hidden flex flex-col animate-slide-in-from-left focus:outline-none">
          <Dialog.Title className="sr-only">Menú de navegación</Dialog.Title>
          <div className="flex items-center justify-between h-14 px-4 border-b">
            <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
              <span className="block text-primary font-bold text-[15px] leading-tight tracking-tight">
                Farmacia Granda
              </span>
              <span className="block text-primary/55 text-[9px] uppercase tracking-[2px] font-normal">
                Farmacia · Bienestar
              </span>
            </Link>
            <Dialog.Close asChild>
              <button aria-label="Cerrar menú" className="p-2 -mr-2 text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center h-12 px-4 text-[15px] transition-colors hover:bg-primary/5',
                      link.highlight
                        ? 'text-brand-amber font-semibold'
                        : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between h-14 px-4 border-t gap-3">
            <Link href="/buscar" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <Search size={20} strokeWidth={1.8} />
            </Link>
            <Link href="/mi-cuenta" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <User size={20} strokeWidth={1.8} />
            </Link>
            <CartBadge />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}