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
  <section class="relative bg-romara-green overflow-hidden text-white">
    <div class="items-center gap-10 grid grid-cols-1 lg:grid-cols-2 py-16 lg:py-20 romara-container">
      <div>
        <p class="font-bold text-romara-amber text-sm uppercase tracking-[0.2em]">Travel Blog</p>
        <h1 class="mt-3 font-heading font-bold text-4xl sm:text-5xl leading-tight">
          Travel Stories. Safari Inspiration.
        </h1>
        <span class="block bg-romara-amber mt-3 rounded w-14 h-1" />
        <p class="mt-4 max-w-md text-white/85 text-base leading-relaxed">
          Explore travel tips, destination guides, safari experiences and everything in between.
        </p>

        <form class="flex items-center gap-2 bg-white mt-8 py-1.5 pr-1.5 pl-5 rounded-full max-w-md" @submit.prevent>
          <IconSearch class="w-4 h-4 text-romara-ink/40 shrink-0" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search blog posts..."
            class="bg-transparent border-none focus:outline-none focus:ring-0 w-full text-romara-ink placeholder:text-romara-ink/40 text-sm"
          />
          <button
            type="submit"
            class="bg-romara-green hover:bg-romara-green/90 px-5 py-2.5 rounded-full font-semibold text-white text-xs uppercase tracking-wide shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      <div class="hidden lg:block relative">
        <div class="relative">
          <img
            src="/src/assets/images/blog/hero.png"
            alt="Safari vehicle at sunset"
            class="shadow-2xl w-full object-cover aspect-[3/2]"
          />
          <!-- Fade overlay -->
          <div class="absolute inset-0 bg-gradient-to-l from-transparent via-romara-green/30 to-romara-green"></div>
        </div>
        <div class="-bottom-5 -left-5 absolute bg-white shadow-card px-4 py-3 rounded-lg">
          <p class="font-semibold text-romara-ink/50 text-xs">Fresh Content</p>
          <p class="mt-0.5 font-bold text-romara-green text-sm">New stories every week</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Blog Categories -->
  <section class="py-16 romara-container">
    <BlogCategoryFilter v-model="selectedCategory" />
  </section>

  <!-- Featured Stories: main story + sidebar -->
  <section v-if="mainFeaturedPost" class="pb-16 romara-container">
    <h2 class="mb-6 font-bold text-romara-green text-2xl sm:text-3xl">Featured Stories</h2>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-[1fr_360px]">
      <a :href="`/blog/${mainFeaturedPost.slug}`" class="group bg-white shadow-card rounded-lg overflow-hidden">
        <div class="relative overflow-hidden">
          <span class="top-4 left-4 z-10 absolute bg-romara-amber px-3 py-1 rounded font-bold text-[10px] text-white uppercase tracking-wide">
            Featured
          </span>
          <img
            :src="mainFeaturedPost.image"
            :alt="mainFeaturedPost.title"
            class="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div class="p-6">
          <p class="font-bold text-romara-amber text-xs uppercase tracking-wide">{{ categoryLabels[mainFeaturedPost.category] }}</p>
          <h3 class="mt-2 font-heading font-bold text-romara-green text-2xl">{{ mainFeaturedPost.title }}</h3>
          <p class="mt-3 text-romara-ink/70 text-sm leading-relaxed">{{ mainFeaturedPost.excerpt }}</p>
          <div class="flex items-center gap-3 mt-4 text-romara-ink/50 text-xs">
            <span>{{ formatDate(mainFeaturedPost.publishedAt) }}</span>
            <span class="flex items-center gap-1">
              <IconClock class="w-3.5 h-3.5" />
              {{ mainFeaturedPost.readTimeMinutes }} min read
            </span>
          </div>
          <span class="inline-block bg-romara-green group-hover:bg-romara-green/90 mt-5 px-5 py-2.5 rounded-md font-semibold text-white text-xs uppercase tracking-wide">
            Read More
          </span>
        </div>
      </a>

      <div class="space-y-4">
        <a
          v-for="post in sidebarFeaturedPosts"
          :key="post.id"
          :href="`/blog/${post.slug}`"
          class="group flex gap-4 bg-white shadow-card p-4 rounded-lg"
        >
          <img :src="post.image" :alt="post.title" class="rounded-md w-32 h-24 object-cover shrink-0" loading="lazy" />
          <div class="min-w-0">
            <p class="font-bold text-romara-amber text-xs uppercase tracking-wide">{{ categoryLabels[post.category] }}</p>
            <h4 class="mt-1 font-bold text-romara-green group-hover:text-romara-amber text-base leading-snug">
              {{ post.title }}
            </h4>
            <div class="flex items-center gap-2 mt-1.5 text-romara-ink/50 text-xs">
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
  <section class="pb-16 romara-container">
    <div class="flex justify-between items-center gap-4 mb-6">
      <h2 class="font-bold text-romara-green text-2xl sm:text-3xl">All Blog Posts</h2>
      <select
        v-model="sortOption"
        class="bg-white px-3 py-2 border border-black/10 focus:border-romara-green rounded-md focus:outline-none font-semibold text-romara-ink text-xs uppercase tracking-wide shrink-0"
      >
        <option value="recent">Most Recent</option>
        <option value="oldest">Oldest</option>
        <option value="popular">Most Popular</option>
      </select>
    </div>

    <div v-if="visiblePosts.length === 0" class="bg-romara-cream p-10 rounded-lg text-center">
      <p class="text-romara-ink/70 text-sm">
        No articles match your search. Try browsing a category above or check back soon for new posts.
      </p>
    </div>

    <div v-else class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <BlogCard v-for="(post, index) in visiblePosts" :key="post.id" :post="post" v-scroll-reveal="{ delay: index * 100 }" />
    </div>

    <div v-if="hasMorePosts" class="flex justify-center mt-8">
      <BaseButton variant="outline" @click="loadMorePosts">View More Posts</BaseButton>
    </div>
  </section>

  <!-- Newsletter -->
  <section class="pb-16 romara-container">
    <div class="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-6 bg-romara-cream p-6 sm:p-8 rounded-lg">
      <div class="flex items-center gap-4">
        <span class="flex justify-center items-center bg-romara-green rounded-full w-14 h-14 text-white shrink-0">
          <IconMail class="w-6 h-6" />
        </span>
        <div>
          <p class="font-bold text-romara-green text-lg">Stay Inspired</p>
          <p class="mt-1 text-romara-ink/60 text-sm">
            Subscribe to our newsletter for the latest travel tips, special offers and exclusive stories.
          </p>
        </div>
      </div>

      <NewsletterForm />
    </div>
  </section>
</template>