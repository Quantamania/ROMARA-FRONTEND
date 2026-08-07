<script setup lang="ts">
import IconCompass from '@/components/icons/IconCompass.vue'
import IconMapPinRoute from '@/components/icons/IconMapPinRoute.vue'
import IconHandshake from '@/components/icons/IconHandshake.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

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
  <div class="flex h-full flex-col">
    <p class="eyebrow mb-3">Why ROMARA</p>
    <h2 class="font-heading text-display-sm font-semibold text-romara-green">
      Travel with people who know Kenya
    </h2>
    <span class="accent-rule mt-4" />

    <!-- Editorial feature list: hairline-ruled rows, a growing amber rail on hover -->
    <ul class="mt-8 flex-1 border-t border-romara-green/12">
      <li
        v-for="item in whyChooseItems"
        :key="item.title"
        class="group relative border-b border-romara-green/12"
      >
        <div class="flex items-center gap-4 py-5 pl-0 pr-1 transition-[padding] duration-300 ease-out-expo group-hover:pl-4 sm:gap-5">
          <span
            class="rail absolute left-0 top-1/2 w-[3px] -translate-y-1/2 rounded-full bg-romara-amber transition-all duration-300 ease-out-expo"
            aria-hidden="true"
          />
          <span
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-romara-green/[0.06] text-romara-green transition-colors duration-300 group-hover:bg-romara-green group-hover:text-romara-amber"
          >
            <component :is="item.icon" class="h-5 w-5" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-heading text-lg font-semibold text-romara-green sm:text-xl">{{ item.title }}</p>
            <p class="mt-0.5 text-sm leading-relaxed text-romara-ink/60">{{ item.description }}</p>
          </div>
          <IconArrowRight
            class="h-4 w-4 shrink-0 text-romara-green/25 transition-all duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-romara-amber"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Amber rail grows from the centre on hover — the signature "hang content off a
   line" gesture, without a boxy card. */
.rail {
  height: 0;
}
.group:hover .rail {
  height: 62%;
}
</style>
