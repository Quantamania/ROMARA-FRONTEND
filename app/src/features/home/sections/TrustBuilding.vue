<script setup lang="ts">
import IconBinoculars from '@/components/icons/IconBinoculars.vue'
import IconShield from '@/components/icons/IconShield.vue'
import IconTag from '@/components/icons/IconTag.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'

interface Feature {
  icon: typeof IconBinoculars
  title: string
  description: string
}

const features: Feature[] = [
  { icon: IconBinoculars, title: 'Expert Local Guides', description: 'Experienced and passionate guides for the best experience' },
  { icon: IconShield, title: 'Safe & Reliable', description: 'Your safety and comfort are our priority' },
  { icon: IconTag, title: 'Best Value', description: 'Quality services at competitive prices' },
  { icon: IconHeadset, title: '24/7 Support', description: 'We are here for you anytime, anywhere' },
  { icon: IconCalendarCheck, title: 'Easy Booking', description: 'Simple, fast and secure bookings' },
]
</script>

<template>
  <section class="romara-container relative z-10 -mt-14 sm:-mt-16">
    <div class="grid grid-cols-1 gap-6 rounded-lg bg-white p-6 shadow-overlap sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
      <div v-for="feature in features" :key="feature.title" class="flex items-start gap-3">
        <component :is="feature.icon" class="h-8 w-8 shrink-0 text-romara-amber" />
        <div>
          <p class="text-sm font-bold text-romara-green">{{ feature.title }}</p>
          <p class="mt-1 text-xs leading-relaxed text-romara-ink/60">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>