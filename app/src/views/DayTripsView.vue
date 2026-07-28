<script setup lang="ts">
import { computed, ref } from 'vue'
import TrustBuilding from '@/features/home/sections/TrustBuilding.vue'
import CallToActionBar from '@/components/ui/CallToActionBar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import DayTripCard from '@/features/day-trips/components/DayTripCard.vue'
import CategoryFilter from '@/features/day-trips/components/CategoryFilter.vue'
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
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
    <!-- Hero: full-bleed edge-to-edge, lighter overlay, dark text -->
  <section v-scroll-reveal class="isolate relative min-h-[460px] sm:min-h-[500px] overflow-hidden">
    <img
      src="/src/assets/images/day-trips/hero.png"
      alt="Giraffe with the Nairobi skyline in the background"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-white/85 via-white/45 to-transparent" />

    <div class="relative flex items-center min-h-[460px] sm:min-h-[500px] romara-container">
      <div class="py-16 max-w-xl">
        <p class="font-bold text-romara-amber text-sm uppercase tracking-[0.2em]">Day Trips</p>
        <h1 class="mt-3 font-heading font-bold text-romara-green text-4xl sm:text-5xl leading-tight">
          Amazing Experiences. Unforgettable Memories.
        </h1>
        <p class="mt-4 text-romara-ink/70 text-base leading-relaxed">
          Short on time? Our day trips are the perfect way to explore Kenya's top attractions in a single day.
          From wildlife encounters to cultural experiences, adventure and nature, we've got you covered.
        </p>

        <div class="flex flex-wrap gap-3 mt-8">
          <BaseButton as="a" href="/contact" variant="outline" size="lg">
            Request a Quote
            <IconChevronRight class="w-4 h-4" />
          </BaseButton>
        </div>
      </div>
    </div>
  </section>

  <div v-scroll-reveal="{ delay: 75 }">
    <TrustBuilding :overlap="false" />
  </div>

  <!-- Services grid -->
  <section v-scroll-reveal-left class="py-16 romara-container">
    <div class="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-4 mb-8">
      <h2 class="font-bold text-romara-green text-2xl sm:text-3xl">Popular Day Trips</h2>
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
  <section v-scroll-reveal-right class="pb-16 romara-container">
    <div class="bg-romara-cream p-6 sm:p-8 rounded-lg">
      <div class="items-center gap-8 grid grid-cols-1 lg:grid-cols-5">
        <img
          src="/src/assets/images/day-trips/why.png"
          alt="Safari vehicle with rhino on a day trip"
          class="lg:col-span-2 rounded-md w-full h-56 lg:h-64 object-cover"
        />

        <div class="lg:col-span-3">
          <h2 class="font-bold text-romara-green text-2xl sm:text-3xl">Why Choose Our Day Trips?</h2>
          <span class="block bg-romara-amber mt-2 rounded w-14 h-1" />
          <p class="mt-3 text-romara-ink/70 text-sm leading-relaxed">
            Our day trips are thoughtfully planned to give you maximum experience in minimum time.
          </p>

          <div class="gap-6 grid grid-cols-2 sm:grid-cols-5 mt-8">
            <div v-for="(item, index) in whyChooseItems" :key="item.title" v-scroll-reveal="{ delay: index * 75 }">
              <component :is="item.icon" class="w-7 h-7 text-romara-green" />
              <p class="mt-2 font-bold text-romara-green text-sm">{{ item.title }}</p>
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
      theme="green"
      icon-style="boxed"
      :icon="IconCalendarCheck"
    />
  </div>
</template>