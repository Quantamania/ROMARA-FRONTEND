<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDayTripBySlug } from '@/features/day-trips/api/dayTrips.api'
import CtaTicket from '@/components/ui/CtaTicket.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconX from '@/components/icons/IconX.vue'
import type { DayTrip } from '@/features/day-trips/types/dayTrip.types'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug as string)

const trip = ref<DayTrip | null>(null)
const isLoading = ref(true)
const notFound = ref(false)

// Stamp strip content — edit freely per trip, or wire to trip data later
const wildlife = [
  { label: 'Lion' },
  { label: 'Rhino' },
  { label: 'Giraffe' },
  { label: 'Zebra' },
]

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-KE').format(amount)
}

async function loadTrip() {
  isLoading.value = true
  notFound.value = false
  const result = await getDayTripBySlug(slug.value)
  if (!result) {
    trip.value = null
    notFound.value = true
  } else {
    trip.value = result
  }
  isLoading.value = false
}

watchEffect(() => {
  loadTrip()
})

function goBack() {
  router.push({ name: 'day-trips' })
}
</script>

<template>
  <div class="bg-romara-cream min-h-screen">

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center bg-romara-green-dark min-h-screen">
      <div class="text-center">
        <div class="mx-auto mb-4 border-4 border-romara-amber/30 border-t-romara-amber rounded-full w-16 h-16 animate-spin"></div>
        <p class="font-light text-white/80 text-lg">Loading trip details&hellip;</p>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="notFound" class="flex justify-center items-center bg-romara-green-dark min-h-screen">
      <div class="px-6 max-w-md text-center">
        <div class="flex justify-center items-center mx-auto mb-6 border border-romara-amber/30 rounded-full w-20 h-20">
          <IconX class="w-9 h-9 text-romara-amber" />
        </div>
        <p class="mb-4 font-heading font-bold text-white text-3xl">Trip Not Found</p>
        <p class="mb-8 text-white/70 text-lg leading-relaxed">
          The day trip you're looking for doesn't exist or may have been removed.
        </p>
        <button
          @click="goBack"
          class="inline-flex items-center gap-3 border border-romara-amber px-8 py-4 font-semibold text-romara-amber hover:text-romara-green-dark transition-colors hover:bg-romara-amber duration-300"
        >
          <IconChevronRight class="w-5 h-5 rotate-180" />
          Back to Day Trips
        </button>
      </div>
    </div>

    <!-- Trip Content -->
    <div v-else-if="trip" class="overflow-x-hidden">

      <!-- Hero -->
      <section class="relative isolate bg-romara-green-dark min-h-[440px] overflow-hidden text-white sm:min-h-[600px]">
        <img :src="trip.image" :alt="trip.name" class="ken-burns absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-scrim-b" />
        <div class="absolute inset-0 bg-gradient-to-b from-romara-green-dark/70 via-romara-green-dark/25 to-romara-green-dark" />

        <div class="relative flex flex-col justify-between py-8 min-h-[440px] sm:min-h-[600px] romara-container">
          <button
            @click="goBack"
            class="glass inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors hover:text-romara-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/50"
          >
            <IconChevronRight class="w-4 h-4 rotate-180" />
            Back to Day Trips
          </button>

          <div class="mt-16 max-w-3xl">
            <p class="eyebrow text-romara-amber-300">
              
              Day Trip &middot; {{ trip.category }}
            </p>
            <h1 class="mt-4 font-heading text-display-lg font-semibold text-balance">
              {{ trip.name }}
            </h1>
            <div class="mt-6 flex flex-wrap items-center gap-2.5 text-[11px] font-semibold text-white">
              <span class="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
                <IconClock class="h-3.5 w-3.5" />
                {{ trip.duration }}
              </span>
              <span class="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
                <IconMapPin class="h-3.5 w-3.5" />
                {{ trip.location }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Waypoints strip -->
      <div class="border-romara-green-dark/10 bg-romara-cream border-b romara-container">
        <div class="flex sm:flex-row flex-col divide-y sm:divide-y-0 divide-romara-green-dark/10 sm:divide-x">
          <div class="flex-1 py-6 sm:pr-8">
            <p class="font-semibold text-romara-ink/45 text-[11px] uppercase tracking-[0.3em]">Duration</p>
            <p class="mt-1 font-heading font-bold text-romara-green-dark text-xl">{{ trip.duration }}</p>
          </div>
          <div class="flex-1 py-6 sm:px-8">
            <p class="font-semibold text-romara-ink/45 text-[11px] uppercase tracking-[0.3em]">Location</p>
            <p class="mt-1 font-heading font-bold text-romara-green-dark text-xl">{{ trip.location }}</p>
          </div>
          <div class="flex-1 py-6 sm:px-8">
            <p class="font-semibold text-romara-ink/45 text-[11px] uppercase tracking-[0.3em]">Category</p>
            <p class="mt-1 font-heading font-bold text-romara-green-dark text-xl capitalize">{{ trip.category }}</p>
          </div>
          <div class="flex-1 py-6 sm:pl-8">
            <p class="font-semibold text-romara-ink/45 text-[11px] uppercase tracking-[0.3em]">From</p>
            <p class="mt-1 font-heading font-bold text-romara-amber text-xl">KES {{ formatPrice(trip.priceFromKES) }}</p>
          </div>
        </div>
      </div>

      <!-- Overview -->
      <section class="py-16 lg:py-24 romara-container">
        <div class="gap-16 lg:gap-20 grid lg:grid-cols-[2fr_1fr]">

          <div>
            <h2 class="mb-8 font-heading font-bold text-romara-green-dark text-3xl lg:text-4xl">Experience Overview</h2>
            <p class="max-w-2xl text-romara-ink/80 text-lg leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-heading first-letter:font-bold first-letter:text-romara-amber first-letter:text-6xl first-letter:leading-none">
              {{ trip.description }}
            </p>

            <!-- Wildlife stamp strip: fills the space under the copy, ties directly to what the description promises -->
            <div class="mt-12">
              <p class="font-semibold text-romara-ink/45 text-[11px] uppercase tracking-[0.3em]">On the Watch List</p>
              <div class="flex flex-wrap gap-5 mt-5">
                <div
                  v-for="(animal, i) in wildlife"
                  :key="animal.label"
                  class="inline-flex items-center gap-2 px-5 py-2.5 border-2 rounded-full font-heading font-bold text-sm uppercase tracking-wider"
                  :class="[
                    i % 2 === 0 ? 'border-romara-green text-romara-green' : 'border-romara-amber text-romara-amber',
                    i % 3 === 0 ? '-rotate-2' : 'rotate-1',
                  ]"
                >
                  {{ animal.label }}
                </div>
              </div>
            </div>
          </div>

          <div class="lg:border-romara-green-dark/15 lg:pl-10 lg:border-l">
            <div class="pb-8 border-romara-green-dark/10 border-b">
              <p class="font-heading font-bold text-romara-amber/50 text-4xl leading-none">01</p>
              <p class="mt-3 font-semibold text-romara-green-dark text-sm uppercase tracking-[0.2em]">Perfect For</p>
              <p class="mt-2 text-romara-ink/70 leading-relaxed">Travelers seeking a complete experience without overnight commitments.</p>
            </div>
            <div class="pt-8">
              <p class="font-heading font-bold text-romara-amber/50 text-4xl leading-none">02</p>
              <p class="mt-3 font-semibold text-romara-green-dark text-sm uppercase tracking-[0.2em]">What's Special</p>
              <p class="mt-2 text-romara-ink/70 leading-relaxed">Curated stops, expert local guidance, and a comfortable, immersive pace.</p>
            </div>
          </div>

        </div>
      </section>

      <!-- Included + Field Note (replaces the old Not Included column) -->
      <section class="pb-16 lg:pb-24 romara-container">
        <div class="border-romara-green-dark/10 border-t border-b">
          <div class="sm:divide-x divide-romara-green-dark/10 grid sm:grid-cols-2">

            <div class="py-10 sm:pr-10">
              <h3 class="inline-block pb-3 border-romara-amber border-b-2 font-bold text-romara-green-dark text-xl">Included</h3>
              <ul class="space-y-4 mt-6">
                <li class="flex items-start gap-3 text-romara-ink/80 leading-relaxed">
                  <IconCheck class="flex-shrink-0 mt-0.5 w-5 h-5 text-romara-green" />
                  <span>Expert guide and comfortable transport</span>
                </li>
                <li class="flex items-start gap-3 text-romara-ink/80 leading-relaxed">
                  <IconCheck class="flex-shrink-0 mt-0.5 w-5 h-5 text-romara-green" />
                  <span>Park entry or activity fees</span>
                </li>
                <li class="flex items-start gap-3 text-romara-ink/80 leading-relaxed">
                  <IconCheck class="flex-shrink-0 mt-0.5 w-5 h-5 text-romara-green" />
                  <span>Complimentary refreshments</span>
                </li>
              </ul>
            </div>

            <div class="relative py-10 sm:pl-10">
              <span class="top-4 font-heading text-romara-amber/25 text-8xl leading-none select-none">&ldquo;</span>
              <p class="relative mt-2 font-heading text-romara-green-dark text-2xl italic leading-snug">
                You don't need three days in the bush to feel small in front of a lion.
              </p>
              <p class="mt-5 font-semibold text-romara-ink/50 text-xs uppercase tracking-[0.25em]">
                &mdash; Notes from the field
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- Booking CTA -->
      <div class="pt-4">
        <CtaTicket
          title="Ready to book this trip?"
          subtitle="Secure your spot today and let us craft an unforgettable day trip experience for you."
          primary-label="Start Booking"
          primary-href="/booking"
          :to="trip.location"
        />
      </div>

    </div>
  </div>
</template>