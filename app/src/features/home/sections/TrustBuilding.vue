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
      <h2 v-scroll-reveal class="text-center font-heading text-lg font-bold text-romara-green sm:text-xl">Why Choose ROMARA?</h2>

      <div class="mt-5 grid grid-cols-4 divide-x divide-romara-green/10">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          v-scroll-reveal="{ delay: 120 + index * 90 }"
          class="group flex flex-col items-center gap-2 px-1.5 text-center sm:px-4"
        >
          <span class="relative inline-flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7">
            <span
              class="pointer-events-none absolute inset-0 scale-75 rounded-full bg-romara-amber/25 opacity-0 blur-md transition-all duration-500 ease-out-expo group-hover:scale-150 group-hover:opacity-100"
              aria-hidden="true"
            />
            <component
              :is="feature.icon"
              class="relative h-6 w-6 text-romara-amber transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:scale-110 sm:h-7 sm:w-7"
            />
          </span>
          <p class="text-[12px] font-bold leading-tight text-romara-green transition-colors duration-300 group-hover:text-romara-amber sm:text-sm">{{ feature.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
