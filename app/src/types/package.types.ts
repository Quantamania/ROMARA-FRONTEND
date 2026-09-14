export interface SafariPackage {
  badge: any
  id: string
  slug: string
  name: string
  image: string
  durationDays: number
  location: string
  description: string
  priceFromKES: number

  /**
   * The real tour_packages.id, present only when this came from the database.
   *
   * Deliberately separate from `id`. The bundled fallback in packages.json uses
   * ids 1-4 while the database uses 3-6, so the same number means a different
   * tour in each — booking against a fallback id would sell someone a safari
   * they did not choose. Its absence is what makes a package unbookable.
   */
  tourId?: number

  /** Seats left. Undefined for fallback content, which has no live inventory. */
  availableSlots?: number
}