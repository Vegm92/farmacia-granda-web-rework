import type { WooCart, WooCheckoutPayload, WooOrder } from '@/types'

const BASE = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL ?? ''
const TOKEN_KEY = 'wc-cart-token'

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

function saveToken(token: string | null): void {
  if (typeof window === 'undefined' || !token) return
  localStorage.setItem(TOKEN_KEY, token)
}

function storeHeaders(): HeadersInit {
  const token = getToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Cart-Token'] = token
  return headers
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { ...storeHeaders(), ...(options.headers ?? {}) },
  })
  const token = res.headers.get('Cart-Token')
  saveToken(token)
  if (!res.ok) throw new Error(`WooCommerce Store API error: ${res.status}`)
  return res.json() as Promise<T>
}

export async function getWooCart(): Promise<WooCart> {
  return request<WooCart>('/wp-json/wc/store/v1/cart')
}

export async function addToWooCart(id: number, quantity: number): Promise<WooCart> {
  return request<WooCart>('/wp-json/wc/store/v1/cart/add-item', {
    method: 'POST',
    body: JSON.stringify({ id, quantity }),
  })
}

export async function removeFromWooCart(key: string): Promise<WooCart> {
  return request<WooCart>('/wp-json/wc/store/v1/cart/remove-item', {
    method: 'POST',
    body: JSON.stringify({ key }),
  })
}

export async function updateWooCartItem(key: string, quantity: number): Promise<WooCart> {
  return request<WooCart>('/wp-json/wc/store/v1/cart/update-item', {
    method: 'POST',
    body: JSON.stringify({ key, quantity }),
  })
}

export async function submitWooCheckout(payload: WooCheckoutPayload): Promise<WooOrder> {
  return request<WooOrder>('/wp-json/wc/store/v1/checkout', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
