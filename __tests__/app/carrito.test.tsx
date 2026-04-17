import { render, screen } from '@testing-library/react'
import CarritoPage from '@/app/carrito/page'
import type { WooCart } from '@/types'
import * as cartContext from '@/lib/cart-context'

jest.mock('@/lib/cart-context')
jest.mock('@/lib/woo-cart', () => ({
  removeFromWooCart: jest.fn().mockResolvedValue({}),
  updateWooCartItem: jest.fn().mockResolvedValue({}),
}))

const MOCK_CART: WooCart = {
  items: [{
    key: 'k1', id: 1, name: 'Crema Hidratante', quantity: 2,
    prices: { price: '1590', regular_price: '1590', currency_code: 'EUR', currency_minor_unit: 2 },
    images: [],
  }],
  totals: { total_items: '3180', total_price: '3180', currency_code: 'EUR', currency_minor_unit: 2 },
}

afterEach(() => jest.resetAllMocks())

describe('CarritoPage', () => {
  it('renders product name from cart', () => {
    jest.mocked(cartContext.useCart).mockReturnValue({ cart: MOCK_CART, refresh: jest.fn() })
    render(<CarritoPage />)
    expect(screen.getByText('Crema Hidratante')).toBeInTheDocument()
  })

  it('shows empty state when cart has no items', () => {
    jest.mocked(cartContext.useCart).mockReturnValue({
      cart: { items: [], totals: MOCK_CART.totals },
      refresh: jest.fn(),
    })
    render(<CarritoPage />)
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument()
  })

  it('shows total price', () => {
    jest.mocked(cartContext.useCart).mockReturnValue({ cart: MOCK_CART, refresh: jest.fn() })
    render(<CarritoPage />)
    expect(screen.getAllByText(/31,80/).length).toBeGreaterThan(0)
  })

  it('shows checkout link', () => {
    jest.mocked(cartContext.useCart).mockReturnValue({ cart: MOCK_CART, refresh: jest.fn() })
    render(<CarritoPage />)
    expect(screen.getByRole('link', { name: /tramitar pedido/i })).toBeInTheDocument()
  })
})
