export type BlogCategory = 'safari-tips' | 'travel-guides' | 'destinations' | 'wildlife' | 'travel-news' | 'culture-people'

export interface BlogPost {
  id: string
  slug: string
  title: string
  image: string
  excerpt: string
  publishedAt: string
  category: BlogCategory
  readTimeMinutes: number
  views: number
  featured: boolean
}