<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { BlogCategory, BlogPost } from '@/features/blog/types/blog.types'
import blogPostsData from '@/data/blogPosts.json'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconMail from '@/components/icons/IconMail.vue'
import NewsletterForm from '@/features/blog/components/NewsletterForm.vue'

const route = useRoute()
const router = useRouter()
const allPosts = blogPostsData as BlogPost[]

const categoryLabels: Record<BlogCategory, string> = {
  'safari-tips': 'Safari Tips',
  destinations: 'Destinations',
  'travel-guides': 'Travel Guides',
  wildlife: 'Wildlife',
  'travel-news': 'Travel News',
  'culture-people': 'Culture & People',
}

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
    <!-- Back button -->
    <div class="bg-gradient-to-r from-romara-green/5 to-romara-amber/5 py-4">
      <div class="flex justify-between items-center romara-container">
        <button
          @click="goBack"
          class="flex items-center gap-2 font-semibold text-romara-green hover:text-romara-amber text-sm transition-colors"
        >
          <IconArrowLeft class="w-4 h-4" />
          Back to Blog
        </button>
      </div>
    </div>

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

      <!-- Decorative number -->
      <div class="hidden lg:block top-10 right-10 absolute font-heading font-bold text-white/5 text-9xl">BLOG</div>

      <div class="relative py-20 lg:py-32 romara-container">
        <div class="max-w-3xl">
          <!-- Category badge -->
          <div class="inline-flex mb-6">
            <span class="bg-romara-amber px-4 py-2 rounded-full font-semibold text-white text-sm uppercase tracking-widest">
              {{ categoryLabels[currentPost.category] }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="mb-6 font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {{ currentPost.title }}
          </h1>

          <!-- Excerpt -->
          <p class="mb-8 max-w-2xl text-white/90 text-lg sm:text-xl leading-relaxed">
            {{ currentPost.excerpt }}
          </p>

          <!-- Meta info -->
          <div class="flex flex-wrap items-center gap-6 text-white/80 text-sm">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-romara-amber">Published</span>
              <span>{{ formatDate(currentPost.publishedAt) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold text-romara-amber">Read</span>
              <span>{{ currentPost.readTimeMinutes }} min</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold text-romara-amber">Views</span>
              <span>{{ currentPost.views.toLocaleString() }}</span>
            </div>
          </div>

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
                  class="group bg-romara-green/5 hover:bg-romara-green/10 p-6 border border-romara-green/20 hover:border-romara-green rounded-lg transition-colors"
                >
                  <span class="font-semibold text-romara-green text-sm uppercase tracking-wide">← Previous Post</span>
                  <h4 class="mt-2 font-bold text-romara-green group-hover:text-romara-amber text-lg">{{ previousPost.title }}</h4>
                </a>

                <a
                  v-if="nextPost"
                  :href="`/blog/${nextPost.slug}`"
                  class="group bg-romara-green/5 hover:bg-romara-green/10 p-6 border border-romara-green/20 hover:border-romara-green rounded-lg text-right transition-colors"
                >
                  <span class="font-semibold text-romara-green text-sm uppercase tracking-wide">Next Post →</span>
                  <h4 class="mt-2 font-bold text-romara-green group-hover:text-romara-amber text-lg">{{ nextPost.title }}</h4>
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

    <!-- Newsletter Section -->
    <section class="relative bg-gradient-to-r from-romara-amber/10 via-romara-green/5 to-romara-amber/10 py-12 overflow-hidden">
      <!-- Decorative shapes -->
      <div class="top-0 right-0 absolute bg-romara-amber/3 blur-3xl rounded-full w-96 h-96 pointer-events-none" />
      <div class="bottom-0 left-0 absolute bg-romara-green/3 blur-3xl rounded-full w-80 h-80 pointer-events-none" />
      
      <div class="z-10 relative romara-container">
        <div class="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-6 py-6">
          <div class="flex items-center gap-4">
            <span class="flex justify-center items-center bg-gradient-to-br from-romara-green to-romara-amber shadow-lg rounded-full w-14 h-14 text-white shrink-0">
              <IconMail class="w-6 h-6" />
            </span>
            <div>
              <p class="font-bold text-romara-green text-lg">Stay Updated</p>
              <p class="mt-1 text-romara-ink/60 text-sm">Get the latest travel stories delivered to your inbox.</p>
            </div>
          </div>

          <NewsletterForm />
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
