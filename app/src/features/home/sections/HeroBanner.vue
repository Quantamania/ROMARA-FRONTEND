<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface HeroSlide {
  image: string
}

const images: HeroSlide[] = [
  {
    image: '/src/assets/images/home/hero-elephants.png',
  },
  {
    image: '/src/assets/images/home/cruiser.jpeg',
  },
  {
    image: '/src/assets/images/home/mara.jpeg',
  },
  {
    image: '/src/assets/images/home/nairobi.png',
  },
]

// Static content - always shows the first slide's content
const staticContent = {
  eyebrow: 'Discover Kenya',
  heading: 'Unforgettable Safari Experiences',
  subheading:
    "Explore Kenya's iconic wildlife, breathtaking landscapes and rich cultures with ROMARA Tours and Travel.",
}

// Select a random image on mount
const selectedImage = ref(images[Math.floor(Math.random() * images.length)].image)
</script>

<template>
  <section class="relative isolate min-h-[700px] overflow-hidden bg-romara-green text-white sm:min-h-[700px]">
    <img
      :src="selectedImage"
      :alt="staticContent.heading"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

    <div class="romara-container relative flex min-h-[560px] items-center sm:min-h-[620px]">
      <div class="max-w-xl py-16">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">
          {{ staticContent.eyebrow }}
        </p>
        <h1 class="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">
          {{ staticContent.heading }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-white/85">
          {{ staticContent.subheading }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton as="a" href="/book-now" variant="primary" size="lg">Book a Safari</BaseButton>
          <BaseButton as="a" href="/contact" variant="outline" size="lg">Request a Quote</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>