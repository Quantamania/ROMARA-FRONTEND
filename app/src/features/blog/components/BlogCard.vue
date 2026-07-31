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
  <a
    :href="`/blog/${props.post.slug}`"
    class="group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated"
  >
    <div class="relative overflow-hidden">
      <img
        :src="props.post.image"
        :alt="props.post.title"
        class="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-scrim-b opacity-60" />
      <div class="absolute left-4 top-4">
        <Pill tone="amber">{{ categoryLabels[props.post.category] ?? props.post.category }}</Pill>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-6">
      <h3
        class="font-heading text-lg font-semibold leading-snug text-romara-green transition-colors group-hover:text-romara-amber"
      >
        {{ props.post.title }}
      </h3>
      <p class="mt-3 line-clamp-2 text-sm leading-relaxed text-romara-ink-soft">
        {{ props.post.excerpt }}
      </p>

      <div class="mt-5 flex items-center justify-between border-t border-romara-green/10 pt-4">
        <span class="inline-flex items-center gap-1.5 text-xs font-medium text-romara-ink-soft">
          <IconClock class="h-3.5 w-3.5 text-romara-amber" />
          {{ props.post.readTimeMinutes }} min read
        </span>
        <span
          class="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-romara-green"
        >
          Read
          <IconArrowRight class="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </a>
</template>
