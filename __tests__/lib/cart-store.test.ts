import { act, renderHook } from '@testing-library/react'
import { useCartStore } from '@/lib/cart-store'
import type { Product } from '@/types'

const MOCK_PRODUCT: Product = {
  id: 1, name: 'Test Product', slug: 'test-product', brand: 'Brand',
  price: '10.00', regular_price: '10.00', images: [], featured: false,
}

const MOCK_PRODUCT_2: Product = {
  id: 2, name: 'Another Product', slug: 'another-product', brand: 'Brand',
  price: '5.00', regular_price: '5.00', images: [], featured: false,
}

beforeEach(() => {
  useCartStore.setState({ items: [] })
})

describe('addItem', () => {
  it('adds a new product with quantity 1', () => {
    const { result } = renderHook(() => useCartStore())
    act(() => { result.current.addItem(MOCK_PRODUCT) })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(1)
  })

  it('increments quantity when same product added twice', () => {
    const { result } = renderHook(() => useCartStore())
    act(() => {
      result.current.addItem(MOCK_PRODUCT)
      result.current.addItem(MOCK_PRODUCT)
    })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })
})

describe('removeItem', () => {
  it('removes item by product id', () => {
    const { result } = renderHook(() => useCartStore())
    act(() => { result.current.addItem(MOCK_PRODUCT) })
    act(() => { result.current.removeItem(1) })
    expect(result.current.items).toHaveLength(0)
  })
})

describe('updateQuantity', () => {
  it('sets quantity to given value', () => {
    const { result } = renderHook(() => useCartStore())
    act(() => { result.current.addItem(MOCK_PRODUCT) })
    act(() => { result.current.updateQuantity(1, 5) })
    expect(result.current.items[0].quantity).toBe(5)
  })

  it('removes item when quantity set to 0', () => {
    const { result } = renderHook(() => useCartStore())
    act(() => { result.current.addItem(MOCK_PRODUCT) })
    act(() => { result.current.updateQuantity(1, 0) })
    expect(result.current.items).toHaveLength(0)
  })
})

describe('clearCart', () => {
  it('empties all items', () => {
    const { result } = renderHook(() => useCartStore())
    act(() => {
      result.current.addItem(MOCK_PRODUCT)
      result.current.addItem(MOCK_PRODUCT_2)
    })
    act(() => { result.current.clearCart() })
    expect(result.current.items).toHaveLength(0)
  })
})

describe('selectors', () => {
  it('getTotal returns sum of price * quantity', () => {
    const { result } = renderHook(() => useCartStore())
    act(() => {
      result.current.addItem(MOCK_PRODUCT)   // 10.00 × 1
      result.current.addItem(MOCK_PRODUCT_2) // 5.00 × 1
    })
    expect(result.current.getTotal()).toBeCloseTo(15.00)
  })

  it('getCount returns total number of items', () => {
    const { result } = renderHook(() => useCartStore())
    act(() => {
      result.current.addItem(MOCK_PRODUCT)
      result.current.addItem(MOCK_PRODUCT)
    })
    expect(result.current.getCount()).toBe(2)
  })
})
