/**
 * Data layer — single import point for all content.
 * MOCK_MODE is active when WOOCOMMERCE_URL is not set (local / GH Pages preview).
 * Set WOOCOMMERCE_URL in production to switch to live WooCommerce data.
 */
import type { Product, ProductDetail, BlogPost, BlogPostFull } from '@/types'
import * as woo from '@/lib/woocommerce'
import {
  MOCK_PRODUCTS,
  MOCK_BLOG_POSTS,
  getMockProductDetail,
  getMockBlogPost,
} from '@/lib/mocks'

const MOCK_MODE = process.env.USE_MOCK_DATA === 'true' || !process.env.WOOCOMMERCE_URL

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  if (MOCK_MODE) return MOCK_PRODUCTS.slice(0, limit)
  return woo.getFeaturedProducts(limit)
}

export async function getRecentPosts(limit = 3): Promise<BlogPost[]> {
  if (MOCK_MODE) return MOCK_BLOG_POSTS.slice(0, limit)
  return woo.getRecentPosts(limit)
}

export async function getProductsByCategory(
  slug: string,
  perPage = 12,
  orderby = 'menu_order',
  order = 'asc'
): Promise<Product[]> {
  if (MOCK_MODE) return MOCK_PRODUCTS
  return woo.getProductsByCategory(slug, perPage, orderby, order)
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  if (MOCK_MODE) return getMockProductDetail(slug)
  return woo.getProductBySlug(slug)
}

export async function getBlogPosts(limit = 9): Promise<BlogPost[]> {
  if (MOCK_MODE) return MOCK_BLOG_POSTS.slice(0, limit)
  return woo.getBlogPosts(limit)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostFull | null> {
  if (MOCK_MODE) return getMockBlogPost(slug)
  return woo.getBlogPostBySlug(slug)
}
