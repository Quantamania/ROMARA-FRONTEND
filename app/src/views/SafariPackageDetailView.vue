<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import logoSrc from '@/assets/images/logos/logo-transparent.png'
import packagesData from '@/data/packages.json'
import type { SafariPackage } from '@/types/package.types'

const route = useRoute()
const router = useRouter()

const packages = packagesData as SafariPackage[]

const slugParam = computed(() => route.params.slug as string)

const currentPackage = computed(() => {
  return packages.find(pkg => pkg.slug === slugParam.value)
})

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-KE').format(amount)
}

function goBack() {
  router.push('/safari-packages')
}

const itinerary = [
  { day: 1, title: 'Arrival & Welcome', description: 'Pick up from airport and transfer to your lodge. Evening game drive to spot your first wildlife.' },
  { day: 2, title: 'Full Day Safari', description: 'Early morning game drive followed by breakfast. Afternoon game drive with picnic lunch in the park.' },
  { day: 3, title: 'Cultural Experience', description: 'Visit local Maasai village to learn about their culture. Final game drive before departure.' },
]

const included = [
  'Accommodation in luxury lodges',
  'All meals as per itinerary',
  'Professional safari guide',
  'Transport in 4x4 safari vehicle',
  'Park entrance fees',
  'Game drives as specified',
  'Airport transfers',
]

</script>

<template>
  <div v-if="currentPackage" class="bg-romara-green-dark text-white overflow-x-hidden">
    <!-- Hero Section -->
    <section class="relative isolate overflow-hidden bg-romara-green text-white min-h-[760px]">
      <img
        :src="currentPackage.image"
        :alt="currentPackage.name"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-romara-green-dark/60" />
      <div class="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-romara-green-dark/95 via-romara-green-dark/70 to-transparent" />

      <div class="relative romara-container flex min-h-[760px] flex-col justify-between py-8">
        <div>
          <button
            @click="goBack"
            class="inline-flex items-center gap-2 text-sm font-semibold text-romara-amber/90 transition hover:text-romara-amber"
          >
            <IconArrowLeft class="w-4 h-4" />
            Back to Safari Packages
          </button>
        </div>

        <div class="max-w-3xl mt-16">
          <span
            v-if="currentPackage.badge"
            class="mt-8 inline-flex items-center rounded-full bg-romara-amber/95 px-4 py-2 text-sm font-bold uppercase tracking-[0.28em] text-white"
          >
            {{ currentPackage.badge }}
          </span>

          <h1 class="mt-6 text-4xl font-heading font-bold leading-tight sm:text-5xl lg:text-6xl">
            {{ currentPackage.name }}
          </h1>

          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-romara-amber sm:text-xl">
            {{ currentPackage.description }}
          </p>

          <div class="mt-10 flex flex-wrap gap-4">
            <BaseButton as="a" href="/booking" variant="primary" size="lg">Book a Safari</BaseButton>
            <BaseButton as="a" href="/contact" variant="outline" size="lg">Request a Quote</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Package Details -->
    <main class="romara-container py-16 lg:py-24 overflow-x-hidden">
      <div class="grid gap-10 lg:grid-cols-[1.7fr_0.9fr]">
        <div class="space-y-10">
          <div class="bg-transparent p-0">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.3em] text-romara-amber/80">Package Overview</p>
                <h2 class="mt-3 text-3xl font-heading font-bold text-white">{{ currentPackage.name }}</h2>
              </div>
              <div class="bg-romara-green/20 px-5 py-3 text-sm font-semibold text-white">
                Starts at KES {{ formatPrice(currentPackage.priceFromKES) }} / person
              </div>
            </div>

            <p class="mt-6 text-white/80 leading-relaxed">
              {{ currentPackage.description }} This carefully crafted safari experience offers you the perfect blend of adventure, comfort, and unforgettable wildlife encounters. Our expert guides will ensure you get the most out of your journey through Kenya's most spectacular landscapes.
            </p>

            <div class="mt-10 grid gap-4 sm:grid-cols-2">
              <div class="border border-romara-green/10 bg-romara-green/10 p-6">
                <p class="text-sm uppercase tracking-[0.25em] text-romara-amber/80">Duration</p>
                <p class="mt-3 text-2xl font-semibold text-white">{{ currentPackage.durationDays }} Days</p>
              </div>
              <div class="border border-romara-green/10 bg-romara-green/10 p-6">
                <p class="text-sm uppercase tracking-[0.25em] text-romara-amber/80">Location</p>
                <p class="mt-3 text-2xl font-semibold text-white">{{ currentPackage.location }}</p>
              </div>
            </div>
          </div>

          <section class="grid gap-8">
            <div class="bg-transparent p-0">
              <div class="mt-8 h-px bg-gradient-to-r from-romara-amber/40 via-romara-amber/20 to-transparent"></div>
              <div class="flex items-center justify-between gap-6 mt-8">
                <p class="text-xs uppercase tracking-[0.3em] text-romara-amber/80">Daily Itinerary</p>
                <h3 class="mt-3 text-2xl font-bold text-white">What to expect each day</h3>
              </div>
            </div>

              <div class="mt-8 space-y-6">
                <div
                  v-for="(day) in itinerary"
                  :key="day.day"
                  class="pb-6 last:pb-0"
                >
                  <div class="flex items-center gap-4">
                    <div class="flex h-14 w-14 items-center justify-center bg-romara-green text-xl font-bold text-white">
                      {{ day.day }}
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-white">{{ day.title }}</h4>
                    </div>
                  </div>
                  <p class="mt-4 text-white/80 leading-relaxed">{{ day.description }}</p>
                </div>
              </div>

            <div class="bg-transparent p-0">
              <p class="text-xs uppercase tracking-[0.3em] text-romara-amber/80">What's Included</p>
              <h3 class="mt-3 text-2xl font-bold text-white">Everything covered</h3>
              <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="(item, index) in included"
                  :key="index"
                  class="flex items-center gap-3 p-3 text-white/80"
                >
                  <IconCheck class="w-5 h-5 text-romara-amber" />
                  <span class="text-white/80">{{ item }}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside class="order-first space-y-6 lg:order-none lg:sticky lg:top-24 self-start">
          <div class="relative border border-romara-amber/15 bg-romara-green/10 p-8 shadow-[0_0_0_4px_rgba(249,215,77,0.05)] transition-all duration-300 hover:border-romara-amber/30">
            <div class="pointer-events-none absolute inset-0 rounded-2xl border border-romara-amber/10 opacity-40"></div>
            <div class="relative">
              <p class="text-xs uppercase tracking-[0.3em] text-romara-amber/80">Price From</p>
              <p class="mt-3 text-3xl font-semibold text-romara-amber">KES {{ formatPrice(currentPackage.priceFromKES) }}</p>
              <p class="mt-2 text-sm text-white/70">Per person • {{ currentPackage.durationDays }} Days</p>
            </div>
            <button
              @click="router.push('/booking')"
              class="mt-8 w-full rounded-lg bg-romara-amber px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-romara-amber/90"
            >
              Book Now
            </button>
          </div>

          <div class="relative border border-romara-amber/15 bg-romara-green/10 p-8 shadow-[0_0_0_4px_rgba(249,215,77,0.05)] transition-all duration-300">
            <div class="pointer-events-none absolute inset-0 rounded-2xl border border-romara-amber/10 opacity-40"></div>
            <div class="relative">
              <p class="text-xs uppercase tracking-[0.3em] text-romara-amber/80">Book This Safari</p>
              <div class="mt-5 space-y-4">
                <div class="bg-white/10 p-4">
                  <p class="text-sm text-white/70">Duration</p>
                  <p class="mt-2 text-lg font-semibold text-white">{{ currentPackage.durationDays }} Days</p>
                </div>
                <div class="bg-white/10 p-4">
                  <p class="text-sm text-white/70">Location</p>
                  <p class="mt-2 text-lg font-semibold text-white">{{ currentPackage.location }}</p>
                </div>
              </div>
              <button
                @click="router.push('/contact')"
                class="mt-6 w-full rounded-lg bg-romara-green px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-romara-green/90"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div class="border border-romara-green/15 bg-romara-green/10 p-8 shadow-2xl">
            <div class="flex items-start gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-romara-amber text-white">
                <img :src="logoSrc" alt="Romara Logo" class="h-8 w-8 object-contain" />
              </div>
              <div>
                <p class="text-sm font-semibold text-white">ROMARA Team Travel Experts</p>
                <p class="mt-2 text-white/75">Our travel experts are ready to help you customize this safari to your preferences.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>

  <!-- Not Found -->
  <div v-else class="flex flex-col justify-center items-center py-16 min-h-screen text-center romara-container">
    <h1 class="font-bold text-romara-green text-4xl">Package Not Found</h1>
    <p class="mt-3 text-romara-ink/60">The safari package you're looking for doesn't exist.</p>
    <button
      @click="goBack"
      class="bg-romara-green hover:bg-romara-green/90 mt-6 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
    >
      Back to Safari Packages
    </button>
  </div>
</template>
