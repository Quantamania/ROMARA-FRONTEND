<script setup lang="ts">
import Pill from '@/components/ui/Pill.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import type { BlogPost } from '@/types/blog.types'

interface Props {
  post: BlogPost
}

const props = defineProps<Props>()

const categoryLabels: Record<string, string> = {
  'safari-tips': 'Safari Tips',
  destinations: 'Destinations',
  'travel-guides': 'Travel Guides',
  wildlife: 'Wildlife',
  'travel-news': 'Travel News',
  'culture-people': 'Culture & People',
}
</script>

<template>
  <!-- Full-bleed editorial card: the image IS the card; content sits over a scrim, no white panel. -->
  <a
    :href="`/blog/${props.post.slug}`"
    class="group relative flex h-full min-h-[360px] flex-col justify-end overflow-hidden rounded-card shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated sm:min-h-[400px]"
  >
    <img
      :src="props.post.image"
      :alt="props.post.title"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
    />

    <!-- Layered scrims for legibility -->
    <div class="absolute inset-0 bg-scrim-b" />
    <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/70 via-romara-green-dark/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

    <!-- Category -->
    <div class="absolute left-4 top-4">
      <Pill tone="amber">{{ categoryLabels[props.post.category] ?? props.post.category }}</Pill>
    </div>

    <!-- Content -->
    <div class="relative p-5 text-white sm:p-6">
      <h3 class="font-heading text-lg font-semibold leading-snug text-balance transition-colors duration-300 group-hover:text-romara-amber-300 sm:text-xl">
        {{ props.post.title }}
      </h3>
      <p class="mt-2.5 line-clamp-2 text-sm leading-relaxed text-white/75">
        {{ props.post.excerpt }}
      </p>

      <div class="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
        <span class="inline-flex items-center gap-1.5 text-xs font-medium text-white/80">
          <IconClock class="h-3.5 w-3.5 text-romara-amber-300" />
          {{ props.post.readTimeMinutes }} min read
        </span>
        <span class="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-romara-amber-300">
          Read
          <IconArrowRight class="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </a>
</template>
