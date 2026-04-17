import { render, screen } from '@testing-library/react'
import ProductCard from '../../components/product/ProductCard'
import type { Product } from '../../types'
import * as cartContext from '@/lib/cart-context'

jest.mock('@/lib/cart-context')

beforeEach(() => {
  jest.mocked(cartContext.useCart).mockReturnValue({ cart: null, refresh: jest.fn() })
})

const base: Product = {
  id: 1,
  name: 'Sérum C-Vit Radiance',
  slug: 'serum-c-vit',
  brand: 'SESDERMA',
  price: '29.90',
  regular_price: '29.90',
  images: [],
  featured: true,
}

test('renders product name and brand', () => {
  render(<ProductCard product={base} />)
  expect(screen.getByText('Sérum C-Vit Radiance')).toBeInTheDocument()
  expect(screen.getByText('SESDERMA')).toBeInTheDocument()
})

test('renders current price', () => {
  render(<ProductCard product={base} />)
  expect(screen.getByText('€29,90')).toBeInTheDocument()
})

test('renders discount badge and crossed price when discounted', () => {
  render(<ProductCard product={{ ...base, price: '28.50', regular_price: '35.90', badge: 'discount', discount_percent: 21 }} />)
  expect(screen.getByText('-21%')).toBeInTheDocument()
  expect(screen.getByText('€35,90')).toBeInTheDocument()
})

test('renders Nuevo badge when badge is new', () => {
  render(<ProductCard product={{ ...base, badge: 'new' }} />)
  expect(screen.getByText('Nuevo')).toBeInTheDocument()
})

test('renders add to cart button', () => {
  render(<ProductCard product={base} />)
  expect(screen.getByRole('button', { name: /Añadir/i })).toBeInTheDocument()
})
