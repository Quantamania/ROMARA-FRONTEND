<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

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
  <section class="relative isolate min-h-screen overflow-hidden text-white">
    <!-- Full Background Image -->
    <img
      src="/src/assets/images/about/hero-safari-vehicle.png"
      alt="ROMARA safari vehicle crossing the Maasai Mara at sunset"
      class="absolute inset-0 h-full w-full object-cover"
    />

    <!-- Dark Green Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-romara-green via-romara-green/95 via-romara-green/80 via-romara-green/50 to-transparent"></div>

    <!-- Content -->
    <div class="relative z-10 flex min-h-screen items-center px-6 sm:px-10 lg:px-16">
      <div class="max-w-xl">
        <div class="mb-6">
          <span class="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
            Kenya
          </span>
        </div>

        <h1 class="font-heading text-5xl font-bold leading-[1.02] sm:text-6xl">
          About
          <span class="block text-romara-amber">ROMARA.</span>
        </h1>

        <p class="mt-5 text-lg font-semibold uppercase tracking-wide text-white/75">
          Reaching Out to Your Next Adventure
        </p>

        <p class="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
          A Kenyan travel company passionate about creating memorable, safe,
          and seamless experiences across Kenya and beyond.
        </p>

        <div class="mt-9 flex flex-wrap items-center gap-6">
          <BaseButton
            as="a"
            href="/safari-packages"
            size="lg"
            class="!bg-romara-amber hover:!bg-romara-amber/90 !text-white"
          >
            Explore Our Tours
            <IconArrowRight class="h-4 w-4" />
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Destination Marquee -->
    <div
      class="absolute bottom-8 left-0 right-0 z-10 overflow-hidden border-t border-white/10 pt-6"
    >
      <div
        class="marquee flex w-max gap-10 text-xs uppercase tracking-[0.2em] text-white/40"
      >
        <span v-for="n in 2" :key="n" class="flex gap-10">
          <span
            v-for="destination in destinations"
            :key="destination"
            class="whitespace-nowrap"
          >
            {{ destination }}
          </span>
        </span>
      </div>
    </div>

    <!-- Image Caption -->
    <div
      class="absolute bottom-8 right-8 z-10 flex items-center gap-2 rounded-sm border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-md"
    >
      <span class="text-xs uppercase tracking-wide text-white/85">
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