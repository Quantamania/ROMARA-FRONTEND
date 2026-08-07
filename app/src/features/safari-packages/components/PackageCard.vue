<script setup lang="ts">
import IconClock from '@/components/icons/IconClock.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
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
  <!-- Full-bleed editorial card: photo fills the frame, content sits over a scrim. -->
  <article
    class="group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-card shadow-card ring-1 ring-romara-green/10 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated even:rounded-card-alt"
  >
    <img
      :src="props.package.image"
      :alt="props.package.name"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-105"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/92 via-romara-green-dark/25 to-transparent" aria-hidden="true" />

    <span
      v-if="props.package.badge"
      class="absolute left-4 top-4 inline-flex items-center rounded-full bg-romara-amber px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-soft"
    >
      {{ props.package.badge }}
    </span>

    <div class="relative p-5 text-white">
      <div class="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/85">
        <span class="inline-flex items-center gap-1.5"><IconClock class="h-3.5 w-3.5 text-romara-amber-300" />{{ props.package.durationDays }} Days</span>
        <span class="h-3 w-px bg-white/30" aria-hidden="true" />
        <span class="inline-flex items-center gap-1.5"><IconMapPin class="h-3.5 w-3.5 text-romara-amber-300" />{{ props.package.location }}</span>
      </div>

      <h3 class="mt-2 font-heading text-xl font-semibold leading-tight text-white">{{ props.package.name }}</h3>
      <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">{{ props.package.description }}</p>

      <div class="mt-4 flex items-center justify-between gap-3 border-t border-white/15 pt-4">
        <p class="leading-none">
          <span class="text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">From</span>
          <span class="mt-1 block font-heading text-xl font-semibold text-romara-amber-300">KES {{ formatPrice(props.package.priceFromKES) }}</span>
        </p>
        <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/25 transition-all duration-300 ease-out-expo group-hover:bg-romara-amber group-hover:ring-romara-amber">
          <IconArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>

    <a
      :href="`/safari-packages/${props.package.slug}`"
      class="absolute inset-0 z-10"
      :aria-label="`View ${props.package.name}`"
    />
  </article>
</template>
