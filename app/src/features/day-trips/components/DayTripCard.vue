<script setup lang="ts">
import IconClock from '@/components/icons/IconClock.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
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
  <article
    class="group relative flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated"
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="props.trip.image"
        :alt="props.trip.name"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

      <span
        class="absolute left-3 top-3 inline-flex items-center rounded-full bg-romara-amber px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-soft"
      >
        {{ props.trip.category }}
      </span>

      <!-- Meta chips over image -->
      <div class="absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-white">
        <span class="glass inline-flex items-center gap-1.5 rounded-full px-2.5 py-1">
          <IconClock class="h-3.5 w-3.5" />
          {{ props.trip.duration }}
        </span>
        <span class="glass inline-flex items-center gap-1.5 rounded-full px-2.5 py-1">
          <IconMapPin class="h-3.5 w-3.5" />
          {{ props.trip.location }}
        </span>
      </div>
    </div>

    <!-- Body -->
    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-heading text-lg font-semibold leading-snug text-romara-green">
        {{ props.trip.name }}
      </h3>

      <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-romara-ink/70">
        {{ props.trip.description }}
      </p>

      <div class="mt-4 flex items-end justify-between border-t border-romara-green/10 pt-4">
        <div>
          <p class="text-[11px] font-medium uppercase tracking-[0.12em] text-romara-ink/50">From</p>
          <p class="font-heading text-xl font-semibold text-romara-amber">
            KES {{ formatPrice(props.trip.priceFromKES) }}
            <span class="text-xs font-medium text-romara-ink/50">/ person</span>
          </p>
        </div>

        <a
          :href="`/day-trips/${props.trip.slug}`"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-romara-green text-white transition-all duration-300 ease-out-expo group-hover:bg-romara-amber"
          :aria-label="`View ${props.trip.name}`"
        >
          <IconArrowRight class="h-4 w-4" />
        </a>
      </div>
    </div>
  </article>
</template>
