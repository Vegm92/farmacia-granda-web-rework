import { getFeaturedProducts, getRecentPosts, getProductsByCategory, getProductBySlug, getBlogPosts, getBlogPostBySlug } from '../../lib/woocommerce'

global.fetch = jest.fn()

const mockFetch = (data: unknown) => {
  ;(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  })
}

beforeEach(() => jest.clearAllMocks())

describe('getFeaturedProducts', () => {
  it('returns an array of products', async () => {
    mockFetch([
      {
        id: 1,
        name: 'Sérum C+E',
        slug: 'serum-ce',
        price: '29.90',
        regular_price: '29.90',
        images: [{ src: '/img.jpg', alt: 'Sérum' }],
        featured: true,
        attributes: [{ name: 'Marca', options: ['Sesderma'] }],
      },
    ])
    const products = await getFeaturedProducts()
    expect(products).toHaveLength(1)
    expect(products[0].name).toBe('Sérum C+E')
    expect(products[0].brand).toBe('Sesderma')
  })

  it('throws when the API returns an error', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 401 })
    await expect(getFeaturedProducts()).rejects.toThrow('WooCommerce API error: 401')
  })
})

describe('getRecentPosts', () => {
  it('returns an array of blog posts', async () => {
    mockFetch([
      {
        id: 10,
        slug: 'vitamina-d',
        title: { rendered: 'Vitamina D: cómo suplementar' },
        class_list: ['category-salud'],
      },
    ])
    const posts = await getRecentPosts(3)
    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe('Vitamina D: cómo suplementar')
  })
})

describe('getProductsByCategory', () => {
  it('fetches category ID then products and maps them', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
    fetchSpy
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 42, slug: 'dermofarmacia' }],
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            id: 10, name: 'Crema Hidratante', slug: 'crema',
            price: '15.90', regular_price: '15.90', images: [], featured: false,
            attributes: [], date_created_gmt: '2025-01-01', date_modified_gmt: '2025-01-01',
          },
        ],
      } as Response)

    const products = await getProductsByCategory('dermofarmacia')
    expect(products).toHaveLength(1)
    expect(products[0].name).toBe('Crema Hidratante')
    fetchSpy.mockRestore()
  })

  it('returns empty array when category not found', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response)

    const products = await getProductsByCategory('nonexistent')
    expect(products).toEqual([])
    fetchSpy.mockRestore()
  })
})

describe('getProductBySlug', () => {
  it('returns mapped ProductDetail when found', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 7, name: 'Vitamina C', slug: 'vitamina-c', price: '12.00',
          regular_price: '12.00', images: [], featured: false, attributes: [],
          date_created_gmt: '2025-01-01', date_modified_gmt: '2025-01-02',
          description: '<p>Descripción completa</p>',
          short_description: '<p>Resumen</p>',
          categories: [{ id: 1, name: 'Salud', slug: 'salud' }],
          stock_status: 'instock',
        },
      ],
    } as Response)

    const product = await getProductBySlug('vitamina-c')
    expect(product).not.toBeNull()
    expect(product!.description).toBe('<p>Descripción completa</p>')
    expect(product!.stock_status).toBe('instock')
    fetchSpy.mockRestore()
  })

  it('returns null when product not found', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response)

    const product = await getProductBySlug('nonexistent')
    expect(product).toBeNull()
    fetchSpy.mockRestore()
  })
})

describe('getBlogPosts', () => {
  it('fetches and maps blog posts', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1, slug: 'test-post',
          title: { rendered: 'Test Post' },
          class_list: ['category-salud'],
          featured_media_url: undefined,
        },
      ],
    } as Response)

    const posts = await getBlogPosts(9)
    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe('Test Post')
    expect(posts[0].tag).toBe('salud')
    fetchSpy.mockRestore()
  })
})

describe('getBlogPostBySlug', () => {
  it('returns BlogPostFull when found', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1, slug: 'test-post',
          title: { rendered: 'Test Post' },
          class_list: ['category-salud'],
          featured_media_url: undefined,
          content: { rendered: '<p>Content</p>' },
          excerpt: { rendered: '<p>Excerpt</p>' },
          date: '2026-01-15T10:00:00',
        },
      ],
    } as Response)

    const post = await getBlogPostBySlug('test-post')
    expect(post).not.toBeNull()
    expect(post!.content).toBe('<p>Content</p>')
    expect(post!.date).toBe('2026-01-15T10:00:00')
    fetchSpy.mockRestore()
  })

  it('returns null when post not found', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response)

    const post = await getBlogPostBySlug('nonexistent')
    expect(post).toBeNull()
    fetchSpy.mockRestore()
  })
})
