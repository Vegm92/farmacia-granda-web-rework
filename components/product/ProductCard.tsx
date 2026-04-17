import Image from 'next/image'
import AddToCartButton from '@/components/product/AddToCartButton'
import type { Product } from '@/types'

function formatPrice(price: string): string {
  return '€' + parseFloat(price).toFixed(2).replace('.', ',')
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, brand, price, regular_price, images, badge, discount_percent } = product
  const hasDiscount = badge === 'discount' && regular_price && price !== regular_price

  return (
    <div className="border border-border rounded-lg overflow-hidden relative group hover:shadow-md transition-shadow">
      {badge === 'discount' && discount_percent && (
        <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold px-[7px] py-[3px] rounded bg-brand-amber-bg text-amber-800">
          -{discount_percent}%
        </span>
      )}
      {badge === 'new' && (
        <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold px-[7px] py-[3px] rounded bg-brand-new-bg text-brand-new-text">
          Nuevo
        </span>
      )}

      <div className="bg-primary-light h-32 flex items-center justify-center">
        {images[0] ? (
          <Image
            src={images[0].src}
            alt={images[0].alt || name}
            width={80}
            height={80}
            className="object-contain"
          />
        ) : (
          <div className="w-16 h-16 bg-primary-subtle rounded-lg" />
        )}
      </div>

      <div className="p-3">
        <p className="text-[10px] font-semibold text-fg-muted uppercase tracking-[0.5px] mb-[3px]">
          {brand}
        </p>
        <p className="text-[12px] font-medium text-fg-primary leading-snug mb-2">{name}</p>
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-[15px] font-bold text-fg-primary">{formatPrice(price)}</span>
          {hasDiscount && (
            <span className="text-xs text-fg-muted line-through">{formatPrice(regular_price)}</span>
          )}
        </div>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
