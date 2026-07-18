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
  <div v-if="currentPost" class="min-h-screen bg-white">
    <!-- Back button -->
    <div class="bg-gradient-to-r from-romara-green/5 to-romara-amber/5 py-4">
      <div class="romara-container flex items-center justify-between">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-sm font-semibold text-romara-green hover:text-romara-amber transition-colors"
        >
          <IconArrowLeft class="h-4 w-4" />
          Back to Blog
        </button>
      </div>
    </div>

    <!-- Hero: Large left-side image with fading edge and themed content on the right -->
    <section class="relative overflow-hidden bg-romara-cream/60">
      <div class="romara-container py-12 sm:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-[1.6fr_0.9fr] gap-8 lg:gap-12 items-stretch">
          <!-- Left: Big Image (dominant) — simplified full image with subtle right overlay -->
          <div class="relative overflow-hidden lg:ml-0 rounded-[0.75rem]">
            <div class="relative h-[420px] sm:h-[520px] lg:h-[720px] overflow-hidden rounded-[0.75rem] shadow-2xl">
              <!-- Full image fills the left area; keep a small counter-skew for style but clip overflow -->
              <div class="h-full w-full overflow-hidden">
                <img
                  :src="currentPost.image"
                  :alt="currentPost.title"
                  class="h-full w-full object-cover filter brightness-95 contrast-105"
                />
              </div>

              <!-- Subtle right-side overlay to improve readability of the text panel -->
              <div class="absolute inset-0 pointer-events-none">
                <div class="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/0 to-white/80"></div>
                <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white/90 via-white/60 to-transparent"></div>
              </div>
            </div>
          </div>

          <!-- Right: Overlay text (no card) -->
          <div class="relative z-10 flex items-center">
            <div class="w-full p-0">
              <div class="inline-flex mb-3">
                <span class="rounded-full bg-romara-amber px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                  {{ categoryLabels[currentPost.category] }}
                </span>
              </div>

              <h1 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-romara-green mb-2 drop-shadow-sm">
                {{ currentPost.title }}
              </h1>

              <p class="text-base sm:text-lg text-romara-ink/75 mb-4">
                {{ currentPost.excerpt }}
              </p>

              <div class="flex flex-wrap gap-4 items-center text-sm text-romara-ink/60">
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-romara-green">Published</span>
                  <span>{{ formatDate(currentPost.publishedAt) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-romara-green">Read</span>
                  <span>{{ currentPost.readTimeMinutes }} min</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-romara-green">Views</span>
                  <span>{{ currentPost.views.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- decorative accents removed per request (image now fills area) -->
    </section>

    <!-- Main Content -->
    <div class="bg-gradient-to-b from-white to-romara-cream/40 py-12">
      <section class="romara-container relative">
        <article class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div class="rounded-[1rem] bg-white p-8 shadow-[0_20px_40px_rgba(16,185,129,0.06)]">
            <div class="prose prose-sm max-w-none text-romara-ink sm:prose-base">
              <template v-for="(section, index) in contentSections" :key="index">
                <p v-if="section.type === 'paragraph'" class="mb-6 leading-relaxed text-romara-ink/80">
                  {{ section.content }}
                </p>

                <h2 v-else-if="section.type === 'heading'" class="mb-4 mt-8 font-heading text-2xl font-bold text-romara-green">
                  {{ section.content }}
                </h2>

                <ul v-else-if="section.type === 'list'" class="mb-6 space-y-2 pl-6">
                  <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="flex items-start gap-3 text-romara-ink/80">
                    <span class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-romara-amber" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </template>
            </div>

            <div class="mt-10 rounded-lg bg-romara-green/5 p-6">
              <h3 class="text-lg font-bold text-romara-green">Quick Travel Tip</h3>
              <p class="mt-2 text-romara-ink/70 leading-relaxed">Use the golden hours of sunrise and sunset for the best safari photos — keep your camera ready.</p>
            </div>

            <nav v-if="previousPost || nextPost" class="mt-10 pt-8 border-t border-romara-green/10">
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <a
                  v-if="previousPost"
                  :href="`/blog/${previousPost.slug}`"
                  class="group rounded-lg border border-romara-ink/8 bg-romara-cream/60 p-4 transition hover:border-romara-green hover:bg-romara-green/5"
                >
                  <span class="text-xs font-semibold uppercase tracking-wide text-romara-ink/50">← Previous Post</span>
                  <h4 class="mt-2 text-base font-bold text-romara-green group-hover:text-romara-amber">{{ previousPost.title }}</h4>
                </a>

                <a
                  v-if="nextPost"
                  :href="`/blog/${nextPost.slug}`"
                  class="group rounded-lg border border-romara-ink/8 bg-romara-cream/60 p-4 text-right transition hover:border-romara-green hover:bg-romara-green/5"
                >
                  <span class="text-xs font-semibold uppercase tracking-wide text-romara-ink/50">Next Post →</span>
                  <h4 class="mt-2 text-base font-bold text-romara-green group-hover:text-romara-amber">{{ nextPost.title }}</h4>
                </a>
              </div>
            </nav>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-8 lg:sticky lg:top-24 lg:h-fit">
            <div class="rounded-lg bg-romara-green/5 p-6 shadow-[0_20px_40px_rgba(16,185,129,0.06)]">
              <div class="flex items-center gap-4">
                <div class="h-12 w-12 rounded-full bg-gradient-to-br from-romara-amber to-romara-green" />
                <div>
                  <p class="font-bold text-romara-green">ROMARA Team</p>
                  <p class="text-xs text-romara-ink/60">Travel Experts</p>
                </div>
              </div>
              <p class="mt-4 text-sm leading-relaxed text-romara-ink/70">Sharing insights and experiences from years of safari adventures.</p>
            </div>

            <div class="rounded-lg bg-white p-6 shadow-[0_20px_40px_rgba(16,185,129,0.04)]">
              <p class="font-bold text-romara-green text-sm mb-4">Share</p>
              <div class="space-y-2">
                <a href="#" class="block text-sm font-semibold text-romara-green hover:text-romara-amber transition-colors">Facebook →</a>
                <a href="#" class="block text-sm font-semibold text-romara-green hover:text-romara-amber transition-colors">Twitter →</a>
                <a href="#" class="block text-sm font-semibold text-romara-green hover:text-romara-amber transition-colors">Copy Link →</a>
              </div>
            </div>

            <div class="rounded-lg bg-romara-amber/5 p-6 shadow-[0_20px_40px_rgba(218,165,32,0.06)]">
              <h3 class="font-bold text-romara-green text-sm mb-4">Related</h3>
              <div class="space-y-3">
                <a v-for="post in relatedPosts" :key="post.id" :href="`/blog/${post.slug}`" class="block rounded-md bg-white/90 px-4 py-3 transition hover:bg-romara-green/5">
                  <h4 class="text-sm font-bold text-romara-green truncate">{{ post.title }}</h4>
                  <p class="mt-1 text-xs text-romara-ink/50">{{ formatDate(post.publishedAt) }}</p>
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
      <div class="absolute top-0 right-0 w-96 h-96 bg-romara-amber/3 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-romara-green/3 rounded-full blur-3xl pointer-events-none" />
      
      <div class="romara-container relative z-10">
        <div class="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-4">
            <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-romara-green to-romara-amber text-white shadow-lg">
              <IconMail class="h-6 w-6" />
            </span>
            <div>
              <p class="text-lg font-bold text-romara-green">Stay Updated</p>
              <p class="mt-1 text-sm text-romara-ink/60">Get the latest travel stories delivered to your inbox.</p>
            </div>
          </div>

          <NewsletterForm />
        </div>
      </div>
    </section>
  </div>

  <!-- Not Found -->
  <div v-else class="romara-container flex min-h-screen flex-col items-center justify-center py-16 text-center">
    <h1 class="text-4xl font-bold text-romara-green">Post Not Found</h1>
    <p class="mt-3 text-romara-ink/60">The blog post you're looking for doesn't exist.</p>
    <BaseButton class="mt-6" @click="goBack">Back to Blog</BaseButton>
  </div>
</template>
