<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import TrustBuilding from '@/features/home/sections/TrustBuilding.vue'
import WhoWeAre from '@/features/about/sections/WhoWeAre.vue'
import CallToActionBar from '@/components/ui/CallToActionBar.vue'
import PackageCard from '@/features/safari-packages/components/PackageCard.vue'
import PackageSearchBar from '@/features/safari-packages/components/PackageSearchBar.vue'
import PackageFilters from '@/features/safari-packages/components/PackageFilters.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import IconCompass from '@/components/icons/IconCompass.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import { usePackagesStore } from '@/features/safari-packages/store/packages.store'

const packagesStore = usePackagesStore()
const { filteredPackages } = storeToRefs(packagesStore)

// Presentational split of the same filtered list into an editorial rhythm:
// one large lead journey, two companion cards, then the remaining grid.
const featuredPackage = computed(() => filteredPackages.value[0])
const sidePackages = computed(() => filteredPackages.value.slice(1, 3))
const gridPackages = computed(() => filteredPackages.value.slice(3))

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-KE').format(amount)
}

interface TailorMadePoint {
  icon: typeof IconCheckSquare
  label: string
}

const tailorMadePoints: TailorMadePoint[] = [
  { icon: IconCheckSquare, label: 'Custom itineraries' },
  { icon: IconCalendarCheck, label: 'Flexible travel dates' },
  { icon: IconCompass, label: 'Unique experiences' },
]
</script>

<template>
  <!-- Hero: editorial split with overlapping collage -->
  <section class="relative isolate overflow-hidden bg-green-fade text-white">
    <!-- soft depth (no dots) -->
    <div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-romara-green-500/25 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -right-16 -bottom-16 h-80 w-80 rounded-full bg-romara-green-700/40 blur-3xl" aria-hidden="true" />

    <div class="romara-container relative grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <!-- Left: editorial column -->
      <div class="max-w-xl">
        <nav aria-label="Breadcrumb" class="mb-7 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
          <a href="/" class="transition-colors duration-300 hover:text-romara-amber-300">Home</a>
          <span class="text-white/25">/</span>
          <span class="text-romara-amber-300">Safari Packages</span>
        </nav>

        <h1 class="font-heading text-display-lg font-semibold leading-[1.02] text-balance">
          Unforgettable Journeys. Extraordinary Memories.
        </h1>


        <div class="mt-9 flex flex-wrap gap-3.5">
          <BaseButton as="a" href="/book-now" variant="amber" size="lg">Book a Safari</BaseButton>
          <BaseButton as="a" href="/contact" variant="ghost" size="lg">Request a Quote</BaseButton>
        </div>
      </div>

      <!-- Right: overlapping framed collage -->
      <div class="relative mx-auto aspect-[4/5] w-full max-w-sm sm:max-w-md lg:mx-0 lg:max-w-none lg:aspect-[5/6]">
        <!-- Main frame -->
        <div class="absolute right-0 top-0 h-[80%] w-[74%] overflow-hidden rounded-card shadow-elevated ring-1 ring-white/20">
          <img
            src="/images/safari-packages/maasai-mara.webp"
            alt="Wildlife on the Maasai Mara plains"
            loading="lazy"
            class="ken-burns h-full w-full object-cover"
          />
        </div>

        <!-- Secondary frame (overlaps, bottom-left) -->
        <div class="absolute bottom-0 left-0 h-[56%] w-[54%] overflow-hidden rounded-card shadow-elevated ring-[5px] ring-romara-green-dark">
          <img
            src="/images/safari-packages/amboseli.webp"
            alt="Elephants beneath Amboseli's skyline"
            loading="lazy"
            class="h-full w-full object-cover"
          />
        </div>

        <!-- Tertiary frame (tidy cluster only on larger screens) -->
        <div class="absolute bottom-[7%] right-[4%] hidden h-[38%] w-[40%] overflow-hidden rounded-card shadow-elevated ring-[5px] ring-romara-green-dark sm:block">
          <img
            src="/images/safari-packages/kenya-explorer.webp"
            alt="Safari explorer route across Kenya"
            loading="lazy"
            class="h-full w-full object-cover"
          />
        </div>

      </div>
    </div>
  </section>

  <TrustBuilding />

  <!-- Sticky filter / search bar (chip strip on mobile, sticky rail on desktop) -->
  <div class="sticky top-16 z-30 border-y border-romara-green/10 bg-romara-bone/90 backdrop-blur-md">
    <div class="romara-container flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <div class="w-full lg:max-w-xs">
        <PackageSearchBar />
      </div>
      <div class="min-w-0 lg:flex lg:items-center lg:gap-4">
        <p class="mb-2 hidden shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-romara-ink/40 lg:mb-0 lg:block">
          {{ filteredPackages.length }}
          {{ filteredPackages.length === 1 ? 'Journey' : 'Journeys' }}
        </p>
        <PackageFilters />
      </div>
    </div>
  </div>

  <!-- Editorial listing -->
  <section class="romara-container section-y">
    <!-- Section intro -->
    <div v-scroll-reveal class="max-w-2xl">
      <p class="eyebrow mb-3">Curated Journeys</p>
      <h2 class="font-heading text-display-sm font-semibold text-romara-green">Our Safari Packages</h2>
      <span class="accent-rule mt-4" />
      <p class="mt-4 text-sm leading-relaxed text-romara-ink-soft">
        {{ filteredPackages.length }}
        {{ filteredPackages.length === 1 ? 'journey' : 'journeys' }} crafted to match every kind of traveller —
        from a first game drive to the great migration.
      </p>
    </div>

    <!-- Empty state -->
    <div
      v-if="filteredPackages.length === 0"
      class="mt-12 rounded-card border border-dashed border-romara-green/20 bg-romara-bone px-6 py-16 text-center"
    >
      <p class="font-heading text-xl font-semibold text-romara-green">No matching journeys</p>
      <p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-romara-ink-soft">
        No packages match your search or filters just yet. Try clearing them to see everything we offer.
      </p>
    </div>

    <template v-else>
      <!-- Lead block: a large image-led journey + two companion cards -->
      <div v-if="featuredPackage" class="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <!-- Featured -->
        <article
          v-scroll-reveal
          class="group relative flex min-h-[440px] overflow-hidden rounded-card shadow-card sm:min-h-[520px] lg:col-span-7 lg:min-h-full"
        >
          <img
            :src="featuredPackage.image"
            :alt="featuredPackage.name"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          <span
            v-if="featuredPackage.badge"
            class="absolute left-5 top-5 inline-flex items-center rounded-full bg-romara-amber px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-soft"
          >
            {{ featuredPackage.badge }}
          </span>

          <div class="relative mt-auto w-full p-6 sm:p-8 lg:p-10">
            <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-romara-amber-300">
              Featured Journey
            </p>
            <h3 class="mt-3 max-w-lg font-heading text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
              {{ featuredPackage.name }}
            </h3>
            <p class="mt-3 hidden max-w-md text-sm leading-relaxed text-white/80 sm:line-clamp-2 sm:block">
              {{ featuredPackage.description }}
            </p>

            <div class="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-white">
              <span class="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
                <IconClock class="h-3.5 w-3.5 text-romara-amber-300" />
                {{ featuredPackage.durationDays }} Days
              </span>
              <span class="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
                <IconMapPin class="h-3.5 w-3.5 text-romara-amber-300" />
                {{ featuredPackage.location }}
              </span>
            </div>

            <div class="mt-6 flex items-end justify-between gap-4 border-t border-white/15 pt-5">
              <div>
                <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">From</p>
                <p class="font-heading text-2xl font-semibold text-romara-amber">
                  KES {{ formatPrice(featuredPackage.priceFromKES) }}
                </p>
              </div>
              <span
                class="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-romara-green transition-colors duration-300 group-hover:bg-romara-amber group-hover:text-white"
              >
                View Journey
                <IconArrowRight class="h-4 w-4" />
              </span>
            </div>
          </div>

          <!-- Stretched link (avoids nested anchors) -->
          <a
            :href="`/safari-packages/${featuredPackage.slug}`"
            class="absolute inset-0 z-10"
            :aria-label="`View ${featuredPackage.name}`"
          />
        </article>

        <!-- Companion cards -->
        <div
          v-if="sidePackages.length"
          class="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1"
        >
          <PackageCard
            v-for="(pkg, index) in sidePackages"
            :key="pkg.id"
            :package="pkg"
            v-scroll-reveal="{ delay: (index + 1) * 90 }"
          />
        </div>
      </div>

      <!-- Remaining journeys -->
      <div
        v-if="gridPackages.length"
        class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3"
      >
        <PackageCard
          v-for="(pkg, index) in gridPackages"
          :key="pkg.id"
          :package="pkg"
          v-scroll-reveal="{ delay: (index % 3) * 90 }"
        />
      </div>
    </template>
  </section>

  <!-- Tailor-Made Safaris -->
  <section v-scroll-reveal class="romara-container pb-16 sm:pb-20">
    <div class="grid grid-cols-1 overflow-hidden rounded-card bg-romara-cream shadow-card lg:grid-cols-2">
      <div class="relative min-h-[240px] overflow-hidden">
        <img
          src="/images/safari-packages/hero-elephants-jeep.webp"
          alt="Safari vehicle on a dirt road at sunset"
          loading="lazy"
          class="h-56 w-full object-cover sm:h-72 lg:absolute lg:inset-0 lg:h-full"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/40 to-transparent lg:bg-gradient-to-r" />
      </div>

      <div class="p-7 sm:p-12">
        <p class="eyebrow mb-3">Built Around You</p>
        <h2 class="font-heading text-display-sm font-semibold text-romara-green">Tailor-Made Safaris</h2>
        <span class="accent-rule mt-4" />

        <p class="mt-5 text-sm leading-relaxed text-romara-ink-soft">
          Have something specific in mind? Our travel experts will create a custom safari that matches your
          interests, budget and schedule.
        </p>

        <ul class="mt-7 flex flex-wrap gap-2.5">
          <li
            v-for="point in tailorMadePoints"
            :key="point.label"
            class="inline-flex items-center gap-2 rounded-full border border-romara-green/10 bg-white px-4 py-2 text-xs font-semibold text-romara-green shadow-soft"
          >
            <component :is="point.icon" class="h-4 w-4 text-romara-amber" />
            {{ point.label }}
          </li>
        </ul>

        <div class="mt-9">
          <BaseButton as="a" href="/contact" variant="amber" size="lg">Plan Your Custom Safari</BaseButton>
        </div>
      </div>
    </div>
  </section>

 <div v-scroll-reveal="{ delay: 75 }">
   <WhoWeAre variant="flat" />
 </div>

 <div v-scroll-reveal="{ delay: 100 }">
   <CallToActionBar
     title="Ready to Start Your Safari Adventure?"
     subtitle="Let ROMARA create memories that last a lifetime."
     image="/images/safari-packages/hero-elephants-jeep.webp"
     theme="green"
   />
 </div>
</template>
