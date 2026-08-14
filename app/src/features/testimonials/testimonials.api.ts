import { supabase, isSupabaseConfigured } from '@/shared/api/supabaseClient'
import type { Testimonial } from '@/types/testimonial.types'

/**
 * Testimonials shown on the site come from the database so the client can add
 * and remove them from the admin panel. Callers fall back to the bundled
 * testimonials.json when this returns an empty list — see
 * features/safari-packages/api/packages.api.ts for the same pattern.
 */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) return []

  const { data, error } = await supabase
    .from('testimonials')
    .select('id, author_name, author_location, comment, rating, avatar_url, is_featured')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[testimonials] falling back to bundled content:', error.message)
    return []
  }

  return (data || [])
    // Rows created by the old user-review flow have no author name; the
    // carousel has nowhere to show them, so leave them out.
    .filter((row) => row.author_name)
    .map((row) => ({
      id: String(row.id),
      name: row.author_name as string,
      location: row.author_location || '',
      quote: row.comment || '',
      rating: Number(row.rating) || 5,
      avatar: row.avatar_url || '/images/gallery/lion.webp',
    }))
}
