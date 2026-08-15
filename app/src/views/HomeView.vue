<script setup lang="ts">
import HeroBanner from '@/features/home/sections/HeroBanner.vue'
import TrustBuilding from '@/features/home/sections/TrustBuilding.vue'
import FleetShowcase from '@/features/home/sections/FleetShowcase.vue'
import PopularDestinations from '@/features/home/sections/PopularDestinations.vue'
import TestimonialsPreview from '@/features/home/sections/TestimonialsPreview.vue'
import CoreServices from '@/features/home/sections/CoreServices.vue'
import FeaturedPackages from '@/features/home/sections/FeaturedPackages.vue'
import WhyChooseUs from '@/features/home/sections/WhyChooseUs.vue'
import SocialProof from '@/features/home/sections/SocialProof.vue'
import BlogPreview from '@/features/home/sections/BlogPreview.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconUserCheck from '@/components/icons/IconUserCheck.vue'
import IconShield from '@/components/icons/IconShield.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import IconMedal from '@/components/icons/IconMedal.vue'
import { ref, onMounted, type Ref } from 'vue'
import { companyStats } from '@/data/companyStats'

const whyChoose = [
  { icon: IconUserCheck, title: 'Local Experts', desc: 'We know Kenya' },
  { icon: IconShield, title: 'Safe & Reliable', desc: 'Your safety is our priority' },
  { icon: IconHeadset, title: '24/7 Support', desc: "We're here anytime" },
  { icon: IconMedal, title: 'Best Value', desc: 'Quality service at fair prices' },
]

// Stats count up from zero the first time the row scrolls into view.
const statsRef = ref<HTMLElement | null>(null)
const rating = ref(0)
const clients = ref(0)
const safaris = ref(0)

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
  const el = statsRef.value
  if (!el) return
  const setFinals = () => {
    rating.value = companyStats.rating
    clients.value = companyStats.happyClients
    safaris.value = companyStats.safarisCompleted
  }
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    setFinals()
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        countTo(rating, companyStats.rating, 1100, 1)
        countTo(clients, companyStats.happyClients, 1500)
        countTo(safaris, companyStats.safarisCompleted, 1500)
        observer.disconnect()
      }
    },
    { threshold: 0, rootMargin: '0px 0px -12% 0px' },
  )
  observer.observe(el)
})

const members = [
  { acronym: 'TRA', name: 'Tourism Regulatory Authority' },
  { acronym: 'KATO', name: 'Kenya Association of Tour Operators' },
  { acronym: 'KPSGA', name: 'Kenya Professional Safari Guides Association' },
]
</script>

<template>
  <HeroBanner />

  <!-- ================= MOBILE / TABLET: curated flow ================= -->
  <div class="lg:hidden">
    <!-- Why Choose ROMARA — full-bleed panel that curves out of the hero -->
    <section class="relative z-10 -mt-7 rounded-t-[1.75rem] bg-white px-4 pb-5 pt-6 shadow-[0_-12px_30px_-16px_rgba(0,0,0,0.25)]">
      <h2 class="text-center font-heading text-xl font-bold text-romara-green">Why Choose ROMARA?</h2>
      <div class="mt-5 grid grid-cols-4 divide-x divide-romara-green/10">
        <div v-for="item in whyChoose" :key="item.title" class="flex flex-col items-center gap-1.5 px-1.5 text-center">
          <component :is="item.icon" class="h-7 w-7 shrink-0 text-romara-green" />
          <p class="text-[12px] font-bold leading-tight text-romara-green">{{ item.title }}</p>
          <p class="text-[10px] leading-tight text-romara-ink/60">{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Body -->
    <div class="space-y-3 bg-romara-bone pb-4 pt-3">
      <FleetShowcase />
      <PopularDestinations />

      <section>
        <div class="romara-container">
          <TestimonialsPreview :card="false" />
        </div>
      </section>

      <!-- Stats + accreditation — no card, numbers count up on scroll -->
      <section ref="statsRef" class="pb-1 pt-4">
        <div class="romara-container">
          <dl class="grid grid-cols-2 gap-x-4 gap-y-6 text-center sm:grid-cols-4">
            <div>
              <dd class="font-heading text-3xl font-bold leading-none text-romara-green">{{ rating.toFixed(1) }}<span class="text-romara-amber">/5</span></dd>
              <dt class="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-romara-ink/55">Traveller Rating</dt>
            </div>
            <div>
              <dd class="font-heading text-3xl font-bold leading-none text-romara-green">{{ clients }}<span class="text-romara-amber">+</span></dd>
              <dt class="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-romara-ink/55">Happy Clients</dt>
            </div>
            <div>
              <dd class="font-heading text-3xl font-bold leading-none text-romara-green">{{ safaris }}<span class="text-romara-amber">+</span></dd>
              <dt class="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-romara-ink/55">Successful Safaris</dt>
            </div>
            <div>
              <dd class="font-heading text-xl font-bold leading-none text-romara-green">Kenya-wide</dd>
              <dt class="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-romara-ink/55">Coverage</dt>
            </div>
          </dl>

          <div class="mt-7 border-t border-romara-green/10 pt-4">
            <p class="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-romara-ink/40">Proud Members Of</p>
            <div class="mt-3 flex flex-wrap justify-center gap-2">
              <span
                v-for="m in members"
                :key="m.acronym"
                :title="m.name"
                class="inline-flex items-center rounded-full border border-romara-green/15 bg-white px-3 py-1.5 shadow-sm"
              >
                <span class="font-heading text-xs font-bold tracking-wide text-romara-green">{{ m.acronym }}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Ready to Explore Kenya? -->
      <section class="pt-1 text-center">
        <div class="romara-container">
          <h2 class="font-heading text-2xl font-bold text-romara-green">Ready to Explore Kenya?</h2>
          <p class="mt-1.5 text-sm text-romara-ink/60">Let's plan your perfect adventure today.</p>
          <div class="mt-5 flex flex-wrap justify-center gap-3">
            <BaseButton as="a" href="/book-now" variant="amber" size="lg">Book Your Safari</BaseButton>
            <BaseButton as="a" href="/contact" variant="outline" size="lg">Get a Quote</BaseButton>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- ================= DESKTOP: original layout ================= -->
  <div class="hidden lg:block">
    <TrustBuilding />
    <div class="content-auto-section"><CoreServices /></div>
    <div class="content-auto-section"><FleetShowcase /></div>
    <div class="content-auto-section"><FeaturedPackages /></div>

    <section class="content-auto-section section-y bg-romara-sand">
      <div class="romara-container grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
        <WhyChooseUs />
        <TestimonialsPreview />
      </div>
    </section>

    <div class="content-auto-section"><SocialProof /></div>
    <div class="content-auto-section"><BlogPreview /></div>
  </div>
</template>
