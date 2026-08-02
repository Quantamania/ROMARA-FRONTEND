<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { BlogPost } from '@/features/blog/types/blog.types'
import blogPostsData from '@/data/blogPosts.json'
import BaseButton from '@/components/ui/BaseButton.vue'
import Pill from '@/components/ui/Pill.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconCompass from '@/components/icons/IconCompass.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconTag from '@/components/icons/IconTag.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconX from '@/components/icons/IconX.vue'
import IconMapPinRoute from '@/components/icons/IconMapPinRoute.vue'

const categoryLabels: Record<string, string> = {
  'safari-tips': 'Safari Tips',
  destinations: 'Destinations',
  'travel-guides': 'Travel Guides',
  wildlife: 'Wildlife',
  'travel-news': 'Travel News',
  'culture-people': 'Culture & People',
}

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
  <div v-if="currentPost" class="bg-romara-bone">
    <!-- Hero: full-bleed image masthead with a blueprint overlay -->
    <section class="relative isolate flex min-h-[560px] items-end overflow-hidden bg-romara-green text-white lg:min-h-[660px]">
      <img
        :src="currentPost.image"
        :alt="currentPost.title"
        class="ken-burns absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div class="absolute inset-0 -z-10 bg-scrim-b" />
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-romara-green-dark/85 via-romara-green-dark/35 to-transparent" />

      <!-- Blueprint grid over the masthead -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 text-white opacity-[0.07] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:42px_42px]"
      />
      <!-- Corner ticks -->
      <span aria-hidden="true" class="pointer-events-none absolute left-5 top-5 h-6 w-6 border-l border-t border-white/40 sm:left-8 sm:top-8" />
      <span aria-hidden="true" class="pointer-events-none absolute right-5 top-5 h-6 w-6 border-r border-t border-white/40 sm:right-8 sm:top-8" />
      <span aria-hidden="true" class="pointer-events-none absolute bottom-5 left-5 h-6 w-6 border-b border-l border-white/40 sm:bottom-8 sm:left-8" />
      <span aria-hidden="true" class="pointer-events-none absolute bottom-5 right-5 h-6 w-6 border-b border-r border-white/40 sm:bottom-8 sm:right-8" />

      <div class="absolute inset-x-0 top-6">
        <div class="romara-container">
          <button
            type="button"
            @click="goBack"
            class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors hover:border-romara-amber hover:text-romara-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/50"
          >
            <IconArrowLeft class="h-4 w-4" />
            <span>Back to Blog</span>
          </button>
        </div>
      </div>

      <div class="romara-container relative pb-16 pt-32 lg:pb-20">
        <div class="max-w-3xl">
          <h1 class="font-heading text-display font-semibold leading-[1.05] text-balance">
            {{ currentPost.title }}
          </h1>
          <div class="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm font-medium text-white/80">
            <span class="inline-flex items-center gap-2.5">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-romara-amber-300 backdrop-blur-sm">
                <IconCompass class="h-4 w-4" />
              </span>
              ROMARA Team
            </span>
            <span aria-hidden="true" class="h-4 w-px bg-white/25" />
            <span class="inline-flex items-center gap-1.5">
              <IconCalendar class="h-4 w-4 text-romara-amber-300" />
              {{ formatDate(currentPost.publishedAt) }}
            </span>
            <span aria-hidden="true" class="h-4 w-px bg-white/25" />
            <span class="inline-flex items-center gap-1.5">
              <IconClock class="h-4 w-4 text-romara-amber-300" />
              {{ currentPost.readTimeMinutes }} min read
            </span>
            <span
              class="inline-flex items-center gap-1.5 border border-white/30 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/90"
            >
              <IconTag class="h-3.5 w-3.5 text-romara-amber-300" />
              {{ categoryLabels[currentPost.category] ?? currentPost.category }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Long-form article: the blueprint reading room -->
    <section class="section-y relative isolate overflow-hidden bg-romara-bone">
      <!-- Fine blueprint grid, spread down the whole reading body -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 text-romara-green opacity-[0.035] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:38px_38px]"
      />
      <!-- Major vertical gutter guides -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 text-romara-green opacity-[0.05] [background-image:linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:114px_100%]"
      />

      <div class="romara-container">
        <article class="relative mx-auto max-w-3xl">
          <!-- Ruled left/right margin lines flanking the reading column (md+) -->
          <span aria-hidden="true" class="pointer-events-none absolute -left-7 top-0 hidden h-full w-px bg-romara-green/15 md:block" />
          <span aria-hidden="true" class="pointer-events-none absolute -right-7 top-0 hidden h-full w-px bg-romara-green/15 md:block" />
          <!-- Column corner ticks (md+) -->
          <span aria-hidden="true" class="pointer-events-none absolute -left-7 -top-2 hidden h-4 w-4 border-l border-t border-romara-amber/50 md:block" />
          <span aria-hidden="true" class="pointer-events-none absolute -right-7 -top-2 hidden h-4 w-4 border-r border-t border-romara-amber/50 md:block" />

          <div v-scroll-reveal>
            <template v-for="(section, index) in contentSections" :key="index">
              <p
                v-if="section.type === 'paragraph'"
                class="leading-[1.9] text-romara-ink-soft"
                :class="index === 0 ? 'article-lede mb-8 text-xl text-romara-ink [--dropcap:theme(colors.romara.green)]' : 'mb-7 text-lg'"
              >
                {{ section.content }}
              </p>

              <h2
                v-else-if="section.type === 'heading'"
                class="mb-6 mt-14 flex items-baseline gap-4 border-t border-dashed border-romara-green/20 pt-8 font-heading text-2xl font-semibold text-romara-green sm:text-3xl"
              >
                <span
                  aria-hidden="true"
                  class="mt-1 shrink-0 font-sans text-xs font-bold tracking-[0.18em] text-romara-amber-600"
                >{{ String(index + 1).padStart(2, '0') }}</span>
                <span>{{ section.content }}</span>
              </h2>

              <ul v-else-if="section.type === 'list'" class="my-8 space-y-4">
                <li
                  v-for="(item, itemIndex) in section.items"
                  :key="itemIndex"
                  class="flex gap-4 text-lg leading-relaxed text-romara-ink-soft"
                >
                  <!-- Drawn blueprint crosshair marker -->
                  <span aria-hidden="true" class="relative mt-2.5 h-3 w-3 shrink-0 text-romara-amber">
                    <span class="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                    <span class="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                  </span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </template>
          </div>

          <blockquote
            v-scroll-reveal="{ delay: 100 }"
            class="relative my-12 overflow-hidden rounded-card bg-romara-green px-7 py-8 shadow-elevated"
          >
            <div class="absolute inset-0 bg-green-fade opacity-50" />
            <!-- Blueprint grid inside the callout -->
            <div
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 text-white opacity-[0.06] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:30px_30px]"
            />
            <span aria-hidden="true" class="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-romara-amber/60" />
            <span aria-hidden="true" class="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-romara-amber/60" />
            <div class="relative flex gap-5">
              <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-romara-amber text-white shadow-glow-amber">
                <IconCompass class="h-6 w-6" />
              </span>
              <div>
                <p class="eyebrow text-romara-amber-300">Quick Travel Tip</p>
                <p class="mt-2 font-heading text-lg leading-relaxed text-white">
                  Use the golden hours of sunrise and sunset for the best safari photos — keep your camera ready.
                </p>
              </div>
            </div>
          </blockquote>

          <!-- Tags + share -->
          <div class="mt-12 flex flex-col gap-6 border-t border-dashed border-romara-green/25 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-[0.14em] text-romara-ink-soft">Filed under</span>
              <Pill tone="cream">{{ categoryLabels[currentPost.category] ?? currentPost.category }}</Pill>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs font-bold uppercase tracking-[0.14em] text-romara-ink-soft">Share</span>
              <a
                href="#"
                aria-label="Share on Facebook"
                class="flex h-11 w-11 items-center justify-center rounded-full border border-romara-green/15 bg-white text-romara-green shadow-soft transition-all hover:-translate-y-0.5 hover:bg-romara-green hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/40"
              ><IconFacebook class="h-4 w-4" /></a>
              <a
                href="#"
                aria-label="Share on X"
                class="flex h-11 w-11 items-center justify-center rounded-full border border-romara-green/15 bg-white text-romara-green shadow-soft transition-all hover:-translate-y-0.5 hover:bg-romara-green hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/40"
              ><IconX class="h-4 w-4" /></a>
              <a
                href="#"
                aria-label="Copy link"
                class="flex h-11 w-11 items-center justify-center rounded-full border border-romara-green/15 bg-white text-romara-green shadow-soft transition-all hover:-translate-y-0.5 hover:bg-romara-green hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/40"
              ><IconMapPinRoute class="h-4 w-4" /></a>
            </div>
          </div>

          <!-- Prev / next -->
          <nav v-if="previousPost || nextPost" v-scroll-reveal="{ delay: 150 }" class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <a
              v-if="previousPost"
              :href="`/blog/${previousPost.slug}`"
              class="group relative min-h-[160px] overflow-hidden rounded-card shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-elevated"
            >
              <img
                :src="previousPost.image"
                :alt="previousPost.title"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-romara-green/75 transition-colors group-hover:bg-romara-green/85" />
              <div class="relative flex h-full flex-col justify-end p-6">
                <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-romara-amber-300">
                  <IconArrowLeft class="h-3.5 w-3.5" />
                  Previous
                </span>
                <h4 class="mt-2 font-heading text-lg font-semibold text-white">{{ previousPost.title }}</h4>
              </div>
            </a>

            <a
              v-if="nextPost"
              :href="`/blog/${nextPost.slug}`"
              class="group relative min-h-[160px] overflow-hidden rounded-card shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-elevated sm:col-start-2"
            >
              <img
                :src="nextPost.image"
                :alt="nextPost.title"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-romara-green/75 transition-colors group-hover:bg-romara-green/85" />
              <div class="relative flex h-full flex-col justify-end p-6 text-right">
                <span class="inline-flex items-center justify-end gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-romara-amber-300">
                  Next
                  <IconArrowRight class="h-3.5 w-3.5" />
                </span>
                <h4 class="mt-2 font-heading text-lg font-semibold text-white">{{ nextPost.title }}</h4>
              </div>
            </a>
          </nav>
        </article>
      </div>
    </section>

    <!-- Related posts -->
    <section v-if="relatedPosts.length" class="section-y bg-romara-bone">
      <div class="romara-container">
        <div class="mb-10">
          <p class="eyebrow mb-3">
            
            Keep reading
          </p>
          <h2 class="font-heading text-display-sm font-semibold text-romara-green">Related stories</h2>
          <span class="accent-rule mt-4" />
        </div>

        <div
          class="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <a
            v-for="(post, index) in relatedPosts"
            :key="post.id"
            :href="`/blog/${post.slug}`"
            class="group flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-card bg-white shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated sm:w-auto sm:shrink"
            v-scroll-reveal="{ delay: index * 90 }"
          >
            <div v-if="post.image" class="relative overflow-hidden">
              <img
                :src="post.image"
                :alt="post.title"
                class="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-scrim-b opacity-50" />
            </div>
            <div class="flex flex-1 flex-col p-6">
              <p class="text-[11px] font-bold uppercase tracking-[0.12em] text-romara-amber-600">
                {{ categoryLabels[post.category] ?? post.category }}
              </p>
              <h3 class="mt-2 font-heading text-lg font-semibold leading-snug text-romara-green transition-colors group-hover:text-romara-amber">
                {{ post.title }}
              </h3>
              <p class="mt-4 flex items-center gap-1 border-t border-romara-green/10 pt-4 text-xs font-medium text-romara-ink-soft">
                {{ formatDate(post.publishedAt) }}
                <IconArrowRight class="ml-auto h-3.5 w-3.5 text-romara-green transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Ready for Adventure CTA -->
    <section class="section-y relative isolate overflow-hidden bg-romara-green text-white">
      <div class="absolute inset-0 -z-10 bg-green-fade opacity-60" />
      <div class="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-romara-amber/10 blur-3xl" />
      <div class="absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <div class="romara-container">
        <div class="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div class="max-w-xl">
            <p class="eyebrow text-romara-amber-300">
              
              Inspired by this story?
            </p>
            <h2 class="mt-4 font-heading text-display-sm font-semibold text-white">
              Ready to experience it for yourself?
            </h2>
            <p class="mt-3 text-base leading-relaxed text-white/75">
              Explore our carefully curated safari packages and make your travel dreams a reality.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:shrink-0 sm:flex-row">
            <BaseButton as="a" href="/safari-packages" variant="amber" size="lg">Browse Packages</BaseButton>
            <BaseButton as="a" href="/contact" variant="ghost" size="lg">Plan Your Trip</BaseButton>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Not Found -->
  <div v-else class="romara-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
    <p class="eyebrow justify-center">
      
      404
    </p>
    <h1 class="mt-4 font-heading text-display-sm font-semibold text-romara-green">Post Not Found</h1>
    <p class="mt-3 text-romara-ink-soft">The blog post you're looking for doesn't exist.</p>
    <BaseButton class="mt-8" variant="primary" @click="goBack">Back to Blog</BaseButton>
  </div>
</template>

<style scoped>
/* Editorial drop cap on the article lede — colour driven by the --dropcap
   token variable set on the element, so no hard-coded hex. */
.article-lede::first-letter {
  float: left;
  margin: 0.05em 0.12em 0 0;
  font-family: theme('fontFamily.serif', serif);
  font-weight: 600;
  font-size: 3.4em;
  line-height: 0.72;
  color: var(--dropcap, currentColor);
}
</style>
