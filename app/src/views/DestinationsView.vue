<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import CallToActionBar from '@/components/ui/CallToActionBar.vue'
import DestinationCard from '@/features/destinations/components/DestinationCard.vue'
import DestinationFilters from '@/features/destinations/components/DestinationFilters.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import destinationsData from '@/data/destinations.json'
import type { Destination, DestinationType } from '@/features/destinations/types/destination.types'

const popularDestinations = destinationsData as Destination[]
const featuredDestination = popularDestinations[0]
const otherDestinations = popularDestinations.slice(1)

const router = useRouter()
const searchQuery = ref('')
const selectedType = ref<DestinationType | 'all'>('all')

function handleSearchSubmit() {
  router.push({
    path: '/destinations/directory',
    query: {
      q: searchQuery.value || undefined,
      type: selectedType.value !== 'all' ? selectedType.value : undefined,
    },
  })
}

const whyVisitPoints = [
  'Diverse wildlife and national parks',
  'Beautiful beaches and coastlines',
  'Stunning landscapes and scenic views',
  'Year-round travel opportunities',
  'Vibrant cultures and traditions',
  'Warm, welcoming people',
]

interface Stat {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '47', label: 'Counties to Explore' },
  { value: '50+', label: 'Destinations' },
  { value: '1000+', label: 'Happy Explorers' },
]
</script>

<template>
  <!-- Hero: diagonal split, not full-bleed like every other page -->
  <section  v-scroll-reveal class="relative bg-romara-green overflow-hidden">
    <div
      class="hidden lg:block right-0 absolute inset-y-0 w-[58%] pointer-events-none"
      style="clip-path: polygon(14% 0, 100% 0, 100% 100%, 0 100%)"
    >
      <img
        src="/src/assets/images/destinations/hero.jpg"
        alt="Elephant herd at sunset in Kenya"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-romara-green/50 via-transparent to-transparent" />
    </div>

    <img
      src="/src/assets/images/destinations/hero.jpg"
      alt="Elephant herd at sunset in Kenya"
      class="lg:hidden w-full h-56 object-cover"
    />

    <div class="z-10 relative lg:flex lg:items-center py-14 lg:py-0 lg:min-h-[650px] romara-container">
      <div class="max-w-xl text-white">
        <p class="font-bold text-romara-amber text-sm uppercase tracking-[0.2em]">Destinations</p>
        <h1 class="mt-3 font-heading font-bold text-4xl sm:text-5xl leading-tight">
          Extraordinary Places. Unforgettable Experiences.
        </h1>
        <p class="mt-4 text-white/85 text-base leading-relaxed">
          From world-famous wildlife reserves and scenic landscapes to vibrant cities and cultural landmarks,
          explore the best destinations Kenya has to offer and beyond.
        </p>

        <div class="flex flex-wrap gap-3 mt-8">
          <BaseButton as="a" href="/destinations/directory" variant="amber" size="lg">
            <IconMapPin class="w-4 h-4" />
            Explore All Destinations
          </BaseButton>
          <BaseButton as="a" href="/contact" variant="outline" size="lg">Request a Quote</BaseButton>
        </div>
      </div>
    </div>
  </section>

  <!-- Floating search bar, replacing the usual trust-icon strip -->
  <section  v-scroll-reveal class="z-10 relative -mt-8 sm:-mt-10 romara-container">
    <form
      class="flex sm:flex-row flex-col sm:items-center gap-3 bg-white shadow-overlap p-3 sm:p-2 rounded-2xl sm:rounded-full"
      @submit.prevent="handleSearchSubmit"
    >
      <div class="flex flex-1 items-center gap-2 px-4 py-2 rounded-full">
        <IconMapPin class="w-5 h-5 text-romara-amber shrink-0" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search destinations, e.g. Maasai Mara, Diani Beach..."
          class="bg-transparent border-none focus:outline-none focus:ring-0 w-full text-romara-ink placeholder:text-romara-ink/40 text-sm"
        />
      </div>
      <div class="hidden sm:block bg-black/10 w-px h-8 shrink-0" />
      <select
        v-model="selectedType"
        class="bg-transparent px-4 py-2 border-none rounded-full focus:outline-none focus:ring-0 sm:w-auto text-romara-ink text-sm shrink-0"
      >
        <option value="all">All Types</option>
        <option value="wildlife">Wildlife & Safaris</option>
        <option value="mountains">Mountains & Hiking</option>
        <option value="beaches">Beaches & Coast</option>
        <option value="cities">Cities & Towns</option>
        <option value="culture">Culture & Heritage</option>
        <option value="nature">Nature & Scenery</option>
      </select>
      <button
  type="submit"
  class="bg-romara-green hover:bg-romara-green/90 px-6 py-3 rounded-full font-semibold text-white text-sm uppercase tracking-wide transition-colors shrink-0"
>
  Search
</button>
    </form>
  </section>

  <!-- Popular Destinations: asymmetric bento grid -->
  <section v-scroll-reveal class="py-16 romara-container">
    <div class="flex justify-between items-end gap-4 mb-8">
      <div>
        <h2 class="font-bold text-romara-green text-2xl sm:text-3xl">Popular Destinations in Kenya</h2>
        <span class="block bg-romara-amber mt-2 rounded w-14 h-1" />
      </div>
      <a
        href="/destinations/directory"
        class="hidden sm:flex items-center gap-1 font-semibold text-romara-green hover:text-romara-amber text-sm shrink-0"
      >
        View All Destinations
        <IconMapPin class="w-4 h-4" />
      </a>
    </div>

    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
      <DestinationCard
        :destination="featuredDestination"
        featured
        class="lg:col-span-2 lg:row-span-2"
        v-scroll-reveal
      />
      <DestinationCard
        v-for="(destination, index) in otherDestinations"
        :key="destination.id"
        :destination="destination"
        v-scroll-reveal="{ delay: (index + 1) * 100 }"
      />
    </div>
  </section>

  <!-- Browse Destinations by Type: horizontal scroll reel -->
  <section v-scroll-reveal class="bg-romara-cream py-14">
    <div class="romara-container">
      <div class="text-center">
        <h2 class="font-bold text-romara-green text-2xl sm:text-3xl">Browse Destinations by Type</h2>
        <span class="block bg-romara-amber mx-auto mt-2 rounded w-14 h-1" />
      </div>
      <div class="mt-10">
        <DestinationFilters />
      </div>
    </div>
  </section>

  <!-- Why Visit Kenya: full-width stat + quote band with background image -->
  <section v-scroll-reveal class="relative pt-20 sm:pt-28 pb-20">
    <img
      src="/src/assets/images/destinations/maasai-mara.jpeg"
      alt="Maasai Mara landscape"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-romara-green/85" />
    <div class="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-romara-green-dark to-transparent h-32" />
    <div class="relative romara-container">
      <div class="items-center gap-16 grid grid-cols-1 lg:grid-cols-4">
        <!-- Main content - takes 2 columns -->
        <div class="lg:col-span-2 lg:mr-auto">
          <p class="font-bold text-romara-amber text-sm uppercase tracking-[0.2em]">Why Visit Kenya?</p>
          <p class="mt-4 font-heading font-bold text-white text-2xl sm:text-3xl leading-snug">
            &ldquo;Kenya is a land of breathtaking landscapes, diverse wildlife, rich cultures and warm
            hospitality.&rdquo;
          </p>
          <p class="mt-4 text-white/90 text-sm leading-relaxed">
            Whether you are seeking adventure, relaxation, or cultural immersion, Kenya offers experiences like
            no other.
          </p>

          <div class="flex flex-wrap justify-center gap-3 mt-8">
            <span
              v-for="point in whyVisitPoints.slice(0, 4)"
              :key="point"
              class="bg-black/20 px-4 py-1.5 border border-white/30 rounded-full font-medium text-white text-xs"
            >
              {{ point }}
            </span>
          </div>
        </div>

        <!-- CTA Card - takes 1 column -->
        <div class="lg:col-span-2 lg:mr-0 lg:ml-auto">
          <div class="bg-white/10 backdrop-blur-sm p-8 border border-white/20 rounded-2xl text-center">
            <div class="flex justify-center items-center bg-romara-amber mx-auto mb-4 rounded-full w-16 h-16">
              <IconCalendarCheck class="w-8 h-8 text-white" />
            </div>
            <h3 class="font-heading font-bold text-white text-xl">Ready to Explore?</h3>
            <p class="mt-2 text-white/80 text-sm">Let ROMARA Tours & Travel help you plan the perfect journey.</p>
            <div class="flex flex-col gap-3 mt-6">
              <BaseButton as="a" href="/book-now" variant="amber" class="w-full">Book Now</BaseButton>
              <BaseButton as="a" href="/contact" variant="outline" class="w-full">Request a Quote</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>