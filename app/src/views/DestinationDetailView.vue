<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import DestinationCard from '@/features/destinations/components/DestinationCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import destinationsData from '@/data/destinations.json'
import type { Destination, DestinationType } from '@/features/destinations/types/destination.types'

type TypeFilter = DestinationType | 'all'
type SortOption = 'name-asc' | 'name-desc'

const route = useRoute()
const allDestinations = destinationsData as Destination[]

// Pre-fill from the query string, since the homepage's search bar and
// "Browse by Type" tiles link here with ?q=... and/or ?type=...
const searchQuery = ref(typeof route.query.q === 'string' ? route.query.q : '')
const selectedType = ref<TypeFilter>((route.query.type as TypeFilter) || 'all')
const sortOption = ref<SortOption>('name-asc')

const typeOptions: { value: TypeFilter; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'wildlife', label: 'Wildlife & Safaris' },
  { value: 'mountains', label: 'Mountains & Hiking' },
  { value: 'beaches', label: 'Beaches & Coast' },
  { value: 'cities', label: 'Cities & Towns' },
  { value: 'culture', label: 'Culture & Heritage' },
  { value: 'nature', label: 'Nature & Scenery' },
]

function matchesSearch(destination: Destination, query: string) {
  const haystack = `${destination.name} ${destination.county}`.toLowerCase()
  return haystack.includes(query.trim().toLowerCase())
}

function matchesType(destination: Destination, type: TypeFilter) {
  return type === 'all' || destination.types.includes(type)
}

function sortDestinations(destinations: Destination[], sort: SortOption) {
  const sorted = [...destinations]
  sorted.sort(function compareByName(a, b) {
    return sort === 'name-asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  })
  return sorted
}

const filteredDestinations = computed(function getFilteredDestinations() {
  const filtered = allDestinations
    .filter((destination) => matchesSearch(destination, searchQuery.value))
    .filter((destination) => matchesType(destination, selectedType.value))

  return sortDestinations(filtered, sortOption.value)
})

function resetFilters() {
  searchQuery.value = ''
  selectedType.value = 'all'
  sortOption.value = 'name-asc'
}
</script>

<template>
  <!-- Intro -->
  <section class="bg-romara-cream py-14 sm:py-16">
    <div class="romara-container text-center">
      <p class="text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">Destinations Directory</p>
      <h1 class="mt-3 font-heading text-3xl font-bold text-romara-green sm:text-4xl">
        Explore Kenya's Top Destinations
      </h1>
      <p class="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-romara-ink/70">
        Browse our full collection of destinations across Kenya — search by name, filter by type, and find
        your next adventure.
      </p>
    </div>
  </section>

  <!-- Sticky filter bar -->
  <div class="sticky top-20 z-20 border-b border-black/5 bg-white/95 backdrop-blur">
    <div class="romara-container flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-1 items-center gap-2 rounded-full border border-black/10 px-4 py-2 sm:max-w-sm">
        <IconSearch class="h-4 w-4 shrink-0 text-romara-ink/40" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search destinations..."
          class="w-full border-none bg-transparent text-sm text-romara-ink placeholder:text-romara-ink/40 focus:outline-none focus:ring-0"
        />
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <div class="relative">
          <select
            v-model="selectedType"
            class="appearance-none rounded-full border border-black/10 bg-white py-2 pl-4 pr-9 text-sm text-romara-ink focus:border-romara-green focus:outline-none"
          >
            <option v-for="option in typeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <IconChevronDown class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-romara-ink/50" />
        </div>

        <div class="relative">
          <select
            v-model="sortOption"
            class="appearance-none rounded-full border border-black/10 bg-white py-2 pl-4 pr-9 text-sm text-romara-ink focus:border-romara-green focus:outline-none"
          >
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
          </select>
          <IconChevronDown class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-romara-ink/50" />
        </div>
      </div>
    </div>
  </div>

  <!-- Results -->
  <section class="romara-container py-10 sm:py-12">
    <p class="mb-6 text-sm text-romara-ink/60">
      Showing {{ filteredDestinations.length }} of {{ allDestinations.length }} destinations
    </p>

    <div v-if="filteredDestinations.length === 0" class="rounded-lg bg-romara-cream p-10 text-center">
      <p class="text-sm text-romara-ink/70">No destinations match your search or filters.</p>
      <button
        type="button"
        class="mt-3 text-sm font-semibold text-romara-green underline hover:text-romara-amber"
        @click="resetFilters"
      >
        Clear filters
      </button>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <DestinationCard
        v-for="(destination, index) in filteredDestinations"
        :key="destination.id"
        :destination="destination"
        v-scroll-reveal="{ delay: (index % 4) * 100 }"
      />
    </div>
  </section>
</template>