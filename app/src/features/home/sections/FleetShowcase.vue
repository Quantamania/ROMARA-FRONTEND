<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
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
</script>

<template>
  <section id="fleet" class="section-y scroll-mt-24 bg-white">
    <div class="romara-container">
      <SectionHeading
        eyebrow="Our Fleet"
        title="ROMARA Vehicle Fleet"
        description="A reliable, well-maintained fleet for every journey — from game drives to executive transfers. Hire with or without a driver."
      />

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
