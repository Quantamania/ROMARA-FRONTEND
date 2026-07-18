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

  <!-- Grid layout: original compact card -->
  <article v-else class="flex flex-col bg-white shadow-card p-5 rounded-lg h-full card-hover">
    <div class="flex items-start gap-3">
      <span class="flex justify-center items-center bg-romara-cream rounded-full w-11 h-11 font-bold text-romara-green text-sm shrink-0">
        {{ getInitial(props.review.name) }}
      </span>
      <div class="min-w-0">
        <p class="flex items-center gap-1.5 font-bold text-romara-green text-sm">
          {{ props.review.name }}
          <span aria-hidden="true">{{ props.review.countryFlag }}</span>
        </p>
        <p class="text-romara-ink/50 text-xs">{{ props.review.experience }}</p>
      </div>
    </div>

    <div class="flex gap-0.5 mt-3 text-romara-amber">
      <IconStar v-for="n in props.review.rating" :key="n" class="w-4 h-4" />
    </div>

    <p class="flex-1 mt-3 text-romara-ink/70 text-sm leading-relaxed">{{ props.review.text }}</p>

    <p class="flex items-center gap-1.5 mt-4 text-romara-ink/40 text-xs">
      <IconCalendar class="w-3.5 h-3.5" />
      {{ formatDate(props.review.date) }}
    </p>
  </article>
</template>