import packagesData from '@/data/packages.json'
import type { SafariPackage } from '@/types/package.types'

/**
 * Returns every safari package.
 * Currently reads the local mock file — once GET /api/v1/packages exists on
 * the backend, swap the body for:
 *   const response = await httpClient.get<SafariPackage[]>('/packages')
 *   return response.data
 * Nothing outside this file needs to change; the store and components only
 * ever call getAllPackages(), never touch packages.json directly.
 */
export async function getAllPackages(): Promise<SafariPackage[]> {
  return packagesData as SafariPackage[]
}

export async function getPackageBySlug(slug: string): Promise<SafariPackage | undefined> {
  const packages = await getAllPackages()
  return packages.find((pkg) => pkg.slug === slug)
}