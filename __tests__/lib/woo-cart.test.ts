import {
  getWooCart, addToWooCart, removeFromWooCart, updateWooCartItem, submitWooCheckout
} from '@/lib/woo-cart'

const MOCK_CART = {
  items: [{ key: 'abc123', id: 1, name: 'Crema', quantity: 1, prices: { price: '1590', regular_price: '1590', currency_code: 'EUR', currency_minor_unit: 2 }, images: [] }],
  totals: { total_items: '1590', total_price: '1590', currency_code: 'EUR', currency_minor_unit: 2 },
}

beforeEach(() => {
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    headers: new Headers({ 'Cart-Token': 'test-token', 'X-WC-Store-API-Nonce': 'nonce123' }),
    json: async () => MOCK_CART,
  } as Response)
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('getWooCart', () => {
  it('GETs /wp-json/wc/store/v1/cart and returns cart', async () => {
    const cart = await getWooCart()
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].name).toBe('Crema')
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/wp-json/wc/store/v1/cart'),
      expect.any(Object)
    )
  })
})

describe('addToWooCart', () => {
  it('POSTs to add-item with id and quantity', async () => {
    await addToWooCart(1, 2)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/wp-json/wc/store/v1/cart/add-item'),
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ id: 1, quantity: 2 }) })
    )
  })
})

describe('removeFromWooCart', () => {
  it('POSTs to remove-item with key', async () => {
    await removeFromWooCart('abc123')
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/wp-json/wc/store/v1/cart/remove-item'),
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ key: 'abc123' }) })
    )
  })
})

describe('updateWooCartItem', () => {
  it('POSTs to update-item with key and quantity', async () => {
    await updateWooCartItem('abc123', 3)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/wp-json/wc/store/v1/cart/update-item'),
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ key: 'abc123', quantity: 3 }) })
    )
  })
})

describe('submitWooCheckout', () => {
  it('POSTs to checkout endpoint', async () => {
    await submitWooCheckout({
      billing_address: { first_name: 'Ana', last_name: 'G', address_1: 'Calle 1', city: 'Madrid', postcode: '28001', country: 'ES', email: 'ana@test.com', phone: '600' },
      shipping_address: { first_name: 'Ana', last_name: 'G', address_1: 'Calle 1', city: 'Madrid', postcode: '28001', country: 'ES' },
      payment_method: 'cod',
    })
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/wp-json/wc/store/v1/checkout'),
      expect.objectContaining({ method: 'POST' })
    )
  })
})
