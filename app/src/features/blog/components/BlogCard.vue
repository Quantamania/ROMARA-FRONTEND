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
  <a :href="`/blog/${props.post.slug}`" class="block bg-white shadow-card rounded-lg overflow-hidden card-hover">
    <img :src="props.post.image" :alt="props.post.title" class="w-full h-44 object-cover" loading="lazy" />

    <div class="p-4">
      <p class="font-medium text-romara-ink/50 text-xs">{{ formatDate(props.post.publishedAt) }}</p>
      <h3 class="mt-1 font-heading font-bold text-romara-green text-base">{{ props.post.title }}</h3>
      <p class="mt-2 text-romara-ink/70 text-sm">{{ props.post.excerpt }}</p>
    </div>
  </a>
</template>