<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import Pill from '@/components/ui/Pill.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import BlogCard from '@/features/blog/components/BlogCard.vue'
import BlogCategoryFilter from '@/features/blog/components/BlogCategoryFilter.vue'
import NewsletterForm from '@/features/blog/components/NewsletterForm.vue'
import blogPostsData from '@/data/blogPosts.json'
import type { BlogCategory, BlogPost } from '@/features/blog/types/blog.types'

const allPosts = blogPostsData as BlogPost[]
const featuredPosts = allPosts.filter((post) => post.featured)
const mainFeaturedPost = featuredPosts[0]
const sidebarFeaturedPosts = featuredPosts.slice(1)

// Masthead lead — reuse the existing featured post, falling back to the latest item.
// Read-only derivation; no data, sorting or filtering is changed.
const mastheadPost = mainFeaturedPost ?? allPosts[0]

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

// Asymmetric magazine rhythm — alternating 7/5 · 5/7 spans across a 12-col grid at lg+.
const spanPattern = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']
function spanClass(index: number) {
  return spanPattern[index % spanPattern.length]
}

function formatDate(isoDate: string | number | Date) {
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <!-- Hero: MAGAZINE MASTHEAD — the featured post is the hero (image + editorial text). -->
  <section class="bg-romara-green-900 text-white">
    <div class="romara-container py-8 sm:py-14 lg:py-16">
      <!-- Masthead top line: breadcrumbs + journal title -->
      <nav aria-label="Breadcrumb" class="mb-6">
        <ol class="flex items-center gap-2 text-xs font-medium text-white/55">
          <li><a href="/" class="transition-colors hover:text-white">Home</a></li>
          <li aria-hidden="true" class="text-white/30">/</li>
          <li class="text-white/90">Blog</li>
        </ol>
      </nav>

      <div class="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <h1 class="text-balance font-heading text-display font-semibold leading-none">
          Travel Stories &amp; Safari Inspiration
        </h1>
        <p class="max-w-sm text-sm leading-relaxed text-white/70 sm:text-right">
          Field notes, destination guides and safari experiences to inspire your next Kenyan adventure.
        </p>
      </div>

      <!-- Slim search bar sits under the masthead line -->
      <form
        class="mt-6 flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/95 py-1.5 pl-5 pr-1.5 shadow-elevated transition-shadow focus-within:shadow-glow-amber"
        @submit.prevent
      >
        <IconSearch class="h-4 w-4 shrink-0 text-romara-ink/40" />
        <label for="blog-search" class="sr-only">Search blog posts</label>
        <input
          id="blog-search"
          v-model="searchQuery"
          type="search"
          placeholder="Search blog posts..."
          class="w-full border-none bg-transparent text-sm text-romara-ink placeholder:text-romara-ink/40 focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          class="shrink-0 rounded-full bg-amber-fade px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-soft transition-all duration-300 ease-out-expo hover:shadow-glow-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/50 focus-visible:ring-offset-1"
        >
          Search
        </button>
      </form>

      <!-- Featured lead story as the hero. Mobile: image on top, text below. -->
      <a
        v-if="mastheadPost"
        :href="`/blog/${mastheadPost.slug}`"
        class="group mt-6 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-2 lg:items-center lg:gap-12"
      >
        <div class="relative overflow-hidden rounded-card shadow-elevated">
          <div class="absolute left-4 top-4 z-10">
            <Pill tone="amber">{{ categoryLabels[mastheadPost.category] }}</Pill>
          </div>
          <img
            :src="mastheadPost.image"
            :alt="mastheadPost.title"
            class="aspect-[16/9] w-full object-cover sm:aspect-[16/11] transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-scrim-b opacity-40" />
        </div>

        <div>
          <p class="text-xs font-bold uppercase tracking-[0.16em] text-romara-amber-300">Featured story</p>
          <h2
            class="mt-3 text-balance font-heading text-2xl font-semibold leading-tight transition-colors group-hover:text-romara-amber-300 sm:mt-4 sm:text-display-sm"
          >
            {{ mastheadPost.title }}
          </h2>
          <p class="mt-3 line-clamp-3 max-w-xl text-base leading-relaxed text-white/70 sm:mt-4">{{ mastheadPost.excerpt }}</p>
          <div class="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-white/60 sm:mt-6">
            <span>{{ formatDate(mastheadPost.publishedAt) }}</span>
          </div>
          <span
            class="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase sm:mt-7 tracking-[0.14em] text-white"
          >
            Read article
            <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    </div>
  </section>

  <!-- Categories -->
  <section class="section-y bg-white">
    <div class="romara-container">
      <p class="eyebrow mb-3 justify-center">
        
        Browse by topic
      </p>
      <h2 class="mb-8 text-center font-heading text-display-sm font-semibold text-romara-green">
        What are you exploring today?
      </h2>
      <BlogCategoryFilter v-model="selectedCategory" />
    </div>
  </section>

  <!-- Featured Stories: lead story + curated sidebar -->
  <section v-if="mainFeaturedPost" class="section-y bg-romara-bone">
    <div class="romara-container">
      <SectionHeading
        eyebrow="Editor's Picks"
        title="Featured stories"
        description="Hand-selected reads worth lingering over."
      />

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <a
          :href="`/blog/${mainFeaturedPost.slug}`"
          class="group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated"
          v-scroll-reveal
        >
          <div class="relative overflow-hidden">
            <div class="absolute left-4 top-4 z-10">
              <Pill tone="amber">Featured</Pill>
            </div>
            <img
              :src="mainFeaturedPost.image"
              :alt="mainFeaturedPost.title"
              class="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-scrim-b opacity-50" />
          </div>
          <div class="flex flex-1 flex-col p-7 sm:p-8">
            <p class="eyebrow text-romara-amber-600">
              
              {{ categoryLabels[mainFeaturedPost.category] }}
            </p>
            <h3 class="mt-3 font-heading text-2xl font-semibold leading-snug text-romara-green transition-colors group-hover:text-romara-amber sm:text-display-sm">
              {{ mainFeaturedPost.title }}
            </h3>
            <p class="mt-4 text-base leading-relaxed text-romara-ink-soft">{{ mainFeaturedPost.excerpt }}</p>
            <div class="mt-6 flex items-center gap-4 border-t border-romara-green/10 pt-5 text-xs font-medium text-romara-ink-soft">
              <span>{{ formatDate(mainFeaturedPost.publishedAt) }}</span>
              <span class="ml-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-romara-green">
                Read
                <IconArrowRight class="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </a>

        <div class="flex flex-col gap-4">
          <a
            v-for="(post, index) in sidebarFeaturedPosts"
            :key="post.id"
            :href="`/blog/${post.slug}`"
            class="group flex gap-4 rounded-card bg-white p-4 shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-elevated"
            v-scroll-reveal="{ delay: index * 90 }"
          >
            <div class="relative overflow-hidden rounded-xl">
              <img
                :src="post.image"
                :alt="post.title"
                class="h-24 w-32 shrink-0 object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div class="min-w-0">
              <p class="text-[11px] font-bold uppercase tracking-[0.12em] text-romara-amber-600">
                {{ categoryLabels[post.category] }}
              </p>
              <h4 class="mt-1.5 font-heading text-base font-semibold leading-snug text-romara-green transition-colors group-hover:text-romara-amber">
                {{ post.title }}
              </h4>
              <div class="mt-2 flex items-center gap-2 text-xs text-romara-ink-soft">
                <span>{{ formatDate(post.publishedAt) }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- All Blog Posts -->
  <section class="section-y bg-white">
    <div class="romara-container">
      <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow mb-3">
            
            The full library
          </p>
          <h2 class="font-heading text-display-sm font-semibold text-romara-green">All blog posts</h2>
          <span class="accent-rule mt-4" />
        </div>
        <label class="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-romara-ink-soft">
          Sort by
          <select
            v-model="sortOption"
            class="rounded-lg border border-romara-green/15 bg-white px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-romara-green shadow-soft focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-amber/30"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Popular</option>
          </select>
        </label>
      </div>

      <div v-if="visiblePosts.length === 0" class="rounded-card border border-romara-green/10 bg-romara-cream p-12 text-center">
        <p class="mx-auto max-w-md text-sm leading-relaxed text-romara-ink-soft">
          No articles match your search. Try browsing a category above or check back soon for new posts.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
        <BlogCard
          v-for="(post, index) in visiblePosts"
          :key="post.id"
          :post="post"
          :class="spanClass(index)"
          v-scroll-reveal="{ delay: index * 100 }"
        />
      </div>

      <div v-if="hasMorePosts" class="mt-12 flex justify-center">
        <BaseButton variant="outline" size="lg" @click="loadMorePosts">View More Posts</BaseButton>
      </div>
    </div>
  </section>

  <!-- Newsletter -->
  <section class="section-y bg-romara-bone">
    <div class="romara-container">
      <div class="relative isolate overflow-hidden rounded-card bg-romara-green px-6 py-10 shadow-elevated sm:px-10 sm:py-12">
        <div class="absolute inset-0 -z-10 bg-green-fade opacity-60" />
        <div class="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-romara-amber/10 blur-3xl" />
        <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex items-start gap-5">
            <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-fade text-white shadow-glow-amber">
              <IconMail class="h-6 w-6" />
            </span>
            <div>
              <p class="eyebrow text-romara-amber-300">
                
                Stay inspired
              </p>
              <h2 class="mt-3 font-heading text-2xl font-semibold text-white sm:text-display-sm">
                Get fresh stories in your inbox
              </h2>
              <p class="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                Subscribe to our newsletter for the latest travel tips, special offers and exclusive stories.
              </p>
            </div>
          </div>

          <NewsletterForm />
        </div>
      </div>
    </div>
  </section>
</template>