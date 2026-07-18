<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconClock from '@/components/icons/IconClock.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconX from '@/components/icons/IconX.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
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

const excluded = [
  'International flights',
  'Travel insurance',
  'Personal expenses',
  'Tips and gratuities',
  'Visa fees',
  'Alcoholic beverages',
]
</script>

<template>
  <div v-if="currentPackage">
    <!-- Back Navigation -->
    <div class="bg-white py-4 border-romara-ink/10 border-b">
      <div class="romara-container">
        <button
          @click="goBack"
          class="flex items-center gap-2 font-semibold text-romara-green hover:text-romara-amber text-sm transition-colors"
        >
          <IconArrowLeft class="w-4 h-4" />
          Back to Safari Packages
        </button>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="relative bg-romara-green min-h-[500px] overflow-hidden">
      <div class="absolute inset-0">
        <img
          :src="currentPackage.image"
          :alt="currentPackage.name"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-romara-green/95 via-romara-green/70 to-romara-green/40"></div>
        <div class="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-romara-green-dark to-transparent h-32"></div>
      </div>

      <div class="relative py-20 lg:py-32 romara-container">
        <div class="max-w-3xl">
          <span
            v-if="currentPackage.badge"
            class="inline-block bg-romara-amber mb-6 px-4 py-2 rounded-full font-bold text-white text-sm uppercase tracking-widest"
          >
            {{ currentPackage.badge }}
          </span>

          <h1 class="mb-6 font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {{ currentPackage.name }}
          </h1>

          <p class="mb-8 max-w-2xl text-white/90 text-lg sm:text-xl leading-relaxed">
            {{ currentPackage.description }}
          </p>

          <div class="flex flex-wrap items-center gap-6 text-white/80 text-sm">
            <div class="flex items-center gap-2">
              <IconClock class="w-5 h-5 text-romara-amber" />
              <span class="font-semibold text-romara-amber">{{ currentPackage.durationDays }} Days</span>
            </div>
            <div class="flex items-center gap-2">
              <IconMapPin class="w-5 h-5 text-romara-amber" />
              <span class="font-semibold text-romara-amber">{{ currentPackage.location }}</span>
            </div>
          </div>

          <div class="flex items-center gap-4 mt-8">
            <p class="text-white/70 text-lg">Starting from</p>
            <p class="font-heading font-bold text-romara-amber text-4xl">KES {{ formatPrice(currentPackage.priceFromKES) }}</p>
            <p class="text-white/70 text-sm">per person</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Package Details -->
    <div class="bg-gradient-to-b from-white to-romara-cream/30 py-16 lg:py-20">
      <section class="romara-container">
        <div class="gap-8 grid grid-cols-1 lg:grid-cols-3">
          <!-- Main Content -->
          <div class="space-y-12 lg:col-span-2">
            <!-- Overview -->
            <div>
              <h2 class="mb-4 font-heading font-bold text-romara-green text-3xl">Package Overview</h2>
              <div class="bg-romara-amber mb-6 rounded w-16 h-1"></div>
              <p class="text-romara-ink/80 text-lg leading-relaxed">
                {{ currentPackage.description }} This carefully crafted safari experience offers you the perfect blend of adventure,
                comfort, and unforgettable wildlife encounters. Our expert guides will ensure you get the most out of your journey
                through Kenya's most spectacular landscapes.
              </p>
            </div>

            <!-- Itinerary -->
            <div>
              <h2 class="mb-4 font-heading font-bold text-romara-green text-3xl">Daily Itinerary</h2>
              <div class="bg-romara-amber mb-6 rounded w-16 h-1"></div>
              <div class="space-y-6">
                <div
                  v-for="(day, index) in itinerary"
                  :key="day.day"
                  class="flex gap-6 bg-white shadow-sm hover:shadow-md p-6 border border-romara-green/10 hover:border-romara-green/30 rounded-lg transition-all duration-300"
                >
                  <div class="flex-shrink-0">
                    <div class="flex justify-center items-center bg-romara-green rounded-full w-16 h-16 font-bold text-white text-xl">
                      {{ day.day }}
                    </div>
                  </div>
                  <div>
                    <h3 class="mb-2 font-bold text-romara-green text-xl">{{ day.title }}</h3>
                    <p class="text-romara-ink/70 leading-relaxed">{{ day.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- What's Included -->
            <div>
              <h2 class="mb-4 font-heading font-bold text-romara-green text-3xl">What's Included</h2>
              <div class="bg-romara-amber mb-6 rounded w-16 h-1"></div>
              <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div
                  v-for="(item, index) in included"
                  :key="index"
                  class="flex items-center gap-3 bg-romara-green/5 p-4 border border-romara-green/10 rounded-lg"
                >
                  <IconCheck class="flex-shrink-0 w-5 h-5 text-romara-green" />
                  <span class="text-romara-ink/80">{{ item }}</span>
                </div>
              </div>
            </div>

            <!-- What's Not Included -->
            <div>
              <h2 class="mb-4 font-heading font-bold text-romara-green text-3xl">What's Not Included</h2>
              <div class="bg-romara-amber mb-6 rounded w-16 h-1"></div>
              <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div
                  v-for="(item, index) in excluded"
                  :key="index"
                  class="flex items-center gap-3 bg-romara-cream/50 p-4 border border-romara-ink/10 rounded-lg"
                >
                  <IconX class="flex-shrink-0 w-5 h-5 text-romara-ink/50" />
                  <span class="text-romara-ink/60">{{ item }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="lg:top-24 lg:sticky space-y-6 lg:h-fit">
            <div class="bg-white shadow-lg hover:shadow-xl p-6 border border-romara-green/10 rounded-lg transition-shadow duration-300">
              <h3 class="mb-4 font-bold text-romara-green text-xl">Book This Safari</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center py-3 border-romara-ink/10 border-b">
                  <span class="text-romara-ink/60">Duration</span>
                  <span class="font-semibold text-romara-green">{{ currentPackage.durationDays }} Days</span>
                </div>
                <div class="flex justify-between items-center py-3 border-romara-ink/10 border-b">
                  <span class="text-romara-ink/60">Location</span>
                  <span class="font-semibold text-romara-green">{{ currentPackage.location }}</span>
                </div>
                <div class="flex justify-between items-center py-3 border-romara-ink/10 border-b">
                  <span class="text-romara-ink/60">Price From</span>
                  <span class="font-bold text-romara-amber text-xl">KES {{ formatPrice(currentPackage.priceFromKES) }}</span>
                </div>
              </div>
              <button
                @click="router.push('/booking')"
                class="bg-romara-green hover:bg-romara-green/90 mt-6 px-6 py-3 rounded-lg w-full font-semibold text-white transition-colors"
              >
                Book Now
              </button>
              <button
                @click="router.push('/contact')"
                class="hover:bg-romara-green/10 mt-3 px-6 py-3 border border-romara-green rounded-lg w-full font-semibold text-romara-green transition-colors"
              >
                Contact Us
              </button>
            </div>

            <div class="bg-romara-amber/10 p-6 border border-romara-amber/20 rounded-lg">
              <div class="flex items-start gap-4">
                <div class="flex flex-shrink-0 justify-center items-center bg-romara-amber rounded-full w-12 h-12">
                  <IconUsers class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-bold text-romara-green">Need Help Planning?</h4>
                  <p class="mt-2 text-romara-ink/70 text-sm">
                    Our travel experts are ready to help you customize this safari to your preferences.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
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
