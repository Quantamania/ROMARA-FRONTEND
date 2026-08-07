<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import PackageCard from '@/features/safari-packages/components/PackageCard.vue'
import GridLines from '@/components/ui/GridLines.vue'
import packagesData from '@/data/packages.json'
import type { SafariPackage } from '@/types/package.types'

const featuredPackages = packagesData as SafariPackage[]
</script>

<template>
  <section class="section-y relative isolate overflow-hidden bg-romara-bone">
    <GridLines :columns="3" />
    <div class="romara-container relative">
      <SectionHeading
        eyebrow="Curated Journeys"
        title="Popular Safari Packages"
        description="Hand-crafted itineraries that balance iconic wildlife, comfort and value — ready to book or tailor to you."
        link-text="View All Packages"
        link-href="/safari-packages"
      />

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <PackageCard
          v-for="(pkg, index) in featuredPackages"
          :key="pkg.id"
          :package="pkg"
          v-scroll-reveal="{ delay: index * 90 }"
        />
      </div>
    </div>
  </section>
</template>
