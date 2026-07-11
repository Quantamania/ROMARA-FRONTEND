<script setup lang="ts">
import HeroBanner from '@/features/home/sections/HeroBanner.vue'
import TrustBuilding from '@/features/home/sections/TrustBuilding.vue'
import FeaturedPackages from '@/features/home/sections/FeaturedPackages.vue'
import WhyChooseUs from '@/features/home/sections/WhyChooseUs.vue'
import TestimonialsPreview from '@/features/home/sections/TestimonialsPreview.vue'
import BlogPreview from '@/features/home/sections/BlogPreview.vue'
</script>

<template>
  <main class="space-y-24 min-h-screen">
    <HeroBanner />
    <TrustBuilding />
    <FeaturedPackages />
    <WhyChooseUs />
    <TestimonialsPreview />
    <BlogPreview />
  </main>
</template>