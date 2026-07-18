<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconMail from '@/components/icons/IconMail.vue'
import BlogCard from '@/features/blog/components/BlogCard.vue'
import BlogCategoryFilter from '@/features/blog/components/BlogCategoryFilter.vue'
import NewsletterForm from '@/features/blog/components/NewsletterForm.vue'
import blogPostsData from '@/data/blogPosts.json'
import type { BlogCategory, BlogPost } from '@/features/blog/types/blog.types'

const allPosts = blogPostsData as BlogPost[]
const featuredPosts = allPosts.filter((post) => post.featured)
const mainFeaturedPost = featuredPosts[0]
const sidebarFeaturedPosts = featuredPosts.slice(1)

const categoryLabels: Record<BlogCategory, string> = {
  'safari-tips': 'Safari Tips',
  destinations: 'Destinations',
  'travel-guides': 'Travel Guides',
  wildlife: 'Wildlife',
  'travel-news': 'Travel News',
  'culture-people': 'Culture & People',
}

type SortOption = 'recent' | 'oldest' | 'popular'

const searchQuery = ref('')
const selectedCategory = ref<BlogCategory | null>(null)
const sortOption = ref<SortOption>('recent')
const visibleCount = ref(4)

const filteredPosts = computed(function getFilteredPosts() {
  // "All Blog Posts" excludes the ones already shown above in Featured Stories.
  let result = allPosts.filter((post) => !post.featured)

  if (selectedCategory.value) {
    result = result.filter((post) => post.category === selectedCategory.value)
  }
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase()
    result = result.filter(
      (post) => post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query),
    )
  }

  const sorted = [...result]
  sorted.sort(function comparePosts(a, b) {
    if (sortOption.value === 'oldest') return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    if (sortOption.value === 'popular') return b.views - a.views
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
  return sorted
})

const visiblePosts = computed(function getVisiblePosts() {
  return filteredPosts.value.filter((post): post is BlogPost & { image: string } => !!post.image).slice(0, visibleCount.value)
})

const hasMorePosts = computed(function checkHasMorePosts() {
  return visibleCount.value < filteredPosts.value.length
})

function loadMorePosts() {
  visibleCount.value += 4
}

function formatDate(isoDate: string | number | Date) {
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <!-- Hero: solid panel + rounded photo card, not full-bleed like every other page -->
  <section class="relative overflow-hidden bg-romara-green text-white">
    <div class="romara-container grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
      <div>
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">Travel Blog</p>
        <h1 class="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">
          Travel Stories. Safari Inspiration.
        </h1>
        <span class="mt-3 block h-1 w-14 rounded bg-romara-amber" />
        <p class="mt-4 max-w-md text-base leading-relaxed text-white/85">
          Explore travel tips, destination guides, safari experiences and everything in between.
        </p>

        <form class="mt-8 flex max-w-md items-center gap-2 rounded-full bg-white py-1.5 pl-5 pr-1.5" @submit.prevent>
          <IconSearch class="h-4 w-4 shrink-0 text-romara-ink/40" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search blog posts..."
            class="w-full border-none bg-transparent text-sm text-romara-ink placeholder:text-romara-ink/40 focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            class="shrink-0 rounded-full bg-romara-green px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-romara-green/90"
          >
            Search
          </button>
        </form>
      </div>

      <div class="relative hidden lg:block">
        <img
          src="/src/assets/images/blog/hero.png"
          alt="Safari vehicle at sunset"
          class="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
        />
        <div class="absolute -bottom-5 -left-5 rounded-lg bg-white px-4 py-3 shadow-card">
          <p class="text-xs font-semibold text-romara-ink/50">Fresh Content</p>
          <p class="mt-0.5 text-sm font-bold text-romara-green">New stories every week</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Blog Categories -->
  <section class="romara-container py-16">
    <BlogCategoryFilter v-model="selectedCategory" />
  </section>

  <!-- Featured Stories: main story + sidebar -->
  <section v-if="mainFeaturedPost" class="romara-container pb-16">
    <h2 class="mb-6 text-2xl font-bold text-romara-green sm:text-3xl">Featured Stories</h2>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <a :href="`/blog/${mainFeaturedPost.slug}`" class="group overflow-hidden rounded-lg bg-white shadow-card">
        <div class="relative overflow-hidden">
          <span class="absolute left-4 top-4 z-10 rounded bg-romara-amber px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Featured
          </span>
          <img
            :src="mainFeaturedPost.image"
            :alt="mainFeaturedPost.title"
            class="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-80"
            loading="lazy"
          />
        </div>
        <div class="p-6">
          <p class="text-xs font-bold uppercase tracking-wide text-romara-amber">{{ categoryLabels[mainFeaturedPost.category] }}</p>
          <h3 class="mt-2 font-heading text-2xl font-bold text-romara-green">{{ mainFeaturedPost.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-romara-ink/70">{{ mainFeaturedPost.excerpt }}</p>
          <div class="mt-4 flex items-center gap-3 text-xs text-romara-ink/50">
            <span>{{ formatDate(mainFeaturedPost.publishedAt) }}</span>
            <span class="flex items-center gap-1">
              <IconClock class="h-3.5 w-3.5" />
              {{ mainFeaturedPost.readTimeMinutes }} min read
            </span>
          </div>
          <span class="mt-5 inline-block rounded-md bg-romara-green px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white group-hover:bg-romara-green/90">
            Read More
          </span>
        </div>
      </a>

      <div class="space-y-4">
        <a
          v-for="post in sidebarFeaturedPosts"
          :key="post.id"
          :href="`/blog/${post.slug}`"
          class="group flex gap-4 rounded-lg bg-white p-3 shadow-card"
        >
          <img :src="post.image" :alt="post.title" class="h-20 w-24 shrink-0 rounded-md object-cover" loading="lazy" />
          <div class="min-w-0">
            <p class="text-[11px] font-bold uppercase tracking-wide text-romara-amber">{{ categoryLabels[post.category] }}</p>
            <h4 class="mt-1 text-sm font-bold leading-snug text-romara-green group-hover:text-romara-amber">
              {{ post.title }}
            </h4>
            <div class="mt-1.5 flex items-center gap-2 text-[11px] text-romara-ink/50">
              <span>{{ formatDate(post.publishedAt) }}</span>
              <span>·</span>
              <span>{{ post.readTimeMinutes }} min read</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- All Blog Posts -->
  <section class="romara-container pb-16">
    <div class="mb-6 flex items-center justify-between gap-4">
      <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">All Blog Posts</h2>
      <select
        v-model="sortOption"
        class="shrink-0 rounded-md border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-romara-ink focus:border-romara-green focus:outline-none"
      >
        <option value="recent">Most Recent</option>
        <option value="oldest">Oldest</option>
        <option value="popular">Most Popular</option>
      </select>
    </div>

    <div v-if="visiblePosts.length === 0" class="rounded-lg bg-romara-cream p-10 text-center">
      <p class="text-sm text-romara-ink/70">
        No articles match your search. Try browsing a category above or check back soon for new posts.
      </p>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <BlogCard v-for="(post, index) in visiblePosts" :key="post.id" :post="post" v-scroll-reveal="{ delay: index * 100 }" />
    </div>

    <div v-if="hasMorePosts" class="mt-8 flex justify-center">
      <BaseButton variant="outline" @click="loadMorePosts">View More Posts</BaseButton>
    </div>
  </section>

  <!-- Newsletter -->
  <section class="romara-container pb-16">
    <div class="flex flex-col gap-6 rounded-lg bg-romara-cream p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div class="flex items-center gap-4">
        <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-romara-green text-white">
          <IconMail class="h-6 w-6" />
        </span>
        <div>
          <p class="text-lg font-bold text-romara-green">Stay Inspired</p>
          <p class="mt-1 text-sm text-romara-ink/60">
            Subscribe to our newsletter for the latest travel tips, special offers and exclusive stories.
          </p>
        </div>
      </div>

      <NewsletterForm />
    </div>
  </section>
</template>