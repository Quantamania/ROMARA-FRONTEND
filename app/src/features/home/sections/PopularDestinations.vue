<script setup lang="ts">
import IconChevronRight from '@/components/icons/IconChevronRight.vue'

const destinations = [
  { name: 'Maasai Mara', image: '/images/destinations/mara.webp' },
  { name: 'Amboseli', image: '/images/destinations/amboseli.webp' },
  { name: 'Lake Nakuru', image: '/images/destinations/lake-nakuru.webp' },
  { name: 'Diani Beach', image: '/images/destinations/diani.webp' },
]
</script>

<template>
  <section class="bg-romara-bone py-0 lg:py-8">
    <div class="romara-container">
      <div class="rounded-card bg-white p-4 shadow-card sm:p-6">
        <div class="flex items-center justify-between gap-3">
          <h2 class="font-heading text-xl font-bold text-romara-green sm:text-2xl">Popular Destinations</h2>
          <a href="/destinations" class="flex shrink-0 items-center gap-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-romara-amber transition-colors hover:text-romara-amber/80 sm:text-xs">
            View All
            <IconChevronRight class="h-4 w-4" />
          </a>
        </div>

        <div class="-mx-1 mt-4 flex gap-3 overflow-x-auto px-1 pb-2 snap-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <a
            v-for="dest in destinations"
            :key="dest.name"
            href="/destinations"
            class="group w-40 shrink-0 snap-start lg:w-auto lg:flex-1"
          >
            <div class="h-28 overflow-hidden rounded-lg border border-romara-green/10">
              <img :src="dest.image" :alt="dest.name" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105" />
            </div>
            <p class="mt-2 text-center font-heading text-sm font-bold text-romara-green">{{ dest.name }}</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
