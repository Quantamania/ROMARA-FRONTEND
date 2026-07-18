<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BlogCard from '@/features/blog/components/BlogCard.vue'
import blogPostsData from '@/data/blogPosts.json'
import type { BlogPost } from '@/features/blog/types/blog.types'

const latestPosts = blogPostsData as BlogPost[]
</script>

<template>
  <section class="romara-container py-16">
    <SectionHeading title="Latest From Our Travel Blog" link-text="View All Articles" link-href="/blog" />

    <p v-if="latestPosts.length === 0" class="text-sm text-romara-ink/60">
      Blog articles are coming soon.
    </p>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BlogCard v-for="post in latestPosts" :key="post.id" :post="post" />
    </div>
  </section>
</template>