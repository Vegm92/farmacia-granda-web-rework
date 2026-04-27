import type { Product, BlogPost, ProductDetail, BlogPostFull } from '@/types'

const BASE_URL = process.env.WOOCOMMERCE_URL
const KEY = process.env.WOOCOMMERCE_KEY
const SECRET = process.env.WOOCOMMERCE_SECRET

function authHeader(): string {
  const credentials = `${KEY}:${SECRET}`
  if (typeof btoa !== 'undefined') return 'Basic ' + btoa(credentials)
  return 'Basic ' + Buffer.from(credentials).toString('base64')
}

async function wcFetch<T>(path: string): Promise<T> {
  if (!BASE_URL) throw new Error('WOOCOMMERCE_URL not configured')
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: authHeader() },
    cache: 'force-cache',
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

function mapProductDetail(raw: Record<string, unknown>): ProductDetail {
  return {
    ...mapProduct(raw),
    description: raw.description as string,
    short_description: raw.short_description as string,
    categories: (raw.categories as { id: number; name: string; slug: string }[]) ?? [],
    stock_status: raw.stock_status as 'instock' | 'outofstock' | 'onbackorder',
  }
}

async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  const cats = await wcFetch<{ id: number; slug: string }[]>(
    `/wp-json/wc/v3/products/categories?slug=${slug}`
  )
  return cats[0]?.id ?? null
}

export async function getProductsByCategory(
  categorySlug: string,
  perPage = 12,
  orderby = 'menu_order',
  order = 'asc'
): Promise<Product[]> {
  const categoryId = await getCategoryIdBySlug(categorySlug)
  if (!categoryId) return []
  const raw = await wcFetch<Record<string, unknown>[]>(
    `/wp-json/wc/v3/products?category=${categoryId}&per_page=${perPage}&orderby=${orderby}&order=${order}`
  )
  return raw.map(mapProduct)
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const raw = await wcFetch<Record<string, unknown>[]>(
    `/wp-json/wc/v3/products?slug=${slug}`
  )
  return raw[0] ? mapProductDetail(raw[0]) : null
}

export async function getBlogPosts(limit = 9): Promise<BlogPost[]> {
  const raw = await wcFetch<Record<string, unknown>[]>(
    `/wp-json/wp/v2/posts?per_page=${limit}&_fields=id,slug,title,class_list,featured_media_url`
  )
  return raw.map(mapPost)
}

function mapPostFull(raw: Record<string, unknown>): BlogPostFull {
  return {
    ...mapPost(raw),
    content: (raw.content as { rendered: string }).rendered,
    excerpt: (raw.excerpt as { rendered: string }).rendered,
    date: raw.date as string,
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostFull | null> {
  const raw = await wcFetch<Record<string, unknown>[]>(
    `/wp-json/wp/v2/posts?slug=${slug}&_fields=id,slug,title,class_list,featured_media_url,content,excerpt,date`
  )
  return raw[0] ? mapPostFull(raw[0]) : null
}
