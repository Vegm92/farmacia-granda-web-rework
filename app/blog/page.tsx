import BlogCard from '@/components/blog/BlogCard'
import { getBlogPosts } from '@/lib/data'

export default async function BlogPage() {
  const posts = await getBlogPosts(9)

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
