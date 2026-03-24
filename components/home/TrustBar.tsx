import { Truck, Activity, Lock, RotateCcw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface TrustItemData {
  Icon: LucideIcon
  title: string
  subtitle: string
}

const ITEMS: TrustItemData[] = [
  { Icon: Truck, title: 'Envío 24-48h', subtitle: 'Gratis en pedidos +39€' },
  { Icon: Activity, title: 'Farmacéuticos expertos', subtitle: 'Asesoramiento personalizado' },
  { Icon: Lock, title: 'Pago seguro', subtitle: 'Trusted Shops certificado' },
  { Icon: RotateCcw, title: 'Devolución fácil', subtitle: '30 días sin preguntas' },
]

export default function TrustBar() {
  return (
    <div className="bg-primary py-7 px-8 grid grid-cols-4 gap-4">
      {ITEMS.map(({ Icon, title, subtitle }) => (
        <div key={title} className="text-center">
          <Icon size={24} strokeWidth={1.8} className="text-white/75 mx-auto mb-2" />
          <p className="text-[13px] font-semibold text-white mb-0.5">{title}</p>
          <p className="text-[11px] text-white/55">{subtitle}</p>
        </div>
      ))}
    </div>
  )
}
