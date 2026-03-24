import BlogCard from '@/components/blog/BlogCard'
import { getBlogPosts } from '@/lib/woocommerce'
import type { BlogPost } from '@/types'

const PLACEHOLDER_POSTS: BlogPost[] = [
  { id: 1, slug: 'fotoprotector', title: 'Cómo elegir el fotoprotector según tu tipo de piel', tag: 'Dermofarmacia', image_color: '#fef9c3' },
  { id: 2, slug: 'vitamina-d', title: 'Vitamina D: cuándo y cómo suplementar correctamente', tag: 'Salud', image_color: '#dbeafe' },
  { id: 3, slug: 'probioticos', title: 'Los mejores probióticos para la salud intestinal', tag: 'Nutrición', image_color: '#f0f7f4' },
]

export default async function BlogPage() {
  const posts = await getBlogPosts(9).catch(() => PLACEHOLDER_POSTS)

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-fg-primary mb-8">
        Consejos de salud y bienestar
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}
