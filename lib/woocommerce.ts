import type { Product, BlogPost } from '@/types'

const BASE_URL = process.env.WOOCOMMERCE_URL
const KEY = process.env.WOOCOMMERCE_KEY
const SECRET = process.env.WOOCOMMERCE_SECRET

function authHeader(): string {
  return 'Basic ' + Buffer.from(`${KEY}:${SECRET}`).toString('base64')
}

async function wcFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: authHeader() },
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`)
  return res.json()
}

function mapProduct(raw: Record<string, unknown>): Product {
  const attrs = (raw.attributes as { name: string; options: string[] }[]) ?? []
  const brandAttr = attrs.find((a) => a.name === 'Marca')
  const brand = brandAttr?.options[0] ?? ''

  const price = String(raw.price)
  const regular = String(raw.regular_price)
  const discountPercent =
    regular && price !== regular
      ? Math.round((1 - parseFloat(price) / parseFloat(regular)) * 100)
      : undefined

  return {
    id: raw.id as number,
    name: raw.name as string,
    slug: raw.slug as string,
    brand,
    price,
    regular_price: regular,
    images: (raw.images as { src: string; alt: string }[]) ?? [],
    featured: raw.featured as boolean,
    badge: discountPercent ? 'discount' : raw.date_created_gmt === raw.date_modified_gmt ? 'new' : undefined,
    discount_percent: discountPercent,
  }
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const raw = await wcFetch<Record<string, unknown>[]>(
    `/wp-json/wc/v3/products?featured=true&per_page=${limit}`
  )
  return raw.map(mapProduct)
}

function mapPost(raw: Record<string, unknown>): BlogPost {
  const classes = (raw.class_list as string[]) ?? []
  const categoryClass = classes.find((c) => c.startsWith('category-')) ?? ''
  const tag = categoryClass.replace('category-', '')

  const colorMap: Record<string, string> = {
    dermofarmacia: '#fef9c3',
    salud: '#dbeafe',
  }

  return {
    id: raw.id as number,
    slug: raw.slug as string,
    title: (raw.title as { rendered: string }).rendered,
    tag,
    image_color: colorMap[tag] ?? '#f0f7f4',
    featured_media_url: raw.featured_media_url as string | undefined,
  }
}

export async function getRecentPosts(limit = 3): Promise<BlogPost[]> {
  const raw = await wcFetch<Record<string, unknown>[]>(
    `/wp-json/wp/v2/posts?per_page=${limit}&_fields=id,slug,title,class_list,featured_media_url`
  )
  return raw.map(mapPost)
}
