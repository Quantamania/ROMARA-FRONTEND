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

const reasons: Reason[] = [
  { icon: IconMedal, title: 'Local Expertise', description: "In-depth knowledge of Kenya's destinations, culture, and hidden gems." },
  { icon: IconShield, title: 'Safe & Reliable', description: 'Your safety and comfort are our top priority always.' },
  { icon: IconUserCheck, title: 'Personalized Service', description: 'Tailor-made itineraries designed around your needs and budget.' },
  { icon: IconDollarCircle, title: 'Great Value', description: 'Competitive pricing with no hidden costs.' },
  { icon: IconHeadset, title: '24/7 Support', description: "We're here for you before, during, and after your trip." },
  { icon: IconThumbsUp, title: 'Trusted Partner', description: 'Committed to delivering exceptional service every step of the way.' },
]
</script>

<template>
  <section class="romara-container pb-16">
    <div class="rounded-lg bg-romara-cream p-8 sm:p-10">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Why Travel with ROMARA?</h2>
        <span class="mx-auto mt-2 block h-1 w-14 rounded bg-romara-amber" />
      </div>

      <div class="mt-10 grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="reason in reasons" :key="reason.title" class="flex flex-col items-center">
          <span class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-romara-green text-romara-green">
            <component :is="reason.icon" class="h-6 w-6" />
          </span>
          <p class="mt-3 text-sm font-bold text-romara-green">{{ reason.title }}</p>
          <p class="mt-1 max-w-[220px] text-xs leading-relaxed text-romara-ink/60">{{ reason.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>