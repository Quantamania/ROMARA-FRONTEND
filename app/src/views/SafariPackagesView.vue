<script setup lang="ts">
import { storeToRefs } from 'pinia'
import TrustBuilding from '@/features/home/sections/TrustBuilding.vue'
import WhoWeAre from '@/features/about/sections/WhoWeAre.vue'
import CallToActionBar from '@/components/ui/CallToActionBar.vue'
import PackageCard from '@/features/safari-packages/components/PackageCard.vue'
import PackageSearchBar from '@/features/safari-packages/components/PackageSearchBar.vue'
import PackageFilters from '@/features/safari-packages/components/PackageFilters.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import IconCompass from '@/components/icons/IconCompass.vue'
import { usePackagesStore } from '@/features/safari-packages/store/packages.store'

const packagesStore = usePackagesStore()
const { filteredPackages } = storeToRefs(packagesStore)

interface TailorMadePoint {
  icon: typeof IconCheckSquare
  label: string
}

const tailorMadePoints: TailorMadePoint[] = [
  { icon: IconCheckSquare, label: 'Custom itineraries' },
  { icon: IconCalendarCheck, label: 'Flexible travel dates' },
  { icon: IconCompass, label: 'Unique experiences' },
]
</script>

<template>
  <!-- Hero -->
  <section v-scroll-reveal class="relative isolate min-h-[420px] overflow-hidden bg-romara-green text-white sm:min-h-[460px]">
    <img
      src="/src/assets/images/safari-packages/hero-elephants-jeep.png"
      alt="Safari jeep alongside a herd of elephants"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

    <div class="romara-container relative flex min-h-[420px] items-center sm:min-h-[460px]">
      <div class="max-w-xl py-16">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">Safari Packages</p>
        <h1 class="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">
          Unforgettable Journeys. Extraordinary Memories.
        </h1>
        <p class="mt-4 text-base leading-relaxed text-white/85">
          Explore Kenya's iconic wildlife, breathtaking landscapes and rich cultures with our expertly crafted
          safari packages.
        </p>
      </div>
    </div>
  </section>

  <TrustBuilding />

  <!-- Packages grid -->
  <section v-scroll-reveal class="romara-container py-16">
    <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Our Safari Packages</h2>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <PackageSearchBar />
        <PackageFilters />
      </div>
    </div>

    <p v-if="filteredPackages.length === 0" class="text-sm text-romara-ink/60">
      No packages match your search or filters. Try clearing them.
    </p>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <PackageCard
        v-for="(pkg, index) in filteredPackages"
        :key="pkg.id"
        :package="pkg"
        v-scroll-reveal="{ delay: index * 100 }"
      />
    </div>
  </section>

  <!-- Tailor-Made Safaris -->
  <section v-scroll-reveal class="romara-container pb-16">
    <div class="grid grid-cols-1 overflow-hidden rounded-lg bg-romara-cream lg:grid-cols-2">
      <img
        src="/src/assets/images/safari-packages/hero-elephants-jeep.png"
        alt="Safari vehicle on a dirt road at sunset"
        class="h-64 w-full object-cover lg:h-full"
      />

      <div class="p-8 sm:p-10">
        <h2 class="text-2xl font-bold text-romara-green">Tailor-Made Safaris</h2>
        <span class="mt-2 block h-1 w-14 rounded bg-romara-amber" />

        <p class="mt-4 text-sm leading-relaxed text-romara-ink/70">
          Have something specific in mind? Our travel experts will create a custom safari that matches your
          interests, budget and schedule.
        </p>

        <ul class="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <li v-for="point in tailorMadePoints" :key="point.label" class="flex items-center gap-2 text-sm font-medium text-romara-ink">
            <component :is="point.icon" class="h-5 w-5 text-romara-amber" />
            {{ point.label }}
          </li>
        </ul>

        <div class="mt-8">
          <BaseButton as="a" href="/contact" variant="amber" size="lg">Plan Your Custom Safari</BaseButton>
        </div>
      </div>
    </div>
  </section>

 <div v-scroll-reveal="{ delay: 75 }">
   <WhoWeAre variant="flat" />
 </div>

 <div v-scroll-reveal="{ delay: 100 }">
   <CallToActionBar
     title="Ready to Start Your Safari Adventure?"
     subtitle="Let ROMARA create memories that last a lifetime."
     theme="green"
   />
 </div>
</template>