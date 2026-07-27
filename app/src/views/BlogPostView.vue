<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { BlogPost } from '@/features/blog/types/blog.types'
import blogPostsData from '@/data/blogPosts.json'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'

const route = useRoute()
const router = useRouter()
const allPosts = blogPostsData as BlogPost[]

const slugParam = computed(() => route.params.slug as string)

const currentPost = computed(() => {
  return allPosts.find((post) => post.slug === slugParam.value)
})

const relatedPosts = computed(() => {
  if (!currentPost.value) return []
  return allPosts
    .filter((post) => post.category === currentPost.value!.category && post.slug !== slugParam.value)
    .slice(0, 3)
})

const currentPostIndex = computed(() => {
  return allPosts.findIndex((post) => post.slug === slugParam.value)
})

const previousPost = computed(() => {
  if (currentPostIndex.value <= 0) return null
  return allPosts[currentPostIndex.value - 1]
})

const nextPost = computed(() => {
  if (currentPostIndex.value >= allPosts.length - 1) return null
  return allPosts[currentPostIndex.value + 1]
})

function formatDate(isoDate: string | number | Date) {
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function goBack() {
  router.push('/blog')
}

// Mock content sections for demonstration
const contentSections = computed(() => {
  if (!currentPost.value) return []

  // In a real application, this would come from your blog data
  // For now, we're creating sample sections based on the post
  return [
    {
      type: 'paragraph',
      content: currentPost.value.excerpt,
    },
    {
      type: 'heading',
      content: 'Why This Matters',
    },
    {
      type: 'paragraph',
      content:
        "Whether you're planning your first adventure or your tenth, understanding these fundamentals will enhance your experience and help you make the most of your time in the wild. From packing essentials to wildlife safety protocols, every detail contributes to your overall journey.",
    },
    {
      type: 'heading',
      content: 'Key Points to Remember',
    },
    {
      type: 'list',
      items: [
        "Always follow your guide's instructions for safety",
        "Early morning and late afternoon are the best times for wildlife viewing",
        "Bring plenty of water and sun protection",
        "Keep noise levels low to avoid startling wildlife",
        "Respect wildlife and maintain a safe distance",
      ],
    },
    {
      type: 'paragraph',
      content:
        "These guidelines will help you have a memorable and responsible safari experience. Remember that wildlife conservation is everyone's responsibility, and your choices contribute to protecting these magnificent creatures for future generations.",
    },
  ]
})
</script>

<template>
  <div v-if="currentPost" class="bg-white min-h-screen">
    <!-- Hero: Full-width image with overlay content -->
    <section class="relative bg-romara-green min-h-[600px] overflow-hidden">
      <!-- Full-width background image -->
      <div class="absolute inset-0">
        <img
          :src="currentPost.image"
          :alt="currentPost.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-romara-green/95 via-romara-green/70 to-romara-green/40"></div>
        <div class="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-romara-green-dark to-transparent h-32"></div>
      </div>

      <div class="absolute inset-x-0 top-4 romara-container">
        <button
          type="button"
          @click="goBack"
          class="inline-flex items-center gap-2 text-sm font-semibold text-romara-amber transition-colors"
        >
          <IconArrowLeft class="w-4 h-4" />
          <span class="hidden sm:inline text-romara-amber">Back to Blog</span>
        </button>
      </div>

      <!-- Decorative number -->
      <div class="hidden lg:block top-10 right-10 absolute font-heading font-bold text-white/5 text-9xl">BLOG</div>

      <div class="relative flex items-end py-36 lg:py-56 romara-container">
        <div class="max-w-3xl">
          <!-- Category badge removed per design -->

          <!-- Title -->
          <h1 class="mb-6 font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {{ currentPost.title }}
          </h1>

          <!-- Excerpt removed per design -->

          <!-- Decorative accent line -->
          <div class="bg-romara-amber mt-10 rounded w-24 h-1"></div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="bg-gradient-to-b from-white to-romara-green/5 py-16 lg:py-20">
      <section class="romara-container">
        <article class="gap-12 grid grid-cols-1 lg:grid-cols-[1fr_320px]">
          <!-- Main content -->
          <div class="max-w-none">
            <div v-scroll-reveal class="max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-romara-green prose-headings:text-romara-green prose-p:text-romara-ink/80 hover:prose-a:underline prose-a:no-underline prose-p:leading-relaxed prose prose-lg">
              <template v-for="(section, index) in contentSections" :key="index">
                <p v-if="section.type === 'paragraph'" class="mb-6 text-lg leading-relaxed">
                  {{ section.content }}
                </p>

                <h2 v-else-if="section.type === 'heading'" class="mt-12 mb-6 font-bold text-romara-green text-3xl">
                  {{ section.content }}
                </h2>

                <ul v-else-if="section.type === 'list'" class="space-y-3 mb-6 pl-6">
                  <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="text-romara-ink/80 text-lg leading-relaxed">
                    {{ item }}
                  </li>
                </ul>
              </template>
            </div>

            <div v-scroll-reveal="{ delay: 100 }" class="bg-romara-green mt-12 p-6 border-romara-amber border-l-4 rounded-r-lg">
              <h3 class="font-bold text-white text-lg">Quick Travel Tip</h3>
              <p class="mt-2 text-white/90 text-base leading-relaxed">Use the golden hours of sunrise and sunset for the best safari photos — keep your camera ready.</p>
            </div>

            <nav v-if="previousPost || nextPost" v-scroll-reveal="{ delay: 200 }" class="mt-16 pt-8 border-romara-green/20 border-t">
              <div class="gap-6 grid grid-cols-1 sm:grid-cols-2">
                <a
                  v-if="previousPost"
                  :href="`/blog/${previousPost.slug}`"
                  class="group relative overflow-hidden rounded-lg border border-romara-green/20 transition hover:border-romara-green"
                  :style="{
                    backgroundImage: `url(${previousPost.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }"
                >
                  <div class="absolute inset-0 bg-romara-green/60 transition group-hover:bg-romara-green/70"></div>
                  <div class="relative p-6 min-h-[180px]">
                    <span class="font-semibold text-white text-sm uppercase tracking-wide">← Previous Post</span>
                    <h4 class="mt-2 font-bold text-white text-lg">{{ previousPost.title }}</h4>
                  </div>
                </a>

                <a
                  v-if="nextPost"
                  :href="`/blog/${nextPost.slug}`"
                  class="group relative overflow-hidden rounded-lg border border-romara-green/20 transition hover:border-romara-green"
                  :style="{
                    backgroundImage: `url(${nextPost.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }"
                >
                  <div class="absolute inset-0 bg-romara-green/60 transition group-hover:bg-romara-green/70"></div>
                  <div class="relative p-6 text-right min-h-[180px]">
                    <span class="font-semibold text-white text-sm uppercase tracking-wide">Next Post →</span>
                    <h4 class="mt-2 font-bold text-white text-lg">{{ nextPost.title }}</h4>
                  </div>
                </a>
              </div>
            </nav>
          </div>

          <!-- Sidebar with animations -->
          <aside class="lg:top-24 lg:sticky space-y-8 lg:h-fit">
            <div v-scroll-reveal-right class="bg-romara-green shadow-lg p-6 rounded-lg">
              <div class="flex items-center gap-4">
                <div class="bg-gradient-to-br from-romara-amber to-romara-green-dark rounded-full w-12 h-12 animate-pulse" />
                <div>
                  <p class="font-bold text-white">ROMARA Team</p>
                  <p class="text-white/70 text-xs">Travel Experts</p>
                </div>
              </div>
              <p class="mt-4 text-white/90 text-sm leading-relaxed">Sharing insights and experiences from years of safari adventures.</p>
            </div>

            <div v-scroll-reveal-right="{ delay: 100 }" class="bg-romara-green/10 p-6 border border-romara-green/30 rounded-lg">
              <p class="mb-4 font-bold text-romara-green text-sm">Share this post</p>
              <div class="space-y-2">
                <a href="#" class="group flex items-center gap-2 font-semibold text-romara-ink/70 hover:text-romara-green text-sm transition-colors">
                  <span class="flex justify-center items-center bg-romara-green/20 group-hover:bg-romara-green rounded-full w-8 h-8 group-hover:text-white transition-all">f</span>
                  Facebook
                </a>
                <a href="#" class="group flex items-center gap-2 font-semibold text-romara-ink/70 hover:text-romara-green text-sm transition-colors">
                  <span class="flex justify-center items-center bg-romara-green/20 group-hover:bg-romara-green rounded-full w-8 h-8 group-hover:text-white transition-all">t</span>
                  Twitter
                </a>
                <a href="#" class="group flex items-center gap-2 font-semibold text-romara-ink/70 hover:text-romara-green text-sm transition-colors">
                  <span class="flex justify-center items-center bg-romara-green/20 group-hover:bg-romara-green rounded-full w-8 h-8 group-hover:text-white transition-all">🔗</span>
                  Copy Link
                </a>
              </div>
            </div>

            <div v-scroll-reveal-right="{ delay: 200 }" class="bg-romara-amber/10 p-6 border border-romara-amber/30 rounded-lg">
              <h3 class="mb-4 font-bold text-romara-green text-sm">Related Posts</h3>
              <div class="space-y-3">
                <a v-for="(post, index) in relatedPosts" :key="post.id" :href="`/blog/${post.slug}`" class="block hover:bg-romara-amber/20 px-4 py-3 border border-romara-amber/20 hover:border-romara-amber/40 rounded-md transition" v-scroll-reveal="{ delay: 200 + index * 50 }">
                  <h4 class="font-bold text-romara-ink/80 text-sm truncate">{{ post.title }}</h4>
                  <p class="mt-1 text-romara-ink/50 text-xs">{{ formatDate(post.publishedAt) }}</p>
                </a>
              </div>
            </div>
          </aside>
        </article>
      </section>
    </div>

    <!-- Ready for Adventure CTA Section -->
    <section class="relative bg-gradient-to-r from-romara-green/5 via-romara-amber/5 to-romara-green/5 py-12 overflow-hidden">
      <!-- Decorative shapes -->
      <div class="top-0 right-0 absolute bg-romara-amber/3 blur-3xl rounded-full w-96 h-96 pointer-events-none" />
      <div class="bottom-0 left-0 absolute bg-romara-green/3 blur-3xl rounded-full w-80 h-80 pointer-events-none" />
      
      <div class="z-10 relative romara-container">
        <div class="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-8 py-6">
          <div class="flex-1">
            <p class="font-bold text-romara-green text-lg">Inspired by This Story?</p>
            <p class="mt-2 text-romara-ink/70 text-base leading-relaxed">Ready to experience the adventures you just read about? Explore our carefully curated safari packages and make your travel dreams a reality.</p>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 sm:shrink-0">
            <BaseButton as="a" href="/safari-packages" variant="primary" size="md">Browse Packages</BaseButton>
            <BaseButton as="a" href="/contact" variant="outline" size="md">Plan Your Trip</BaseButton>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Not Found -->
  <div v-else class="flex flex-col justify-center items-center py-16 min-h-screen text-center romara-container">
    <h1 class="font-bold text-romara-green text-4xl">Post Not Found</h1>
    <p class="mt-3 text-romara-ink/60">The blog post you're looking for doesn't exist.</p>
    <BaseButton class="mt-6" @click="goBack">Back to Blog</BaseButton>
  </div>
</template>
