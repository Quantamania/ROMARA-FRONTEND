<script setup lang="ts">
import IconUserCheck from '@/components/icons/IconUserCheck.vue'
import IconShield from '@/components/icons/IconShield.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import IconMedal from '@/components/icons/IconMedal.vue'

interface Feature {
  icon: typeof IconShield
  title: string
  description: string
}

interface Props {
  /** true (default) = pulled up to straddle the hero's bottom edge. */
  overlap?: boolean
}

withDefaults(defineProps<Props>(), {
  overlap: true,
})

const features: Feature[] = [
  { icon: IconUserCheck, title: 'Local Experts', description: 'We know Kenya' },
  { icon: IconShield, title: 'Safe & Reliable', description: 'Your safety is our priority' },
  { icon: IconHeadset, title: '24/7 Support', description: "We're here anytime" },
  { icon: IconMedal, title: 'Best Value', description: 'Quality service at fair prices' },
]
</script>

<template>
  <section class="romara-container relative z-10" :class="overlap ? '-mt-8 sm:-mt-12' : 'mt-10 sm:mt-12'">
    <div class="rounded-card bg-white px-3 py-7 shadow-overlap sm:px-8 sm:py-9">
      <h2 class="text-center font-heading text-xl font-bold text-romara-green sm:text-2xl">Why Choose ROMARA?</h2>

      <div class="mt-7 grid grid-cols-4 divide-x divide-romara-green/10">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-center gap-2 px-1.5 text-center sm:px-4"
        >
          <component :is="feature.icon" class="h-7 w-7 shrink-0 text-romara-amber sm:h-8 sm:w-8" />
          <p class="text-[12px] font-bold leading-tight text-romara-green sm:text-sm">{{ feature.title }}</p>
          <p class="text-[10px] leading-tight text-romara-ink/60 sm:text-xs">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
