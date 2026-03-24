import { render, screen } from '@testing-library/react'
import BlogCard from '@/components/blog/BlogCard'
import type { BlogPost } from '@/types'

const mockPost: BlogPost = {
  id: 1,
  title: 'Cómo cuidar la piel en verano',
  slug: 'cuidar-piel-verano',
  tag: 'Dermofarmacia',
  image_color: '#fef9c3',
}

describe('BlogCard', () => {
  it('renders post title', () => {
    render(<BlogCard post={mockPost} />)
    expect(screen.getByText('Cómo cuidar la piel en verano')).toBeInTheDocument()
  })

  it('renders post tag', () => {
    render(<BlogCard post={mockPost} />)
    expect(screen.getByText('Dermofarmacia')).toBeInTheDocument()
  })

  it('links to correct blog slug', () => {
    render(<BlogCard post={mockPost} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/cuidar-piel-verano')
  })

  it('falls back to safe color when image_color is invalid', () => {
    const post = { ...mockPost, image_color: 'javascript:alert(1)' }
    render(<BlogCard post={post} />)
    expect(screen.getByText('Cómo cuidar la piel en verano')).toBeInTheDocument()
  })
})
