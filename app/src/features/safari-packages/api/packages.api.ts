import packagesData from '@/data/packages.json'
import { supabase, isSupabaseConfigured } from '@/shared/api/supabaseClient'
import type { SafariPackage } from '@/types/package.types'

/**
 * Safari packages now come from the database, so anything an admin adds, edits
 * or removes in the panel shows up on the site immediately.
 *
 * packages.json is kept only as a fallback: if Supabase is unreachable or has
 * no published tours, the site still renders its original content rather than
 * an empty page. Nothing outside this file needs to know — the store and
 * components only ever call getAllPackages().
 */

/** DB row -> the shape the cards and detail page already expect. */
function toSafariPackage(row: Record<string, any>): SafariPackage {
  return {
    id: String(row.id),
    slug: row.slug,
    name: row.name,
    image: row.image_url || '/images/safari-packages/maasai-mara.webp',
    durationDays: Number(row.duration) || 1,
    location: row.destination || '',
    description: row.description || '',
    priceFromKES: Number(row.price) || 0,
    badge: row.badge || undefined,
  }
}

export async function getAllPackages(): Promise<SafariPackage[]> {
  if (!isSupabaseConfigured) return packagesData as SafariPackage[]

  const { data, error } = await supabase
    .from('tour_packages')
    .select('id, slug, name, description, price, duration, destination, image_url, badge')
    .eq('is_published', true)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[packages] falling back to bundled content:', error.message)
    return packagesData as SafariPackage[]
  }

  // An empty table means the migration has not been seeded yet; showing the
  // bundled tours beats showing an empty safari page.
  if (!data || data.length === 0) return packagesData as SafariPackage[]

  return data.map(toSafariPackage)
}

export async function getPackageBySlug(slug: string): Promise<SafariPackage | undefined> {
  const packages = await getAllPackages()
  return packages.find((pkg) => pkg.slug === slug)
}
