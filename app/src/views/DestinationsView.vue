<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import DestinationCard from '@/features/destinations/components/DestinationCard.vue'
import DestinationDetailModal from '@/features/destinations/components/DestinationDetailModal.vue'
import DestinationFilters from '@/features/destinations/components/DestinationFilters.vue'
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

</script>

<template>
  <!-- HERO 1 — Bento Gallery Hero: headline + search beside a bento grid of
       destination tiles, so the places are showcased immediately. -->
  <section class="relative isolate overflow-hidden bg-green-fade text-white">
    <img
      src="/images/gallery/giraffes.webp"
      alt="Giraffes in the savannah"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover opacity-25"
    />
    <div class="absolute inset-0 bg-romara-green/70" aria-hidden="true" />
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
            Extraordinary Places <span class="block text-romara-amber">&</span> Experiences.
          </h1>

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
      <!-- One statement, one decision. This was a two-column split with glass
           pill chips on the left and a bordered glass card on the right, each
           carrying its own icon, heading and paragraph — three competing
           surfaces saying the same thing. -->
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow text-romara-amber-300">Why Visit Kenya?</p>

        <p class="mt-5 font-heading text-display-sm font-semibold leading-tight text-balance">
          &ldquo;Kenya is a land of breathtaking landscapes, diverse wildlife, rich cultures and warm
          hospitality.&rdquo;
        </p>

        <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <BaseButton as="a" href="/book-now" variant="amber" size="lg">Book Now</BaseButton>
          <BaseButton as="a" href="/contact" variant="ghost" size="lg">Request a Quote</BaseButton>
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
