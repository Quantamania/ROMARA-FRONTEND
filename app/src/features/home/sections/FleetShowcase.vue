<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import { fleet } from '@/data/fleet'

function formatRate(amount: number) {
  return new Intl.NumberFormat('en-KE').format(amount)
}

// Show the photo; if it's missing, fall back to the stylised SVG graphic. The
// SPA host rewrites unknown paths to index.html (a 200, not a 404), so also treat
// a zero-width "load" as a miss.
const failedImages = ref(new Set<string>())
function onImgError(key: string) {
  failedImages.value.add(key)
}
function onImgLoad(event: Event, key: string) {
  if ((event.target as HTMLImageElement).naturalWidth === 0) failedImages.value.add(key)
}

// Only these two are bookable for now; the rest show as "coming soon".
const ACTIVE_KEYS = ['cruiser', 'van']
function isActiveKey(key: string) {
  return ACTIVE_KEYS.includes(key)
}
// Every card still links to the hire page; active ones pre-select their vehicle.
function hireHref(key: string) {
  return isActiveKey(key) ? `/vehicle-hire?vehicle=${key}` : '/vehicle-hire'
}

// Compact cards for the mobile horizontal shelf.
const vehicles = [
  { name: 'Safari Land Cruiser', key: 'cruiser', spec: '4x4 • 7 Seats', image: '/images/fleet/cruiser.webp' },
  { name: 'Safari Van', key: 'van', spec: '14 Seats', image: '/images/fleet/van.webp' },
  { name: 'Executive Van', key: 'executive', spec: '7 Seats', image: '/images/fleet/executive.webp' },
  { name: 'Sedan', key: 'saloon', spec: '4 Seats', image: '/images/fleet/saloon.webp' },
]
</script>

<template>
  <!-- ================= MOBILE / TABLET: compact "Our Vehicles" shelf ================= -->
  <section class="bg-romara-bone py-0 lg:hidden">
    <div class="romara-container">
      <div class="rounded-card bg-white p-4 shadow-card sm:p-6">
        <div class="flex items-center justify-between gap-3">
          <h2 class="font-heading text-xl font-bold text-romara-green sm:text-2xl">Our Vehicles</h2>
          <a href="/vehicle-hire" class="flex shrink-0 items-center gap-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-romara-amber transition-colors hover:text-romara-amber/80 sm:text-xs">
            View All Vehicles
            <IconChevronRight class="h-4 w-4" />
          </a>
        </div>

        <div class="-mx-1 mt-4 flex gap-3 overflow-x-auto px-1 pb-2 snap-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <a
            v-for="vehicle in vehicles"
            :key="vehicle.name"
            :href="hireHref(vehicle.key)"
            class="group relative w-40 shrink-0 snap-start overflow-hidden rounded-lg border border-romara-green/10 bg-white transition-all duration-300 ease-out-expo"
            :class="isActiveKey(vehicle.key) ? 'hover:-translate-y-1 hover:shadow-card' : 'opacity-70'"
          >
            <div class="relative h-28 overflow-hidden bg-romara-bone">
              <img
                :src="vehicle.image"
                :alt="vehicle.name"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                :class="{ grayscale: !isActiveKey(vehicle.key) }"
              />
              <span
                v-if="!isActiveKey(vehicle.key)"
                class="absolute left-2 top-2 rounded-full bg-romara-ink/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm"
              >Coming soon</span>
            </div>
            <div class="p-3">
              <p class="font-heading text-sm font-bold leading-tight text-romara-green">{{ vehicle.name }}</p>
              <p class="mt-0.5 text-xs text-romara-ink/55">{{ vehicle.spec }}</p>
              <span
                class="mt-2.5 flex items-center gap-0.5 text-[11px] font-bold uppercase tracking-[0.08em]"
                :class="isActiveKey(vehicle.key) ? 'text-romara-amber' : 'text-romara-ink-soft/60'"
              >
                {{ isActiveKey(vehicle.key) ? 'View Details' : 'Coming Soon' }}
                <IconChevronRight class="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= DESKTOP: full fleet grid (restored original) ================= -->
  <section id="fleet" class="section-y scroll-mt-24 hidden bg-white lg:block">
    <div class="romara-container">
      <SectionHeading eyebrow="Our Fleet" title="ROMARA Vehicle Fleet" />

      <div class="grid grid-cols-2 gap-6 xl:grid-cols-4">
        <a
          v-for="(vehicle, index) in fleet"
          :key="vehicle.name"
          v-scroll-reveal="{ delay: index * 90 }"
          :href="hireHref(vehicle.key)"
          class="group flex flex-col overflow-hidden border border-romara-green/10 bg-white shadow-card transition-all duration-500 ease-out-expo"
          :class="[
            index % 2 === 1 ? 'rounded-card-alt' : 'rounded-card',
            isActiveKey(vehicle.key) ? 'hover:-translate-y-1.5 hover:shadow-elevated' : '',
          ]"
        >
          <!-- Vehicle photo (SVG fallback if the image is missing) -->
          <div class="relative h-48 overflow-hidden bg-romara-bone">
            <img
              v-if="!failedImages.has(vehicle.key)"
              :src="vehicle.image"
              :alt="vehicle.name"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
              :class="{ grayscale: !isActiveKey(vehicle.key) }"
              @error="onImgError(vehicle.key)"
              @load="onImgLoad($event, vehicle.key)"
            />
            <div v-else class="flex h-full items-center justify-center px-6 text-romara-green" :class="{ grayscale: !isActiveKey(vehicle.key) }">
              <div class="w-full max-w-[220px] transition-transform duration-500 ease-out-expo group-hover:scale-105" v-html="vehicle.svg" />
            </div>
            <div class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
            <span
              v-if="isActiveKey(vehicle.key)"
              class="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-romara-green/95 px-3 py-1 text-[11px] font-semibold text-white shadow-soft backdrop-blur-sm"
            >
              <IconUsers class="h-3.5 w-3.5 text-romara-amber-300" />
              {{ vehicle.capacity }}
            </span>
            <span
              v-else
              class="absolute left-3 top-3 inline-flex items-center rounded-full bg-romara-ink/70 px-3 py-1 text-[11px] font-semibold text-white shadow-soft backdrop-blur-sm"
            >
              Coming Soon
            </span>
          </div>

          <!-- Details -->
          <div class="flex flex-1 flex-col p-5" :class="{ 'opacity-70': !isActiveKey(vehicle.key) }">
            <h3 class="font-heading text-lg font-semibold text-romara-green">{{ vehicle.name }}</h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-romara-ink-soft">{{ vehicle.desc }}</p>
            <div class="mt-5 flex items-center justify-between gap-3 border-t border-romara-green/10 pt-4">
              <template v-if="isActiveKey(vehicle.key)">
                <p class="leading-none">
                  <span class="text-[11px] font-medium uppercase tracking-[0.12em] text-romara-ink-soft">From</span>
                  <span class="mt-1 block font-heading text-lg font-semibold text-romara-green">
                    KES {{ formatRate(vehicle.dailyRate) }}<span class="text-xs font-medium text-romara-ink-soft"> / day</span>
                  </span>
                </p>
                <span class="inline-flex items-center gap-1.5 rounded-full bg-romara-green px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors duration-300 group-hover:bg-romara-amber">
                  Hire
                  <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
                </span>
              </template>
              <template v-else>
                <span class="text-sm font-medium text-romara-ink-soft">Not available for hire yet</span>
                <IconArrowRight class="h-4 w-4 shrink-0 text-romara-ink-soft/40" />
              </template>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
