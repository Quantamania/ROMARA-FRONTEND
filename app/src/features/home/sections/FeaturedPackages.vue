<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import PackageCard from '@/features/safari-packages/components/PackageCard.vue'
import packagesData from '@/data/packages.json'
import type { SafariPackage } from '@/types/package.types'

const featuredPackages = packagesData as SafariPackage[]
</script>

<template>
  <section class="romara-container py-16">
    <SectionHeading title="Popular Safari Packages" link-text="View All Packages" link-href="/safari-packages" />

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <PackageCard v-for="pkg in featuredPackages" :key="pkg.id" :package="pkg" />
    </div>
  </section>
</template>