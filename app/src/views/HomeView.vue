<script setup lang="ts">
import HeroBanner from '@/features/home/sections/HeroBanner.vue'
import TrustBuilding from '@/features/home/sections/TrustBuilding.vue'
import CoreServices from '@/features/home/sections/CoreServices.vue'
import GridLines from '@/components/ui/GridLines.vue'
import FleetShowcase from '@/features/home/sections/FleetShowcase.vue'
import FeaturedPackages from '@/features/home/sections/FeaturedPackages.vue'
import TestimonialsPreview from '@/features/home/sections/TestimonialsPreview.vue'
import WhyChooseUs from '@/features/home/sections/WhyChooseUs.vue'
import SocialProof from '@/features/home/sections/SocialProof.vue'
import BlogPreview from '@/features/home/sections/BlogPreview.vue'
</script>

<template>
  <div v-scroll-reveal>
    <HeroBanner />
  </div>

  <div v-scroll-reveal="{ delay: 75 }">
    <TrustBuilding />
  </div>

  <CoreServices />

  <div v-scroll-reveal class="content-auto-section">
    <FleetShowcase />
  </div>

  <div v-scroll-reveal="{ delay: 150 }" class="content-auto-section">
    <FeaturedPackages />
  </div>

  <section v-scroll-reveal class="content-auto-section section-y relative isolate overflow-hidden bg-romara-sand">
    <GridLines :columns="1" />
    <div class="romara-container relative grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
      <WhyChooseUs />
      <TestimonialsPreview />
    </div>
  </section>

  <div v-scroll-reveal class="content-auto-section">
    <SocialProof />
  </div>

  <div v-scroll-reveal="{ delay: 225 }" class="content-auto-section">
    <BlogPreview />
  </div>
</template>