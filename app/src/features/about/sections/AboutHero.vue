<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'

const destinations = [
  'Maasai Mara',
  'Amboseli',
  'Diani Beach',
  'Lake Nakuru',
  'Samburu',
  'Tsavo',
]
</script>

<template>
  <section class="relative isolate min-h-screen overflow-hidden bg-romara-green text-white">
    <!-- Full Background Image -->
    <img
      src="/src/assets/images/about/hero-safari-vehicle.png"
      alt="ROMARA safari vehicle crossing the Maasai Mara at sunset"
      class="ken-burns absolute inset-0 h-full w-full object-cover"
    />

    <!-- Layered scrims for legibility + brand tint -->
    <div class="absolute inset-0 bg-gradient-to-r from-romara-green via-romara-green/90 via-30% to-transparent"></div>
    <div class="absolute inset-0 bg-scrim-b"></div>

    <!-- Content -->
    <div class="relative z-10 flex min-h-screen items-center">
      <div class="romara-container">
        <div class="max-w-xl">
          <p class="eyebrow text-romara-amber-300 animate-fade-up">
            
            About ROMARA
          </p>

          <h1
            class="mt-5 font-heading text-display-lg font-semibold leading-[1.02] text-balance animate-fade-up"
            style="animation-delay: 90ms"
          >
            Reaching out to your
            <span class="block text-romara-amber">next adventure.</span>
          </h1>

          <p
            class="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg animate-fade-up"
            style="animation-delay: 180ms"
          >
            A Kenyan travel company passionate about creating memorable, safe,
            and seamless experiences across Kenya and beyond.
          </p>

          <div class="mt-9 flex flex-wrap items-center gap-4 animate-fade-up" style="animation-delay: 270ms">
            <BaseButton as="a" href="/safari-packages" variant="amber" size="lg">
              Explore Our Tours
              <IconArrowRight class="h-4 w-4" />
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Destination Marquee -->
    <div
      class="absolute inset-x-0 bottom-8 z-10 overflow-hidden border-t border-white/10 pt-6"
    >
      <div
        class="marquee flex w-max gap-10 text-xs uppercase tracking-[0.2em] text-white/40"
      >
        <span v-for="n in 2" :key="n" class="flex gap-10">
          <span
            v-for="destination in destinations"
            :key="destination"
            class="flex items-center gap-10 whitespace-nowrap"
          >
            <span class="shrink-0 text-white/25" aria-hidden="true">/</span>
            {{ destination }}
          </span>
        </span>
      </div>
    </div>

    <!-- Image Caption -->
    <div
      class="glass absolute bottom-8 right-6 z-10 hidden items-center gap-2 rounded-full px-4 py-2 sm:flex"
    >
      <IconMapPin class="h-3.5 w-3.5 text-romara-amber" aria-hidden="true" />
      <span class="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">
        Maasai Mara, Kenya
      </span>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  animation: marquee 28s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .marquee {
    animation: none;
  }
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>
