<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'

interface HeroSlide {
  image: string
  eyebrow: string
  heading: string
  subheading: string
}

const slides: HeroSlide[] = [
  {
    image: '/src/assets/images/home/hero-elephants.jpg',
    eyebrow: 'Discover Kenya',
    heading: 'Unforgettable Safari Experiences',
    subheading:
      "Explore Kenya's iconic wildlife, breathtaking landscapes and rich cultures with ROMARA Tours and Travel.",
  },
  {
    image: '/src/assets/images/home/hero-mara.jpg',
    eyebrow: 'Discover Kenya',
    heading: 'Walk Among the Big Five',
    subheading: 'Guided game drives through the Maasai Mara, led by ROMARA\u2019s expert local rangers.',
  },
  {
    image: '/src/assets/images/home/hero-coast.jpg',
    eyebrow: 'Discover Kenya',
    heading: 'Unwind on Pristine Beaches',
    subheading: 'Pair your safari with the white sands and turquoise waters of the Kenyan coast.',
  },
  {
    image: '/src/assets/images/home/hero-culture.jpg',
    eyebrow: 'Discover Kenya',
    heading: 'Immerse in Local Culture',
    subheading: 'Meet Kenya\u2019s communities and experience traditions passed down for generations.',
  },
]

const activeSlideIndex = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | undefined

function goToSlide(index: number) {
  activeSlideIndex.value = index
}

function goToPreviousSlide() {
  activeSlideIndex.value = activeSlideIndex.value === 0 ? slides.length - 1 : activeSlideIndex.value - 1
}

function goToNextSlide() {
  activeSlideIndex.value = (activeSlideIndex.value + 1) % slides.length
}

function startAutoplay() {
  autoplayTimer = setInterval(goToNextSlide, 6000)
}

onMounted(startAutoplay)
onBeforeUnmount(function stopAutoplay() {
  clearInterval(autoplayTimer)
})
</script>

<template>
  <section class="relative isolate min-h-[560px] overflow-hidden bg-romara-green text-white sm:min-h-[620px]">
    <transition name="fade" mode="out-in">
      <img
        :key="activeSlideIndex"
        :src="slides[activeSlideIndex].image"
        :alt="slides[activeSlideIndex].heading"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </transition>
    <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

    <div class="romara-container relative flex min-h-[560px] items-center sm:min-h-[620px]">
      <div class="max-w-xl py-16">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">
          {{ slides[activeSlideIndex].eyebrow }}
        </p>
        <h1 class="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">
          {{ slides[activeSlideIndex].heading }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-white/85">
          {{ slides[activeSlideIndex].subheading }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton as="a" href="/book-now" variant="primary" size="lg">Book a Safari</BaseButton>
          <BaseButton as="a" href="/contact" variant="outline" size="lg">Request a Quote</BaseButton>
        </div>
      </div>
    </div>

    <button
      type="button"
      aria-label="Previous slide"
      class="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
      @click="goToPreviousSlide"
    >
      <IconChevronLeft class="h-5 w-5" />
    </button>
    <button
      type="button"
      aria-label="Next slide"
      class="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
      @click="goToNextSlide"
    >
      <IconChevronRight class="h-5 w-5" />
    </button>

    <div class="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
      <button
        v-for="(slide, index) in slides"
        :key="slide.heading"
        type="button"
        :aria-label="`Go to slide ${index + 1}`"
        class="h-2 rounded-full transition-all"
        :class="index === activeSlideIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'"
        @click="goToSlide(index)"
      />
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>