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
  <!-- Full-bleed editorial card: photo fills the frame, content sits over a scrim. -->
  <article
    class="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-card shadow-card ring-1 ring-romara-green/10 even:rounded-card-alt"
  >
    <img
      :src="props.trip.image"
      :alt="props.trip.name"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" aria-hidden="true" />

    <span
      class="absolute left-4 top-4 inline-flex items-center rounded-full bg-romara-amber px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-soft"
    >
      {{ props.trip.category }}
    </span>

    <div class="relative m-3 rounded-lg bg-white/90 p-4 shadow-sm backdrop-blur-md transition-all duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:shadow-lg">
      <div class="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-romara-ink/70">
        <span class="inline-flex items-center gap-1.5"><IconClock class="h-3.5 w-3.5 text-romara-amber" />{{ props.trip.duration }}</span>
        <span class="h-3 w-px bg-romara-green/20" aria-hidden="true" />
        <span class="inline-flex items-center gap-1.5"><IconMapPin class="h-3.5 w-3.5 text-romara-amber" />{{ props.trip.location }}</span>
      </div>

      <h3 class="mt-2 font-heading text-xl font-semibold leading-tight text-romara-green">{{ props.trip.name }}</h3>
      <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-romara-ink/65">{{ props.trip.description }}</p>

      <div class="mt-3 flex items-center justify-between gap-3 border-t border-romara-green/10 pt-3">
        <p class="leading-none">
          <span class="text-[11px] font-medium uppercase tracking-[0.12em] text-romara-ink/55">From</span>
          <span class="mt-1 block font-heading text-xl font-semibold text-romara-amber">
            KES {{ formatPrice(props.trip.priceFromKES) }}<span class="text-xs font-medium text-romara-ink/50"> / person</span>
          </span>
        </p>
        <span class="inline-flex items-center justify-center text-romara-green transition-colors duration-300 group-hover:text-romara-amber">
          <IconArrowRight class="h-5 w-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
        </span>
      </div>
    </div>

    <a
      :href="`/day-trips/${props.trip.slug}`"
      class="absolute inset-0 z-10"
      :aria-label="`View ${props.trip.name}`"
    />
  </article>
</template>
