<script setup lang="ts">
import type { BlogPost } from '@/types/blog.types'

interface Props {
  post: BlogPost
}

const props = defineProps<Props>()

</script>

<template>
  <a :href="`/blog/${props.post.slug}`" class="block relative rounded-lg overflow-hidden card-hover h-72">
    <img :src="props.post.image" :alt="props.post.title" class="w-full h-full object-cover" loading="lazy" />

    <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>

    <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
      <h3 class="font-heading font-bold text-white text-lg">{{ props.post.title }}</h3>
      <p class="mt-2 text-white/90 text-sm line-clamp-2">{{ props.post.excerpt }}</p>
    </div>
  </a>
</template>
