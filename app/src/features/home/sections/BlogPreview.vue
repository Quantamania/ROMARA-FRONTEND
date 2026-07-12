<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BlogCard from '@/features/blog/components/BlogCard.vue'
import blogPostsData from '@/data/blogPosts.json'
import type { BlogPost } from '@/types/blog.types'

const latestPosts = blogPostsData as BlogPost[]
</script>

<template>
  <section class="romara-container py-16">
    <SectionHeading title="Latest From Our Travel Blog" link-text="View All Articles" link-href="/blog" />

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BlogCard v-for="post in latestPosts" :key="post.id" :post="post" />
    </div>
  </section>
</template>