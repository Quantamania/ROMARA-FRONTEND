import galleryImagesData from '@/data/galleryImages.json'

export type GalleryCategory = 'wildlife' | 'landscapes' | 'vehicles' | 'culture' | 'destinations'

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  caption: string
}

/**
 * Returns every gallery image.
 * Currently reads the local mock file — once GET /api/v1/gallery exists on
 * the backend, swap the body for an httpClient.get() call, following the same
 * pattern as features/safari-packages/api/packages.api.ts.
 */
export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  return galleryImagesData as GalleryImage[]
}

export async function getGalleryImagesByCategory(category: GalleryCategory | 'all'): Promise<GalleryImage[]> {
  const images = await getAllGalleryImages()
  if (category === 'all') return images
  return images.filter((image) => image.category === category)
}