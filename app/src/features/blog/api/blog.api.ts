import blogPostsData from '@/data/blogPosts.json'
import { supabase, isSupabaseConfigured } from '@/shared/api/supabaseClient'
import type { BlogCategory, BlogPost } from '@/features/blog/types/blog.types'

/**
 * Blog posts now come from the database, so publishing from the admin panel
 * puts a post on the site straight away. blogPostsData stays as a fallback for
 * when Supabase is unreachable or has no published posts — see
 * features/safari-packages/api/packages.api.ts for the same pattern.
 */

/** DB row -> the shape the blog cards and post page already expect. */
function toBlogPost(row: Record<string, any>): BlogPost {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    image: row.featured_image_url || '/images/blog/safari-tips-hero.webp',
    excerpt: row.excerpt || '',
    publishedAt: (row.published_at || row.created_at || '').slice(0, 10),
    category: row.category,
    readTimeMinutes: Number(row.read_time_minutes) || 5,
    views: Number(row.views) || 0,
    featured: Boolean(row.featured),
    content: row.content || undefined,
  } as BlogPost
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) return blogPostsData as BlogPost[]

  const { data, error } = await supabase
    .from('blog_posts')
    .select(
      'id, slug, title, content, excerpt, featured_image_url, category, read_time_minutes, views, featured, published_at, created_at',
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('[blog] falling back to bundled content:', error.message)
    return blogPostsData as BlogPost[]
  }

  if (!data || data.length === 0) return blogPostsData as BlogPost[]

  return data.map(toBlogPost)
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
