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
  <!-- Full-bleed white panel that curves out of the hero, edge to edge (like the mobile one). -->
  <section
    class="relative z-10 bg-white shadow-[0_-14px_34px_-18px_rgba(0,0,0,0.28)]"
    :class="overlap ? '-mt-8 rounded-t-[2rem] sm:-mt-12 sm:rounded-t-[2.75rem]' : 'mt-10 rounded-t-[2rem] sm:mt-12'"
  >
    <div class="romara-container py-6 sm:py-7">
      <h2 class="text-center font-heading text-lg font-bold text-romara-green sm:text-xl">Why Choose ROMARA?</h2>

      <div class="mt-5 grid grid-cols-4 divide-x divide-romara-green/10">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-center gap-1.5 px-1.5 text-center sm:px-4"
        >
          <component :is="feature.icon" class="h-6 w-6 shrink-0 text-romara-amber sm:h-7 sm:w-7" />
          <p class="text-[12px] font-bold leading-tight text-romara-green sm:text-sm">{{ feature.title }}</p>
          <p class="text-[10px] leading-tight text-romara-ink/60 sm:text-xs">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
