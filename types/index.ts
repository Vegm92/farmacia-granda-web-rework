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

export interface CartItem {
  product: Product
  quantity: number
}
