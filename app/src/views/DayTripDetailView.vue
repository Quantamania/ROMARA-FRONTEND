<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDayTripBySlug } from '@/features/day-trips/api/dayTrips.api'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { DayTrip } from '@/features/day-trips/types/dayTrip.types'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug as string)

const trip = ref<DayTrip | null>(null)
const isLoading = ref(true)
const notFound = ref(false)

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
  <section class="relative overflow-hidden">
    <div v-if="trip" class="absolute inset-0">
      <img :src="trip.image" :alt="trip.name" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
    </div>

    <div class="relative romara-container py-28">
      <div class="max-w-4xl text-white">
        <button type="button" @click="goBack" class="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6">
          <IconChevronRight class="w-4 h-4 rotate-180" />
          Back to Day Trips
        </button>

        <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs uppercase tracking-[0.3em] font-semibold text-romara-amber">
          Day Trips
        </div>

        <h1 v-if="trip" class="mt-6 font-heading font-black text-5xl sm:text-6xl leading-tight tracking-tight">{{ trip.name }}</h1>
        <p v-if="trip" class="mt-6 max-w-2xl text-white/80 text-lg leading-relaxed">{{ trip.description }}</p>

        <div v-if="trip" class="mt-10 grid gap-4 sm:grid-cols-3 text-white/90">
          <div class="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
            <p class="text-2xl font-bold">{{ trip.duration }}</p>
            <p class="mt-2 text-sm text-white/60">Duration</p>
          </div>
          <div class="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
            <p class="text-2xl font-bold">{{ trip.location }}</p>
            <p class="mt-2 text-sm text-white/60">Location</p>
          </div>
          <div class="rounded-3xl border border-white/10 bg-romara-amber/10 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
            <p class="text-2xl font-bold text-romara-amber">KES {{ formatPrice(trip.priceFromKES) }}</p>
            <p class="mt-2 text-sm text-romara-amber/80">From / person</p>
          </div>
        </div>

        <div class="mt-12 flex flex-col gap-4 sm:flex-row">
          <BaseButton as="a" href="/booking" variant="primary" size="lg">Book This Trip</BaseButton>
          <BaseButton as="a" href="/contact" variant="outline" size="lg">Request a Quote</BaseButton>
        </div>
      </div>
    </div>
  </section>

  <section class="romara-container py-16">
    <div class="grid gap-8 lg:grid-cols-[1.5fr_0.95fr]">
      <div class="space-y-8">
        <div class="overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
          <h2 class="font-heading text-3xl text-romara-green-dark">A beautifully simple day trip</h2>
          <p class="mt-4 max-w-2xl text-romara-ink/75 leading-relaxed">{{ trip?.description }}</p>

          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <div class="rounded-3xl border border-romara-green/10 bg-romara-cream p-6">
              <p class="text-sm uppercase tracking-[0.3em] text-romara-green-dark">Best for</p>
              <p class="mt-3 text-romara-ink/80 text-sm">Travelers who want a full experience without overnight travel.</p>
            </div>
            <div class="rounded-3xl border border-romara-green/10 bg-romara-cream p-6">
              <p class="text-sm uppercase tracking-[0.3em] text-romara-green-dark">What makes it special</p>
              <p class="mt-3 text-romara-ink/80 text-sm">Comfortable pace, handpicked stops and genuine local guidance.</p>
            </div>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <div class="rounded-[2rem] bg-romara-green/5 p-8 border border-romara-green/10 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
            <h3 class="text-romara-green font-semibold text-xl">Included</h3>
            <ul class="mt-4 space-y-3 text-sm text-romara-ink/75 leading-relaxed">
              <li>Expert guide and transport</li>
              <li>Park entry or activity fee</li>
              <li>Refreshments</li>
            </ul>
          </div>
          <div class="rounded-[2rem] bg-white p-8 border border-black/5 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
            <h3 class="text-romara-green font-semibold text-xl">What’s not included</h3>
            <ul class="mt-4 space-y-3 text-sm text-romara-ink/75 leading-relaxed">
              <li>Meals not listed</li>
              <li>Personal souvenirs</li>
              <li>Tips and gratuities</li>
            </ul>
          </div>
        </div>
      </div>

      <aside class="space-y-6">
        <div class="rounded-[2rem] bg-white p-8 border border-black/5 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
          <p class="text-sm uppercase tracking-[0.3em] text-romara-ink/70">Quick details</p>
          <dl class="mt-6 grid gap-4">
            <div>
              <dt class="text-sm text-romara-ink/70">Duration</dt>
              <dd class="mt-2 text-lg font-semibold text-romara-ink">{{ trip?.duration }}</dd>
            </div>
            <div>
              <dt class="text-sm text-romara-ink/70">Location</dt>
              <dd class="mt-2 text-lg font-semibold text-romara-ink">{{ trip?.location }}</dd>
            </div>
            <div>
              <dt class="text-sm text-romara-ink/70">Price</dt>
              <dd class="mt-2 text-lg font-semibold text-romara-ink">KES {{ trip ? formatPrice(trip.priceFromKES) : '' }}</dd>
            </div>
            <div>
              <dt class="text-sm text-romara-ink/70">Category</dt>
              <dd class="mt-2 text-lg font-semibold text-romara-ink capitalize">{{ trip?.category }}</dd>
            </div>
          </dl>
        </div>

        <div class="rounded-[2rem] bg-romara-cream p-8 border border-romara-green/10 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
          <h3 class="font-semibold text-romara-green text-xl">Ready to book?</h3>
          <p class="mt-3 text-romara-ink/75 text-sm leading-relaxed">Get in touch and we’ll help you lock in the perfect date for your trip.</p>
          <div class="mt-6 flex flex-col gap-3">
            <BaseButton as="a" href="/contact" variant="primary" size="md">Contact us</BaseButton>
            <BaseButton as="a" href="/booking" variant="outline" size="md">Start booking</BaseButton>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <div v-if="isLoading" class="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xl">Loading trip details...</div>
  <div v-if="notFound && !isLoading" class="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-center px-6">
    <div>
      <p class="text-2xl font-bold">Trip not found</p>
      <p class="mt-3 text-white/70">The day trip you are looking for doesn’t exist or may have been removed.</p>
      <button @click="goBack" class="mt-6 inline-flex items-center gap-2 bg-romara-green text-white px-5 py-3 rounded-lg font-semibold">
        <IconChevronRight class="w-4 h-4 rotate-180" />
        Back to Day Trips
      </button>
    </div>
  </div>
</template>
