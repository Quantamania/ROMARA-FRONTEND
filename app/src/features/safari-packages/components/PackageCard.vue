<script setup lang="ts">
import IconClock from '@/components/icons/IconClock.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import type { SafariPackage } from '@/types/package.types'

interface Props {
  package: SafariPackage
}

const props = defineProps<Props>()

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-KE').format(amount)
}
</script>

<template>
  <article class="relative bg-white shadow-card rounded-lg overflow-hidden card-hover">
    <span
      v-if="props.package.badge"
      class="top-3 left-3 z-10 absolute bg-romara-amber px-2.5 py-1 rounded font-bold text-[10px] text-white uppercase tracking-wide"
    >
      {{ props.package.badge }}
    </span>

    <img :src="props.package.image" :alt="props.package.name" class="w-full h-44 object-cover" loading="lazy" />

    <div class="p-4">
      <h3 class="font-heading font-bold text-romara-green text-base">{{ props.package.name }}</h3>

      <div class="flex items-center gap-4 mt-2 text-romara-ink/60 text-xs">
        <span class="flex items-center gap-1">
          <IconClock class="w-3.5 h-3.5" />
          {{ props.package.durationDays }} Days
        </span>
        <span class="flex items-center gap-1">
          <IconMapPin class="w-3.5 h-3.5" />
          {{ props.package.location }}
        </span>
      </div>

      <p class="mt-2 text-romara-ink/70 text-sm">{{ props.package.description }}</p>

      <p class="mt-3 text-romara-ink/60 text-sm">
        From <span class="font-bold text-romara-amber text-base">KES {{ formatPrice(props.package.priceFromKES) }}</span>
      </p>

      <a
        :href="`/safari-packages/${props.package.slug}`"
        class="flex justify-center items-center gap-1 bg-romara-green hover:bg-romara-green/90 mt-4 py-2.5 rounded-md w-full font-semibold text-white text-xs uppercase tracking-wide"
      >
        View Package
        <IconChevronRight class="w-3.5 h-3.5" />
      </a>
    </div>
  </article>
</template>