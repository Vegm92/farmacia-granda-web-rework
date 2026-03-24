import Link from 'next/link'
import BlogCard from '@/components/blog/BlogCard'
import type { BlogPost } from '@/types'

interface BlogPreviewProps {
  posts: BlogPost[]
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section className="py-12 bg-primary-light">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-fg-primary">
            Consejos de salud y bienestar
          </h2>
          <Link
            href="/blog"
            className="text-sm text-primary hover:text-primary-mid font-medium"
          >
            Ver todos los artículos →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
