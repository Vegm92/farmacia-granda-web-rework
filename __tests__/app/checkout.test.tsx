import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutPage from '@/app/checkout/page'
import type { WooCart } from '@/types'
import * as cartContext from '@/lib/cart-context'
import * as wooCart from '@/lib/woo-cart'

jest.mock('@/lib/cart-context')
jest.mock('@/lib/woo-cart')

const MOCK_CART: WooCart = {
  items: [{
    key: 'k1', id: 1, name: 'Crema Hidratante', quantity: 1,
    prices: { price: '1590', regular_price: '1590', currency_code: 'EUR', currency_minor_unit: 2 },
    images: [],
  }],
  totals: { total_items: '1590', total_price: '1590', currency_code: 'EUR', currency_minor_unit: 2 },
}

beforeEach(() => {
  jest.mocked(cartContext.useCart).mockReturnValue({ cart: MOCK_CART, refresh: jest.fn() })
  jest.mocked(wooCart.submitWooCheckout).mockResolvedValue({ id: 123, status: 'pending', order_key: 'wc_123' })
})

afterEach(() => jest.resetAllMocks())

describe('CheckoutPage', () => {
  it('renders delivery form fields', () => {
    render(<CheckoutPage />)
    expect(screen.getByLabelText(/^nombre$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument()
  })

  it('shows order summary with product name', () => {
    render(<CheckoutPage />)
    expect(screen.getByText('Crema Hidratante')).toBeInTheDocument()
  })

  it('shows confirmation after successful submit', async () => {
    render(<CheckoutPage />)
    await userEvent.type(screen.getByLabelText(/^nombre$/i), 'Ana')
    await userEvent.type(screen.getByLabelText(/apellidos/i), 'García')
    await userEvent.type(screen.getByLabelText(/email/i), 'ana@test.com')
    await userEvent.type(screen.getByLabelText(/teléfono/i), '612345678')
    await userEvent.type(screen.getByLabelText(/dirección/i), 'Calle Mayor 1')
    await userEvent.type(screen.getByLabelText(/ciudad/i), 'Madrid')
    await userEvent.type(screen.getByLabelText(/código postal/i), '28001')
    await userEvent.click(screen.getByRole('button', { name: /confirmar pedido/i }))
    expect(await screen.findByText(/pedido confirmado/i)).toBeInTheDocument()
    expect(screen.getByText(/#123/)).toBeInTheDocument()
  })
})
