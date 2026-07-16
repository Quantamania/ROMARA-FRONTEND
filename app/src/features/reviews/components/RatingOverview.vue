<script setup lang="ts">
import IconStar from '@/components/icons/IconStar.vue'
import IconTripadvisor from '@/components/icons/IconTripadvisor.vue'
import IconUsers from '@/components/icons/IconUsers.vue'

interface RatingBreakdown {
  stars: number
  percentage: number
}

const overallRating = 4.9
const totalReviews = '450+'
const recommendPercentage = 100

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
  <div class="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-black/5 shadow-overlap sm:grid-cols-2 lg:grid-cols-4">
    <!-- Overall score -->
    <div class="flex flex-col items-center justify-center bg-white p-6 text-center">
      <p class="text-xs font-semibold uppercase tracking-wide text-romara-ink/50">Overall Rating</p>
      <p class="mt-2 font-heading text-5xl font-bold text-romara-green">{{ overallRating }}</p>
      <div class="mt-2 flex gap-0.5 text-romara-amber">
        <IconStar v-for="n in 5" :key="n" class="h-5 w-5" />
      </div>
      <p class="mt-2 text-xs text-romara-ink/50">Based on {{ totalReviews }} reviews</p>
    </div>

    <!-- Distribution bars -->
    <div class="bg-white p-6">
      <div class="flex h-full flex-col justify-center space-y-2">
        <div v-for="row in breakdown" :key="row.stars" class="flex items-center gap-3 text-xs">
          <span class="w-10 shrink-0 text-romara-ink/60">{{ row.stars }} Star</span>
          <span class="h-1.5 flex-1 overflow-hidden rounded-full bg-romara-cream">
            <span class="block h-full rounded-full bg-romara-amber" :style="{ width: `${row.percentage}%` }" />
          </span>
          <span class="w-9 shrink-0 text-right text-romara-ink/50">{{ row.percentage }}%</span>
        </div>
      </div>
    </div>

    <!-- Platform ratings -->
    <div class="flex flex-col justify-center gap-4 bg-white p-6">
      <p class="text-xs font-semibold uppercase tracking-wide text-romara-ink/50">Rated Excellent On</p>
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

    <!-- Recommend % -->
    <div class="flex flex-col items-center justify-center gap-2 bg-white p-6 text-center">
      <IconUsers class="h-7 w-7 text-romara-amber" />
      <p class="font-heading text-3xl font-bold text-romara-green">{{ recommendPercentage }}%</p>
      <p class="text-xs leading-snug text-romara-ink/50">of our guests recommend ROMARA Tours &amp; Travel</p>
    </div>
  </div>
</template>