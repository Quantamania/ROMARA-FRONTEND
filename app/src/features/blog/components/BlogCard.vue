<script setup lang="ts">
import Pill from '@/components/ui/Pill.vue'
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

    <!-- Subtle top scrim so the category pill stays legible -->
    <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" aria-hidden="true" />

    <!-- Category -->
    <div class="absolute left-4 top-4">
      <Pill tone="amber">{{ categoryLabels[props.post.category] ?? props.post.category }}</Pill>
    </div>

    <!-- Content on a frosted white panel — readable on any image, image stays visible above -->
    <div class="relative m-3 rounded-lg bg-white/90 p-4 shadow-sm backdrop-blur-md">
      <h3 class="font-heading text-lg font-semibold leading-snug text-balance text-romara-green transition-colors duration-300 group-hover:text-romara-amber sm:text-xl">
        {{ props.post.title }}
      </h3>
      <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-romara-ink/70">
        {{ props.post.excerpt }}
      </p>

      <div class="mt-3 flex items-center justify-end border-t border-romara-green/10 pt-3">
        <span class="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-romara-amber">
          Read
          <IconArrowRight class="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </a>
</template>
