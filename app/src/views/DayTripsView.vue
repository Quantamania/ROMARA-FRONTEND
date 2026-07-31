<script setup lang="ts">
import { computed, ref } from 'vue'
import TrustBuilding from '@/features/home/sections/TrustBuilding.vue'
import CallToActionBar from '@/components/ui/CallToActionBar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import PageHero from '@/components/ui/PageHero.vue'
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
  <!-- Hero -->
  <PageHero
    v-scroll-reveal
    eyebrow="Day Trips"
    title="Amazing Experiences. Unforgettable Memories."
    subtitle="Short on time? Our day trips are the perfect way to explore Kenya's top attractions in a single day — from wildlife encounters to cultural experiences, adventure and nature."
    image="/src/assets/images/day-trips/hero.png"
    size="lg"
    :breadcrumbs="[{ label: 'Home', href: '/' }, { label: 'Day Trips' }]"
  >
    <div class="flex flex-wrap gap-3">
      <BaseButton as="a" href="/contact" variant="amber" size="lg">Request a Quote</BaseButton>
    </div>
  </PageHero>

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
      theme="green"
      icon-style="boxed"
      :icon="IconCalendarCheck"
    />
  </div>
</template>