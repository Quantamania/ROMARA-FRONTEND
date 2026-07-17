<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconTripadvisor from '@/components/icons/IconTripadvisor.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import RatingOverview from '@/features/reviews/components/RatingOverview.vue'
import ReviewCard from '@/features/reviews/components/ReviewCard.vue'
import reviewsData from '@/data/reviews.json'
import galleryImagesData from '@/data/galleryImages.json'
import type { Review, ReviewCategory } from '@/features/reviews/api/reviews.api'
import type { GalleryImage } from '@/features/gallery/api/gallery.api'

const allReviews = reviewsData as Review[]
const guestMoments = (galleryImagesData as GalleryImage[]).slice(0, 8)

// Real reviewer initials, used for the avatar stack on the closing banner —
// ties the CTA back to actual guests rather than generic stock icons.
const reviewerInitials = allReviews.slice(0, 6).map((review) => review.name.charAt(0).toUpperCase())

type SortOption = 'recent' | 'highest'

const selectedCategory = ref<ReviewCategory | 'all'>('all')
const sortOption = ref<SortOption>('recent')
const visibleCount = ref(4)

const tabs: { label: string; value: ReviewCategory | 'all' }[] = [
  { label: 'All Reviews', value: 'all' },
  { label: 'Safari Packages', value: 'safari' },
  { label: 'Day Trips', value: 'day-trips' },
  { label: 'Airport Transfers', value: 'airport-transfers' },
  { label: 'Destinations', value: 'destinations' },
]

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

function selectTab(value: ReviewCategory | 'all') {
  selectedCategory.value = value
  visibleCount.value = 4
}

function loadMoreReviews() {
  visibleCount.value += 4
}
</script>

<template>
  <!-- Hero: centered spotlight with the rating badge built in -->
  <section class="relative isolate min-h-[520px] overflow-hidden bg-romara-green text-white sm:min-h-[560px]">
    <img
      src="/src/assets/images/reviews/hero.png"
      alt="Safari vehicle with elephants at sunset"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-black/70" />

    <div class="romara-container relative flex min-h-[520px] flex-col items-center justify-center py-16 text-center sm:min-h-[560px]">
      <div class="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md">
        <span class="font-heading text-xl font-bold text-romara-amber">4.9</span>
        <div class="flex gap-0.5 text-romara-amber">
          <IconStar v-for="n in 5" :key="n" class="h-3.5 w-3.5" />
        </div>
        <span class="text-xs text-white/70">from 450+ reviews</span>
      </div>

      <p class="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">Reviews</p>
      <h1 class="mt-3 max-w-2xl font-heading text-4xl font-bold leading-tight sm:text-5xl">
        Memories Shared. Experiences Trusted.
      </h1>
      <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85">
        See what our guests have to say about their adventures with ROMARA Tours &amp; Travel.
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <BaseButton as="a" href="#guest-reviews" variant="amber" size="lg">View Reviews</BaseButton>
        <BaseButton as="a" href="/book-now" variant="outline" size="lg">Book Your Adventure</BaseButton>
      </div>
    </div>
  </section>

  <!-- Rating sidebar + reviews list, two-column instead of stacked full-width sections -->
  <section id="guest-reviews" class="romara-container py-16">
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
      <aside class="lg:sticky lg:top-24 lg:self-start">
        <RatingOverview />
      </aside>

      <div>
        <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">What Our Guests Are Saying</h2>
            <span class="mt-2 block h-1 w-14 rounded bg-romara-amber" />
          </div>

          <select
            v-model="sortOption"
            class="self-start rounded-md border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-romara-ink focus:border-romara-green focus:outline-none lg:self-auto"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
          </select>
        </div>

        <div class="mb-6 flex flex-wrap gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors"
            :class="
              selectedCategory === tab.value
                ? 'bg-romara-green text-white'
                : 'bg-white text-romara-ink border border-black/10 hover:border-romara-green'
            "
            @click="selectTab(tab.value)"
          >
            {{ tab.label }}
          </button>
        </div>

        <p v-if="visibleReviews.length === 0" class="text-sm text-romara-ink/60">
          No reviews in this category yet.
        </p>

        <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ReviewCard
            v-for="(review, index) in visibleReviews"
            :key="review.id"
            :review="review"
            v-scroll-reveal="{ delay: index * 100 }"
          />
        </div>

        <div v-if="hasMoreReviews" class="mt-8 flex justify-center lg:justify-start">
          <button
            type="button"
            class="flex items-center gap-2 rounded-full border border-romara-green px-6 py-3 text-xs font-semibold uppercase tracking-wide text-romara-green transition-colors hover:bg-romara-green hover:text-white"
            @click="loadMoreReviews"
          >
            View More Reviews
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Guest Moments: overlapping horizontal scroll strip -->
  <section class="romara-container pb-16">
    <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Guest Moments</h2>
    <p class="mt-1 text-sm text-romara-ink/60">Real adventures. Real people. Real memories.</p>

    <div class="mt-6 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <a
        v-for="image in guestMoments"
        :key="image.id"
        href="/gallery"
        class="group block h-48 w-40 shrink-0 overflow-hidden rounded-lg shadow-card transition-transform hover:-translate-y-1 sm:h-56 sm:w-48"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </a>
    </div>

    <div class="mt-6 flex justify-center">
      <BaseButton as="a" href="/gallery" variant="outline">View More Photos</BaseButton>
    </div>
  </section>

  <!-- TripAdvisor CTA: split two-tone card -->
  <section class="romara-container pb-8">
    <div class="grid grid-cols-1 overflow-hidden rounded-2xl shadow-card sm:grid-cols-[220px_1fr]">
      <div class="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#34E0A1] to-[#00A680] p-8 text-center text-white">
        <IconTripadvisor class="h-10 w-10" />
        <p class="font-heading text-3xl font-bold">4.8</p>
        <div class="flex gap-0.5">
          <IconStar v-for="n in 5" :key="n" class="h-4 w-4" />
        </div>
      </div>

      <div class="flex flex-col gap-4 bg-romara-green p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p class="text-lg font-bold">Top Rated On TripAdvisor</p>
          <p class="mt-1 text-sm text-white/70">
            Thank you to all our guests for your amazing reviews and for making us one of the top-rated safari
            companies in Kenya.
          </p>
        </div>
        <BaseButton as="a" href="https://www.tripadvisor.com" variant="amber" class="shrink-0">
          View Our TripAdvisor Reviews
        </BaseButton>
      </div>
    </div>
  </section>

  <!-- Closing CTA: photo-split banner with a real-guest avatar stack -->
  <section class="romara-container pb-16">
    <div class="grid grid-cols-1 overflow-hidden rounded-2xl shadow-card lg:grid-cols-[1fr_380px]">
      <div class="bg-romara-green p-8 text-white sm:p-12">
        <div class="flex -space-x-3">
          <span
            v-for="(initial, index) in reviewerInitials"
            :key="index"
            class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-romara-green bg-romara-amber text-sm font-bold text-white"
          >
            {{ initial }}
          </span>
        </div>
        <p class="mt-3 text-xs font-semibold uppercase tracking-wide text-white/60">
          Join 450+ Happy Travellers
        </p>

        <h2 class="mt-4 font-heading text-2xl font-bold sm:text-3xl">Ready to Create Your Own Adventure?</h2>
        <p class="mt-2 max-w-md text-sm text-white/75">
          Join our happy travellers and discover the beauty of Kenya with ROMARA.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton as="a" href="/book-now" variant="amber">Book Now</BaseButton>
          <BaseButton as="a" href="/contact" variant="outline">Request a Quote</BaseButton>
          <BaseButton as="a" href="https://wa.me/254700123456" variant="ghost">
            <IconWhatsapp class="h-4 w-4" />
            Chat on WhatsApp
          </BaseButton>
        </div>
      </div>

      <img
        :src="guestMoments[0].src"
        :alt="guestMoments[0].alt"
        class="hidden h-full min-h-[280px] w-full object-cover lg:block"
      />
    </div>
  </section>
</template>