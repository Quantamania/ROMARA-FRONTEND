<script setup lang="ts">
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconClock from '@/components/icons/IconClock.vue'
import type { Destination, DestinationType } from '@/features/destinations/types/destination.types'

interface Props {
  destination: Destination
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
})

const emit = defineEmits<{ select: [Destination] }>()

const typeLabels: Record<DestinationType, string> = {
  wildlife: 'Wildlife',
  mountains: 'Mountains',
  beaches: 'Beaches',
  cities: 'City',
  culture: 'Culture',
  nature: 'Nature',
}
</script>

<template>
  <!-- Cinematic, full-bleed editorial card: image fills the frame, content sits over a scrim.
       Clicking opens the destination detail as a pop-out modal (no page navigation). -->
  <button
    type="button"
    class="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-card text-left shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber focus-visible:ring-offset-2 focus-visible:ring-offset-romara-bone"
    :class="props.featured ? 'min-h-[440px] lg:min-h-[540px]' : 'min-h-[340px]'"
    :aria-label="`View ${props.destination.name} details`"
    @click="emit('select', props.destination)"
  >
    <img
      :src="props.destination.image"
      :alt="props.destination.name"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
    />

    <!-- Subtle top scrim so the kicker chips stay legible -->
    <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" aria-hidden="true" />

    <!-- Top row: type kicker + optional featured flag -->
    <div class="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4" :class="props.featured ? 'sm:p-6' : ''">
      <span
        v-if="props.destination.types.length"
        class="glass inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
      >
        {{ typeLabels[props.destination.types[0]] }}
      </span>
      <span
        v-if="props.featured"
        class="inline-flex items-center rounded-full bg-romara-amber px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-soft"
      >
        Featured
      </span>
    </div>

    <!-- Content -->
    <div class="relative p-5 text-white" :class="props.featured ? 'sm:p-7' : ''">
      <p class="flex items-center gap-1.5 text-white/80" :class="props.featured ? 'text-sm' : 'text-xs'">
        <IconMapPin :class="props.featured ? 'h-4 w-4' : 'h-3.5 w-3.5'" />
        {{ props.destination.county }}
      </p>

      <h3
        class="mt-1.5 font-heading font-semibold leading-tight text-balance"
        :class="props.featured ? 'text-3xl sm:text-4xl' : 'text-xl'"
      >
        {{ props.destination.name }}
      </h3>

      <p
        class="mt-2 leading-relaxed text-white/75"
        :class="props.featured ? 'max-w-xl text-base line-clamp-3' : 'text-sm line-clamp-2'"
      >
        {{ props.destination.description }}
      </p>

      <!-- Editorial meta chips drawn from destination data -->
      <div class="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-white/85">
        <span class="glass inline-flex items-center gap-1.5 rounded-full px-2.5 py-1">
          <IconCalendar class="h-3.5 w-3.5" />
          {{ props.destination.bestTimeToVisit }}
        </span>
        <span class="glass inline-flex items-center gap-1.5 rounded-full px-2.5 py-1">
          <IconClock class="h-3.5 w-3.5" />
          {{ props.destination.durationSuggestion }}
        </span>
      </div>

      <span
        class="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-romara-amber-300 transition-colors group-hover:text-romara-amber"
      >
        View details
        <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
      </span>
    </div>
  </button>
</template>
