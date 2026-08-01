<script setup lang="ts">
import { computed, ref } from 'vue'
import TrustBuilding from '@/features/home/sections/TrustBuilding.vue'
import CallToActionBar from '@/components/ui/CallToActionBar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import DayTripCard from '@/features/day-trips/components/DayTripCard.vue'
import CategoryFilter from '@/features/day-trips/components/CategoryFilter.vue'
import IconStopwatch from '@/components/icons/IconStopwatch.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconWallet from '@/components/icons/IconWallet.vue'
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue'
import dayTripsData from '@/data/dayTrips.json'
import type { DayTrip, DayTripCategory } from '@/features/day-trips/types/dayTrip.types'

const allTrips = dayTripsData as DayTrip[]
const selectedCategory = ref<DayTripCategory | 'all'>('all')

const filteredTrips = computed(function getFilteredTrips() {
  if (selectedCategory.value === 'all') return allTrips
  return allTrips.filter((trip) => trip.category === selectedCategory.value)
})

// Presentational-only imagery for the hero filmstrip (reuses existing assets).
const heroFilmstrip = [
  { image: '/src/assets/images/destinations/maasai-mara.jpeg', label: 'Maasai Mara', meta: 'Full day' },
  { image: '/src/assets/images/destinations/amboseli.jpg', label: 'Amboseli', meta: 'Full day' },
  { image: '/src/assets/images/destinations/lake-nakuru.jpeg', label: 'Lake Nakuru', meta: 'Full day' },
  { image: '/src/assets/images/destinations/nairobi.webp', label: 'Nairobi Park', meta: 'Half day' },
  { image: '/src/assets/images/destinations/crater.jpeg', label: 'Menengai Crater', meta: 'Half day' },
  { image: '/src/assets/images/destinations/diani.jpg', label: 'Diani Beach', meta: 'Full day' },
]

interface WhyChooseItem {
  icon: typeof IconStopwatch
  title: string
  description: string
}

const whyChooseItems: WhyChooseItem[] = [
  { icon: IconStopwatch, title: 'Perfect for Busy Schedules', description: 'No overnight stay needed — see more of Kenya in a single day.' },
  { icon: IconCamera, title: 'Top Attractions', description: "Curated experiences covering Kenya's best wildlife, nature and culture." },
  { icon: IconUsers, title: 'Private & Group Options', description: 'Travel solo, as a couple, or with a group — we tailor each trip.' },
  { icon: IconWallet, title: 'Affordable Experiences', description: 'Great value pricing with no hidden costs.' },
  { icon: IconThumbsUp, title: 'Memorable Moments', description: 'Every trip is planned to make the most of your time in Kenya.' },
]
</script>

<template>
  <!-- Hero: headline over a muted green scrim with a horizontal filmstrip peek -->
  <section class="relative isolate overflow-hidden bg-romara-green text-white">
    <!-- Faint background photograph, muted under green -->
    <img
      src="/src/assets/images/day-trips/hero.png"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover opacity-20"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-romara-green-dark/80 via-romara-green/60 to-romara-green-dark/90" />
    <div class="absolute inset-0 bg-scrim-b" />

    <div class="romara-container relative flex flex-col pt-14 sm:pt-16 lg:pt-20">
      <!-- Headline block -->
      <div class="max-w-2xl">
        <nav aria-label="Breadcrumb" class="mb-7 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 animate-fade-up">
          <a href="/" class="transition-colors duration-300 hover:text-romara-amber-300">Home</a>
          <span class="text-white/25">/</span>
          <span class="text-romara-amber-300">Day Trips</span>
        </nav>

        <h1 class="font-heading text-display font-semibold leading-[1.04] text-balance animate-fade-up" style="animation-delay: 90ms">
          Amazing Experiences. Unforgettable Memories.
        </h1>

        <p class="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg animate-fade-up" style="animation-delay: 180ms">
          Short on time? Our day trips are the perfect way to explore Kenya's top attractions in a single day
          — from wildlife encounters to cultural experiences, adventure and nature.
        </p>

        <div class="mt-9 flex flex-wrap gap-3 animate-fade-up" style="animation-delay: 270ms">
          <BaseButton as="a" href="/contact" variant="amber" size="lg">Request a Quote</BaseButton>
        </div>
      </div>

      <!-- Filmstrip peek: snap-scrolls horizontally, last frame peeks off the right -->
      <div class="filmstrip mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-10 sm:mt-14 lg:mt-16">
        <figure
          v-for="frame in heroFilmstrip"
          :key="frame.label"
          class="w-40 shrink-0 snap-start sm:w-52"
        >
          <div class="relative aspect-[4/3] overflow-hidden rounded-card shadow-card ring-1 ring-white/15">
            <img
              :src="frame.image"
              :alt="frame.label"
              loading="lazy"
              class="h-full w-full object-cover"
            />
            <span class="absolute bottom-2 left-2 inline-flex items-center rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              {{ frame.meta }}
            </span>
          </div>
          <figcaption class="mt-2.5 text-xs font-semibold text-white/75">{{ frame.label }}</figcaption>
        </figure>
        <!-- trailing spacer so the peeking frame invites the scroll -->
        <div class="w-2 shrink-0" aria-hidden="true" />
      </div>
    </div>
  </section>

  <div v-scroll-reveal="{ delay: 75 }">
    <TrustBuilding :overlap="false" />
  </div>

  <!-- Services grid -->
  <section v-scroll-reveal-left class="section-y romara-container">
    <div class="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="eyebrow mb-3">
          
          Explore Kenya
        </p>
        <h2 class="font-heading text-display-sm font-semibold text-romara-green">Popular Day Trips</h2>
        <span class="accent-rule mt-4" />
      </div>
      <CategoryFilter v-model="selectedCategory" />
    </div>

    <p v-if="filteredTrips.length === 0" class="text-romara-ink/60 text-sm">
      No day trips match this category yet.
    </p>

    <div v-else class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <DayTripCard
        v-for="(trip, index) in filteredTrips"
        :key="trip.id"
        :trip="trip"
        v-scroll-reveal="{ delay: index * 100 }"
      />
    </div>
  </section>

  <!-- Why Choose Our Day Trips -->
  <section v-scroll-reveal-right class="pb-20 romara-container">
    <div class="overflow-hidden rounded-card bg-romara-cream shadow-soft">
      <div class="items-stretch gap-8 grid grid-cols-1 lg:grid-cols-5">
        <div class="lg:col-span-2 relative min-h-[240px] overflow-hidden">
          <img
            src="/src/assets/images/day-trips/why.png"
            alt="Safari vehicle with rhino on a day trip"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/40 to-transparent" />
        </div>

        <div class="lg:col-span-3 p-8 sm:p-10">
          <p class="eyebrow mb-3">
            
            The ROMARA Difference
          </p>
          <h2 class="font-heading text-display-sm font-semibold text-romara-green">Why Choose Our Day Trips?</h2>
          <span class="accent-rule mt-4" />
          <p class="mt-4 max-w-xl text-sm leading-relaxed text-romara-ink-soft">
            Our day trips are thoughtfully planned to give you maximum experience in minimum time.
          </p>

          <div class="gap-6 grid grid-cols-2 sm:grid-cols-5 mt-8">
            <div v-for="(item, index) in whyChooseItems" :key="item.title" v-scroll-reveal="{ delay: index * 75 }">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-romara-green shadow-soft">
                <component :is="item.icon" class="h-5 w-5" />
              </span>
              <p class="mt-3 font-heading font-semibold text-romara-green text-sm">{{ item.title }}</p>
              <p class="mt-1 text-romara-ink/60 text-xs leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div v-scroll-reveal="{ delay: 75 }">
    <CallToActionBar
      title="Ready for an Adventure?"
      subtitle="Book your next day trip with ROMARA today."
      primary-label="Book a Day Trip"
      image="/src/assets/images/day-trips/hero.png"
      theme="green"
    />
  </div>
</template>

<style scoped>
.filmstrip {
  scrollbar-width: none;
}
.filmstrip::-webkit-scrollbar {
  display: none;
}
</style>