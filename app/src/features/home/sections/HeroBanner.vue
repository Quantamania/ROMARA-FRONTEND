<script setup lang="ts">
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconShield from '@/components/icons/IconShield.vue'
</script>

<template>
  <section class="relative isolate min-h-[290px] overflow-hidden bg-romara-green text-white sm:min-h-[68vh] lg:min-h-[calc(100vh-97px)] xl:min-h-[calc(100vh-121px)]">
    <img
      src="/images/home/hero-elephants.webp"
      alt="Elephants on the Kenyan savanna at golden hour"
      fetchpriority="high"
      class="ken-burns absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-romara-green-dark/95 via-romara-green-dark/60 to-romara-green-dark/15" />
    <div class="absolute inset-0 bg-scrim-b" />

    <div class="romara-container relative flex min-h-[290px] flex-col justify-center py-5 sm:min-h-[68vh] sm:py-16 lg:min-h-[calc(100vh-97px)] xl:min-h-[calc(100vh-121px)]">
      <div class="max-w-xl">
        <h1 class="font-heading text-lg font-bold leading-tight sm:text-4xl lg:text-5xl xl:text-6xl">
          Safari Tours <span class="text-romara-amber">&amp;</span> Premium Vehicle Hire
        </h1>

        <p class="mt-2.5 max-w-md text-[13px] font-medium leading-snug text-white/85 sm:mt-4 sm:text-lg">
          Two ways to explore Kenya, expertly guided or behind your own wheel.
        </p>

        <div class="mt-4 flex flex-nowrap gap-2 sm:mt-6 sm:gap-3">
          <a
            href="/book-now"
            class="flex items-center justify-center gap-1.5 rounded-md bg-romara-amber px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.05em] text-white shadow-card transition-all duration-300 ease-out-expo hover:bg-romara-amber/90 active:scale-[0.98] sm:gap-2.5 sm:px-6 sm:py-3 sm:text-sm"
          >
            <IconCalendarCheck class="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            Book Safari
          </a>
          <a
            href="/vehicle-hire"
            class="flex items-center justify-center gap-1.5 rounded-md border-2 border-white/70 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.05em] text-white transition-all duration-300 ease-out-expo hover:border-romara-amber hover:text-romara-amber active:scale-[0.98] sm:gap-2.5 sm:px-6 sm:py-3 sm:text-sm"
          >
            <IconCar class="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            Hire a Vehicle
          </a>
        </div>

        <div class="mt-4 flex flex-nowrap items-center gap-x-2.5 text-[10px] font-semibold text-white/90 sm:gap-x-3 sm:text-sm">
          <span class="flex items-center gap-1 whitespace-nowrap">
            <span class="flex text-romara-amber">
              <IconStar v-for="n in 5" :key="n" class="h-3 w-3 sm:h-4 sm:w-4" />
            </span>
            4.9/5
          </span>
          <span class="h-3.5 w-px shrink-0 bg-white/30" aria-hidden="true" />
          <span class="flex items-center gap-1 whitespace-nowrap"><IconUsers class="h-3.5 w-3.5 shrink-0 text-romara-amber sm:h-4 sm:w-4" />300+ Clients</span>
          <span class="h-3.5 w-px shrink-0 bg-white/30" aria-hidden="true" />
          <span class="flex items-center gap-1 whitespace-nowrap"><IconShield class="h-3.5 w-3.5 shrink-0 text-romara-amber sm:h-4 sm:w-4" />5+ Years</span>
        </div>
      </div>
    </div>
  </section>
</template>
