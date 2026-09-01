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
  { icon: IconMedal, title: 'Local Expertise', description: 'Deep local knowledge.' },
  { icon: IconShield, title: 'Safe & Reliable', description: 'Comfort first.' },
  { icon: IconUserCheck, title: 'Personalized Service', description: 'Tailored to you.' },
  { icon: IconDollarCircle, title: 'Great Value', description: 'Fair pricing.' },
  { icon: IconHeadset, title: '24/7 Support', description: 'Always on.' },
  { icon: IconThumbsUp, title: 'Trusted Partner', description: 'Reliable, always.' },
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
        <div class="mb-5">
          <span class="font-mono text-romara-ink-soft text-xs tracking-[0.2em] uppercase">Field notes</span>
        </div>
        <h2 class="font-heading font-semibold text-romara-green text-display-sm leading-tight">
          Why travel
          <span class="block text-romara-amber">with ROMARA?</span>
        </h2>
        <span class="accent-rule mt-5" />
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
              v-for="(reason, i) in reasons"
              :key="reason.title"
              class="group flex-shrink-0 snap-start border-romara-green/15 border-t min-w-[240px] lg:min-w-0"
            >
              <div class="flex items-start gap-4 py-6">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-romara-green/5 text-romara-amber transition-colors duration-300 ease-out-expo group-hover:bg-romara-green group-hover:text-romara-amber">
                  <component :is="reason.icon" class="w-5 h-5" />
                </span>
                <div>
                  <div class="flex items-baseline gap-2">
                    <span class="font-mono text-[10px] tracking-[0.2em] text-romara-amber/70">{{ String(i + 1).padStart(2, '0') }}</span>
                    <p class="font-semibold text-romara-green text-sm">{{ reason.title }}</p>
                  </div>
                  <p class="mt-1 max-w-[220px] text-romara-ink-soft text-xs leading-relaxed">{{ reason.description }}</p>
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
  <section v-else class="section-y bg-white">
    <div class="romara-container">
      <div class="flex flex-col items-center text-center">
        <p class="eyebrow mb-3 justify-center">
          Field notes
        </p>
        <h2 class="font-heading font-semibold text-romara-green text-display-sm">Why travel with ROMARA?</h2>
        <span class="accent-rule mx-auto mt-4" />
      </div>

      <div class="mt-12 overflow-hidden rounded-[2rem] border border-romara-green/10 bg-white p-4 shadow-soft sm:p-5 lg:p-6">
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0 lg:divide-x lg:divide-romara-green/10">
          <div v-for="(reason, i) in reasons" :key="reason.title" class="group flex flex-col items-center rounded-[1.25rem] border border-romara-green/5 bg-white px-3 py-5 text-center transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-romara-amber/20 hover:shadow-soft sm:px-4 lg:border-0 lg:bg-transparent lg:shadow-none lg:hover:bg-transparent lg:hover:shadow-none">
            <span class="font-mono text-romara-amber/70 text-[10px] tracking-[0.2em] uppercase">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="mt-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-romara-green/5 text-romara-green shadow-soft transition-colors duration-300 ease-out-expo group-hover:bg-romara-green group-hover:text-romara-amber">
              <component :is="reason.icon" class="w-6 h-6" />
            </span>
            <p class="mt-4 font-semibold text-romara-green text-sm leading-tight">{{ reason.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>