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
  <article class="bg-white shadow-card rounded-lg overflow-hidden card-hover">
    <img :src="props.trip.image" :alt="props.trip.name" class="w-full h-44 object-cover" loading="lazy" />

    <div class="p-4">
      <h3 class="font-heading font-bold text-romara-green text-base">{{ props.trip.name }}</h3>

      <div class="flex items-center gap-4 mt-2 text-romara-ink/60 text-xs">
        <span class="flex items-center gap-1">
          <IconClock class="w-3.5 h-3.5" />
          {{ props.trip.duration }}
        </span>
        <span class="flex items-center gap-1">
          <IconMapPin class="w-3.5 h-3.5" />
          {{ props.trip.location }}
        </span>
      </div>

      <p class="mt-2 text-romara-ink/70 text-sm">{{ props.trip.description }}</p>

      <p class="mt-3 text-romara-ink/60 text-sm">
        From <span class="font-bold text-romara-amber text-base">KES {{ formatPrice(props.trip.priceFromKES) }}</span>
        <span class="text-xs"> / person</span>
      </p>

      <a
        :href="`/day-trips/${props.trip.slug}`"
        class="flex justify-center items-center gap-1 bg-romara-green hover:bg-romara-green/90 mt-4 py-2.5 rounded-md font-semibold text-white text-xs uppercase tracking-wide"
      >
        View Trip Details
        <IconChevronRight class="w-3.5 h-3.5" />
      </a>
    </div>
  </article>
</template>