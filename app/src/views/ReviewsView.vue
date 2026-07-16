<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CallToActionBar from '@/components/ui/CallToActionBar.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconTripadvisor from '@/components/icons/IconTripadvisor.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import RatingOverview from '@/features/reviews/components/RatingOverview.vue'
import ReviewCard from '@/features/reviews/components/ReviewCard.vue'
import reviewsData from '@/data/reviews.json'
import galleryImagesData from '@/data/galleryImages.json'
import type { Review, ReviewCategory } from '@/features/reviews/api/reviews.api'
import type { GalleryImage } from '@/features/gallery/api/gallery.api'

const allReviews = reviewsData as Review[]
const guestMoments = (galleryImagesData as GalleryImage[]).slice(0, 6)

type SortOption = 'recent' | 'highest'
type FeedItem = { type: 'review'; review: Review } | { type: 'photos'; photos: GalleryImage[] }

const selectedCategory = ref<ReviewCategory | 'all'>('all')
const sortOption = ref<SortOption>('recent')
const visibleCount = ref(4)

const tabs = computed(function getTabsWithCounts() {
  const base: { label: string; value: ReviewCategory | 'all' }[] = [
    { label: 'All Reviews', value: 'all' },
    { label: 'Safari Packages', value: 'safari' },
    { label: 'Day Trips', value: 'day-trips' },
    { label: 'Airport Transfers', value: 'airport-transfers' },
    { label: 'Destinations', value: 'destinations' },
  ]
  return base.map((tab) => ({
    ...tab,
    count: tab.value === 'all' ? allReviews.length : allReviews.filter((r) => r.category === tab.value).length,
  }))
})

const filteredReviews = computed(function getFilteredReviews() {
  const filtered =
    selectedCategory.value === 'all'
      ? allReviews
      : allReviews.filter((review) => review.category === selectedCategory.value)

  const sorted = [...filtered]
  sorted.sort(function compareReviews(a, b) {
    if (sortOption.value === 'highest') return b.rating - a.rating
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  return sorted
})

const visibleReviews = computed(function getVisibleReviews() {
  return filteredReviews.value.slice(0, visibleCount.value)
})

const hasMoreReviews = computed(function checkHasMoreReviews() {
  return visibleCount.value < filteredReviews.value.length
})

// Weaves a 3-photo "Guest Moments" strip into the feed every 3 reviews,
// cycling through the guest photo set, instead of a separate section at
// the bottom of the page.
const feedItems = computed(function getFeedItems() {
  const items: FeedItem[] = []
  const photoGroupSize = 3

  visibleReviews.value.forEach(function addReviewAndMaybePhotos(review, index) {
    items.push({ type: 'review', review })

    if ((index + 1) % 3 === 0 && guestMoments.length > 0) {
      const totalGroups = Math.max(1, Math.floor(guestMoments.length / photoGroupSize))
      const groupIndex = Math.floor(index / 3) % totalGroups
      const start = groupIndex * photoGroupSize
      items.push({ type: 'photos', photos: guestMoments.slice(start, start + photoGroupSize) })
    }
  })

  return items
})

function selectTab(value: ReviewCategory | 'all') {
  selectedCategory.value = value
  visibleCount.value = 4
}

function loadMoreReviews() {
  visibleCount.value += 4
}
</script>

<template>
  <!-- Hero: floating review bubbles over the photo -->
  <section class="relative isolate min-h-[520px] overflow-hidden bg-romara-green text-white sm:min-h-[580px]">
    <img
      src="/src/assets/images/reviews/hero.png"
      alt="Safari vehicle with elephants at sunset"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />

    <div class="romara-container relative flex min-h-[520px] items-center py-16 sm:min-h-[580px]">
      <div class="max-w-xl">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">Reviews</p>
        <h1 class="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">
          Memories Shared. Experiences Trusted.
        </h1>
        <span class="mt-3 block h-1 w-14 rounded bg-romara-amber" />
        <p class="mt-4 text-base leading-relaxed text-white/85">
          See what our guests have to say about their adventures with ROMARA Tours &amp; Travel.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton as="a" href="#guest-reviews" variant="amber" size="lg">View Reviews</BaseButton>
          <BaseButton as="a" href="/book-now" variant="outline" size="lg">Book Your Adventure</BaseButton>
        </div>
      </div>
    </div>

    <div class="pointer-events-none absolute right-10 top-16 hidden w-56 -rotate-2 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-md lg:block">
      <div class="flex gap-0.5 text-romara-amber">
        <IconStar v-for="n in 5" :key="n" class="h-3.5 w-3.5" />
      </div>
      <p class="mt-2 text-xs leading-relaxed text-white/90">
        &ldquo;An unforgettable experience from start to finish.&rdquo;
      </p>
      <p class="mt-2 text-[11px] font-semibold text-white/60">Sarah J. — Maasai Mara</p>
    </div>

    <div class="pointer-events-none absolute bottom-24 right-24 hidden w-52 rotate-1 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-md xl:block">
      <div class="flex gap-0.5 text-romara-amber">
        <IconStar v-for="n in 5" :key="n" class="h-3.5 w-3.5" />
      </div>
      <p class="mt-2 text-xs leading-relaxed text-white/90">&ldquo;On time, professional and comfortable.&rdquo;</p>
      <p class="mt-2 text-[11px] font-semibold text-white/60">James O. — Airport Transfer</p>
    </div>
  </section>

  <!-- Rating overview, overlapping the hero bottom -->
  <section class="romara-container relative z-10 -mt-12 sm:-mt-16">
    <RatingOverview />
  </section>

  <!-- Reviews: sticky sidebar filter + single-column editorial feed with photos woven in -->
  <section id="guest-reviews" class="romara-container py-16">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">What Our Guests Are Saying</h2>
      <span class="mt-2 block h-1 w-14 rounded bg-romara-amber" />
    </div>

    <div class="flex flex-col gap-8 lg:flex-row lg:items-start">
      <!-- Sidebar -->
      <aside class="w-full shrink-0 lg:sticky lg:top-24 lg:w-64">
        <div class="rounded-lg bg-white p-5 shadow-card">
          <p class="text-xs font-bold uppercase tracking-wide text-romara-ink/50">Filter by Experience</p>
          <div class="mt-4 flex flex-col gap-1">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              type="button"
              class="flex items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors"
              :class="selectedCategory === tab.value ? 'bg-romara-green text-white' : 'text-romara-ink hover:bg-romara-cream'"
              @click="selectTab(tab.value)"
            >
              <span>{{ tab.label }}</span>
              <span
                class="rounded-full px-2 py-0.5 text-xs"
                :class="selectedCategory === tab.value ? 'bg-white/20 text-white' : 'bg-romara-cream text-romara-ink/60'"
              >
                {{ tab.count }}
              </span>
            </button>
          </div>

          <hr class="my-4 border-black/5" />

          <p class="text-xs font-bold uppercase tracking-wide text-romara-ink/50">Sort By</p>
          <select
            v-model="sortOption"
            class="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-romara-ink focus:border-romara-green focus:outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
          </select>
        </div>
      </aside>

      <!-- Feed -->
      <div class="min-w-0 flex-1 space-y-6">
        <p v-if="visibleReviews.length === 0" class="text-sm text-romara-ink/60">
          No reviews in this category yet.
        </p>

        <template v-for="(item, index) in feedItems" :key="index">
          <ReviewCard
            v-if="item.type === 'review'"
            :review="item.review"
            layout="feed"
            v-scroll-reveal="{ delay: (index % 3) * 80 }"
          />

          <div v-else>
            <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-romara-ink/40">Guest Moments</p>
            <div class="grid grid-cols-3 gap-3">
              <a
                v-for="photo in item.photos"
                :key="photo.id"
                href="/gallery"
                class="group block overflow-hidden rounded-lg"
              >
                <img
                  :src="photo.src"
                  :alt="photo.alt"
                  class="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </template>

        <div class="flex flex-col items-center gap-4 pt-2">
          <button
            v-if="hasMoreReviews"
            type="button"
            class="flex items-center gap-2 rounded-full border border-romara-green px-6 py-3 text-xs font-semibold uppercase tracking-wide text-romara-green transition-colors hover:bg-romara-green hover:text-white"
            @click="loadMoreReviews"
          >
            View More Reviews
          </button>
          <BaseButton as="a" href="/gallery" variant="outline">View More Photos</BaseButton>
        </div>
      </div>
    </div>
  </section>

  <!-- TripAdvisor banner -->
  <section class="romara-container pb-8">
    <div class="flex flex-col gap-5 rounded-lg bg-romara-green p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div class="flex items-center gap-4">
        <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#34E0A1] text-romara-green">
          <IconTripadvisor class="h-6 w-6" />
        </span>
        <div>
          <p class="text-lg font-bold">Top Rated On TripAdvisor</p>
          <p class="mt-1 text-sm text-white/70">
            Thank you to all our guests for your amazing reviews and for making us one of the top-rated safari
            companies in Kenya.
          </p>
        </div>
      </div>

      <BaseButton as="a" href="https://www.tripadvisor.com" variant="amber" class="shrink-0">
        View Our TripAdvisor Reviews
      </BaseButton>
    </div>
  </section>

  <CallToActionBar
    title="Ready to Create Your Own Adventure?"
    subtitle="Join our happy travellers and discover the beauty of Kenya with ROMARA."
    :icon="IconHeadset"
  />
</template>