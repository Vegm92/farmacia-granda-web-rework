import type { WooCart, WooCartItem } from '@/types'

const STORAGE_KEY = 'fg-mock-cart'
const MINOR_UNIT = 2

interface StoredItem {
  id: number
  name: string
  quantity: number
  price: string
  images: { src: string; alt: string }[]
}

function load(): StoredItem[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as StoredItem[] ?? []
  } catch {
    return []
  }
}

function save(items: StoredItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function toWooCart(items: StoredItem[]): WooCart {
  const cartItems: WooCartItem[] = items.map((item, idx) => ({
    key: `mock-${idx}`,
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    prices: { price: item.price, regular_price: item.price, currency_code: 'EUR', currency_minor_unit: 2 },
    images: item.images,
  }))
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  )
  return {
    items: cartItems,
    totals: {
      total_items: String(Math.round(totalPrice * 100)),
      total_price: String(Math.round(totalPrice * 100)),
      currency_code: 'EUR',
      currency_minor_unit: 2,
    },
  }
}

export function getMockCart(): WooCart {
  return toWooCart(load())
}

export function addMockCartItem(
  id: number,
  name: string,
  price: string,
  images: { src: string; alt: string }[] = []
): WooCart {
  const items = load()
  const existing = items.find((i) => i.id === id)
  if (existing) {
    existing.quantity += 1
  } else {
    items.push({ id, name, quantity: 1, price, images })
  }
  save(items)
  return toWooCart(items)
}

export function removeMockCartItem(id: number): WooCart {
  const items = load().filter((i) => i.id !== id)
  save(items)
  return toWooCart(items)
}

export function updateMockCartItem(
  id: number,
  quantity: number
): WooCart {
  const items = load()
  if (quantity <= 0) {
    save(items.filter((i) => i.id !== id))
  } else {
    const item = items.find((i) => i.id === id)
    if (item) item.quantity = quantity
    save(items)
  }
  return toWooCart(load())
}

export function clearMockCart(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}