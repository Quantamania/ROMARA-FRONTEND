import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import packagesData from '@/data/packages.json'
import type { SafariPackage } from '@/types/package.types'

export type DurationFilter = 'all' | 'short' | 'medium' | 'long'
export type SortOption = 'popular' | 'price-low' | 'price-high' | 'duration'

export const usePackagesStore = defineStore('packages', () => {
  const allPackages = ref<SafariPackage[]>(packagesData as SafariPackage[])

  const searchQuery = ref('')
  const durationFilter = ref<DurationFilter>('all')
  const destinationFilter = ref<string>('all')
  const sortOption = ref<SortOption>('popular')

  const destinationOptions = computed(function getDestinationOptions() {
    const uniqueLocations = new Set(allPackages.value.map((pkg) => pkg.location))
    return ['all', ...uniqueLocations]
  })

  function matchesSearch(pkg: SafariPackage, query: string) {
    const haystack = `${pkg.name} ${pkg.location}`.toLowerCase()
    return haystack.includes(query.toLowerCase())
  }

  function matchesDuration(pkg: SafariPackage, filter: DurationFilter) {
    if (filter === 'all') return true
    if (filter === 'short') return pkg.durationDays <= 3
    if (filter === 'medium') return pkg.durationDays >= 4 && pkg.durationDays <= 6
    return pkg.durationDays >= 7
  }

  function matchesDestination(pkg: SafariPackage, filter: string) {
    return filter === 'all' || pkg.location === filter
  }

  function sortPackages(packages: SafariPackage[], sort: SortOption) {
    const sorted = [...packages]
    if (sort === 'price-low') return sorted.sort((a, b) => a.priceFromKES - b.priceFromKES)
    if (sort === 'price-high') return sorted.sort((a, b) => b.priceFromKES - a.priceFromKES)
    if (sort === 'duration') return sorted.sort((a, b) => a.durationDays - b.durationDays)
    return sorted // 'popular' — keep the curated order from packages.json
  }

  const filteredPackages = computed(function getFilteredPackages() {
    const filtered = allPackages.value
      .filter((pkg) => matchesSearch(pkg, searchQuery.value))
      .filter((pkg) => matchesDuration(pkg, durationFilter.value))
      .filter((pkg) => matchesDestination(pkg, destinationFilter.value))

    return sortPackages(filtered, sortOption.value)
  })

  function resetFilters() {
    searchQuery.value = ''
    durationFilter.value = 'all'
    destinationFilter.value = 'all'
    sortOption.value = 'popular'
  }

  return {
    allPackages,
    searchQuery,
    durationFilter,
    destinationFilter,
    sortOption,
    destinationOptions,
    filteredPackages,
    resetFilters,
  }
})