import CategoryView from '@/components/product/CategoryView'
import { getProductsByCategory } from '@/lib/data'

export function generateStaticParams() {
  return [
    'dermofarmacia', 'bebe-maternidad', 'salud', 'nutricion', 'optica', 'destacados',
  ].map((slug) => ({ slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

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

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const products = await getProductsByCategory(slug, 12)
  return <CategoryView products={products} title={slugToTitle(slug)} />
}
