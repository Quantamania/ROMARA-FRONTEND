<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconStar from '@/components/icons/IconStar.vue'

// Mobile / tablet trust band stats count up from zero on load.
const rating = ref(0)
const clients = ref(0)
const years = ref(0)

function countTo(target: Ref<number>, to: number, duration: number, decimals = 0) {
  const start = performance.now()
  function tick(now: number) {
    const p = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
    target.value = Number((to * eased).toFixed(decimals))
    if (p < 1) requestAnimationFrame(tick)
    else target.value = to
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  const setFinals = () => {
    rating.value = 4.9
    clients.value = 300
    years.value = 5
  }
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setFinals()
    return
  }
  countTo(rating, 4.9, 1100, 1)
  countTo(clients, 300, 1500)
  countTo(years, 5, 1200)
})
</script>

<template>
  <section class="relative isolate min-h-[420px] overflow-hidden bg-romara-green text-white sm:min-h-[420px] md:min-h-[480px] lg:min-h-[calc(100vh-63px)] xl:min-h-[calc(100vh-87px)]">
    <img
      src="/images/home/mara.webp"
      alt="A ROMARA-branded safari Land Cruiser with its roof open on a game drive in the Maasai Mara"
      fetchpriority="high"
      class="ken-burns absolute inset-0 h-full w-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-romara-green-dark/95 via-romara-green-dark/60 to-romara-green-dark/15" />
    <div class="absolute inset-0 bg-scrim-b" />

    <div class="romara-container relative flex min-h-[420px] flex-col justify-center pb-24 pt-8 sm:min-h-[420px] md:min-h-[480px] lg:min-h-[calc(100vh-63px)] xl:min-h-[calc(100vh-87px)] sm:pb-24 sm:pt-10 lg:py-16">
      <div class="max-w-xl">
        <h1 class="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-4xl sm:tracking-normal lg:text-5xl xl:text-6xl">
          Safari Tours <span class="text-romara-amber">&amp;</span> Premium Vehicle Hire
        </h1>

        <p class="mt-3.5 max-w-md text-[15px] font-medium leading-snug text-white/85 sm:text-base lg:text-lg">
          Unforgettable journeys. Trusted vehicles. Exceptional experiences.
        </p>

        <div class="mt-5 flex flex-nowrap gap-2 sm:mt-7 sm:gap-3 lg:mt-10">
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
      </div>
    </div>

    <!-- Trust band pinned to the hero's bottom edge on mobile / tablet -->
    <div class="absolute inset-x-0 bottom-0 grid grid-cols-3 divide-x divide-white/15 bg-black/35 px-2 py-3 text-center backdrop-blur-sm lg:hidden">
      <div class="flex flex-col items-center justify-center gap-1 px-1">
        <span class="flex text-romara-amber">
          <IconStar v-for="n in 5" :key="`b${n}`" class="h-2.5 w-2.5" />
        </span>
        <span class="text-xs font-bold leading-none">{{ rating.toFixed(1) }}/5</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-1 px-1">
        <span class="text-sm font-bold leading-none">{{ clients }}+</span>
        <span class="text-[9px] uppercase tracking-wide leading-none text-white/70">Clients</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-1 px-1">
        <span class="text-sm font-bold leading-none">{{ years }}+</span>
        <span class="text-[9px] uppercase tracking-wide leading-none text-white/70">Years</span>
      </div>
    </div>
  </section>
</template>
