<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
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
  <!-- HERO 2 — Compact Stat-Band Hero: a slim, type-led directory header on a
       solid green field with a thin route-line motif and an inline stat band. -->
  <header class="relative isolate overflow-hidden bg-green-fade text-white">
    <!-- Thin map/route line motif -->
    <svg
      class="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 300"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        d="M-20 210 C 220 140, 360 250, 560 170 S 900 60, 1220 130"
        stroke="#E4B77E"
        stroke-width="1.5"
        stroke-dasharray="2 9"
        stroke-linecap="round"
        opacity="0.5"
      />
      <path
        d="M-20 90 C 260 40, 420 150, 680 110 S 980 210, 1220 160"
        stroke="#FFFFFF"
        stroke-width="1"
        stroke-dasharray="1 12"
        stroke-linecap="round"
        opacity="0.18"
      />
      <circle cx="560" cy="170" r="4" fill="#E4B77E" />
      <circle cx="680" cy="110" r="3" fill="#FFFFFF" opacity="0.6" />
      <circle cx="220" cy="176" r="3" fill="#FFFFFF" opacity="0.4" />
    </svg>

    <div class="romara-container relative py-12 sm:py-16">
      <nav
        class="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60"
        aria-label="Breadcrumb"
      >
        <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
        <span class="text-white/30">/</span>
        <a href="/destinations" class="transition-colors hover:text-romara-amber">Destinations</a>
        <span class="text-white/30">/</span>
        <span class="text-white/85">Directory</span>
      </nav>

      <h1 class="max-w-2xl font-heading text-display-sm font-semibold text-balance">
        Kenya's Treasures Await
      </h1>
      <p class="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
        Every destination tells a story. From savannas to coastlines, discover the places that make
        Kenya extraordinary.
      </p>

      <!-- Inline stat band -->
      <dl class="animate-fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/15 pt-6 sm:gap-x-10">
        <div class="flex items-baseline gap-2">
          <dd class="font-heading text-3xl font-semibold text-white sm:text-4xl">47</dd>
          <dt class="text-[11px] uppercase tracking-[0.14em] text-white/70">Counties</dt>
        </div>
        <div class="hidden h-8 w-px bg-white/15 sm:block" aria-hidden="true" />
        <div class="flex items-baseline gap-2">
          <dd class="font-heading text-3xl font-semibold text-romara-amber-300 sm:text-4xl">50+</dd>
          <dt class="text-[11px] uppercase tracking-[0.14em] text-white/70">Spots</dt>
        </div>
        <div class="hidden h-8 w-px bg-white/15 sm:block" aria-hidden="true" />
        <div class="flex items-baseline gap-2">
          <dd class="font-heading text-3xl font-semibold text-white sm:text-4xl">&infin;</dd>
          <dt class="text-[11px] uppercase tracking-[0.14em] text-white/70">Memories</dt>
        </div>
      </dl>
    </div>
  </header>

  <!-- Filter command bar: full-width search + horizontal chip strip on mobile, sticky rail on desktop -->
  <div class="sticky top-20 z-20 border-b border-romara-green/10 bg-white/90 shadow-soft backdrop-blur">
    <div class="romara-container py-4">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
        <!-- Search: full-width on mobile -->
        <div class="flex w-full items-center gap-2.5 rounded-full border border-romara-green/15 bg-white px-4 py-2.5 transition-colors focus-within:border-romara-green/40 lg:max-w-xs">
          <IconSearch class="h-4 w-4 shrink-0 text-romara-ink-soft" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search destinations..."
            class="w-full border-none bg-transparent text-sm text-romara-ink placeholder:text-romara-ink/40 focus:outline-none focus:ring-0"
          />
        </div>

        <!-- Type filter: horizontal scroll chip strip (never a wrapping wall) -->
        <div class="-mx-4 flex-1 overflow-x-auto px-4 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div class="flex w-max items-center gap-2 lg:w-auto lg:flex-wrap">
            <button
              v-for="option in typeOptions"
              :key="option.value"
              type="button"
              class="shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 ease-out-expo"
              :class="selectedType === option.value
                ? 'border-romara-green bg-romara-green text-white shadow-soft'
                : 'border-romara-green/15 bg-white text-romara-ink-soft hover:border-romara-green/40 hover:text-romara-green'"
              @click="selectedType = option.value"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- Sort control -->
        <div class="relative shrink-0 self-start lg:self-auto">
          <select
            v-model="sortOption"
            class="appearance-none rounded-full border border-romara-green/15 bg-white py-2.5 pl-4 pr-9 text-sm text-romara-ink transition-colors focus:border-romara-green focus:outline-none"
          >
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
          </select>
          <IconChevronDown class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-romara-ink-soft" />
        </div>
      </div>
    </div>
  </div>

  <!-- Results -->
  <section class="section-y bg-white">
    <div class="romara-container">
      <div class="mb-8 flex flex-wrap items-baseline justify-between gap-3">
        <p class="text-xs font-semibold uppercase tracking-[0.14em] text-romara-ink-soft">
          Showing <span class="text-romara-green">{{ filteredDestinations.length }}</span> of {{ allDestinations.length }} destinations
        </p>
        <button
          v-if="filteredDestinations.length !== allDestinations.length"
          type="button"
          class="text-xs font-bold uppercase tracking-[0.14em] text-romara-amber transition-colors hover:text-romara-amber-600"
          @click="resetFilters"
        >
          Reset
        </button>
      </div>

      <!-- Refined empty state -->
      <div
        v-if="filteredDestinations.length === 0"
        class="relative overflow-hidden rounded-card border border-dashed border-romara-green/20 bg-romara-bone px-6 py-16 text-center sm:py-20"
      >
        <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-romara-green shadow-soft ring-1 ring-romara-green/10">
          <IconSearch class="h-7 w-7" />
        </div>
        <p class="font-heading text-xl font-semibold text-romara-green sm:text-2xl">No matching destinations</p>
        <p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-romara-ink-soft">
          Nothing matches your search or filters just yet. Try clearing them to see every destination.
        </p>
        <div class="mt-6 flex justify-center">
          <BaseButton type="button" variant="outline" size="md" @click="resetFilters">Clear filters</BaseButton>
        </div>
      </div>

      <!-- Varied, editorial grid: the lead result stretches wide for asymmetry -->
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        <DestinationCard
          v-for="(destination, index) in filteredDestinations"
          :key="destination.id"
          :destination="destination"
          class="transition-all"
          :class="index === 0 && filteredDestinations.length > 1 ? 'sm:col-span-2' : ''"
          v-scroll-reveal="{ delay: (index % 3) * 100 }"
        />
      </div>
    </div>
  </section>
</template>