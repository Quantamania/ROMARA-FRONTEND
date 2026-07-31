<script setup lang="ts">
import IconStar from '@/components/icons/IconStar.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import type { Review } from '@/features/reviews/api/reviews.api'

interface Props {
  review: Review
  /** 'grid' = compact card for grid layouts. 'feed' = larger editorial card for a single-column feed. */
  layout?: 'grid' | 'feed'
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'grid',
})

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function getInitial(name: string) {
  return name.charAt(0).toUpperCase()
}
</script>

<template>
  <!-- Feed layout: larger, horizontal on desktop, decorative quote mark -->
  <article
    v-if="props.layout === 'feed'"
    class="flex sm:flex-row flex-col gap-5 bg-white shadow-card p-6 sm:p-8 rounded-lg card-hover"
  >
    <div class="flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:w-44 shrink-0">
      <span class="flex justify-center items-center bg-romara-cream rounded-full w-14 h-14 font-bold text-romara-green text-lg shrink-0">
        {{ getInitial(props.review.name) }}
      </span>
      <div class="min-w-0">
        <p class="flex items-center gap-1.5 font-bold text-romara-green text-base">
          {{ props.review.name }}
          <span aria-hidden="true">{{ props.review.countryFlag }}</span>
        </p>
        <p class="text-romara-ink/50 text-xs">{{ props.review.experience }}</p>
        <div class="flex gap-0.5 mt-1.5 text-romara-amber">
          <IconStar v-for="n in props.review.rating" :key="n" class="w-4 h-4" />
        </div>
      </div>
    </div>

    <div class="flex-1">
      <p class="text-romara-ink/70 text-base leading-relaxed">
        <span class="mr-1 font-heading text-romara-amber/70 text-3xl leading-none">&ldquo;</span>{{ props.review.text }}
      </p>
      <p class="flex items-center gap-1.5 mt-4 text-romara-ink/40 text-xs">
        <IconCalendar class="w-3.5 h-3.5" />
        {{ formatDate(props.review.date) }}
      </p>
    </div>
  </article>

  <!-- Grid layout: quote-led card for the masonry quote wall. Natural height
       (no h-full) + break-inside-avoid so cards vary and tile cleanly in a
       CSS-columns wall. The quote leads; the guest is the footer. -->
  <article
    v-else
    class="group relative mb-6 flex break-inside-avoid flex-col overflow-hidden rounded-card bg-white p-6 shadow-card ring-1 ring-black/5 transition-shadow duration-500 ease-out-expo hover:shadow-elevated sm:p-7"
  >
    <!-- Oversized decorative quote mark -->
    <span
      class="pointer-events-none absolute -top-4 right-3 select-none font-heading text-8xl leading-none text-romara-amber/10"
      aria-hidden="true"
    >&rdquo;</span>

    <div class="relative flex items-center justify-between gap-3">
      <div class="flex gap-0.5 text-romara-amber">
        <IconStar v-for="n in props.review.rating" :key="n" class="h-4 w-4" />
      </div>
      <span class="inline-flex items-center gap-1 rounded-full bg-romara-green-100 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-romara-green">
        <IconCheck class="h-3 w-3" />
        Verified
      </span>
    </div>

    <p class="relative mt-4 font-heading text-lg font-medium leading-snug text-romara-green">
      &ldquo;{{ props.review.text }}&rdquo;
    </p>

    <div class="relative mt-6 flex items-center gap-3 border-t border-black/5 pt-5">
      <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-romara-cream font-bold text-romara-green">
        {{ getInitial(props.review.name) }}
      </span>
      <div class="min-w-0 flex-1">
        <p class="flex items-center gap-1.5 text-sm font-bold text-romara-green">
          {{ props.review.name }}
          <span aria-hidden="true">{{ props.review.countryFlag }}</span>
        </p>
        <p class="truncate text-xs text-romara-ink-soft">{{ props.review.experience }}</p>
      </div>
      <span class="shrink-0 text-xs text-romara-ink/40">{{ formatDate(props.review.date) }}</span>
    </div>
  </article>
</template>