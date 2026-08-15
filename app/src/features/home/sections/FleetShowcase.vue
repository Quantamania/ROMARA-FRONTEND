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

// Compact cards for the mobile horizontal shelf.
const vehicles = [
  { name: 'Safari Land Cruiser', spec: '4x4 • 7 Seats', image: '/images/fleet/cruiser.webp', href: '/vehicle-hire?vehicle=cruiser' },
  { name: 'Safari Van', spec: '14 Seats', image: '/images/fleet/van.webp', href: '/vehicle-hire?vehicle=van' },
  { name: 'Executive Van', spec: '7 Seats', image: '/images/fleet/executive.webp', href: '/vehicle-hire?vehicle=executive' },
  { name: 'Sedan', spec: '4 Seats', image: '/images/fleet/saloon.webp', href: '/vehicle-hire?vehicle=saloon' },
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
        <p class="mt-1 text-xs text-romara-ink/50">Well maintained • Comfortable • Reliable</p>

        <div class="-mx-1 mt-4 flex gap-3 overflow-x-auto px-1 pb-2 snap-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <a
            v-for="vehicle in vehicles"
            :key="vehicle.name"
            :href="vehicle.href"
            class="group w-40 shrink-0 snap-start overflow-hidden rounded-lg border border-romara-green/10 bg-white transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card"
          >
            <div class="h-28 overflow-hidden bg-romara-bone">
              <img :src="vehicle.image" :alt="vehicle.name" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105" />
            </div>
            <div class="p-3">
              <p class="font-heading text-sm font-bold leading-tight text-romara-green">{{ vehicle.name }}</p>
              <p class="mt-0.5 text-xs text-romara-ink/55">{{ vehicle.spec }}</p>
              <span class="mt-2.5 flex items-center gap-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-romara-amber">
                View Details
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

      <div class="grid grid-cols-4 gap-6">
        <article
          v-for="(vehicle, index) in fleet"
          :key="vehicle.name"
          v-scroll-reveal="{ delay: index * 90 }"
          class="group flex flex-col overflow-hidden border border-romara-green/10 bg-white shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated"
          :class="index % 2 === 1 ? 'rounded-card-alt' : 'rounded-card'"
        >
          <!-- Vehicle photo (SVG fallback if the image is missing) -->
          <div class="relative h-48 overflow-hidden bg-romara-bone">
            <img
              v-if="!failedImages.has(vehicle.key)"
              :src="vehicle.image"
              :alt="vehicle.name"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
              @error="onImgError(vehicle.key)"
              @load="onImgLoad($event, vehicle.key)"
            />
            <div v-else class="flex h-full items-center justify-center px-6 text-romara-green">
              <div class="w-full max-w-[220px] transition-transform duration-500 ease-out-expo group-hover:scale-105" v-html="vehicle.svg" />
            </div>
            <div class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
            <span class="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-romara-green/95 px-3 py-1 text-[11px] font-semibold text-white shadow-soft backdrop-blur-sm">
              <IconUsers class="h-3.5 w-3.5 text-romara-amber-300" />
              {{ vehicle.capacity }}
            </span>
          </div>

          <!-- Details -->
          <div class="flex flex-1 flex-col p-5">
            <h3 class="font-heading text-lg font-semibold text-romara-green">{{ vehicle.name }}</h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-romara-ink-soft">{{ vehicle.desc }}</p>
            <div class="mt-5 flex items-center justify-between gap-3 border-t border-romara-green/10 pt-4">
              <p class="leading-none">
                <span class="text-[11px] font-medium uppercase tracking-[0.12em] text-romara-ink-soft">From</span>
                <span class="mt-1 block font-heading text-lg font-semibold text-romara-green">
                  KES {{ formatRate(vehicle.dailyRate) }}<span class="text-xs font-medium text-romara-ink-soft"> / day</span>
                </span>
              </p>
              <a
                :href="`/vehicle-hire?vehicle=${vehicle.key}`"
                class="inline-flex items-center gap-1.5 rounded-full bg-romara-green px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-romara-amber"
              >
                Hire
                <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
