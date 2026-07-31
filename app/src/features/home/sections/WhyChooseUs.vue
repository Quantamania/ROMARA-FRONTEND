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
    <p class="eyebrow mb-3">
      
      Why ROMARA
    </p>
    <h2 class="font-heading text-display-sm font-semibold text-romara-green">
      Travel with people who know Kenya
    </h2>
    <span class="accent-rule mt-4" />

    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div
        v-for="item in whyChooseItems"
        :key="item.title"
        class="group flex items-start gap-4 rounded-2xl border border-romara-green/10 bg-white p-5 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-romara-amber/40 hover:shadow-soft"
      >
        <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-romara-green text-romara-amber transition-colors duration-300 group-hover:bg-romara-amber group-hover:text-white">
          <component :is="item.icon" class="h-6 w-6" />
        </span>
        <div class="min-w-0">
          <p class="text-sm font-bold text-romara-green">{{ item.title }}</p>
          <p class="mt-1 text-xs leading-relaxed text-romara-ink/60">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
