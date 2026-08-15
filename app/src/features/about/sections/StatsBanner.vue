<script setup lang="ts">
import { companyStats, plus } from '@/data/companyStats'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconStar from '@/components/icons/IconStar.vue'

interface Stat {
  icon: typeof IconUsers
  value: string
  label: string
}

const stats: Stat[] = [
  { icon: IconUsers, value: plus(companyStats.happyClients), label: 'Happy Travellers' },
  { icon: IconMapPin, value: plus(companyStats.destinations), label: 'Destinations' },
  { icon: IconStar, value: `${companyStats.satisfactionPercent}%`, label: 'Customer Satisfaction' },
]
</script>

<template>
  <section class="section-y bg-white">
    <div class="romara-container">
      <div class="grid grid-cols-1 overflow-hidden rounded-card shadow-elevated lg:grid-cols-2">
        <!-- Copy + stats on the brand-green field -->
        <div class="relative isolate flex flex-col justify-center bg-green-fade p-8 text-white sm:p-12">
          <!-- Oversized decorative mark -->
          <span
            class="pointer-events-none absolute -right-3 -top-8 select-none font-heading text-[9rem] leading-none text-white/5"
            aria-hidden="true"
          >&#9733;</span>

          <p class="eyebrow text-romara-amber-300">
            
            More Than a Tour Company
          </p>
          <h2 class="mt-4 font-heading text-display-sm font-semibold text-white">
            We are your travel partner
          </h2>
          <p class="mt-4 max-w-md text-sm leading-relaxed text-white/80">
            Whether you are travelling for leisure, business, adventure, or special occasions, ROMARA is dedicated
            to making your journey smooth, memorable, and truly remarkable.
          </p>

          <dl class="mt-10 grid grid-cols-3 gap-6">
            <div v-for="stat in stats" :key="stat.label" class="border-l border-white/15 pl-4">
              <component :is="stat.icon" class="h-5 w-5 text-romara-amber" />
              <dd class="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">{{ stat.value }}</dd>
              <dt class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">{{ stat.label }}</dt>
            </div>
          </dl>
        </div>

        <img
          src="/images/about/cheetah-hot-air-balloon.webp"
          alt="Cheetah at sunrise with a hot air balloon in the distance"
          loading="lazy"
          class="h-72 w-full object-cover lg:h-full"
        />
      </div>
    </div>
  </section>
</template>
