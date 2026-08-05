<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'

const slides = [
  '/images/home/hero-elephants.webp',
  '/images/home/cruiser.webp',
  '/images/home/mara.webp',
  '/images/home/nairobi.webp',
]

const content = {
  eyebrow: 'Discover Kenya',
  heading: 'Safari Tours & Premium Vehicle Hire',
  subheading: "Discover Kenya's wildlife, breathtaking scenery and unforgettable adventure.",
}

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
  <section class="relative isolate min-h-[540px] overflow-hidden bg-romara-green text-white sm:min-h-[88vh]">
    <!-- Slideshow layers -->
    <div class="absolute inset-0">
      <transition-group name="hero-fade">
        <img
          v-for="(src, index) in slides"
          v-show="index === active"
          :key="src"
          :src="src"
          :alt="content.heading"
          decoding="async"
          :fetchpriority="index === 0 ? 'high' : 'low'"
          :loading="index === 0 ? 'eager' : 'lazy'"
          class="ken-burns absolute inset-0 h-full w-full object-cover"
        />
      </transition-group>
    </div>

    <!-- Scrims for legibility + brand tint -->
    <div class="absolute inset-0 bg-scrim-r" />
    <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/80 via-transparent to-romara-green-dark/20" />

    <div class="romara-container relative flex min-h-[540px] flex-col justify-center py-16 sm:min-h-[88vh] sm:py-28">
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
          <BaseButton as="a" href="/book-now" variant="amber" size="lg">Book Your Safari</BaseButton>
          <BaseButton as="a" href="/vehicle-hire" variant="ghost" size="lg">Hire a Vehicle</BaseButton>
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
