<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import blogPostsData from '@/data/blogPosts.json'
import { getAllBlogPosts } from '@/features/blog/api/blog.api'
import type { BlogPost } from '@/features/blog/types/blog.types'

// Bundled posts paint first, then the published ones replace them.
const posts = ref<BlogPost[]>((blogPostsData as BlogPost[]).slice(0, 4))
onMounted(async () => {
  const all = await getAllBlogPosts()
  if (all.length) posts.value = all.slice(0, 4)
})

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
  <section class="bg-romara-bone py-0 lg:py-8">
    <div class="romara-container">
      <div class="rounded-card bg-white p-4 shadow-card sm:p-6">
        <div class="flex items-center justify-between gap-3">
          <h2 class="font-heading text-xl font-bold text-romara-green sm:text-2xl">From the Blog</h2>
          <a href="/blog" class="flex shrink-0 items-center gap-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-romara-amber transition-colors hover:text-romara-amber/80 sm:text-xs">
            View All
            <IconChevronRight class="h-4 w-4" />
          </a>
        </div>

        <div class="-mx-1 mt-4 flex gap-3 overflow-x-auto px-1 pb-2 snap-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <a
            v-for="post in posts"
            :key="post.id"
            :href="`/blog/${post.slug}`"
            class="group w-52 shrink-0 snap-start overflow-hidden rounded-lg border border-romara-green/10 bg-white transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card lg:w-auto lg:flex-1"
          >
            <div class="h-28 overflow-hidden bg-romara-bone">
              <img :src="post.image" :alt="post.title" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105" />
            </div>
            <div class="p-3">
              <p class="text-[10px] font-bold uppercase tracking-[0.1em] text-romara-amber">{{ categoryLabels[post.category] ?? post.category }}</p>
              <p class="mt-1 line-clamp-2 font-heading text-sm font-bold leading-tight text-romara-green">{{ post.title }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
