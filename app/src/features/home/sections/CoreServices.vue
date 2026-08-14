<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconBinoculars from '@/components/icons/IconBinoculars.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconPlaneLanding from '@/components/icons/IconPlaneLanding.vue'

const services = [
  {
    icon: IconBinoculars,
    title: 'Safari Tours',
    desc: 'Expertly guided game drives across the Mara, Amboseli, Tsavo and beyond.',
    image: '/images/home/mara.webp',
    href: '/safari-packages',
    cta: 'Explore Safaris',
  },
  {
    icon: IconCar,
    title: 'Vehicle Hire',
    desc: 'A premium 4×4 fleet — Land Cruisers, safari vans and more, with or without a driver.',
    image: '/images/fleet/cruiser.webp',
    href: '/vehicle-hire',
    cta: 'Hire a Vehicle',
  },
  {
    icon: IconPlaneLanding,
    title: 'Airport Transfers',
    desc: 'Reliable, flight-monitored pick-ups and drop-offs anywhere across Kenya.',
    image: '/images/airport-transfers/airport-van.webp',
    href: '/airport-transfers',
    cta: 'Book a Transfer',
  },
]

// DESKTOP: which panel is expanded (hover/focus).
const active = ref(0)

// MOBILE: each rectangle card starts "closed" and opens as it scrolls into view.
const mobileList = ref<HTMLElement | null>(null)
const openCards = ref<boolean[]>(services.map(() => false))

onMounted(() => {
  const el = mobileList.value
  if (!el) return

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    openCards.value = services.map(() => true)
    return
  }

  const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'))
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const i = Number((entry.target as HTMLElement).dataset.card)
          openCards.value[i] = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.45, rootMargin: '0px 0px -8% 0px' },
  )
  cards.forEach((card) => observer.observe(card))
})
</script>

<template>
  <section class="section-y relative isolate overflow-hidden bg-romara-green-dark text-white">
    <!-- Background image + brand overlay -->
    <img
      src="/images/destinations/mara.webp"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover opacity-25"
    />
    <div class="absolute inset-0 bg-green-fade/90 mix-blend-multiply" aria-hidden="true" />
    <div class="absolute inset-0 bg-romara-green-dark/50" aria-hidden="true" />
    <div class="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-romara-amber/15 blur-3xl" aria-hidden="true" />

    <div class="romara-container relative">
      <!-- Header -->
      <div v-scroll-reveal class="max-w-xl">
        <p class="eyebrow text-romara-amber-300">What We Do</p>
        <h2 class="mt-3 font-heading text-display-sm font-semibold text-white">One Operator for the Whole Journey</h2>
      </div>

      <!-- DESKTOP: expanding panel gallery (unchanged) -->
      <div v-scroll-reveal="{ delay: 100 }" class="panels mt-10 hidden md:flex md:h-[30rem] md:gap-4">
        <a
          v-for="(service, index) in services"
          :key="service.title"
          :href="service.href"
          :aria-label="`${service.title} — ${service.cta}`"
          class="panel group relative block h-full overflow-hidden"
          :class="[active === index ? 'panel--active shadow-elevated' : '', index % 2 === 1 ? 'rounded-card-alt' : 'rounded-card']"
          @mouseenter="active = index"
          @focus="active = index"
        >
          <img
            :src="service.image"
            :alt="service.title"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out-expo"
            :class="active === index ? 'scale-105' : 'scale-100'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/95 via-romara-green-dark/25 to-romara-green-dark/45" aria-hidden="true" />

          <div class="absolute inset-x-0 bottom-0 p-6">
            <h3 class="font-heading text-2xl font-semibold text-white">{{ service.title }}</h3>
            <div
              class="overflow-hidden transition-all duration-500 ease-out-expo"
              :class="active === index ? 'mt-2 max-h-40 opacity-100' : 'mt-0 max-h-0 opacity-0'"
            >
              <p class="max-w-xs text-sm leading-relaxed text-white/80">{{ service.desc }}</p>
              <span class="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-romara-amber-300">
                {{ service.cta }}
                <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5" />
              </span>
            </div>
          </div>
        </a>
      </div>

      <!-- MOBILE: rectangle cards that open as they scroll into view -->
      <div ref="mobileList" class="mt-10 space-y-5 md:hidden">
        <a
          v-for="(service, index) in services"
          :key="service.title"
          :data-card="index"
          :href="service.href"
          class="group block overflow-hidden rounded-card bg-romara-green-dark/45 shadow-card"
        >
          <div class="relative h-44">
            <img :src="service.image" :alt="service.title" loading="lazy" class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/90 via-romara-green-dark/20 to-transparent" aria-hidden="true" />
            <div class="absolute inset-x-0 bottom-0 p-4">
              <h3 class="font-heading text-xl font-semibold text-white">{{ service.title }}</h3>
            </div>
          </div>

          <!-- Detail: collapsed until the card scrolls into view -->
          <div
            class="overflow-hidden transition-all duration-500 ease-out-expo"
            :class="openCards[index] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'"
          >
            <div class="p-4">
              <p class="text-sm leading-relaxed text-white/75">{{ service.desc }}</p>
              <span class="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-romara-amber-300">
                {{ service.cta }}
                <IconArrowRight class="h-4 w-4" />
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Desktop: panels share the row and the active one expands. */
@media (min-width: 768px) {
  .panel {
    flex: 1 1 0%;
    transition:
      flex-grow 0.7s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.5s ease;
  }
  .panel--active {
    flex-grow: 2.6;
  }
}
</style>
