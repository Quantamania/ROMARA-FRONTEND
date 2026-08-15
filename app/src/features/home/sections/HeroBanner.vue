<script setup lang="ts">
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconShield from '@/components/icons/IconShield.vue'
</script>

<template>
  <section class="relative isolate min-h-[340px] overflow-hidden bg-romara-green text-white sm:min-h-[58vh]">
    <img
      src="/images/home/hero-elephants.webp"
      alt="Elephants on the Kenyan savanna at golden hour"
      fetchpriority="high"
      class="ken-burns absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-romara-green-dark/95 via-romara-green-dark/60 to-romara-green-dark/15" />
    <div class="absolute inset-0 bg-scrim-b" />

    <div class="romara-container relative flex min-h-[340px] flex-col justify-center py-6 sm:min-h-[58vh] sm:py-14">
      <div class="max-w-xl">
        <h1 class="font-heading text-[1.9rem] font-bold leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
          Safari Tours <span class="text-romara-amber">&amp;</span> Premium Vehicle Hire
        </h1>

        <p class="mt-3 max-w-md text-sm font-medium leading-snug text-white/85 sm:text-lg">
          Two ways to explore Kenya, expertly guided or behind your own wheel.
        </p>

        <div class="mt-4 flex flex-nowrap gap-2.5">
          <a
            href="/book-now"
            class="flex items-center justify-center gap-2 rounded-md bg-romara-amber px-4 py-2.5 text-xs font-bold uppercase tracking-[0.06em] text-white shadow-card transition-all duration-300 ease-out-expo hover:bg-romara-amber/90 active:scale-[0.98] sm:px-5 sm:text-sm"
          >
            <IconCalendarCheck class="h-4 w-4 sm:h-5 sm:w-5" />
            Book Safari
          </a>
          <a
            href="/vehicle-hire"
            class="flex items-center justify-center gap-2 rounded-md border-2 border-white/70 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.06em] text-white transition-all duration-300 ease-out-expo hover:border-romara-amber hover:text-romara-amber active:scale-[0.98] sm:px-5 sm:text-sm"
          >
            <IconCar class="h-4 w-4 sm:h-5 sm:w-5" />
            Hire a Vehicle
          </a>
        </div>

        <div class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold sm:text-sm">
          <span class="flex items-center gap-1.5">
            <span class="flex text-romara-amber">
              <IconStar v-for="n in 5" :key="n" class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
            <span>4.9/5 Rating</span>
          </span>
          <span class="h-4 w-px bg-white/30" aria-hidden="true" />
          <span class="flex items-center gap-1.5"><IconUsers class="h-4 w-4 text-romara-amber" />300+ Happy Clients</span>
          <span class="h-4 w-px bg-white/30" aria-hidden="true" />
          <span class="flex items-center gap-1.5"><IconShield class="h-4 w-4 text-romara-amber" />5+ Years Experience</span>
        </div>
      </div>
    </div>
  </section>
</template>
