<script setup lang="ts">
import HeroBanner from '@/features/home/sections/HeroBanner.vue'
import TrustBuilding from '@/features/home/sections/TrustBuilding.vue'
import FeaturedPackages from '@/features/home/sections/FeaturedPackages.vue'
import TestimonialsPreview from '@/features/home/sections/TestimonialsPreview.vue'
import WhyChooseUs from '@/features/home/sections/WhyChooseUs.vue'
import BlogPreview from '@/features/home/sections/BlogPreview.vue'
</script>

<template>
  <div v-scroll-reveal>
    <HeroBanner />
  </div>

  <div v-scroll-reveal="{ delay: 75 }">
    <TrustBuilding />
  </div>

  <div v-scroll-reveal="{ delay: 150 }">
    <FeaturedPackages />
  </div>

  <section v-scroll-reveal class="section-y bg-romara-sand">
    <div class="romara-container grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
      <WhyChooseUs />
      <TestimonialsPreview />
    </div>
  </section>

  <div v-scroll-reveal="{ delay: 225 }">
    <BlogPreview />
  </div>
</template>