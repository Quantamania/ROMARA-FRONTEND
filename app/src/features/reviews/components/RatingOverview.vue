<script setup lang="ts">
import { companyStats, plus } from '@/data/companyStats'
import IconStar from '@/components/icons/IconStar.vue'
import IconTripadvisor from '@/components/icons/IconTripadvisor.vue'
import IconUsers from '@/components/icons/IconUsers.vue'

interface RatingBreakdown {
  stars: number
  percentage: number
}

const overallRating = companyStats.rating
const totalReviews = plus(companyStats.happyClients)
const recommendPercentage = companyStats.satisfactionPercent

const breakdown: RatingBreakdown[] = [
  { stars: 5, percentage: 92 },
  { stars: 4, percentage: 6 },
  { stars: 3, percentage: 1 },
  { stars: 2, percentage: 0.5 },
  { stars: 1, percentage: 0.5 },
]

const platforms = [
  { name: 'Google', rating: 4.9 },
  { name: 'TripAdvisor', rating: 4.8 },
]
</script>

<template>
  <div class="rounded-2xl bg-white p-6 shadow-card">
    <!-- Big score -->
    <div class="text-center">
      <p class="font-heading font-bold leading-none text-romara-green">
        <span class="text-6xl">{{ overallRating }}</span>
        <span class="text-2xl text-romara-ink/30">/5</span>
      </p>
      <div class="mt-3 flex justify-center gap-0.5 text-romara-amber">
        <IconStar v-for="n in 5" :key="n" class="h-4 w-4" />
      </div>
      <p class="mt-2 text-xs text-romara-ink/50">Based on {{ totalReviews }} reviews</p>
    </div>

    <hr class="my-6 border-black/5" />

    <!-- Distribution bars -->
    <div class="space-y-2.5">
      <div v-for="row in breakdown" :key="row.stars" class="flex items-center gap-3 text-xs">
        <span class="w-10 shrink-0 text-romara-ink/60">{{ row.stars }} Star</span>
        <span class="h-1.5 flex-1 overflow-hidden rounded-full bg-romara-cream">
          <span class="block h-full rounded-full bg-romara-amber" :style="{ width: `${row.percentage}%` }" />
        </span>
        <span class="w-9 shrink-0 text-right text-romara-ink/50">{{ row.percentage }}%</span>
      </div>
    </div>

    <hr class="my-6 border-black/5" />

    <!-- Platform ratings -->
    <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-romara-ink/50">Rated Excellent On</p>
    <div class="space-y-3">
      <div v-for="platform in platforms" :key="platform.name" class="flex items-center justify-between gap-3">
        <span class="flex items-center gap-2 text-sm font-semibold text-romara-green">
          <IconTripadvisor v-if="platform.name === 'TripAdvisor'" class="h-5 w-5 text-[#34E0A1]" />
          <span v-else class="text-base font-bold">G</span>
          {{ platform.name }}
        </span>
        <span class="flex items-center gap-1 text-sm font-bold text-romara-ink">
          {{ platform.rating }}
          <IconStar class="h-3.5 w-3.5 text-romara-amber" />
        </span>
      </div>
    </div>

    <hr class="my-6 border-black/5" />

    <!-- Recommend % -->
    <div class="flex items-center gap-3 rounded-lg bg-romara-cream p-4">
      <IconUsers class="h-7 w-7 shrink-0 text-romara-amber" />
      <p class="text-sm text-romara-ink/70">
        <span class="font-heading text-lg font-bold text-romara-green">{{ recommendPercentage }}%</span>
        of guests recommend ROMARA
      </p>
    </div>
  </div>
</template>