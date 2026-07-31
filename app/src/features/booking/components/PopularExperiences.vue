<script setup lang="ts">
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

interface Experience {
  name: string
  description: string
  image: string
  href: string
}

const experiences: Experience[] = [
  {
    name: 'Maasai Mara Safari',
    description: 'Explore the world-famous Maasai Mara.',
    image: '/src/assets/images/booking/maasai-mara-safari.jpg',
    href: '/safari-packages/3-day-maasai-mara-safari',
  },
  {
    name: 'Diani Beach Holiday',
    description: "Relax on Kenya's beautiful white sandy beaches.",
    image: '/src/assets/images/booking/diani-beach-holiday.jpg',
    href: '/destinations/diani-beach',
  },
  {
    name: 'Mount Kenya Hiking',
    description: "Adventure awaits on Africa's second highest peak.",
    image: '/src/assets/images/booking/mount-kenya-hiking.jpg',
    href: '/destinations',
  },
]
</script>

<template>
  <div class="rounded-card bg-white p-6 shadow-card sm:p-7">
    <p class="eyebrow mb-3">
      
      Get Inspired
    </p>
    <h2 class="font-heading text-xl font-semibold text-romara-green">Popular Experiences</h2>
    <span class="accent-rule mt-4" />

    <div class="mt-6 space-y-3">
      <a
        v-for="experience in experiences"
        :key="experience.name"
        :href="experience.href"
        class="group flex gap-4 rounded-card border border-romara-green/10 bg-romara-bone p-3 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-romara-amber/30 hover:shadow-card"
      >
        <div class="relative shrink-0 overflow-hidden rounded-lg">
          <img
            :src="experience.image"
            :alt="experience.name"
            class="h-16 w-20 object-cover transition-transform duration-500 ease-out-expo group-hover:scale-110"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-scrim-b opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div class="flex min-w-0 flex-col justify-center">
          <p class="font-heading text-sm font-semibold text-romara-green transition-colors group-hover:text-romara-amber-600">{{ experience.name }}</p>
          <p class="mt-1 text-xs leading-relaxed text-romara-ink-soft">{{ experience.description }}</p>
        </div>
      </a>
    </div>

    <a
      href="/safari-packages"
      class="group mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-romara-green transition-colors hover:text-romara-amber-600"
    >
      Explore All Packages
      <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
    </a>
  </div>
</template>
