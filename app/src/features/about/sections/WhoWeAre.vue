<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
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
  /** 'card' = editorial manifest on a cream field (About page).
   *  'flat' = boarding-pass style strip with hairline dividers (Safari Packages page). */
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

const scrollSection = ref<HTMLElement | null>(null)
const scrollIndicatorWidth = ref('0%')

function updateScrollIndicator() {
  if (!scrollSection.value) {
    scrollIndicatorWidth.value = '0%'
    return
  }

  const el = scrollSection.value
  const maxScroll = el.scrollWidth - el.clientWidth
  if (maxScroll <= 0) {
    scrollIndicatorWidth.value = '0%'
    return
  }

  const progress = Math.min(100, Math.max(0, (el.scrollLeft / maxScroll) * 100))
  scrollIndicatorWidth.value = `${progress}%`
}

function handleScroll() {
  updateScrollIndicator()
}

function handleResize() {
  updateScrollIndicator()
}

onMounted(async () => {
  await nextTick()
  updateScrollIndicator()
  scrollSection.value?.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  scrollSection.value?.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <!--
    Card variant (About page).
    Replaces the centered icon-circle grid with an editorial split: a fixed
    intro column on the left, and the six reasons run as a hairline-ruled
    manifest on the right — read like field notes rather than marketing
    badges. Mobile keeps the horizontal scroll-snap strip, restyled to match.
  -->
  <section v-if="variant === 'card'" class="romara-container py-20 md:py-28">
    <div class="gap-x-16 gap-y-10 grid grid-cols-1 lg:grid-cols-12">
      <!-- Intro column -->
      <div class="lg:col-span-4">
        <div class="flex items-center gap-3 mb-5">
          <span class="bg-romara-amber rounded-full w-1.5 h-1.5" aria-hidden="true"></span>
          <span class="font-mono text-romara-ink/50 text-xs tracking-[0.2em] uppercase">Field notes</span>
        </div>
        <h2 class="font-heading font-bold text-romara-green text-3xl sm:text-4xl leading-tight">
          Why travel
          <span class="text-romara-amber">with ROMARA?</span>
        </h2>
        <p class="mt-4 max-w-xs text-romara-ink/60 text-sm leading-relaxed">
          Six things every ROMARA traveler can count on, from the first itinerary draft to the
          ride home from the airport.
        </p>
        <p class="mt-6 text-romara-ink/50 text-xs sm:hidden">Swipe to read all six →</p>
      </div>

      <!-- Manifest -->
      <div class="lg:col-span-8">
        <div
          ref="scrollSection"
          class="pb-4 lg:pb-0 overflow-x-auto lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth [&::-webkit-scrollbar]:hidden"
        >
          <div class="flex lg:grid lg:grid-cols-2 gap-x-10 gap-y-0 px-4 lg:px-0 snap-x lg:snap-none snap-mandatory">
            <div
              v-for="reason in reasons"
              :key="reason.title"
              class="flex-shrink-0 snap-start border-romara-green/15 border-t min-w-[240px] lg:min-w-0"
            >
              <div class="flex items-start gap-4 py-6">
                <component :is="reason.icon" class="flex-shrink-0 mt-0.5 w-5 h-5 text-romara-amber" />
                <div>
                  <p class="font-bold text-romara-green text-sm">{{ reason.title }}</p>
                  <p class="mt-1 max-w-[220px] text-romara-ink/60 text-xs leading-relaxed">{{ reason.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-2 sm:hidden">
          <div class="bg-romara-green/10 rounded-full w-full h-1 overflow-hidden">
            <div
              class="bg-romara-green/30 rounded-full h-full transition-all duration-200"
              :style="{ width: scrollIndicatorWidth }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--
    Flat variant (Safari Packages page).
    A single boarding-pass style strip: vertical hairline dividers, a
    micro-label above each icon, title below. Reads like an itinerary
    manifest rather than six identical centered blocks.
  -->
  <section v-else class="bg-romara-cream py-14">
    <div class="romara-container">
      <div class="text-center">
        <h2 class="font-bold text-romara-green text-2xl sm:text-3xl">Why Travel with ROMARA?</h2>
        <span class="block bg-romara-amber mx-auto mt-2 rounded w-14 h-1" />
      </div>

      <div class="gap-y-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x mt-10 divide-romara-green/15">
        <div v-for="(reason, i) in reasons" :key="reason.title" class="flex flex-col items-center px-4 text-center">
          <span class="font-mono text-romara-green/40 text-[10px] tracking-[0.2em] uppercase">{{ String(i + 1).padStart(2, '0') }}</span>
          <component :is="reason.icon" class="mt-2 w-7 h-7 text-romara-green" />
          <p class="mt-3 font-bold text-romara-green text-sm">{{ reason.title }}</p>
          <p class="mt-1 max-w-[160px] text-romara-ink/60 text-xs leading-relaxed">{{ reason.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>