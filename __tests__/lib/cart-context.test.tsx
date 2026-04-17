import { render, screen, waitFor, act } from '@testing-library/react'
import { CartProvider, useCart } from '@/lib/cart-context'
import * as wooCart from '@/lib/woo-cart'

jest.mock('@/lib/woo-cart')

const MOCK_CART = {
  items: [{ key: 'abc', id: 1, name: 'Crema', quantity: 2, prices: { price: '1590', regular_price: '1590', currency_code: 'EUR', currency_minor_unit: 2 }, images: [] }],
  totals: { total_items: '3180', total_price: '3180', currency_code: 'EUR', currency_minor_unit: 2 },
}

function CartConsumer() {
  const { cart } = useCart()
  if (!cart) return <span>loading</span>
  return <span>count:{cart.items[0].quantity}</span>
}

describe('CartProvider', () => {
  beforeEach(() => {
    jest.mocked(wooCart.getWooCart).mockResolvedValue(MOCK_CART)
  })

  afterEach(() => jest.resetAllMocks())

  it('fetches cart on mount and provides it via useCart', async () => {
    render(<CartProvider><CartConsumer /></CartProvider>)
    await waitFor(() => expect(screen.getByText('count:2')).toBeInTheDocument())
  })

  it('refresh re-fetches the cart', async () => {
    function RefreshConsumer() {
      const { cart, refresh } = useCart()
      return (
        <>
          <span>{cart ? `count:${cart.items[0].quantity}` : 'loading'}</span>
          <button onClick={refresh}>refresh</button>
        </>
      )
    }

    const { getByText } = render(<CartProvider><RefreshConsumer /></CartProvider>)
    await waitFor(() => expect(getByText('count:2')).toBeInTheDocument())

    jest.mocked(wooCart.getWooCart).mockResolvedValue({
      ...MOCK_CART,
      items: [{ ...MOCK_CART.items[0], quantity: 5 }],
    })

    await act(async () => { getByText('refresh').click() })
    await waitFor(() => expect(getByText('count:5')).toBeInTheDocument())
  })

  it('throws when useCart is used outside CartProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<CartConsumer />)).toThrow('useCart must be used inside CartProvider')
    spy.mockRestore()
  })
})
