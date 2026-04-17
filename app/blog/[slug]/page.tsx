import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/woocommerce'
import { MOCK_BLOG_POST_FULL, MOCK_BLOG_POSTS } from '@/lib/mocks'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const mockFallback = MOCK_BLOG_POSTS.find((p) => p.slug === slug)
    ? MOCK_BLOG_POST_FULL
    : null
  const post = await getBlogPostBySlug(slug).catch(() => mockFallback)
  if (!post) return notFound()

  const formattedDate = new Date(post.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <span className="text-xs font-medium text-primary uppercase tracking-wide">
        {post.tag}
      </span>
      <h1 className="mt-2 text-3xl font-semibold text-fg-primary">
        {post.title}
      </h1>
      <p className="mt-1 text-sm text-fg-muted">{formattedDate}</p>

      <div className="relative mt-8 h-64 w-full overflow-hidden rounded-xl">
        {post.featured_media_url ? (
          <Image
            src={post.featured_media_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="skeleton-shimmer h-full w-full" aria-hidden="true" />
        )}
      </div>

      <div
        className="mt-8 text-fg-body leading-relaxed [&_p]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-fg-primary [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  )
}
