<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import PackageCard from '@/features/safari-packages/components/PackageCard.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconX from '@/components/icons/IconX.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
const logoSrc = '/images/logos/logo-transparent.webp'
import packagesData from '@/data/packages.json'
import { getAllPackages } from '@/features/safari-packages/api/packages.api'
import type { SafariPackage } from '@/types/package.types'

const route = useRoute()
const router = useRouter()

const packages = ref<SafariPackage[]>(packagesData as SafariPackage[])
onMounted(async () => { packages.value = await getAllPackages() })

const slugParam = computed(() => route.params.slug as string)

// Carry the chosen safari into the wizard so step 1 arrives already filled in.
const bookingHref = computed(() => `/booking?package=${encodeURIComponent(slugParam.value)}`)
function goToBooking() {
  router.push({ path: '/booking', query: { package: slugParam.value } })
}

const currentPackage = computed(() => {
  return packages.value.find(pkg => pkg.slug === slugParam.value)
})

const relatedPackages = computed(() => {
  const current = currentPackage.value
  if (!current) return []
  const others = packages.value.filter(pkg => pkg.slug !== current.slug)
  const sameLocation = others.filter(pkg => pkg.location === current.location)
  const rest = others.filter(pkg => pkg.location !== current.location)
  return [...sameLocation, ...rest].slice(0, 3)
})

// Inspirational gallery assembled from existing imagery (this package + related).
const galleryImages = computed(() => {
  const current = currentPackage.value
  if (!current) return []
  const images = [current.image, ...relatedPackages.value.map(pkg => pkg.image)]
  return Array.from(new Set(images)).slice(0, 5)
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
  'International & domestic flights',
  'Kenya entry visa fees',
  'Travel & medical insurance',
  'Personal expenses & tips',
  'Drinks not stated in the itinerary',
]
</script>

<template>
  <div v-if="currentPackage" class="bg-romara-bone pb-24 lg:pb-0">
    <!-- Hero Section -->
    <section class="relative isolate overflow-hidden bg-romara-green text-white">
      <img
        :src="currentPackage.image"
        :alt="currentPackage.name"
        class="ken-burns absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-scrim-b" />
      <div class="absolute inset-0 bg-gradient-to-r from-romara-green-dark/80 via-romara-green-dark/35 to-transparent" />

      <div class="romara-container relative flex min-h-[420px] flex-col justify-between py-8 sm:min-h-[560px] sm:py-10 lg:min-h-[680px]">
        <nav class="flex flex-wrap items-center gap-2 text-xs font-medium text-white/60" aria-label="Breadcrumb">
          <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
          <span class="text-white/30">/</span>
          <a href="/safari-packages" class="transition-colors hover:text-romara-amber">Safari Packages</a>
          <span class="text-white/30">/</span>
          <span class="text-white/85">{{ currentPackage.name }}</span>
        </nav>

        <div class="max-w-3xl">
          <button
            type="button"
            @click="goBack"
            class="inline-flex items-center gap-2 py-1 text-xs font-bold uppercase tracking-[0.14em] text-romara-amber-300 transition-colors hover:text-romara-amber"
          >
            <IconArrowLeft class="h-4 w-4" />
            Back to Safari Packages
          </button>

          <span
            v-if="currentPackage.badge"
            class="mt-6 inline-flex items-center rounded-full bg-romara-amber px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-soft"
          >
            {{ currentPackage.badge }}
          </span>

          <h1 class="mt-5 font-heading text-display font-semibold leading-tight text-balance">
            {{ currentPackage.name }}
          </h1>

          <p class="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {{ currentPackage.description }}
          </p>

          <div class="mt-9 flex flex-wrap gap-3.5">
            <BaseButton as="a" :href="bookingHref" variant="amber" size="lg">Book this Safari</BaseButton>
            <BaseButton as="a" href="/contact" variant="ghost" size="lg">Request a Quote</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Package Details -->
    <main class="romara-container py-14 sm:py-16 lg:py-24">
      <div class="grid gap-10 lg:grid-cols-[1.7fr_0.9fr] lg:gap-14">
        <div class="space-y-16">
          <!-- Overview -->
          <section>
            <p class="eyebrow mb-3">Package Overview</p>
            <h2 class="font-heading text-display-sm font-semibold text-romara-green">{{ currentPackage.name }}</h2>
            <span class="accent-rule mt-4" />

            <p class="mt-6 text-base leading-relaxed text-romara-ink-soft">
              {{ currentPackage.description }} This carefully crafted safari experience offers you the perfect blend of adventure, comfort, and unforgettable wildlife encounters. Our expert guides will ensure you get the most out of your journey through Kenya's most spectacular landscapes.
            </p>

            <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div class="rounded-card border border-romara-green/10 bg-white p-6 shadow-soft">
                <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-amber">Duration</p>
                <p class="mt-3 font-heading text-2xl font-semibold text-romara-green">{{ currentPackage.durationDays }} Days</p>
              </div>
              <div class="rounded-card border border-romara-green/10 bg-white p-6 shadow-soft">
                <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-amber">Location</p>
                <p class="mt-3 font-heading text-2xl font-semibold text-romara-green">{{ currentPackage.location }}</p>
              </div>
              <div class="rounded-card border border-romara-green/10 bg-white p-6 shadow-soft">
                <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-amber">From</p>
                <p class="mt-3 font-heading text-2xl font-semibold text-romara-green">KES {{ formatPrice(currentPackage.priceFromKES) }}</p>
              </div>
            </div>
          </section>

          <!-- Itinerary — numbered vertical timeline -->
          <section>
            <p class="eyebrow mb-3">Daily Itinerary</p>
            <h3 class="font-heading text-display-sm font-semibold text-romara-green">What to expect each day</h3>
            <span class="accent-rule mt-4" />

            <ol class="relative mt-8 space-y-8">
              <!-- Connecting rail -->
              <span
                class="absolute left-5 top-3 bottom-3 w-px bg-romara-green/15"
                aria-hidden="true"
              />
              <li
                v-for="day in itinerary"
                :key="day.day"
                class="relative flex gap-5 sm:gap-6"
              >
                <span class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-fade font-heading text-base font-semibold text-white shadow-soft ring-4 ring-romara-bone">
                  {{ day.day }}
                </span>
                <div class="flex-1 rounded-card border border-romara-green/10 bg-white p-5 shadow-soft sm:p-6">
                  <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-amber">Day {{ day.day }}</p>
                  <h4 class="mt-1 font-heading text-lg font-semibold text-romara-green">{{ day.title }}</h4>
                  <p class="mt-2 text-sm leading-relaxed text-romara-ink-soft">{{ day.description }}</p>
                </div>
              </li>
            </ol>
          </section>

          <!-- Inclusions / Exclusions -->
          <section>
            <p class="eyebrow mb-3">The Fine Print</p>
            <h3 class="font-heading text-display-sm font-semibold text-romara-green">What's included &amp; what's not</h3>
            <span class="accent-rule mt-4" />

            <div class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div class="rounded-card border border-romara-green/10 bg-white p-6 shadow-soft">
                <p class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-romara-green">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-romara-amber/10 text-romara-amber">
                    <IconCheck class="h-3.5 w-3.5" />
                  </span>
                  Included
                </p>
                <ul class="mt-5 space-y-3">
                  <li
                    v-for="(item, index) in included"
                    :key="index"
                    class="flex items-start gap-3 text-sm text-romara-ink"
                  >
                    <IconCheck class="mt-0.5 h-4 w-4 shrink-0 text-romara-amber" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <div class="rounded-card border border-romara-green/10 bg-romara-bone p-6 shadow-soft">
                <p class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-romara-ink/60">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-romara-ink/5 text-romara-ink/50">
                    <IconX class="h-3.5 w-3.5" />
                  </span>
                  Not included
                </p>
                <ul class="mt-5 space-y-3">
                  <li
                    v-for="(item, index) in excluded"
                    :key="index"
                    class="flex items-start gap-3 text-sm text-romara-ink-soft"
                  >
                    <IconX class="mt-0.5 h-4 w-4 shrink-0 text-romara-ink/40" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Gallery -->
          <section v-if="galleryImages.length">
            <p class="eyebrow mb-3">A Glimpse Ahead</p>
            <h3 class="font-heading text-display-sm font-semibold text-romara-green">Safari gallery</h3>
            <span class="accent-rule mt-4" />

            <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              <div
                v-for="(img, index) in galleryImages"
                :key="index"
                class="group relative overflow-hidden rounded-card shadow-soft"
                :class="index === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'"
              >
                <img
                  :src="img"
                  :alt="`${currentPackage.name} gallery image ${index + 1}`"
                  loading="lazy"
                  class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-romara-green-dark/0 transition-colors duration-500 group-hover:bg-romara-green-dark/15" />
              </div>
            </div>
          </section>
        </div>

        <!-- Sticky booking sidebar (desktop) -->
        <aside class="order-first space-y-5 lg:order-none lg:sticky lg:top-24 lg:self-start">
          <div class="overflow-hidden rounded-card bg-green-fade text-white shadow-elevated">
            <div class="p-7">
              <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-romara-amber-300">Price From</p>
              <p class="mt-3 font-heading text-display-sm font-semibold text-romara-amber">
                KES {{ formatPrice(currentPackage.priceFromKES) }}
              </p>
              <p class="mt-1.5 text-sm text-white/70">Per person • {{ currentPackage.durationDays }} Days</p>

              <div class="mt-6 grid grid-cols-2 gap-3">
                <div class="rounded-card border border-white/10 bg-white/5 p-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">Duration</p>
                  <p class="mt-1.5 font-heading text-base font-semibold text-white">{{ currentPackage.durationDays }} Days</p>
                </div>
                <div class="rounded-card border border-white/10 bg-white/5 p-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">Location</p>
                  <p class="mt-1.5 font-heading text-base font-semibold text-white">{{ currentPackage.location }}</p>
                </div>
              </div>

              <div class="mt-6 space-y-3">
                <BaseButton block variant="amber" size="lg" @click="goToBooking()">Book Now</BaseButton>
                <BaseButton block variant="ghost" size="lg" @click="router.push('/contact')">Contact Us</BaseButton>
              </div>
            </div>
          </div>

          <div class="rounded-card border border-romara-green/10 bg-white p-6 shadow-soft">
            <div class="flex items-start gap-4">
              <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-romara-amber">
                <img :src="logoSrc" alt="ROMARA logo" class="h-8 w-8 object-contain" />
              </span>
              <div>
                <p class="font-heading text-sm font-semibold text-romara-green">ROMARA Travel Experts</p>
                <p class="mt-1.5 text-sm leading-relaxed text-romara-ink-soft">
                  Our travel experts are ready to help you customize this safari to your preferences.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- Related packages — horizontal scroller on mobile, grid on desktop -->
    <section v-if="relatedPackages.length" class="border-t border-romara-green/10 bg-white">
      <div class="romara-container section-y">
        <SectionHeading
          eyebrow="Keep Exploring"
          title="More Safari Journeys"
          description="Other curated experiences you may love."
          link-text="View all packages"
          link-href="/safari-packages"
        />
        <div class="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:px-0 sm:pb-0 lg:grid-cols-3">
          <div
            v-for="pkg in relatedPackages"
            :key="pkg.id"
            class="w-[82vw] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none"
          >
            <PackageCard :package="pkg" />
          </div>
        </div>
      </div>
    </section>

    <!-- Sticky bottom booking bar (mobile only) -->
    <div class="fixed inset-x-0 bottom-0 z-40 border-t border-romara-green/10 bg-white/95 backdrop-blur-md shadow-elevated lg:hidden">
      <div class="romara-container flex items-center justify-between gap-4 py-3">
        <div>
          <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-romara-ink/50">From</p>
          <p class="font-heading text-lg font-semibold leading-none text-romara-green">
            KES {{ formatPrice(currentPackage.priceFromKES) }}
          </p>
        </div>
        <BaseButton variant="amber" size="lg" @click="goToBooking()">Book Now</BaseButton>
      </div>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="romara-container flex min-h-screen flex-col items-center justify-center py-16 text-center">
    <p class="eyebrow mb-4">404</p>
    <h1 class="font-heading text-display-sm font-semibold text-romara-green">Package Not Found</h1>
    <p class="mt-3 text-romara-ink-soft">The safari package you're looking for doesn't exist.</p>
    <div class="mt-8">
      <BaseButton variant="primary" size="lg" @click="goBack">Back to Safari Packages</BaseButton>
    </div>
  </div>
</template>
