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
  <!-- Hero: RATING-FORWARD DATA HERO — the score itself is the hero (no photo),
       set on a green field so it reads clearly apart from the photo heroes elsewhere. -->
  <section v-scroll-reveal class="isolate relative bg-green-fade overflow-hidden text-white">
    <!-- Atmospheric amber glow, purely decorative -->
    <div class="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-romara-amber/20 blur-3xl" />

    <div class="relative flex flex-col justify-center items-center py-20 sm:py-24 lg:py-28 text-center romara-container">
      <!-- Giant Fraunces score numeral. The staggered fade-up entrance is the
           one authored motion moment. -->
      <div class="flex items-start justify-center gap-3 animate-fade-up">
        <span class="font-heading font-semibold leading-none text-white text-[clamp(5rem,17vw,10rem)]">4.9</span>
        <span class="mt-3 font-heading text-white/45 text-2xl sm:text-3xl">/5</span>
      </div>

      <div class="flex gap-1.5 mt-4 text-romara-amber animate-fade-up" style="animation-delay: 80ms">
        <IconStar v-for="n in 5" :key="n" class="w-6 h-6 sm:w-7 sm:h-7" />
      </div>

      <p class="mt-4 font-semibold text-romara-amber-300 text-sm uppercase tracking-[0.22em] sm:text-base animate-fade-up" style="animation-delay: 140ms">
        from 450+ traveller reviews
      </p>

      <h1 class="mt-7 max-w-2xl font-heading text-display font-semibold text-balance animate-fade-up" style="animation-delay: 210ms">
        Memories Shared. Experiences Trusted.
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-white/80 text-base leading-relaxed sm:text-lg animate-fade-up" style="animation-delay: 280ms">
        See what our guests have to say about their adventures with ROMARA Tours &amp; Travel.
      </p>

      <!-- Platform trust badges -->
      <div class="flex flex-wrap justify-center items-center gap-3 mt-8 animate-fade-up" style="animation-delay: 340ms">
        <div class="glass flex items-center gap-2.5 rounded-full px-4 py-2.5">
          <svg class="w-5 h-5 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
          </svg>
          <span class="font-semibold text-white text-sm">Google</span>
          <span class="flex gap-0.5 text-romara-amber">
            <IconStar v-for="n in 5" :key="n" class="w-3 h-3" />
          </span>
        </div>

        <div class="glass flex items-center gap-2.5 rounded-full px-4 py-2.5">
          <IconTripadvisor class="w-5 h-5 shrink-0 text-[#34E0A1]" />
          <span class="font-semibold text-white text-sm">TripAdvisor</span>
          <span class="flex gap-0.5 text-romara-amber">
            <IconStar v-for="n in 5" :key="n" class="w-3 h-3" />
          </span>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-3.5 mt-9 animate-fade-up" style="animation-delay: 400ms">
        <BaseButton as="a" href="#guest-reviews" variant="amber" size="lg">View Reviews</BaseButton>
        <BaseButton as="a" href="/book-now" variant="ghost" size="lg">Book Your Adventure</BaseButton>
      </div>
    </div>
  </section>

  <!-- Rating sidebar + reviews list, two-column instead of stacked full-width sections -->
  <section id="guest-reviews" v-scroll-reveal-left class="py-16 romara-container">
    <div class="gap-10 grid grid-cols-1 lg:grid-cols-[320px_1fr]">
      <aside class="lg:top-24 lg:sticky lg:self-start">
        <RatingOverview />
      </aside>

      <div>
        <div class="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-4 mb-8">
          <div>
            <h2 class="font-bold text-romara-green text-2xl sm:text-3xl">What Our Guests Are Saying</h2>
            <span class="block bg-romara-amber mt-2 rounded w-14 h-1" />
          </div>

          <select
            v-model="sortOption"
            class="self-start lg:self-auto bg-white px-3 py-2 border border-black/10 focus:border-romara-green rounded-md focus:outline-none font-semibold text-romara-ink text-xs uppercase tracking-wide"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
          </select>
        </div>

        <div class="flex flex-wrap gap-2 mb-6">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="px-4 py-2 rounded-md font-semibold text-xs uppercase tracking-wide transition-colors"
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

        <p v-if="visibleReviews.length === 0" class="text-romara-ink/60 text-sm">
          No reviews in this category yet.
        </p>

        <!-- Quote wall: CSS-columns masonry so cards vary by length instead of
             locking into uniform rows. Single column on mobile, two at sm+. -->
        <div v-else class="columns-1 gap-6 sm:columns-2">
          <ReviewCard
            v-for="(review, index) in visibleReviews"
            :key="review.id"
            :review="review"
            v-scroll-reveal="{ delay: (index % 4) * 100 }"
          />
        </div>

        <div v-if="hasMoreReviews" class="flex justify-center lg:justify-start mt-8">
          <button
            type="button"
            class="flex items-center gap-2 hover:bg-romara-green px-6 py-3 border border-romara-green rounded-full font-semibold text-romara-green hover:text-white text-xs uppercase tracking-wide transition-colors"
            @click="loadMoreReviews"
          >
            View More Reviews
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Guest Moments: overlapping horizontal scroll strip -->
  <section v-scroll-reveal-right class="pb-16 romara-container">
    <h2 class="font-bold text-romara-green text-2xl sm:text-3xl">Guest Moments</h2>
    <p class="mt-1 text-romara-ink/60 text-sm">Real adventures. Real people. Real memories.</p>

    <div class="[&::-webkit-scrollbar]:hidden flex gap-4 mt-6 pb-2 [-ms-overflow-style:none] overflow-x-auto [scrollbar-width:none]">
      <a
        v-for="image in guestMoments"
        :key="image.id"
        href="/gallery"
        class="group block shadow-card rounded-lg w-40 sm:w-48 h-48 sm:h-56 overflow-hidden transition-transform hover:-translate-y-1 shrink-0"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </a>
    </div>

    <div class="flex justify-center mt-6">
      <BaseButton as="a" href="/gallery" variant="outline">View More Photos</BaseButton>
    </div>
  </section>

  <!-- TripAdvisor CTA: split two-tone card -->
  <section v-scroll-reveal-scale class="pb-8 romara-container">
    <div class="grid grid-cols-1 sm:grid-cols-[220px_1fr] shadow-card rounded-2xl overflow-hidden">
      <div class="flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-[#34E0A1] to-[#00A680] p-8 text-white text-center">
        <IconTripadvisor class="w-10 h-10" />
        <p class="font-heading font-bold text-3xl">4.8</p>
        <div class="flex gap-0.5">
          <IconStar v-for="n in 5" :key="n" class="w-4 h-4" />
        </div>
      </div>

      <div class="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 bg-romara-green p-6 sm:p-8 text-white">
        <div>
          <p class="font-bold text-lg">Top Rated On TripAdvisor</p>
          <p class="mt-1 text-white/70 text-sm">
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
  <section v-scroll-reveal-left class="pb-16 romara-container">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] shadow-card rounded-2xl overflow-hidden">
      <div class="bg-romara-green p-8 sm:p-12 text-white">
        <div class="flex -space-x-3">
          <span
            v-for="(initial, index) in reviewerInitials"
            :key="index"
            class="flex justify-center items-center bg-romara-amber border-2 border-romara-green rounded-full w-11 h-11 font-bold text-white text-sm"
          >
            {{ initial }}
          </span>
        </div>
        <p class="mt-3 font-semibold text-white/60 text-xs uppercase tracking-wide">
          Join 450+ Happy Travellers
        </p>

        <h2 class="mt-4 font-heading font-bold text-2xl sm:text-3xl">Ready to Create Your Own Adventure?</h2>
        <p class="mt-2 max-w-md text-white/75 text-sm">
          Join our happy travellers and discover the beauty of Kenya with ROMARA.
        </p>

        <div class="flex flex-wrap gap-3 mt-8">
          <BaseButton as="a" href="/book-now" variant="amber">Book Now</BaseButton>
          <BaseButton as="a" href="/contact" variant="outline">Request a Quote</BaseButton>
          <BaseButton as="a" href="https://wa.me/254700123456" variant="ghost">
            <IconWhatsapp class="w-4 h-4" />
            Chat on WhatsApp
          </BaseButton>
        </div>
      </div>

      <img
        :src="guestMoments[0].src"
        :alt="guestMoments[0].alt"
        class="hidden lg:block w-full h-full min-h-[280px] object-cover"
      />
    </div>
  </section>
</template>