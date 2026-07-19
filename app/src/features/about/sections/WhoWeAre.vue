<script setup lang="ts">
import IconMedal from '@/components/icons/IconMedal.vue'
import IconShield from '@/components/icons/IconShield.vue'
import IconUserCheck from '@/components/icons/IconUserCheck.vue'
import IconDollarCircle from '@/components/icons/IconDollarCircle.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue'

interface Reason {
  icon: typeof IconMedal
  title: string
  description: string
}

interface Props {
  /** 'card' = boxed cream card with amber circle icons (About page).
   *  'flat' = full-width band with plain green icons, single row (Safari Packages page). */
  variant?: 'card' | 'flat'
}

withDefaults(defineProps<Props>(), {
  variant: 'card',
})

const reasons: Reason[] = [
  { icon: IconMedal, title: 'Local Expertise', description: "In-depth knowledge of Kenya's destinations, wildlife and hidden gems." },
  { icon: IconShield, title: 'Safe & Reliable', description: 'Your safety and comfort are our top priority always.' },
  { icon: IconUserCheck, title: 'Personalized Service', description: 'Tailor-made itineraries designed around your needs and budget.' },
  { icon: IconDollarCircle, title: 'Great Value', description: 'Competitive pricing with no hidden costs.' },
  { icon: IconHeadset, title: '24/7 Support', description: "We're here for you before, during, and after your trip." },
  { icon: IconThumbsUp, title: 'Trusted Partner', description: 'Committed to delivering exceptional service every step of the way.' },
]
</script>

<template>
  <!-- Card variant: rounded cream card, amber circle icons, 3-column grid (About page) -->
  <section v-if="variant === 'card'" class="romara-container pb-16">
    <div class="rounded-lg bg-romara-cream p-8 sm:p-10">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Why Travel with ROMARA?</h2>
        <span class="mx-auto mt-2 block h-1 w-14 rounded bg-romara-amber" />
      </div>

      <div class="mt-10 overflow-x-auto pb-4 sm:overflow-visible sm:pb-0">
        <div class="flex gap-4 text-center sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          <div
            v-for="reason in reasons"
            :key="reason.title"
            class="min-w-[220px] flex-shrink-0 flex flex-col items-center sm:min-w-0"
          >
            <span class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-romara-amber text-romara-amber">
              <component :is="reason.icon" class="h-6 w-6" />
            </span>
            <p class="mt-3 text-sm font-bold text-romara-green">{{ reason.title }}</p>
            <p class="mt-1 max-w-[220px] text-xs leading-relaxed text-romara-ink/60">{{ reason.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Flat variant: full-width cream band, plain green icons, single row of 6 (Safari Packages page) -->
  <section v-else class="bg-romara-cream py-14">
    <div class="romara-container">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Why Travel with ROMARA?</h2>
        <span class="mx-auto mt-2 block h-1 w-14 rounded bg-romara-amber" />
      </div>

      <div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:grid-cols-3 lg:grid-cols-6">
        <div v-for="reason in reasons" :key="reason.title" class="flex flex-col items-center">
          <component :is="reason.icon" class="h-8 w-8 text-romara-green" />
          <p class="mt-3 text-sm font-bold text-romara-green">{{ reason.title }}</p>
          <p class="mt-1 max-w-[180px] text-xs leading-relaxed text-romara-ink/60">{{ reason.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>