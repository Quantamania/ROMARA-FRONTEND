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
  <!-- Hero section - unique floating cards design -->
  <section class="relative bg-romara-cream min-h-[600px] overflow-hidden">
    <!-- Abstract shapes -->
    <div class="top-0 right-0 absolute bg-romara-green/10 blur-3xl rounded-full w-96 h-96 -translate-y-1/2 translate-x-1/2"></div>
    <div class="bottom-0 left-0 absolute bg-romara-amber/10 blur-3xl rounded-full w-80 h-80 -translate-x-1/2 translate-y-1/2"></div>

    <div class="relative py-16 sm:py-24 romara-container">
      <div class="items-center gap-8 grid grid-cols-1 lg:grid-cols-12">
        <!-- Left content - 5 columns -->
        <div class="lg:col-span-5">
          <div class="relative">
            <!-- Decorative line -->
            <div class="top-0 -left-8 absolute bg-gradient-to-b from-romara-green via-romara-amber to-romara-green w-1 h-full"></div>

            <p class="mb-4 font-bold text-romara-amber text-sm uppercase tracking-[0.3em]">Explore Destinations</p>
            <h1 class="font-heading font-bold text-romara-green text-5xl sm:text-6xl leading-none">
              Kenya's
              <span class="block mt-2 text-romara-amber">Treasures</span>
              <span class="block mt-2 text-romara-ink">Await</span>
            </h1>
            <p class="mt-6 text-romara-ink/70 text-lg leading-relaxed">
              Every destination tells a story. From savannas to coastlines, discover the places that make Kenya extraordinary.
            </p>

            <!-- Quick stats in a unique layout -->
            <div class="gap-6 grid grid-cols-3 mt-10">
              <div class="text-center">
                <div class="font-heading font-bold text-romara-green text-4xl">47</div>
                <div class="mt-1 text-romara-ink/50 text-xs uppercase tracking-wider">Counties</div>
              </div>
              <div class="border-romara-ink/10 border-x text-center">
                <div class="font-heading font-bold text-romara-amber text-4xl">50+</div>
                <div class="mt-1 text-romara-ink/50 text-xs uppercase tracking-wider">Spots</div>
              </div>
              <div class="text-center">
                <div class="font-heading font-bold text-romara-green text-4xl">∞</div>
                <div class="mt-1 text-romara-ink/50 text-xs uppercase tracking-wider">Memories</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side - floating preview cards - 7 columns -->
        <div class="relative lg:col-span-7">
          <!-- Main featured card -->
          <div class="z-10 relative rotate-2 hover:rotate-0 transition-transform duration-500">
            <div class="bg-white shadow-2xl mx-auto p-4 rounded-2xl max-w-sm">
              <img
                src="/src/assets/images/destinations/maasai-mara.jpeg"
                alt="Maasai Mara"
                class="rounded-xl w-full h-48 object-cover"
              />
              <div class="mt-4 px-2">
                <div class="flex items-center gap-2 mb-2">
                  <span class="bg-romara-green px-2 py-1 rounded-full text-white text-xs">Featured</span>
                  <span class="text-romara-ink/50 text-xs">Wildlife</span>
                </div>
                <h3 class="font-heading font-bold text-romara-green text-lg">Maasai Mara</h3>
                <p class="mt-1 text-romara-ink/60 text-sm">Witness the Great Migration</p>
              </div>
            </div>
          </div>

          <!-- Floating secondary cards -->
          <div class="-top-4 -right-4 z-20 absolute -rotate-6 hover:rotate-0 transition-transform duration-500">
            <div class="bg-white shadow-xl p-3 rounded-xl w-40">
              <img
                src="/src/assets/images/destinations/crater.jpeg"
                alt="Crater"
                class="rounded-lg w-full h-24 object-cover"
              />
              <div class="mt-2">
                <h4 class="font-bold text-romara-green text-sm">Mount Kenya</h4>
              </div>
            </div>
          </div>

          <div class="bottom-8 -left-8 z-20 absolute rotate-3 hover:rotate-0 transition-transform duration-500">
            <div class="bg-white shadow-xl p-3 rounded-xl w-36">
              <img
                src="/src/assets/images/destinations/hero.jpg"
                alt="Beach"
                class="rounded-lg w-full h-20 object-cover"
              />
              <div class="mt-2">
                <h4 class="font-bold text-romara-green text-sm">Diani Beach</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Sticky filter bar -->
  <div class="top-20 z-20 sticky bg-white/95 shadow-sm backdrop-blur border-black/5 border-b">
    <div class="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 py-4 romara-container">
      <div class="flex flex-1 items-center gap-2 px-4 py-2 border border-black/10 rounded-full sm:max-w-sm">
        <IconSearch class="w-4 h-4 text-romara-ink/40 shrink-0" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search destinations..."
          class="bg-transparent border-none focus:outline-none focus:ring-0 w-full text-romara-ink placeholder:text-romara-ink/40 text-sm"
        />
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <div class="relative">
          <select
            v-model="selectedType"
            class="bg-white py-2 pr-9 pl-4 border border-black/10 focus:border-romara-green rounded-full focus:outline-none text-romara-ink text-sm appearance-none"
          >
            <option v-for="option in typeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <IconChevronDown class="top-1/2 right-3 absolute w-3.5 h-3.5 text-romara-ink/50 -translate-y-1/2 pointer-events-none" />
        </div>

        <div class="relative">
          <select
            v-model="sortOption"
            class="bg-white py-2 pr-9 pl-4 border border-black/10 focus:border-romara-green rounded-full focus:outline-none text-romara-ink text-sm appearance-none"
          >
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
          </select>
          <IconChevronDown class="top-1/2 right-3 absolute w-3.5 h-3.5 text-romara-ink/50 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  </div>

  <!-- Results -->
  <section class="py-12 sm:py-16 romara-container">
    <p class="mb-6 text-romara-ink/60 text-sm">
      Showing {{ filteredDestinations.length }} of {{ allDestinations.length }} destinations
    </p>

    <div v-if="filteredDestinations.length === 0" class="bg-romara-cream p-10 rounded-lg text-center">
      <p class="text-romara-ink/70 text-sm">No destinations match your search or filters.</p>
      <button
        type="button"
        class="mt-3 font-semibold text-romara-green hover:text-romara-amber text-sm underline"
        @click="resetFilters"
      >
        Clear filters
      </button>
    </div>

    <div v-else class="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <DestinationCard
        v-for="(destination, index) in filteredDestinations"
        :key="destination.id"
        :destination="destination"
        v-scroll-reveal="{ delay: (index % 3) * 100 }"
      />
    </div>
  </section>
</template>