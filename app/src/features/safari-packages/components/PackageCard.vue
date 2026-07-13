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
  <article class="relative overflow-hidden rounded-lg bg-white shadow-card">
    <span
      v-if="props.package.badge"
      class="absolute left-3 top-3 z-10 rounded bg-romara-amber px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
    >
      {{ props.package.badge }}
    </span>

    <img :src="props.package.image" :alt="props.package.name" class="h-44 w-full object-cover" loading="lazy" />

    <div class="p-4">
      <h3 class="font-heading text-base font-bold text-romara-green">{{ props.package.name }}</h3>

      <div class="mt-2 flex items-center gap-4 text-xs text-romara-ink/60">
        <span class="flex items-center gap-1">
          <IconClock class="h-3.5 w-3.5" />
          {{ props.package.durationDays }} Days
        </span>
        <span class="flex items-center gap-1">
          <IconMapPin class="h-3.5 w-3.5" />
          {{ props.package.location }}
        </span>
      </div>

      <p class="mt-2 text-sm text-romara-ink/70">{{ props.package.description }}</p>

      <p class="mt-3 text-sm text-romara-ink/60">
        From <span class="text-base font-bold text-romara-amber">KES {{ formatPrice(props.package.priceFromKES) }}</span>
      </p>

      <a
        :href="`/safari-packages/${props.package.slug}`"
        class="mt-4 flex items-center justify-center gap-1 rounded-md bg-romara-green py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-romara-green/90"
      >
        View Package
        <IconChevronRight class="h-3.5 w-3.5" />
      </a>
    </div>
  </article>
</template>