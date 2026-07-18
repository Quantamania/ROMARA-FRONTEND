export type DayTripCategory = 'wildlife' | 'nature' | 'culture' | 'hiking' | 'family' | 'adventure' | 'city'

export interface DayTrip {
  id: string
  slug: string
  name: string
  image: string
  /** Displayed as a range, e.g. "4-5 Hours" — not a single number like SafariPackage.durationDays */
  duration: string
  location: string
  description: string
  priceFromKES: number
  category: DayTripCategory
}