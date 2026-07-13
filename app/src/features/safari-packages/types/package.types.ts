export interface PackageItem { id: string; title: string }
export interface SafariPackage {
  id: string
  slug: string
  name: string
  image: string
  durationDays: number
  location: string
  description: string
  priceFromKES: number
  /** Optional ribbon shown on the card, e.g. "Best Seller" */
  badge?: string
}