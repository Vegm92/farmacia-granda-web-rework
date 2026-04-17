export interface Product {
  id: number
  name: string
  slug: string
  brand: string         // mapped from WC attribute or meta
  price: string         // current price as string (WC returns strings)
  regular_price: string // original price, empty if no discount
  images: { src: string; alt: string }[]
  badge?: 'new' | 'discount'
  discount_percent?: number
  featured: boolean
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  tag: string           // mapped from category name
  image_color: string   // fallback bg color when no featured image
  featured_media_url?: string
}

export interface NavLink {
  label: string
  href: string
  highlight?: boolean   // true for "Ofertas" — renders in amber
}

export interface TrustItem {
  icon: string          // lucide icon name
  title: string
  subtitle: string
}

export interface ProductDetail extends Product {
  description: string
  short_description: string
  categories: { id: number; name: string; slug: string }[]
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
}

export interface BlogPostFull extends BlogPost {
  content: string
  excerpt: string
  date: string
}

export interface WooCartItemPrice {
  price: string
  regular_price: string
  currency_code: string
  currency_minor_unit: number
}

export interface WooCartItem {
  key: string
  id: number
  name: string
  quantity: number
  prices: WooCartItemPrice
  images: { src: string; alt: string }[]
}

export interface WooCartTotals {
  total_items: string
  total_price: string
  currency_code: string
  currency_minor_unit: number
}

export interface WooCart {
  items: WooCartItem[]
  totals: WooCartTotals
}

export interface WooCheckoutAddress {
  first_name: string
  last_name: string
  address_1: string
  city: string
  postcode: string
  country: string
  email: string
  phone: string
}

export interface WooCheckoutPayload {
  billing_address: WooCheckoutAddress
  shipping_address: Omit<WooCheckoutAddress, 'email' | 'phone'>
  payment_method: string
}

export interface WooOrder {
  id: number
  status: string
  order_key: string
}
