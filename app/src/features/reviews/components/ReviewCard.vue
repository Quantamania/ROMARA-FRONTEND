<script setup lang="ts">
import IconStar from '@/components/icons/IconStar.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'
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
    class="flex flex-col gap-5 rounded-lg bg-white p-6 shadow-card sm:flex-row sm:p-8"
  >
    <div class="flex shrink-0 flex-row items-center gap-3 sm:w-44 sm:flex-col sm:items-start">
      <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-romara-cream text-lg font-bold text-romara-green">
        {{ getInitial(props.review.name) }}
      </span>
      <div class="min-w-0">
        <p class="flex items-center gap-1.5 text-base font-bold text-romara-green">
          {{ props.review.name }}
          <span aria-hidden="true">{{ props.review.countryFlag }}</span>
        </p>
        <p class="text-xs text-romara-ink/50">{{ props.review.experience }}</p>
        <div class="mt-1.5 flex gap-0.5 text-romara-amber">
          <IconStar v-for="n in props.review.rating" :key="n" class="h-4 w-4" />
        </div>
      </div>
    </div>

    <div class="flex-1">
      <p class="text-base leading-relaxed text-romara-ink/70">
        <span class="mr-1 font-heading text-3xl leading-none text-romara-amber/70">&ldquo;</span>{{ props.review.text }}
      </p>
      <p class="mt-4 flex items-center gap-1.5 text-xs text-romara-ink/40">
        <IconCalendar class="h-3.5 w-3.5" />
        {{ formatDate(props.review.date) }}
      </p>
    </div>
  </article>

  <!-- Grid layout: original compact card -->
  <article v-else class="flex h-full flex-col rounded-lg bg-white p-5 shadow-card">
    <div class="flex items-start gap-3">
      <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-romara-cream text-sm font-bold text-romara-green">
        {{ getInitial(props.review.name) }}
      </span>
      <div class="min-w-0">
        <p class="flex items-center gap-1.5 text-sm font-bold text-romara-green">
          {{ props.review.name }}
          <span aria-hidden="true">{{ props.review.countryFlag }}</span>
        </p>
        <p class="text-xs text-romara-ink/50">{{ props.review.experience }}</p>
      </div>
    </div>

    <div class="mt-3 flex gap-0.5 text-romara-amber">
      <IconStar v-for="n in props.review.rating" :key="n" class="h-4 w-4" />
    </div>

    <p class="mt-3 flex-1 text-sm leading-relaxed text-romara-ink/70">{{ props.review.text }}</p>

    <p class="mt-4 flex items-center gap-1.5 text-xs text-romara-ink/40">
      <IconCalendar class="h-3.5 w-3.5" />
      {{ formatDate(props.review.date) }}
    </p>
  </article>
</template>