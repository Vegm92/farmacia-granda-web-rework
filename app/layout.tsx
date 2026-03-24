import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import type { NavLink } from '@/types'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Farmacia Granda — Farmacia Online',
  description: 'Más de 5.000 productos seleccionados por nuestros farmacéuticos. Envío en 24-48h.',
}

const NAV_LINKS: NavLink[] = [
  { label: 'Dermofarmacia', href: '/categoria/dermofarmacia' },
  { label: 'Bebé y Maternidad', href: '/categoria/bebe-maternidad' },
  { label: 'Salud', href: '/categoria/salud' },
  { label: 'Nutrición', href: '/categoria/nutricion' },
  { label: 'Óptica', href: '/categoria/optica' },
  { label: 'Ofertas', href: '/ofertas', highlight: true },
]

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <Navbar links={NAV_LINKS} />
        {children}
      </body>
    </html>
  )
}
