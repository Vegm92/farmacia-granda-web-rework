import { getBlogPostBySlug } from '@/lib/woocommerce'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug).catch(() => null)
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
      <div
        className="mt-8 text-fg-body leading-relaxed [&_p]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-fg-primary [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  )
}
