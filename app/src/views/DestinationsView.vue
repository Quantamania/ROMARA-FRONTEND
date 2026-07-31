<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageHero from '@/components/ui/PageHero.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import DestinationCard from '@/features/destinations/components/DestinationCard.vue'
import DestinationFilters from '@/features/destinations/components/DestinationFilters.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
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

</script>

<template>
  <!-- Hero: reusable premium masthead with the search bar living in its slot -->
  <div v-scroll-reveal>
    <PageHero
      eyebrow="Destinations"
      title="Extraordinary Places. Unforgettable Experiences."
      subtitle="From world-famous wildlife reserves and scenic landscapes to vibrant cities and cultural landmarks, explore the best destinations Kenya has to offer and beyond."
      image="/src/assets/images/destinations/hero.jpg"
      size="lg"
      :breadcrumbs="[{ label: 'Home', href: '/' }, { label: 'Destinations' }]"
    >
      <form
        class="flex flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-overlap backdrop-blur-sm sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-2"
        @submit.prevent="handleSearchSubmit"
      >
        <div class="flex flex-1 items-center gap-2.5 px-4 py-2">
          <IconMapPin class="h-5 w-5 shrink-0 text-romara-amber" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search destinations, e.g. Maasai Mara, Diani Beach..."
            class="w-full border-none bg-transparent text-sm text-romara-ink placeholder:text-romara-ink/40 focus:outline-none focus:ring-0"
          />
        </div>
        <div class="hidden h-8 w-px shrink-0 bg-romara-green/10 sm:block" />
        <select
          v-model="selectedType"
          class="shrink-0 border-none bg-transparent px-4 py-2 text-sm text-romara-ink focus:outline-none focus:ring-0 sm:w-auto"
        >
          <option value="all">All Types</option>
          <option value="wildlife">Wildlife & Safaris</option>
          <option value="mountains">Mountains & Hiking</option>
          <option value="beaches">Beaches & Coast</option>
          <option value="cities">Cities & Towns</option>
          <option value="culture">Culture & Heritage</option>
          <option value="nature">Nature & Scenery</option>
        </select>
        <BaseButton type="submit" variant="amber" size="lg" class="shrink-0 sm:rounded-full">
          <IconMapPin class="h-4 w-4" />
          Search
        </BaseButton>
      </form>
    </PageHero>
  </div>

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
        />
        <DestinationCard
          v-for="(destination, index) in otherDestinations"
          :key="destination.id"
          :destination="destination"
          v-scroll-reveal="{ delay: (index + 1) * 100 }"
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
      src="/src/assets/images/destinations/maasai-mara.jpeg"
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
</template>
