import blogPostsData from '@/data/blogPosts.json'
import type { BlogCategory, BlogPost } from '@/features/blog/types/blog.types'

/**
 * Returns every blog post.
 * Currently reads the local mock file — once GET /api/v1/blog-posts exists on
 * the backend, swap the body for an httpClient.get() call, following the
 * same pattern as features/safari-packages/api/packages.api.ts.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return blogPostsData as BlogPost[]
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  return posts.filter((post) => post.featured)
}

export async function getBlogPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  return posts.filter((post) => post.category === category)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllBlogPosts()
  return posts.find((post) => post.slug === slug)
}