import { render, screen } from '@testing-library/react'
import ProductPage from '@/app/producto/[slug]/page'
import { getProductBySlug } from '@/lib/woocommerce'
import type { ProductDetail } from '@/types'
import { notFound } from 'next/navigation'

jest.mock('@/lib/woocommerce')
jest.mock('next/navigation', () => ({ notFound: jest.fn() }))

const MOCK_PRODUCT: ProductDetail = {
  id: 1,
  name: 'Eryfotona Actinica SPF 100+',
  slug: 'eryfotona',
  brand: 'ISDIN',
  price: '28.50',
  regular_price: '35.90',
  images: [],
  featured: true,
  badge: 'discount',
  discount_percent: 21,
  description: '<p>Descripción completa del producto.</p>',
  short_description: '<p>Resumen breve.</p>',
  categories: [{ id: 1, name: 'Dermofarmacia', slug: 'dermofarmacia' }],
  stock_status: 'instock',
}

describe('ProductPage', () => {
  it('renders product name', async () => {
    jest.mocked(getProductBySlug).mockResolvedValue(MOCK_PRODUCT)
    const jsx = await ProductPage({ params: Promise.resolve({ slug: 'eryfotona' }) })
    render(jsx)
    expect(screen.getByRole('heading', { name: 'Eryfotona Actinica SPF 100+' })).toBeInTheDocument()
  })

  it('renders brand', async () => {
    jest.mocked(getProductBySlug).mockResolvedValue(MOCK_PRODUCT)
    const jsx = await ProductPage({ params: Promise.resolve({ slug: 'eryfotona' }) })
    render(jsx)
    expect(screen.getByText('ISDIN')).toBeInTheDocument()
  })

  it('renders current price formatted', async () => {
    jest.mocked(getProductBySlug).mockResolvedValue(MOCK_PRODUCT)
    const jsx = await ProductPage({ params: Promise.resolve({ slug: 'eryfotona' }) })
    render(jsx)
    expect(screen.getByText(/28,50/)).toBeInTheDocument()
  })

  it('renders add to cart button', async () => {
    jest.mocked(getProductBySlug).mockResolvedValue(MOCK_PRODUCT)
    const jsx = await ProductPage({ params: Promise.resolve({ slug: 'eryfotona' }) })
    render(jsx)
    expect(screen.getByRole('button', { name: /añadir/i })).toBeInTheDocument()
  })

  it('calls notFound when product does not exist', async () => {
    jest.mocked(getProductBySlug).mockResolvedValue(null)
    await ProductPage({ params: Promise.resolve({ slug: 'not-found' }) })
    expect(notFound).toHaveBeenCalled()
  })
})
