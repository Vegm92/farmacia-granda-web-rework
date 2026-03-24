import Image from 'next/image'
import { getProductBySlug } from '@/lib/woocommerce'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug).catch(() => null)
  if (!product) return notFound()

  const hasDiscount = product.price !== product.regular_price
  const image = product.images[0]

  const formatPrice = (value: string) =>
    `€${parseFloat(value).toFixed(2).replace('.', ',')}`

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product image */}
        <div className="bg-primary-light rounded-xl flex items-center justify-center aspect-square overflow-hidden">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt || product.name}
              width={480}
              height={480}
              className="object-contain p-8"
            />
          ) : (
            <div className="w-full h-full bg-primary-light" aria-hidden="true" />
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-4">
          <span className="text-sm text-fg-body font-medium uppercase tracking-wide">
            {product.brand}
          </span>
          <h1 className="text-2xl font-semibold text-fg-primary">{product.name}</h1>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-fg-muted line-through">
                {formatPrice(product.regular_price)}
              </span>
            )}
          </div>

          {product.short_description && (
            <div
              className="text-fg-body text-sm leading-relaxed [&_p]:mb-2"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          <button
            type="button"
            aria-label={`Añadir ${product.name} al carrito`}
            className="mt-4 bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary-mid transition-colors"
          >
            Añadir al carrito
          </button>

          {product.stock_status === 'outofstock' && (
            <p className="text-sm text-destructive">Sin stock</p>
          )}
        </div>
      </div>

      {/* Full description */}
      {product.description && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-fg-primary mb-4">Descripción</h2>
          <div
            className="text-fg-body text-sm leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>
      )}
    </main>
  )
}
