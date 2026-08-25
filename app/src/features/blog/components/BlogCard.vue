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
  <!-- Full-bleed editorial card: the image IS the card. Text sits straight on the
       photo over a bottom-up scrim — no white panel anywhere. -->
  <a
    :href="`/blog/${props.post.slug}`"
    class="group relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-card shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated sm:min-h-[420px]"
  >
    <img
      :src="props.post.image"
      :alt="props.post.title"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
    />

    <!-- Legibility scrims: a deep bottom gradient for the text, a light top one for the pill -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" aria-hidden="true" />
    <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" aria-hidden="true" />

    <!-- Category -->
    <div class="absolute left-4 top-4">
      <Pill tone="amber">{{ categoryLabels[props.post.category] ?? props.post.category }}</Pill>
    </div>

    <!-- Content — directly on the image -->
    <div class="relative p-5 sm:p-6">
      <h3 class="font-heading text-xl font-semibold leading-snug text-balance text-white drop-shadow-sm sm:text-2xl">
        {{ props.post.title }}
      </h3>
      <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">
        {{ props.post.excerpt }}
      </p>

      <div class="mt-4 flex items-center gap-2 border-t border-white/20 pt-3.5">
        <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-romara-amber-300">
          Read Article
          <IconArrowRight class="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </a>
</template>
