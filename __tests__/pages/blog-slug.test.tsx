import { render, screen } from '@testing-library/react'
import BlogPostPage from '@/app/blog/[slug]/page'
import { getBlogPostBySlug } from '@/lib/woocommerce'
import type { BlogPostFull } from '@/types'

jest.mock('@/lib/woocommerce')
jest.mock('next/navigation', () => ({ notFound: jest.fn() }))

const MOCK_POST: BlogPostFull = {
  id: 1,
  title: 'Cómo elegir el fotoprotector según tu tipo de piel',
  slug: 'fotoprotector',
  tag: 'Dermofarmacia',
  image_color: '#fef9c3',
  content: '<p>El fotoprotector es esencial.</p>',
  excerpt: '<p>Resumen del artículo.</p>',
  date: '2026-01-15T10:00:00',
}

describe('BlogPostPage', () => {
  it('renders post title', async () => {
    jest.mocked(getBlogPostBySlug).mockResolvedValue(MOCK_POST)
    const jsx = await BlogPostPage({ params: Promise.resolve({ slug: 'fotoprotector' }) })
    render(jsx)
    expect(screen.getByText('Cómo elegir el fotoprotector según tu tipo de piel')).toBeInTheDocument()
  })

  it('renders post tag', async () => {
    jest.mocked(getBlogPostBySlug).mockResolvedValue(MOCK_POST)
    const jsx = await BlogPostPage({ params: Promise.resolve({ slug: 'fotoprotector' }) })
    render(jsx)
    expect(screen.getByText('Dermofarmacia')).toBeInTheDocument()
  })

  it('renders formatted date', async () => {
    jest.mocked(getBlogPostBySlug).mockResolvedValue(MOCK_POST)
    const jsx = await BlogPostPage({ params: Promise.resolve({ slug: 'fotoprotector' }) })
    render(jsx)
    expect(screen.getByText(/enero/i)).toBeInTheDocument()
  })

  it('calls notFound when post does not exist', async () => {
    const { notFound } = require('next/navigation')
    jest.mocked(getBlogPostBySlug).mockResolvedValue(null)
    await BlogPostPage({ params: Promise.resolve({ slug: 'not-found' }) }).catch(() => {})
    expect(notFound).toHaveBeenCalled()
  })
})
