import dayTripsData from '@/data/dayTrips.json'
import { getPackageBySlug } from '@/features/safari-packages/api/packages.api'
import type { SelectedPackage } from '@/features/booking/store/booking.store'

/**
 * Resolves the ?package= / ?daytrip= slug on /booking into the thing the
 * visitor actually clicked.
 *
 * The slug travels in the URL rather than in memory so the prefill survives a
 * refresh, a shared link, and the back button — all of which would otherwise
 * drop the visitor into an empty form after they had already chosen a safari.
 */

/** Day trips carry a free-text duration ("4-5 Hours", "Full Day"). */
function dayTripDurationDays(duration: string | undefined): number {
  if (!duration) return 1
  const match = /(\d+)\s*day/i.exec(duration)
  return match ? Number(match[1]) : 1
}

export async function resolveSafariPackage(slug: string): Promise<SelectedPackage | null> {
  const pkg = await getPackageBySlug(slug)
  if (!pkg) return null

  return {
    kind: 'safari',
    slug: pkg.slug,
    name: pkg.name,
    image: pkg.image,
    location: pkg.location,
    priceFromKES: pkg.priceFromKES,
    durationDays: pkg.durationDays,
  }
}

export function resolveDayTrip(slug: string): SelectedPackage | null {
  const trip = (dayTripsData as any[]).find((t) => t.slug === slug)
  if (!trip) return null

  return {
    kind: 'day-trip',
    slug: trip.slug,
    name: trip.name,
    image: trip.image,
    location: trip.location,
    priceFromKES: trip.priceFromKES,
    durationDays: dayTripDurationDays(trip.duration),
    durationLabel: trip.duration,
  }
}

/** Reads whichever of the two query params is present. */
export async function resolveFromQuery(
  query: Record<string, unknown>,
): Promise<SelectedPackage | null> {
  const pkgSlug = typeof query.package === 'string' ? query.package : ''
  if (pkgSlug) return await resolveSafariPackage(pkgSlug)

  const tripSlug = typeof query.daytrip === 'string' ? query.daytrip : ''
  if (tripSlug) return resolveDayTrip(tripSlug)

  return null
}
