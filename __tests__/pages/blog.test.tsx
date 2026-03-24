import { render, screen } from '@testing-library/react'
import BlogPage from '@/app/blog/page'
import { getBlogPosts } from '@/lib/woocommerce'
import type { BlogPost } from '@/types'

jest.mock('@/lib/woocommerce')

const MOCK_POSTS: BlogPost[] = [
  { id: 1, title: 'Consejos para la piel seca', slug: 'piel-seca', tag: 'Dermatología', image_color: '#d1fae5' },
  { id: 2, title: 'Vitaminas en invierno', slug: 'vitaminas-invierno', tag: 'Nutrición', image_color: '#fef3c7' },
  { id: 3, title: 'El mejor protector solar', slug: 'protector-solar', tag: 'Dermatología', image_color: '#e0f2fe' },
]

describe('BlogPage', () => {
  beforeEach(() => {
    jest.mocked(getBlogPosts).mockResolvedValue(MOCK_POSTS)
  })

  it('renders page heading', async () => {
    const jsx = await BlogPage()
    render(jsx)
    expect(screen.getByText('Consejos de salud y bienestar')).toBeInTheDocument()
  })

  it('renders all post titles', async () => {
    const jsx = await BlogPage()
    render(jsx)
    MOCK_POSTS.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    })
  })

  it('renders post tags', async () => {
    const jsx = await BlogPage()
    render(jsx)
    expect(screen.getAllByText('Dermatología')).toHaveLength(2)
    expect(screen.getByText('Nutrición')).toBeInTheDocument()
  })
})
