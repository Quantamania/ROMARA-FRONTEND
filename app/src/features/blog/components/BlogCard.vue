<script setup lang="ts">
import type { BlogPost } from '@/types/blog.types'

interface Props {
  post: BlogPost
}

const props = defineProps<Props>()

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <a :href="`/blog/${props.post.slug}`" class="block overflow-hidden rounded-lg bg-white shadow-card">
    <img :src="props.post.image" :alt="props.post.title" class="h-44 w-full object-cover" loading="lazy" />

    <div class="p-4">
      <p class="text-xs font-medium text-romara-ink/50">{{ formatDate(props.post.publishedAt) }}</p>
      <h3 class="mt-1 font-heading text-base font-bold text-romara-green">{{ props.post.title }}</h3>
      <p class="mt-2 text-sm text-romara-ink/70">{{ props.post.excerpt }}</p>
    </div>
  </a>
</template>