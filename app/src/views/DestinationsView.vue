<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import CallToActionBar from '@/components/ui/CallToActionBar.vue'
import DestinationCard from '@/features/destinations/components/DestinationCard.vue'
import DestinationFilters from '@/features/destinations/components/DestinationFilters.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import destinationsData from '@/data/destinations.json'
import type { Destination, DestinationType } from '@/features/destinations/types/destination.types'

const popularDestinations = destinationsData as Destination[]
const featuredDestination = popularDestinations[0]
const otherDestinations = popularDestinations.slice(1)

const router = useRouter()
const searchQuery = ref('')
const selectedType = ref<DestinationType | 'all'>('all')

function handleSearchSubmit() {
  router.push({
    path: '/destinations/directory',
    query: {
      q: searchQuery.value || undefined,
      type: selectedType.value !== 'all' ? selectedType.value : undefined,
    },
  })
}

const whyVisitPoints = [
  'Diverse wildlife and national parks',
  'Beautiful beaches and coastlines',
  'Stunning landscapes and scenic views',
  'Year-round travel opportunities',
  'Vibrant cultures and traditions',
  'Warm, welcoming people',
]

interface Stat {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '47', label: 'Counties to Explore' },
  { value: '50+', label: 'Destinations' },
  { value: '1000+', label: 'Happy Explorers' },
]
</script>

<template>
  <!-- Hero: diagonal split, not full-bleed like every other page -->
  <section  v-scroll-reveal class="relative overflow-hidden bg-romara-green">
    <div
      class="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block"
      style="clip-path: polygon(14% 0, 100% 0, 100% 100%, 0 100%)"
    >
      <img
        src="/src/assets/images/destinations/hero.jpg"
        alt="Elephant herd at sunset in Kenya"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-romara-green/50 via-transparent to-transparent" />
    </div>

    <img
      src="/src/assets/images/destinations/hero.jpg"
      alt="Elephant herd at sunset in Kenya"
      class="h-56 w-full object-cover lg:hidden"
    />

    <div class="romara-container relative z-10 py-14 lg:flex lg:min-h-[650px] lg:items-center lg:py-0">
      <div class="max-w-xl text-white">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">Destinations</p>
        <h1 class="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">
          Extraordinary Places. Unforgettable Experiences.
        </h1>
        <p class="mt-4 text-base leading-relaxed text-white/85">
          From world-famous wildlife reserves and scenic landscapes to vibrant cities and cultural landmarks,
          explore the best destinations Kenya has to offer and beyond.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton as="a" href="/destinations/directory" variant="amber" size="lg">
            <IconMapPin class="h-4 w-4" />
            Explore All Destinations
          </BaseButton>
          <BaseButton as="a" href="/contact" variant="outline" size="lg">Request a Quote</BaseButton>
        </div>
      </div>
    </div>
  </section>

  <!-- Floating search bar, replacing the usual trust-icon strip -->
  <section  v-scroll-reveal class="romara-container relative z-10 -mt-8 sm:-mt-10">
    <form
      class="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-overlap sm:flex-row sm:items-center sm:rounded-full sm:p-2"
      @submit.prevent="handleSearchSubmit"
    >
      <div class="flex flex-1 items-center gap-2 rounded-full px-4 py-2">
        <IconMapPin class="h-5 w-5 shrink-0 text-romara-amber" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search destinations, e.g. Maasai Mara, Diani Beach..."
          class="w-full border-none bg-transparent text-sm text-romara-ink placeholder:text-romara-ink/40 focus:outline-none focus:ring-0"
        />
      </div>
      <div class="hidden h-8 w-px shrink-0 bg-black/10 sm:block" />
      <select
        v-model="selectedType"
        class="shrink-0 rounded-full border-none bg-transparent px-4 py-2 text-sm text-romara-ink focus:outline-none focus:ring-0 sm:w-auto"
      >
        <option value="all">All Types</option>
        <option value="wildlife">Wildlife & Safaris</option>
        <option value="mountains">Mountains & Hiking</option>
        <option value="beaches">Beaches & Coast</option>
        <option value="cities">Cities & Towns</option>
        <option value="culture">Culture & Heritage</option>
        <option value="nature">Nature & Scenery</option>
      </select>
      <button
  type="submit"
  class="shrink-0 rounded-full bg-romara-green px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-romara-green/90"
>
  Search
</button>
    </form>
  </section>

  <!-- Popular Destinations: asymmetric bento grid -->
  <section v-scroll-reveal class="romara-container py-16">
    <div class="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Popular Destinations in Kenya</h2>
        <span class="mt-2 block h-1 w-14 rounded bg-romara-amber" />
      </div>
      <a
        href="/destinations/directory"
        class="hidden shrink-0 items-center gap-1 text-sm font-semibold text-romara-green hover:text-romara-amber sm:flex"
      >
        View All Destinations
        <IconMapPin class="h-4 w-4" />
      </a>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
      <DestinationCard
        :destination="featuredDestination"
        featured
        class="lg:col-span-2 lg:row-span-2"
        v-scroll-reveal
      />
      <DestinationCard
        v-for="(destination, index) in otherDestinations"
        :key="destination.id"
        :destination="destination"
        v-scroll-reveal="{ delay: (index + 1) * 100 }"
      />
    </div>
  </section>

  <!-- Browse Destinations by Type: horizontal scroll reel -->
  <section v-scroll-reveal class="bg-romara-cream py-14">
    <div class="romara-container">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Browse Destinations by Type</h2>
        <span class="mx-auto mt-2 block h-1 w-14 rounded bg-romara-amber" />
      </div>
      <div class="mt-10">
        <DestinationFilters />
      </div>
    </div>
  </section>

  <!-- Why Visit Kenya: full-width stat + quote band, no photo this time -->
  <section v-scroll-reveal class="bg-romara-green py-16 text-white sm:py-20">
    <div class="romara-container">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">Why Visit Kenya?</p>
        <p class="mt-4 font-heading text-2xl font-bold leading-snug sm:text-3xl">
          &ldquo;Kenya is a land of breathtaking landscapes, diverse wildlife, rich cultures and warm
          hospitality.&rdquo;
        </p>
        <p class="mt-4 text-sm leading-relaxed text-white/70">
          Whether you are seeking adventure, relaxation, or cultural immersion, Kenya offers experiences like
          no other.
        </p>
      </div>

      <div class="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-6 border-y border-white/15 py-8 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="font-heading text-3xl font-bold text-romara-amber">{{ stat.value }}</p>
          <p class="mt-1 text-xs uppercase tracking-wide text-white/60">{{ stat.label }}</p>
        </div>
      </div>

      <div class="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
        <span
          v-for="point in whyVisitPoints"
          :key="point"
          class="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white/90"
        >
          {{ point }}
        </span>
      </div>

      <div class="mt-10 text-center">
        <BaseButton as="a" href="/destinations/plan" variant="amber" size="lg">Plan Your Journey</BaseButton>
      </div>
    </div>
  </section>

  <CallToActionBar
    title="Ready to Explore Your Next Destination?"
    subtitle="Let ROMARA Tours & Travel help you plan the perfect journey."
    primary-label="Book Now"
    theme="green"
    icon-style="boxed"
    :icon="IconCalendarCheck"
  />
</template>