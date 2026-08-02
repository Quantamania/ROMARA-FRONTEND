<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import DestinationCard from '@/features/destinations/components/DestinationCard.vue'
import DestinationDetailModal from '@/features/destinations/components/DestinationDetailModal.vue'
import DestinationFilters from '@/features/destinations/components/DestinationFilters.vue'
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import destinationsData from '@/data/destinations.json'
import type { Destination } from '@/features/destinations/types/destination.types'

const popularDestinations = destinationsData as Destination[]
const featuredDestination = popularDestinations[0]
const otherDestinations = popularDestinations.slice(1)


// Detail pop-out (modal) — clicking a card opens details over a blurred page.
const activeDestination = ref<Destination | null>(null)
function openDestination(destination: Destination) {
  activeDestination.value = destination
}
function closeDestination() {
  activeDestination.value = null
}


// Decorative hero showcase tiles — presentation only, reusing existing
// destination imagery so the places are showcased immediately in the masthead.
const heroTiles = [
  { name: 'Maasai Mara', image: '/images/destinations/maasai-mara.webp' },
  { name: 'Diani Beach', image: '/images/destinations/diani.webp' },
  { name: 'Amboseli', image: '/images/destinations/amboseli.webp' },
  { name: 'Lake Nakuru', image: '/images/destinations/lake-nakuru.webp' },
  { name: 'Nairobi', image: '/images/destinations/nairobi.webp' },
]

const whyVisitPoints = [
  'Diverse wildlife and national parks',
  'Beautiful beaches and coastlines',
  'Stunning landscapes and scenic views',
  'Year-round travel opportunities',
  'Vibrant cultures and traditions',
  'Warm, welcoming people',
]

</script>

<template>
  <!-- HERO 1 — Bento Gallery Hero: headline + search beside a bento grid of
       destination tiles, so the places are showcased immediately. -->
  <section class="relative isolate overflow-hidden bg-green-fade text-white">
    <div class="absolute inset-0 bg-scrim-b opacity-40" aria-hidden="true" />

    <div class="romara-container relative py-14 sm:py-20 lg:py-24">
      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <!-- Headline + search -->
        <div class="lg:col-span-5">
          <nav
            class="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60"
            aria-label="Breadcrumb"
          >
            <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
            <span class="text-white/30">/</span>
            <span class="text-white/85">Destinations</span>
          </nav>

          <h1 class="max-w-xl font-heading text-display font-semibold text-balance">
            Extraordinary Places. Unforgettable Experiences.
          </h1>
          <p class="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            From world-famous wildlife reserves and scenic landscapes to vibrant cities and cultural
            landmarks, explore the best destinations Kenya has to offer and beyond.
          </p>

        </div>

        <!-- Bento grid of destination tiles -->
        <div class="lg:col-span-7">
          <!-- Mobile / tablet: horizontal scroll strip, capped tile width, no overflow -->
          <ul
            class="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <li
              v-for="tile in heroTiles"
              :key="tile.name"
              class="relative w-[68vw] max-w-[16rem] shrink-0 snap-start overflow-hidden rounded-card shadow-elevated"
            >
              <img
                :src="tile.image"
                :alt="tile.name"
                loading="lazy"
                class="h-40 w-full object-cover"
              />
              <div class="absolute inset-0 bg-scrim-b" aria-hidden="true" />
              <span class="absolute bottom-3 left-3 font-heading text-sm font-semibold text-white">
                {{ tile.name }}
              </span>
            </li>
          </ul>

          <!-- Desktop: asymmetric bento grid with a large lead tile -->
          <div class="hidden grid-cols-6 gap-3 lg:grid" style="grid-auto-rows: 118px">
            <figure class="group relative col-span-4 row-span-2 overflow-hidden rounded-card shadow-elevated">
              <img
                src="/images/destinations/maasai-mara.webp"
                alt="Maasai Mara"
                class="ken-burns h-full w-full object-cover"
              />
              <div class="absolute inset-0 bg-scrim-b" aria-hidden="true" />
              <figcaption class="absolute bottom-4 left-4 font-heading text-xl font-semibold text-white">
                Maasai Mara
              </figcaption>
            </figure>
            <figure class="relative col-span-2 row-span-1 overflow-hidden rounded-card shadow-elevated">
              <img src="/images/destinations/diani.webp" alt="Diani Beach" class="h-full w-full object-cover" />
              <div class="absolute inset-0 bg-scrim-b" aria-hidden="true" />
              <figcaption class="absolute bottom-3 left-3 font-heading text-sm font-semibold text-white">Diani Beach</figcaption>
            </figure>
            <figure class="relative col-span-2 row-span-1 overflow-hidden rounded-card shadow-elevated">
              <img src="/images/destinations/amboseli.webp" alt="Amboseli" class="h-full w-full object-cover" />
              <div class="absolute inset-0 bg-scrim-b" aria-hidden="true" />
              <figcaption class="absolute bottom-3 left-3 font-heading text-sm font-semibold text-white">Amboseli</figcaption>
            </figure>
            <figure class="relative col-span-3 row-span-1 overflow-hidden rounded-card shadow-elevated">
              <img src="/images/destinations/lake-nakuru.webp" alt="Lake Nakuru" class="h-full w-full object-cover" />
              <div class="absolute inset-0 bg-scrim-b" aria-hidden="true" />
              <figcaption class="absolute bottom-3 left-3 font-heading text-sm font-semibold text-white">Lake Nakuru</figcaption>
            </figure>
            <figure class="relative col-span-3 row-span-1 overflow-hidden rounded-card shadow-elevated">
              <img src="/images/destinations/nairobi.webp" alt="Nairobi" class="h-full w-full object-cover" />
              <div class="absolute inset-0 bg-scrim-b" aria-hidden="true" />
              <figcaption class="absolute bottom-3 left-3 font-heading text-sm font-semibold text-white">Nairobi</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Popular Destinations: asymmetric editorial bento grid -->
  <section v-scroll-reveal class="section-y bg-white">
    <div class="romara-container">
      <!-- Editorial index header with an oversized numeral for depth -->
      <div class="relative mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div class="relative">
          <span
            class="pointer-events-none absolute -left-2 -top-10 select-none font-heading text-[6rem] font-semibold leading-none text-romara-green/5 sm:-top-14 sm:text-[9rem]"
            aria-hidden="true"
          >01</span>
          <div class="relative">
            <p class="eyebrow">Where to Go</p>
            <h2 class="mt-3 max-w-xl font-heading text-display-sm font-semibold text-romara-green text-balance">
              Popular Destinations in Kenya
            </h2>
            <p class="mt-4 max-w-lg text-sm leading-relaxed text-romara-ink-soft sm:text-base">
              A hand-picked selection of the country's most iconic reserves, coastlines and highland escapes.
            </p>
          </div>
        </div>
        <a
          href="/destinations/directory"
          class="group inline-flex shrink-0 items-center gap-1.5 self-start text-xs font-bold uppercase tracking-[0.14em] text-romara-green transition-colors hover:text-romara-amber sm:self-auto"
        >
          View All Destinations
          <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
        </a>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:grid-rows-2">
        <DestinationCard
          :destination="featuredDestination"
          featured
          class="sm:col-span-2 lg:col-span-2 lg:row-span-2"
          v-scroll-reveal
          @select="openDestination"
        />
        <DestinationCard
          v-for="(destination, index) in otherDestinations"
          :key="destination.id"
          :destination="destination"
          v-scroll-reveal="{ delay: (index + 1) * 100 }"
          @select="openDestination"
        />
      </div>
    </div>
  </section>

  <!-- Browse Destinations by Type -->
  <section v-scroll-reveal class="section-y bg-romara-bone">
    <div class="romara-container">
      <SectionHeading
        align="center"
        eyebrow="By Interest"
        title="Browse Destinations by Type"
        description="Whatever moves you — big game, mountain trails, ocean shores or living culture — start with what you love."
      />
      <div class="mt-4">
        <DestinationFilters />
      </div>
    </div>
  </section>

  <!-- Why Visit Kenya: immersive image band -->
  <section v-scroll-reveal class="relative isolate overflow-hidden bg-romara-green py-20 text-white sm:py-28">
    <img
      src="/images/destinations/maasai-mara.webp"
      alt="Maasai Mara landscape at golden hour"
      loading="lazy"
      class="ken-burns absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-romara-green/85" />
    <div class="absolute inset-0 bg-scrim-b" />

    <div class="romara-container relative">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Editorial quote block -->
        <div>
          <p class="eyebrow text-romara-amber-300">
            
            Why Visit Kenya?
          </p>
          <p class="mt-5 max-w-xl font-heading text-display-sm font-semibold leading-tight text-balance">
            &ldquo;Kenya is a land of breathtaking landscapes, diverse wildlife, rich cultures and warm
            hospitality.&rdquo;
          </p>
          <p class="mt-5 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            Whether you are seeking adventure, relaxation, or cultural immersion, Kenya offers experiences like
            no other.
          </p>

          <ul class="mt-8 flex flex-wrap gap-2.5">
            <li
              v-for="point in whyVisitPoints"
              :key="point"
              class="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white"
            >
              <IconCheck class="h-3.5 w-3.5 text-romara-amber-300" />
              {{ point }}
            </li>
          </ul>
        </div>

        <!-- CTA card -->
        <div class="lg:ml-auto lg:max-w-md">
          <div class="glass rounded-card border border-white/15 p-8 text-center sm:p-10">
            <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-fade shadow-glow-amber">
              <IconCalendarCheck class="h-8 w-8 text-white" />
            </div>
            <h3 class="font-heading text-2xl font-semibold text-white">Ready to Explore?</h3>
            <p class="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/80">
              Let ROMARA Tours &amp; Travel help you plan the perfect journey.
            </p>
            <div class="mt-7 flex flex-col gap-3">
              <BaseButton as="a" href="/book-now" variant="amber" size="lg" block>Book Now</BaseButton>
              <BaseButton as="a" href="/contact" variant="ghost" size="lg" block>Request a Quote</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Destination detail pop-out -->
  <DestinationDetailModal
    :destination="activeDestination"
    :open="!!activeDestination"
    @close="closeDestination"
  />
</template>
