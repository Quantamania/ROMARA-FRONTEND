<script setup lang="ts">
import IconChevronRight from '@/components/icons/IconChevronRight.vue'

const vehicles = [
  { name: 'Safari Land Cruiser', spec: '4x4 • 7 Seats', image: '/images/fleet/cruiser.webp', href: '/vehicle-hire?vehicle=cruiser' },
  { name: 'Safari Van', spec: '14 Seats', image: '/images/fleet/van.webp', href: '/vehicle-hire?vehicle=van' },
  { name: 'Executive Van', spec: '7 Seats', image: '/images/fleet/executive.webp', href: '/vehicle-hire?vehicle=executive' },
  { name: 'Sedan', spec: '4 Seats', image: '/images/fleet/saloon.webp', href: '/vehicle-hire?vehicle=saloon' },
]
</script>

<template>
  <section class="bg-romara-bone py-0 lg:py-8">
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

        <div class="-mx-1 mt-4 flex gap-3 overflow-x-auto px-1 pb-2 snap-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <a
            v-for="vehicle in vehicles"
            :key="vehicle.name"
            :href="vehicle.href"
            class="group w-40 shrink-0 snap-start overflow-hidden rounded-lg border border-romara-green/10 bg-white transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card lg:w-auto lg:flex-1"
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
</template>
