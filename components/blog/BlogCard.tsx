import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/types'

const HEX_COLOUR_RE = /^#[0-9a-fA-F]{3,6}$/

function safeColor(value: string, fallback = '#d1fae5'): string {
  return HEX_COLOUR_RE.test(value) ? value : fallback
}

interface Props {
  post: BlogPost
}

export default function BlogCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-40 w-full overflow-hidden">
          {post.featured_media_url ? (
            <Image
              src={post.featured_media_url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div
              className="skeleton-shimmer h-full w-full"
              aria-hidden="true"
            />
          )}
        </div>
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
  )
}
