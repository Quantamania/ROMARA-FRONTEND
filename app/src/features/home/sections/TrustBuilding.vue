<script setup lang="ts">
import IconBinoculars from '@/components/icons/IconBinoculars.vue'
import IconSuitcase from '@/components/icons/IconSuitcase.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'

interface Feature {
  icon: typeof IconBinoculars
  title: string
  description: string
}

interface Props {
  /** true (default) = pulled up to overlap the hero's bottom edge (Home, Safari Packages).
   *  false = sits below the hero with normal spacing, no overlap (Day Trips). */
  overlap?: boolean
}

withDefaults(defineProps<Props>(), {
  overlap: true,
})

const features: Feature[] = [
  { icon: IconBinoculars, title: 'Professional Guides', description: 'Experienced, passionate guides for the best experience' },
  { icon: IconSuitcase, title: 'Custom Safari Packages', description: 'Tailored itineraries built around you' },
  { icon: IconCar, title: 'Reliable 4x4 Fleet', description: 'Well-maintained, comfortable safari vehicles' },
  { icon: IconMapPin, title: 'Local Experts', description: 'Deep local knowledge of Kenya and beyond' },
  { icon: IconHeadset, title: '24/7 Support', description: 'We are here for you anytime, anywhere' },
]
</script>

<template>
  <section
    class="romara-container relative z-10"
    :class="overlap ? '-mt-14 sm:-mt-16' : 'mt-10 sm:mt-12'"
  >
    <div class="grid grid-cols-1 gap-px overflow-hidden rounded-card bg-romara-green/10 shadow-overlap sm:grid-cols-2 lg:grid-cols-5">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="group flex items-start gap-3.5 bg-white p-6 transition-colors duration-300 hover:bg-romara-cream/60"
      >
        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-romara-amber/10 text-romara-amber transition-colors duration-300 group-hover:bg-romara-amber group-hover:text-white">
          <component :is="feature.icon" class="h-5 w-5" />
        </span>
        <div>
          <p class="text-sm font-bold text-romara-green">{{ feature.title }}</p>
          <p class="mt-1 text-xs leading-relaxed text-romara-ink/60">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>