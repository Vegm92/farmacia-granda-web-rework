import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TrustBar from '@/components/home/TrustBar'
import BlogPreview from '@/components/home/BlogPreview'
import { getFeaturedProducts, getRecentPosts } from '@/lib/data'

const HERO_PILLS = [
  { label: 'Dermofarmacia',    href: '/categoria/dermofarmacia' },
  { label: 'Bebé y Maternidad', href: '/categoria/bebe-maternidad' },
  { label: 'Vitaminas',        href: '/categoria/salud' },
  { label: 'Óptica',           href: '/categoria/optica' },
  { label: 'Higiene Bucal',    href: '/buscar' },
]

export default async function HomePage() {
  const [products, posts] = await Promise.all([
    getFeaturedProducts(4),
    getRecentPosts(3),
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
