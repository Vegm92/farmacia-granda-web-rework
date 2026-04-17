import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddToCartButton from '@/components/product/AddToCartButton'
import * as wooCart from '@/lib/woo-cart'
import * as cartContext from '@/lib/cart-context'

jest.mock('@/lib/woo-cart')
jest.mock('@/lib/cart-context')

const mockRefresh = jest.fn()

beforeEach(() => {
  jest.mocked(cartContext.useCart).mockReturnValue({ cart: null, refresh: mockRefresh })
  jest.mocked(wooCart.addToWooCart).mockResolvedValue({
    items: [], totals: { total_items: '0', total_price: '0', currency_code: 'EUR', currency_minor_unit: 2 }
  })
})

afterEach(() => jest.resetAllMocks())

describe('AddToCartButton', () => {
  it('renders with default label', () => {
    render(<AddToCartButton productId={1} />)
    expect(screen.getByRole('button', { name: /añadir/i })).toBeInTheDocument()
  })

  it('calls addToWooCart and refresh on click', async () => {
    render(<AddToCartButton productId={42} />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(wooCart.addToWooCart).toHaveBeenCalledWith(42, 1))
    await waitFor(() => expect(mockRefresh).toHaveBeenCalled())
  })

  it('shows loading state while adding', async () => {
    jest.mocked(wooCart.addToWooCart).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    )
    render(<AddToCartButton productId={1} />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Añadiendo…')).toBeInTheDocument()
  })
})
