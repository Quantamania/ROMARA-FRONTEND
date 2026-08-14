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
  /** true (default) = pulled up to straddle the hero's bottom edge (Home, Safari Packages).
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
  <section class="romara-container relative z-10" :class="overlap ? '-mt-7 sm:-mt-9 lg:-mt-16' : 'mt-10 sm:mt-12'">
    <!-- MOBILE / TABLET: static cluster of sharp trust chips -->
    <div class="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:hidden">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="flex items-center gap-2 bg-white px-4 py-2.5 shadow-card"
      >
        <component :is="feature.icon" class="h-5 w-5 shrink-0 text-romara-amber" />
        <span class="whitespace-nowrap text-[13px] font-bold text-romara-green sm:text-sm">{{ feature.title }}</span>
      </div>
    </div>

    <!-- WEB: original 5-across grid card -->
    <div class="hidden overflow-hidden rounded-card bg-romara-green/10 shadow-overlap lg:grid lg:grid-cols-5 lg:gap-px">
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
