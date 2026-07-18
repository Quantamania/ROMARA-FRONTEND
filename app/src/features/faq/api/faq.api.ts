import faqsData from '@/data/faq.json'

export type FaqCategory =
  | 'booking'
  | 'airport-transfers'
  | 'safari-packages'
  | 'destinations'
  | 'payments'
  | 'safety'
  | 'general'

export interface FaqItem {
  id: string
  category: FaqCategory
  featured: boolean
  question: string
  answer: string
}

/**
 * Returns every FAQ.
 * Currently reads the local mock file — once GET /api/v1/faqs exists on the
 * backend, swap the body for an httpClient.get() call, following the same
 * pattern as features/safari-packages/api/packages.api.ts.
 */
export async function getAllFaqs(): Promise<FaqItem[]> {
  return faqsData as FaqItem[]
}

export async function getFeaturedFaqs(): Promise<FaqItem[]> {
  const faqs = await getAllFaqs()
  return faqs.filter((faq) => faq.featured)
}

export async function getFaqsByCategory(category: FaqCategory): Promise<FaqItem[]> {
  const faqs = await getAllFaqs()
  return faqs.filter((faq) => faq.category === category)
}