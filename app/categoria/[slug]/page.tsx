import ProductCard from '@/components/product/ProductCard'
import ProductFilters from '@/components/product/ProductFilters'
import { getProductsByCategory } from '@/lib/woocommerce'
import { MOCK_PRODUCTS } from '@/lib/mocks'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sort?: string }>
}

const SORT_MAP: Record<string, { orderby: string; order: string }> = {
  price_asc:  { orderby: 'price',      order: 'asc' },
  price_desc: { orderby: 'price',      order: 'desc' },
  newest:     { orderby: 'date',       order: 'desc' },
  default:    { orderby: 'menu_order', order: 'asc' },
}

// Known category display names — slug → display name
const CATEGORY_NAMES: Record<string, string> = {
  'dermofarmacia':   'Dermofarmacia',
  'bebe-maternidad': 'Bebé y Maternidad',
  'salud':           'Salud',
  'nutricion':       'Nutrición',
  'optica':          'Óptica',
  'destacados':      'Productos destacados',
}

function slugToTitle(slug: string): string {
  return CATEGORY_NAMES[slug] ?? (slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '))
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { sort = 'default' } = await searchParams
  const { orderby, order } = SORT_MAP[sort] ?? SORT_MAP.default

  const products = await getProductsByCategory(slug, 12, orderby, order).catch(() => MOCK_PRODUCTS)

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-fg-primary">
          {slugToTitle(slug)}
        </h1>
        <ProductFilters currentSort={sort} />
      </div>
      {products.length === 0 ? (
        <p className="text-fg-muted text-center py-16">
          No se encontraron productos en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}
