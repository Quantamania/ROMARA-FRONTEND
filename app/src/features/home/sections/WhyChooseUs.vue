<script setup lang="ts">
import IconCompass from '@/components/icons/IconCompass.vue'
import IconMapPinRoute from '@/components/icons/IconMapPinRoute.vue'
import IconHandshake from '@/components/icons/IconHandshake.vue'
import IconUsers from '@/components/icons/IconUsers.vue'

interface WhyChooseItem {
  icon: typeof IconCompass
  title: string
  description: string
}

const whyChooseItems: WhyChooseItem[] = [
  { icon: IconMapPinRoute, title: 'Personalized Itineraries', description: 'Tailored to your needs and budget' },
  { icon: IconCompass, title: 'Wide Range of Destinations', description: 'Discover the best of Kenya & beyond' },
  { icon: IconHandshake, title: 'Trusted Travel Partner', description: 'Years of experience you can rely on' },
  { icon: IconUsers, title: 'Customer Focused', description: 'Your satisfaction is our commitment' },
]
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-romara-green">Why Choose Romara</h2>
    <span class="mt-2 block h-1 w-14 rounded bg-romara-amber" />

    <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2">
      <div v-for="item in whyChooseItems" :key="item.title" class="min-w-0">
        <component :is="item.icon" class="h-8 w-8 text-romara-amber" />
        <p class="mt-3 text-sm font-bold text-romara-green">{{ item.title }}</p>
        <p class="mt-1 text-xs leading-relaxed text-romara-ink/60">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>