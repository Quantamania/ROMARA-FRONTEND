<script setup lang="ts">
import HeroBanner from '@/features/home/sections/HeroBanner.vue'
import TrustBuilding from '@/features/home/sections/TrustBuilding.vue'
import FeaturedPackages from '@/features/home/sections/FeaturedPackages.vue'
import TestimonialsPreview from '@/features/home/sections/TestimonialsPreview.vue'
import WhyChooseUs from '@/features/home/sections/WhyChooseUs.vue'
import BlogPreview from '@/features/home/sections/BlogPreview.vue'
</script>

<template>
  <HeroBanner />
  <TrustBuilding />
  <FeaturedPackages />

  <section class="bg-white py-16">
    <div class="romara-container grid grid-cols-1 gap-10 lg:grid-cols-2">
      <TestimonialsPreview />
      <WhyChooseUs />
    </div>
  </section>

  <BlogPreview />
</template>