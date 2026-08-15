<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import packagesData from '@/data/packages.json'
import { getAllPackages } from '@/features/safari-packages/api/packages.api'
import type { SafariPackage } from '@/types/package.types'

// Bundled content paints first, then the published tours replace it.
const featuredPackages = ref<SafariPackage[]>(packagesData as SafariPackage[])
onMounted(async () => { featuredPackages.value = await getAllPackages() })

// Mirrored asymmetric spans on desktop — wide/narrow, then narrow/wide — so the
// grid reads editorial rather than four equal boxes.
const spanClasses = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-KE').format(amount)
}
</script>

<template>
  <section class="section-y bg-romara-bone">
    <div class="romara-container">
      <SectionHeading
        eyebrow="Curated Journeys"
        title="Popular Safari Packages"
        link-text="View All Packages"
        link-href="/safari-packages"
      />

      <div class="mobile-shelf gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-12">
        <a
          v-for="(pkg, index) in featuredPackages"
          :key="pkg.id"
          v-scroll-reveal="{ delay: index * 90 }"
          :href="`/safari-packages/${pkg.slug}`"
          class="group relative flex h-72 flex-col justify-end overflow-hidden shadow-card ring-1 ring-romara-green/10 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated sm:h-80 lg:h-[26rem]"
          :class="[spanClasses[index] || 'lg:col-span-6', index % 2 === 1 ? 'rounded-card-alt' : 'rounded-card']"
        >
          <!-- Full-bleed photo -->
          <img
            :src="pkg.image"
            :alt="pkg.name"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105"
          />
          <!-- Subtle top scrim so the badge stays legible; the photo stays visible. -->
          <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" aria-hidden="true" />

          <span
            v-if="pkg.badge"
            class="absolute left-4 top-4 inline-flex items-center rounded-full bg-romara-amber px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-soft"
          >
            {{ pkg.badge }}
          </span>

          <!-- Content on a frosted white panel — readable on any image, photo stays visible above. -->
          <div class="relative m-4 rounded-lg bg-white/90 p-5 shadow-sm backdrop-blur-md">
            <div class="flex flex-wrap items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-romara-ink/70">
              <span class="inline-flex items-center gap-1.5"><IconClock class="h-3.5 w-3.5 text-romara-amber" />{{ pkg.durationDays }} Days</span>
              <span class="h-3 w-px bg-romara-green/20" aria-hidden="true" />
              <span class="inline-flex items-center gap-1.5"><IconMapPin class="h-3.5 w-3.5 text-romara-amber" />{{ pkg.location }}</span>
            </div>

            <h3
              class="mt-2.5 font-heading font-semibold leading-tight text-romara-green"
              :class="index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'"
            >
              {{ pkg.name }}
            </h3>

            <p v-if="index === 0" class="mt-2 max-w-md text-sm leading-relaxed text-romara-ink/65 line-clamp-2">
              {{ pkg.description }}
            </p>

            <div class="mt-4 flex items-center justify-between gap-3">
              <p class="leading-none">
                <span class="text-[11px] font-medium uppercase tracking-[0.12em] text-romara-ink/55">From</span>
                <span class="mt-1 block font-heading text-xl font-semibold text-romara-amber">KES {{ formatPrice(pkg.priceFromKES) }}</span>
              </p>
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-romara-green text-white transition-all duration-300 ease-out-expo group-hover:bg-romara-amber">
                <IconArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
