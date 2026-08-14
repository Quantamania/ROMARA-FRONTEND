<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconBinoculars from '@/components/icons/IconBinoculars.vue'
import IconCar from '@/components/icons/IconCar.vue'

const slides = [
  '/images/home/hero-elephants.webp',
  '/images/home/cruiser.webp',
  '/images/home/mara.webp',
  '/images/home/nairobi.webp',
]

const subheading = 'Two ways to explore Kenya — expertly guided, or behind your own wheel.'

const services = [
  {
    icon: IconBinoculars,
    title: 'Safari Tours',
    desc: "Guided game drives across Kenya's iconic parks.",
    href: '/book-now',
  },
  {
    icon: IconCar,
    title: 'Vehicle Hire',
    desc: 'Premium 4×4 fleet — with or without a driver.',
    href: '/vehicle-hire',
  },
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
  <section class="relative isolate min-h-[calc(100svh-93px)] overflow-hidden bg-romara-green text-white sm:min-h-[88vh]">
    <!-- Slideshow layers -->
    <div class="absolute inset-0">
      <transition-group name="hero-fade">
        <img
          v-for="(src, index) in slides"
          v-show="index === active"
          :key="src"
          :src="src"
          alt="Safari Tours & Premium Vehicle Hire"
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

    <div class="romara-container relative flex min-h-[calc(100svh-93px)] flex-col justify-center py-12 sm:min-h-[88vh] sm:py-28">
      <div class="max-w-3xl">
        <h1
          class="font-heading text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-balance animate-fade-up"
        >
          Safari Tours <span class="text-romara-amber-300">&amp;</span> Premium Vehicle Hire
        </h1>

        <p
          class="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg animate-fade-up"
          style="animation-delay: 120ms"
        >
          {{ subheading }}
        </p>

        <!-- Two service pillars — the core business, unmistakable at a glance -->
        <div class="mt-9 flex flex-wrap gap-3">
          <a
            v-for="(service, index) in services"
            :key="service.title"
            :href="service.href"
            class="group inline-flex items-center gap-2.5 rounded-md px-5 py-3.5 shadow-card transition-all duration-300 ease-out-expo animate-fade-up hover:-translate-y-0.5 hover:shadow-elevated active:scale-[0.98]"
            :class="index === 0 ? 'bg-romara-amber text-romara-green' : 'bg-romara-green text-white'"
            :style="{ animationDelay: `${240 + index * 110}ms` }"
          >
            <component
              :is="service.icon"
              class="h-5 w-5 shrink-0"
              :class="index === 0 ? 'text-romara-green' : 'text-romara-amber-300'"
            />
            <span class="font-heading text-sm font-semibold sm:text-base">{{ service.title }}</span>
            <IconArrowRight
              class="h-4 w-4 shrink-0 transition-all duration-300 ease-out-expo group-hover:translate-x-0.5"
              :class="index === 0 ? 'text-romara-green/70' : 'text-white/70'"
            />
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="romara-container pointer-events-none absolute inset-x-0 bottom-24 flex items-center justify-end sm:bottom-28">
      <div class="pointer-events-auto hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 sm:flex">
        Scroll
        <IconChevronDown class="scroll-cue h-4 w-4" />
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

/* Gentle, smooth scroll cue — an ease-in-out bob, not a dated bounce. */
@media (prefers-reduced-motion: no-preference) {
  .scroll-cue {
    animation: scroll-cue 1.8s ease-in-out infinite;
  }
}
@keyframes scroll-cue {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.65;
  }
  50% {
    transform: translateY(4px);
    opacity: 1;
  }
}
</style>
