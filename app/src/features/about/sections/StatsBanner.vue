<script setup lang="ts">
import IconUsers from '@/components/icons/IconUsers.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconStar from '@/components/icons/IconStar.vue'

interface Stat {
  icon: typeof IconUsers
  value: string
  label: string
}

const stats: Stat[] = [
  { icon: IconUsers, value: '1000+', label: 'Happy Travellers' },
  { icon: IconMapPin, value: '50+', label: 'Destinations' },
  { icon: IconStar, value: '99%', label: 'Customer Satisfaction' },
]
</script>

<template>
  <section class="romara-container pb-16">
    <div class="grid grid-cols-1 overflow-hidden rounded-lg lg:grid-cols-2">
      <div class="bg-romara-green p-8 text-white sm:p-10">
        <h2 class="font-heading text-2xl font-bold sm:text-3xl">More Than a Tour Company</h2>
        <p class="mt-2 text-sm font-semibold text-romara-amber">We are your travel partner.</p>
        <p class="mt-4 text-sm leading-relaxed text-white/80">
          Whether you are travelling for leisure, business, adventure, or special occasions, ROMARA is dedicated
          to making your journey smooth, memorable, and truly remarkable.
        </p>

        <div class="mt-8 grid grid-cols-3 gap-4">
          <div v-for="stat in stats" :key="stat.label">
            <component :is="stat.icon" class="h-6 w-6 text-romara-amber" />
            <p class="mt-2 text-xl font-bold">{{ stat.value }}</p>
            <p class="text-xs text-white/70">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <img
        src="/src/assets/images/about/cheetah-hot-air-balloon.png"
        alt="Cheetah at sunrise with a hot air balloon in the distance"
        class="h-64 w-full object-cover lg:h-full"
      />
    </div>
  </section>
</template>