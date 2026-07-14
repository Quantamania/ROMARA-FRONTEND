import dayTripsData from '@/data/dayTrips.json'
import type { DayTrip } from '@/features/day-trips/types/dayTrip.types'

/**
 * Returns every day trip.
 * Currently reads the local mock file — once GET /api/v1/day-trips exists on
 * the backend, swap the body for an httpClient.get() call. See
 * features/safari-packages/api/packages.api.ts for the exact pattern to follow.
 */
export async function getAllDayTrips(): Promise<DayTrip[]> {
  return dayTripsData as DayTrip[]
}

export async function getDayTripBySlug(slug: string): Promise<DayTrip | undefined> {
  const trips = await getAllDayTrips()
  return trips.find((trip) => trip.slug === slug)
}