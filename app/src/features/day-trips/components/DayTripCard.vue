<script setup lang="ts">
import IconClock from '@/components/icons/IconClock.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import type { DayTrip } from '@/features/day-trips/types/dayTrip.types'

interface Props {
  trip: DayTrip
}

const props = defineProps<Props>()

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-KE').format(amount)
}
</script>

<template>
  <article class="overflow-hidden rounded-lg bg-white shadow-card">
    <img :src="props.trip.image" :alt="props.trip.name" class="h-44 w-full object-cover" loading="lazy" />

    <div class="p-4">
      <h3 class="font-heading text-base font-bold text-romara-green">{{ props.trip.name }}</h3>

      <div class="mt-2 flex items-center gap-4 text-xs text-romara-ink/60">
        <span class="flex items-center gap-1">
          <IconClock class="h-3.5 w-3.5" />
          {{ props.trip.duration }}
        </span>
        <span class="flex items-center gap-1">
          <IconMapPin class="h-3.5 w-3.5" />
          {{ props.trip.location }}
        </span>
      </div>

      <p class="mt-2 text-sm text-romara-ink/70">{{ props.trip.description }}</p>

      <p class="mt-3 text-sm text-romara-ink/60">
        From <span class="text-base font-bold text-romara-amber">KES {{ formatPrice(props.trip.priceFromKES) }}</span>
        <span class="text-xs"> / person</span>
      </p>

      <a
        :href="`/day-trips/${props.trip.slug}`"
        class="mt-4 flex items-center justify-center gap-1 rounded-md bg-romara-green py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-romara-green/90"
      >
        View Trip Details
        <IconChevronRight class="h-3.5 w-3.5" />
      </a>
    </div>
  </article>
</template>