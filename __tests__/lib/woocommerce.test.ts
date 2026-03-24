import { getFeaturedProducts, getRecentPosts } from '../../lib/woocommerce'

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
