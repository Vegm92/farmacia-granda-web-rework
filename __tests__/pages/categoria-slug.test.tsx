import { render, screen } from '@testing-library/react'
import CategoryPage from '@/app/categoria/[slug]/page'
import { getProductsByCategory } from '@/lib/woocommerce'
import type { Product } from '@/types'

jest.mock('@/lib/woocommerce')
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/categoria/dermofarmacia',
  useSearchParams: () => new URLSearchParams(),
  notFound: jest.fn(),
}))

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Crema Hidratante', slug: 'crema', brand: 'ISDIN', price: '15.90', regular_price: '15.90', images: [], featured: false },
  { id: 2, name: 'Sérum Vitamina C', slug: 'serum-c', brand: 'SESDERMA', price: '29.90', regular_price: '29.90', images: [], featured: false },
]

describe('CategoryPage', () => {
  it('renders category heading', async () => {
    jest.mocked(getProductsByCategory).mockResolvedValue(MOCK_PRODUCTS)
    const jsx = await CategoryPage({
      params: Promise.resolve({ slug: 'dermofarmacia' }),
      searchParams: Promise.resolve({}),
    })
    render(jsx)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dermofarmacia')
  })

  it('renders all product cards', async () => {
    jest.mocked(getProductsByCategory).mockResolvedValue(MOCK_PRODUCTS)
    const jsx = await CategoryPage({
      params: Promise.resolve({ slug: 'dermofarmacia' }),
      searchParams: Promise.resolve({}),
    })
    render(jsx)
    expect(screen.getByText('Crema Hidratante')).toBeInTheDocument()
    expect(screen.getByText('Sérum Vitamina C')).toBeInTheDocument()
  })

  it('shows empty state when no products', async () => {
    jest.mocked(getProductsByCategory).mockResolvedValue([])
    const jsx = await CategoryPage({
      params: Promise.resolve({ slug: 'sin-stock' }),
      searchParams: Promise.resolve({}),
    })
    render(jsx)
    expect(screen.getByText(/no se encontraron productos/i)).toBeInTheDocument()
  })
})
