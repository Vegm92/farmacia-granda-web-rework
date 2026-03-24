import Link from 'next/link'
import { BlogPost } from '@/types'

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
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="h-40 w-full"
                  style={{ backgroundColor: post.image_color }}
                  aria-hidden="true"
                />
                <div className="p-5">
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    {post.tag}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-fg-primary group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
