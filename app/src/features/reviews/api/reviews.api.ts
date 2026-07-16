import reviewsData from '@/data/reviews.json'

export type ReviewCategory = 'safari' | 'day-trips' | 'airport-transfers' | 'destinations'

export interface Review {
  id: string
  name: string
  countryFlag: string
  experience: string
  category: ReviewCategory
  rating: number
  date: string
  text: string
}

/**
 * Returns every review.
 * Currently reads the local mock file — once GET /api/v1/reviews exists on
 * the backend, swap the body for an httpClient.get() call, following the
 * same pattern as features/safari-packages/api/packages.api.ts.
 */
export async function getAllReviews(): Promise<Review[]> {
  return reviewsData as Review[]
}

export async function getReviewsByCategory(category: ReviewCategory | 'all'): Promise<Review[]> {
  const reviews = await getAllReviews()
  if (category === 'all') return reviews
  return reviews.filter((review) => review.category === category)
}