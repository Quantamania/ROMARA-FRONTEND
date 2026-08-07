<script setup lang="ts">
import { ref } from 'vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconBinoculars from '@/components/icons/IconBinoculars.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconPlaneLanding from '@/components/icons/IconPlaneLanding.vue'

const services = [
  {
    icon: IconBinoculars,
    title: 'Safari Tours',
    tag: 'The adventure',
    desc: 'Expertly guided game drives across the Mara, Amboseli, Tsavo and beyond.',
    image: '/images/home/mara.webp',
    href: '/safari-packages',
    cta: 'Explore Safaris',
  },
  {
    icon: IconCar,
    title: 'Vehicle Hire',
    tag: 'The freedom',
    desc: 'A premium 4×4 fleet — Land Cruisers, safari vans and more, with or without a driver.',
    image: '/images/fleet/cruiser.webp',
    href: '/vehicle-hire',
    cta: 'Hire a Vehicle',
  },
  {
    icon: IconPlaneLanding,
    title: 'Airport Transfers',
    tag: 'The arrival',
    desc: 'Reliable, flight-monitored pick-ups and drop-offs anywhere across Kenya.',
    image: '/images/airport-transfers/airport-van.webp',
    href: '/airport-transfers',
    cta: 'Book a Transfer',
  },
]

// Which panel is expanded on desktop. Hover/focus updates it. (Mobile uses the
// journey layout, where every stage is shown in full.)
const active = ref(0)
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
      <!-- Header: title left, supporting line right -->
      <div v-scroll-reveal class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-xl">
          <p class="eyebrow text-romara-amber-300">What We Do</p>
          <h2 class="mt-3 font-heading text-display-sm font-semibold text-white">One Operator for the Whole Journey</h2>
          <span class="accent-rule mt-4" />
        </div>
        <p class="max-w-sm text-sm leading-relaxed text-white/70 sm:pb-1">
          From the first game drive to the airport run home — ROMARA handles every mile of your Kenyan adventure.
        </p>
      </div>

      <!-- DESKTOP: expanding panel gallery -->
      <div v-scroll-reveal="{ delay: 100 }" class="panels mt-10 hidden md:flex md:h-[30rem] md:gap-4">
        <a
          v-for="(service, index) in services"
          :key="service.title"
          :href="service.href"
          :aria-label="`${service.title} — ${service.cta}`"
          class="panel group relative block h-full overflow-hidden ring-1 ring-white/10"
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

          <span
            class="absolute left-0 top-0 h-full w-1 bg-romara-amber transition-opacity duration-500"
            :class="active === index ? 'opacity-100' : 'opacity-0'"
            aria-hidden="true"
          />

          <div class="absolute left-5 top-5 flex items-center gap-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-romara-amber text-white shadow-glow-amber">
              <component :is="service.icon" class="h-5 w-5" />
            </span>
            <span
              class="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition-opacity duration-500"
              :class="active === index ? 'opacity-100' : 'opacity-70'"
            >
              {{ service.tag }}
            </span>
          </div>

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

      <!-- MOBILE: vertical journey -->
      <ol class="relative mt-10 space-y-6 md:hidden">
        <span
          class="pointer-events-none absolute bottom-6 left-[21px] top-4 w-px bg-gradient-to-b from-romara-amber/70 via-white/25 to-romara-amber/70"
          aria-hidden="true"
        />
        <li
          v-for="(service, index) in services"
          :key="service.title"
          v-scroll-reveal="{ delay: index * 90 }"
          class="relative pl-14"
        >
          <!-- Journey node -->
          <span class="absolute left-0 top-1 z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-romara-amber text-white shadow-glow-amber ring-4 ring-romara-green-dark">
            <component :is="service.icon" class="h-5 w-5" />
          </span>

          <a
            :href="service.href"
            class="group block overflow-hidden shadow-card ring-1 ring-white/12"
            :class="index % 2 === 1 ? 'rounded-card-alt' : 'rounded-card'"
          >
            <!-- Image with tag + title -->
            <div class="relative h-40">
              <img :src="service.image" :alt="service.title" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/90 via-romara-green-dark/20 to-transparent" aria-hidden="true" />
              <div class="absolute inset-x-0 bottom-0 p-4">
                <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-romara-amber-300">{{ service.tag }}</p>
                <h3 class="mt-0.5 font-heading text-xl font-semibold text-white">{{ service.title }}</h3>
              </div>
            </div>

            <!-- Detail -->
            <div class="bg-romara-green-dark/70 p-4">
              <p class="text-sm leading-relaxed text-white/75">{{ service.desc }}</p>
              <span class="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-romara-amber-300">
                {{ service.cta }}
                <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
/* Desktop: panels share the row and the active one expands. The mobile journey
   is a separate layout, so no flex sizing is needed below md. */
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
