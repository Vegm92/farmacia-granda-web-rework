import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TrustBar from '@/components/home/TrustBar'
import BlogPreview from '@/components/home/BlogPreview'
import { getFeaturedProducts, getRecentPosts } from '@/lib/woocommerce'
import type { Product, BlogPost } from '@/types'

const HERO_PILLS = ['Dermofarmacia', 'Bebé y Maternidad', 'Vitaminas', 'Óptica', 'Higiene Bucal']

// Fallback data shown when WooCommerce is not yet configured
const PLACEHOLDER_PRODUCTS: Product[] = [
  { id: 1, name: 'Eryfotona Actinica SPF 100+', slug: 'eryfotona', brand: 'ISDIN', price: '28.50', regular_price: '35.90', images: [], featured: true, badge: 'discount', discount_percent: 21 },
  { id: 2, name: 'Sérum C-Vit Radiance', slug: 'serum-c-vit', brand: 'SESDERMA', price: '29.90', regular_price: '29.90', images: [], featured: true, badge: 'new' },
  { id: 3, name: 'Vitamina D3 1000 UI · 90 cáps', slug: 'vitamina-d3', brand: 'KERN PHARMA', price: '8.50', regular_price: '8.50', images: [], featured: true },
  { id: 4, name: 'Agua de Colonia Bebé 200ml', slug: 'colonia-bebe', brand: 'MUSTELA', price: '12.90', regular_price: '15.20', images: [], featured: true, badge: 'discount', discount_percent: 15 },
]

const PLACEHOLDER_POSTS: BlogPost[] = [
  { id: 1, slug: 'fotoprotector', title: 'Cómo elegir el fotoprotector según tu tipo de piel', tag: 'Dermofarmacia', image_color: '#fef9c3' },
  { id: 2, slug: 'vitamina-d', title: 'Vitamina D: cuándo y cómo suplementar correctamente', tag: 'Salud', image_color: '#dbeafe' },
  { id: 3, slug: 'probioticos', title: 'Los mejores probióticos para la salud intestinal', tag: 'Nutrición', image_color: '#f0f7f4' },
]

export default async function HomePage() {
  const [products, posts] = await Promise.all([
    getFeaturedProducts(4).catch(() => PLACEHOLDER_PRODUCTS),
    getRecentPosts(3).catch(() => PLACEHOLDER_POSTS),
  ])

  return (
    <main>
      <Hero pills={HERO_PILLS} />
      <FeaturedProducts products={products} />
      <hr className="border-t border-border mx-8" />
      <TrustBar />
      <BlogPreview posts={posts} />
    </main>
  )
}
