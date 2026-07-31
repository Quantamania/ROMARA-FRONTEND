<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'

const slides = [
  '/src/assets/images/home/hero-elephants.png',
  '/src/assets/images/home/cruiser.jpeg',
  '/src/assets/images/home/mara.jpeg',
  '/src/assets/images/home/nairobi.png',
]

const content = {
  eyebrow: 'Discover Kenya',
  heading: 'Unforgettable Safari Experiences',
  subheading:
    "Explore Kenya's iconic wildlife, breathtaking landscapes and rich cultures with ROMARA Tours and Travel.",
}

const stats = [
  { value: '15+', label: 'Years of Journeys' },
  { value: '4.9', label: 'Traveller Rating' },
  { value: '50+', label: 'Curated Routes' },
]

const active = ref(0)
let timer: number | undefined

function go(index: number) {
  active.value = (index + slides.length) % slides.length
}

onMounted(() => {
  timer = window.setInterval(() => go(active.value + 1), 6500)
})
onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <section class="relative isolate min-h-[88vh] overflow-hidden bg-romara-green text-white">
    <!-- Slideshow layers -->
    <div class="absolute inset-0">
      <transition-group name="hero-fade">
        <img
          v-for="(src, index) in slides"
          v-show="index === active"
          :key="src"
          :src="src"
          :alt="content.heading"
          class="ken-burns absolute inset-0 h-full w-full object-cover"
        />
      </transition-group>
    </div>

    <!-- Scrims for legibility + brand tint -->
    <div class="absolute inset-0 bg-scrim-r" />
    <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/80 via-transparent to-romara-green-dark/20" />

    <div class="romara-container relative flex min-h-[88vh] flex-col justify-center py-28">
      <div class="max-w-2xl">
        <p class="eyebrow text-romara-amber-300 animate-fade-up">
          
          {{ content.eyebrow }}
        </p>

        <h1
          class="mt-5 font-heading text-display-lg font-semibold text-balance animate-fade-up"
          style="animation-delay: 90ms"
        >
          {{ content.heading }}
        </h1>

        <p
          class="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg animate-fade-up"
          style="animation-delay: 180ms"
        >
          {{ content.subheading }}
        </p>

        <div class="mt-9 flex flex-wrap gap-3.5 animate-fade-up" style="animation-delay: 270ms">
          <BaseButton as="a" href="/book-now" variant="amber" size="lg">Book a Safari</BaseButton>
          <BaseButton as="a" href="/contact" variant="ghost" size="lg">Request a Quote</BaseButton>
        </div>

        <!-- Rating cue -->
        <div class="mt-8 flex items-center gap-3 animate-fade-up" style="animation-delay: 360ms">
          <div class="flex text-romara-amber">
            <IconStar v-for="s in 5" :key="s" class="h-4 w-4" />
          </div>
          <p class="text-sm text-white/75">
            Rated <span class="font-semibold text-white">4.9/5</span> by 1,200+ travellers
          </p>
        </div>
      </div>

      <!-- Stat strip -->
      <div
        class="mt-14 grid max-w-xl grid-cols-3 gap-4 animate-fade-up sm:gap-8"
        style="animation-delay: 450ms"
      >
        <div v-for="stat in stats" :key="stat.label" class="border-l border-white/20 pl-4">
          <p class="font-heading text-3xl font-semibold text-white sm:text-4xl">{{ stat.value }}</p>
          <p class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>

    <!-- Slide controls (kept clear of the overlapping trust bar below) -->
    <div class="romara-container pointer-events-none absolute inset-x-0 bottom-24 flex items-center justify-between sm:bottom-28">
      <div class="pointer-events-auto flex gap-2">
        <button
          v-for="(src, index) in slides"
          :key="src"
          type="button"
          :aria-label="`Show slide ${index + 1}`"
          class="h-1.5 rounded-full transition-all duration-500 ease-out-expo"
          :class="index === active ? 'w-8 bg-romara-amber' : 'w-4 bg-white/40 hover:bg-white/70'"
          @click="go(index)"
        />
      </div>
      <div class="pointer-events-auto hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 sm:flex">
        Scroll
        <IconChevronDown class="h-4 w-4 animate-bounce" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 1.2s ease;
}
.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}
</style>
