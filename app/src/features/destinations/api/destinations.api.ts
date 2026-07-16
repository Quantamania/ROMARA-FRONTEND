import destinationsData from '@/data/destinations.json'
import type { Destination } from '@/features/destinations/types/destination.types'

export async function getAllDestinations(): Promise<Destination[]> {
  return destinationsData as Destination[]
}

export async function getDestinationBySlug(slug: string): Promise<Destination | undefined> {
  const destinations = await getAllDestinations()
  return destinations.find((destination) => destination.slug === slug)
}