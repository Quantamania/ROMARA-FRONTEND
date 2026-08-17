<script setup lang="ts">
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconShield from '@/components/icons/IconShield.vue'
</script>

<template>
  <section class="relative isolate min-h-[210px] overflow-hidden bg-romara-green text-white sm:min-h-[68vh] lg:min-h-[calc(100vh-63px)] xl:min-h-[calc(100vh-87px)]">
    <img
      src="/images/home/mara.webp"
      alt="A ROMARA-branded safari Land Cruiser with its roof open on a game drive in the Maasai Mara"
      fetchpriority="high"
      class="ken-burns absolute inset-0 h-full w-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-romara-green-dark/95 via-romara-green-dark/60 to-romara-green-dark/15" />
    <div class="absolute inset-0 bg-scrim-b" />

    <div class="romara-container relative flex min-h-[210px] flex-col justify-center pb-9 pt-4 sm:min-h-[68vh] lg:min-h-[calc(100vh-63px)] xl:min-h-[calc(100vh-87px)] sm:py-16">
      <div class="max-w-xl">
        <h1 class="font-heading text-2xl font-bold leading-tight tracking-tight sm:text-4xl sm:tracking-normal lg:text-5xl xl:text-6xl">
          Safari Tours <span class="text-romara-amber">&amp;</span> Premium Vehicle Hire
        </h1>

        <div class="mt-5 flex flex-nowrap gap-2 sm:mt-10 sm:gap-3 lg:mt-12">
          <a
            href="/book-now"
            class="flex items-center justify-center gap-1.5 rounded-md bg-romara-amber px-4 py-2.5 text-xs font-bold uppercase tracking-[0.05em] text-white shadow-card transition-all duration-300 ease-out-expo hover:bg-romara-amber/90 active:scale-[0.98] sm:gap-2.5 sm:px-6 sm:py-3 sm:text-sm"
          >
            <IconCalendarCheck class="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            Book Safari
          </a>
          <a
            href="/vehicle-hire"
            class="flex items-center justify-center gap-1.5 rounded-md border-2 border-white/70 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.05em] text-white transition-all duration-300 ease-out-expo hover:border-romara-amber hover:text-romara-amber active:scale-[0.98] sm:gap-2.5 sm:px-6 sm:py-3 sm:text-sm"
          >
            <IconCar class="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            Hire a Vehicle
          </a>
        </div>

        <div class="mt-4 flex flex-nowrap items-center gap-x-2 text-[11px] font-semibold text-white/90 sm:mt-9 sm:gap-x-3 sm:text-sm lg:mt-11">
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
