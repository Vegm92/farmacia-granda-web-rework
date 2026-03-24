import { render, screen } from '@testing-library/react'
import BlogPreview from '@/components/home/BlogPreview'
import { BlogPost } from '@/types'

const mockPosts: BlogPost[] = [
  { id: 1, title: 'Consejos para la piel seca', slug: 'consejos-piel-seca', tag: 'Dermatología', image_color: '#d1fae5' },
  { id: 2, title: 'Vitaminas esenciales en invierno', slug: 'vitaminas-invierno', tag: 'Nutrición', image_color: '#fef3c7' },
  { id: 3, title: 'Cómo elegir un protector solar', slug: 'protector-solar', tag: 'Dermatología', image_color: '#e0f2fe' },
]

describe('BlogPreview', () => {
  it('renders section heading', () => {
    render(<BlogPreview posts={mockPosts} />)
    expect(screen.getByText('Consejos de salud y bienestar')).toBeInTheDocument()
  })

  it('renders all post titles', () => {
    render(<BlogPreview posts={mockPosts} />)
    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    })
  })

  it('renders post tags', () => {
    render(<BlogPreview posts={mockPosts} />)
    expect(screen.getAllByText('Dermatología')).toHaveLength(2)
    expect(screen.getByText('Nutrición')).toBeInTheDocument()
  })
})
